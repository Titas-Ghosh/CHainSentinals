import pandas as pd
import joblib
from sklearn.preprocessing import StandardScaler, LabelEncoder

# Load trained model
def load_model(model_path="fraud_detection_model.pkl"):
    """Load the trained fraud detection model."""
    model = joblib.load(model_path)
    return model

# Load label encoders and scaler
scaler = joblib.load("scaler.pkl")  # Load the StandardScaler
label_encoders = joblib.load("label_encoders.pkl")  # Load LabelEncoders

def preprocess_new_data(new_data):
    """Preprocess new transaction data to match the training format."""
    df = pd.DataFrame([new_data])  # Convert dictionary to DataFrame

    # Apply Label Encoding for categorical features
    categorical_columns = ["transactionHash", "sender", "receiver", "transaction_type"]
    for col in categorical_columns:
        if col in df.columns and col in label_encoders:
            df[col] = df[col].map(lambda x: label_encoders[col].transform([x])[0] if x in label_encoders[col].classes_ else -1)

    # Ensure all columns are present before scaling
    required_columns = ["blockNumber", "gasUsed", "value", "transactionHash", "sender"]
    for col in required_columns:
        if col not in df.columns:
            df[col] = 0  # Default value if missing

    # **Fix: Convert DataFrame to NumPy Array before Scaling**
    df_scaled = scaler.transform(df[required_columns].values)  # Convert to NumPy array

    return df_scaled


def predict_fraud(new_data):
    """Predict fraud for a new transaction."""
    model = load_model()
    preprocessed_data = preprocess_new_data(new_data)
    prediction = model.predict(preprocessed_data)
    
    return "Fraudulent Transaction" if prediction[0] == 1 else "Legitimate Transaction"

# Example Transaction Data
new_transaction = {
    "blockNumber": 1876534,
    "gasUsed": 21000,
    "transactionHash": "0xa3f9b845b7cf9d6b24a24f5bb1679ff917b36fc1e0a61f8b3b2a22c3b3e1d1a5",
    "sender": "0x24dc2b2153609c6c88e26dad6f20ef54c52bc3f8e04e7d7eae9f6bba6c69cb82",
    "receiver": "0x5e7894b457cfd654d534a5679ef54c5b2b362f8e04e7d7eae9f6bba6c69cb88c",
    "value": 0.5,
    "transaction_type": "contract_interaction"
}

# Run prediction
result = predict_fraud(new_transaction)
print("Prediction:", result)
