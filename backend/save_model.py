import joblib
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler, LabelEncoder

# Dummy training data (Replace this with actual training data if available)
X_train = np.random.rand(100, 5)  # 100 samples, 5 features
y_train = np.random.randint(0, 2, 100)  # 100 labels (0 = Legitimate, 1 = Fraudulent)

# Train a simple model (Replace this with your actual trained model)
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Save the trained model
joblib.dump(model, "fraud_detection_model.pkl")

# Save LabelEncoders and Scaler (Needed for preprocessing)
scaler = StandardScaler()
scaler.fit(X_train)
joblib.dump(scaler, "scaler.pkl")

label_encoders = {
    "transactionHash": LabelEncoder().fit(["example_hash"]),
    "sender": LabelEncoder().fit(["example_sender"]),
    "receiver": LabelEncoder().fit(["example_receiver"]),
    "transaction_type": LabelEncoder().fit(["transfer", "contract_interaction"])
}
joblib.dump(label_encoders, "label_encoders.pkl")

print("✅ Model and preprocessing files saved successfully!")
