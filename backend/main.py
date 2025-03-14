from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json
import os

app = FastAPI()

# CORS to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (change for security)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# JSON file path
BLACKLIST_FILE = "black_list.json"

# Ensure the file exists
if not os.path.exists(BLACKLIST_FILE):
    with open(BLACKLIST_FILE, "w") as file:
        json.dump({"blacklisted_wallets": []}, file)

# ✅ Endpoint to check if a wallet is blacklisted
@app.post("/check_wallet")
def check_wallet(data: dict):
    wallet_address = data.get("wallet_address")
    if not wallet_address:
        raise HTTPException(status_code=400, detail="wallet_address is required")

    with open(BLACKLIST_FILE, "r") as file:
        blacklist_data = json.load(file)

    blacklisted_wallets = blacklist_data.get("blacklisted_wallets", [])

    if wallet_address in blacklisted_wallets:
        return {"wallet_address": wallet_address, "status": "blacklisted"}
    else:
        return {"wallet_address": wallet_address, "status": "safe"}

# ✅ Endpoint to get blacklisted wallets
@app.get("/blacklist")
def get_blacklisted_wallets():
    try:
        with open(BLACKLIST_FILE, "r") as file:
            blacklist_data = json.load(file)
        return {"blacklisted_wallets": blacklist_data.get("blacklisted_wallets", [])}
    except Exception as e:
        return {"error": str(e)}

# ✅ Endpoint to add a wallet to the blacklist
@app.post("/blacklist")
def add_to_blacklist(data: dict):
    wallet_address = data.get("wallet_address")
    if not wallet_address:
        raise HTTPException(status_code=400, detail="wallet_address is required")

    with open(BLACKLIST_FILE, "r") as file:
        blacklist_data = json.load(file)

    if wallet_address not in blacklist_data["blacklisted_wallets"]:
        blacklist_data["blacklisted_wallets"].append(wallet_address)

        with open(BLACKLIST_FILE, "w") as file:
            json.dump(blacklist_data, file)

    return {"message": f"Wallet {wallet_address} added to blacklist"}

# ✅ Endpoint to remove a wallet from the blacklist
@app.delete("/blacklist")
def remove_from_blacklist(data: dict):
    wallet_address = data.get("wallet_address")
    if not wallet_address:
        raise HTTPException(status_code=400, detail="wallet_address is required")

    with open(BLACKLIST_FILE, "r") as file:
        blacklist_data = json.load(file)

    if wallet_address in blacklist_data["blacklisted_wallets"]:
        blacklist_data["blacklisted_wallets"].remove(wallet_address)

        with open(BLACKLIST_FILE, "w") as file:
            json.dump(blacklist_data, file)

        return {"message": f"Wallet {wallet_address} removed from blacklist"}
    
    raise HTTPException(status_code=404, detail="Wallet not found in blacklist")

# ✅ Root route
@app.get("/")
def root():
    return {"message": "FastAPI is running"}
