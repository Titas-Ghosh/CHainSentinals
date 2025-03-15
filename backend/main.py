from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from web3 import Web3
import json
import os
import joblib
import numpy as np
import asyncio

app = FastAPI()

# Enable CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connect to Ethereum Blockchain
ALCHEMY_URL = "https://eth-mainnet.g.alchemy.com/v2/XTtM1j8xY6fF2GOkqD9dGZERJKMmJAJU"
w3 = Web3(Web3.HTTPProvider(ALCHEMY_URL))

# Load contract details
CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"

# Load Contract ABI
with open("abi.json", "r") as abi_file:
    CONTRACT_ABI = json.load(abi_file)

contract = w3.eth.contract(address=CONTRACT_ADDRESS, abi=CONTRACT_ABI)

# Load AI model and scaler
MODEL_PATH = "models/fraud_detection_model.pkl"
SCALER_PATH = "models/scaler.pkl"
BLACKLIST_FILE = "blacklisted_wallets.json"

if os.path.exists(MODEL_PATH) and os.path.exists(SCALER_PATH):
    model = joblib.load(MODEL_PATH)
    scaler = joblib.load(SCALER_PATH)
else:
    model, scaler = None, None

# Store active WebSocket connections
active_connections = []
transactions = set()

async def save_json(filename, data):
    """Save data to a JSON file (keep last 100 entries)."""
    data = data[-100:]
    with open(filename, "w") as f:
        json.dump(data, f, indent=4)

def load_json(filename):
    """Load data from JSON file."""
    if os.path.exists(filename):
        with open(filename, "r") as f:
            return json.load(f)
    return []

@app.websocket("/ws/transactions")
async def websocket_transactions(websocket: WebSocket):
    global transactions

    await websocket.accept()
    active_connections.append(websocket)

    try:
        while True:
            latest_block = w3.eth.block_number
            block = w3.eth.get_block(latest_block, full_transactions=True)

            transactions = block.transactions[:100]
            new_flagged_transactions = []
            blacklisted_wallets = load_json(BLACKLIST_FILE)

            for tx in transactions:
                if tx is None:
                    continue  # ✅ Skip None transactions

                try:
                    tx_hash = tx.hash.hex()
                except AttributeError:
                    print("⚠️ Skipping invalid transaction: ", tx)
                    continue  # ✅ Skip invalid transactions

                if not tx_hash or tx_hash in transactions:
                    continue

                transactions.append(tx_hash)

                sender = tx["from"]
                block_number = tx.blockNumber
                gas_used = tx.gas
                value = w3.from_wei(tx.value, 'ether')
                gas_price = tx.gasPrice
                transaction_count = w3.eth.get_transaction_count(sender)

                is_fraudulent = False
                status = "Normal"

                if model and scaler:
                    try:
                        input_data = np.array([[block_number, gas_used, float(value), gas_price, transaction_count]])
                        input_scaled = scaler.transform(input_data)
                        prediction = model.predict(input_scaled)
                        is_fraudulent = prediction[0] == 1  # Assume '1' means fraud
                        status = "Suspicious" if is_fraudulent else "Normal"
                    except Exception as e:
                        print(f"⚠️ AI Model Error: {e}")

                if is_fraudulent and sender not in blacklisted_wallets:
                    blacklisted_wallets.append(sender)
                    await save_json(BLACKLIST_FILE, blacklisted_wallets)

                transaction_data = {
                    "sender": sender,
                    "blockNumber": block_number,
                    "gasUsed": gas_used,
                    "amount": str(value),
                    "status": status,
                }

                new_flagged_transactions.append(transaction_data)

            if new_flagged_transactions:
                await websocket.send_json(new_flagged_transactions)

            if len(transactions) > 200:
                transactions = set(list(transactions)[-200:])

            await asyncio.sleep(5)

    except WebSocketDisconnect:
        active_connections.remove(websocket)


@app.get("/blacklisted_list")
def get_blacklisted_wallets():
    """Fetch last 100 blacklisted wallets."""
    return load_json(BLACKLIST_FILE)[-100:]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
