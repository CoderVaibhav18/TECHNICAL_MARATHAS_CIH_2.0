from flask import Flask, render_template, request, jsonify
from app.chatbot import mediscan_chat
from flask_cors import CORS
import joblib  # or import pickle, torch, etc.
import os

app = Flask(__name__)
CORS(app)

# Load your ML models (update paths and loading as needed)
MODEL1_PATH = "./model/xray_model_pneumonia_vs_normal.h5"
MODEL2_PATH = "./model/skin_disease_model.h5"

try:
    model1 = joblib.load(MODEL1_PATH)
except Exception as e:
    model1 = None
    print(f"Error loading model1: {e}")
try:
    model2 = joblib.load(MODEL2_PATH)
except Exception as e:
    model2 = None
    print(f"Error loading model2: {e}")


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    message = data.get("message")
    lang = data.get("lang", "auto")

    if not message:
        return jsonify({"reply": "Please speak or type a valid message."}), 400

    result = mediscan_chat(message, lang)
    return jsonify({"reply": result["text"], "audio": result["audio_path"]})


@app.route("/predict_xray", methods=["POST"])
def predict_xray():
    """Endpoint for X-ray ML model prediction (uses model1)."""
    if model1 is None:
        return jsonify({"error": "X-ray model not loaded"}), 500
    data = request.get_json()
    features = data.get("features")
    if features is None:
        return jsonify({"error": "No features provided"}), 400
    try:
        prediction = model1.predict([features])
        return jsonify({"prediction": prediction[0]})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/predict_skin", methods=["POST"])
def predict_skin():
    """Endpoint for Skin ML model prediction (uses model2)."""
    if model2 is None:
        return jsonify({"error": "Skin model not loaded"}), 500
    data = request.get_json()
    features = data.get("features")
    if features is None:
        return jsonify({"error": "No features provided"}), 400
    try:
        prediction = model2.predict([features])
        return jsonify({"prediction": prediction[0]})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
