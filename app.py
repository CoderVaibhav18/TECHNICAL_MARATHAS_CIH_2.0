from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os
from tensorflow.keras.models import model_from_json

app = Flask(__name__)

# Load model once at startup
MODEL_PATH = "mediscan/skin_diseasesd_model.h5"

# Try loading as a model
try:
    model = load_model(MODEL_PATH)
    print("Loaded as full model!")
except Exception as e:
    print("Failed to load as model:", e)
    # Try loading as weights
    # You must have the model architecture code here

# Define class names (update this list to match your training classes)
class_names = sorted(os.listdir("mediscan/SkinDisease/train"))


@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    img = image.load_img(file, target_size=(224, 224))
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    preds = model.predict(img_array)
    pred_class = class_names[np.argmax(preds)]
    

    return jsonify({"prediction": pred_class, "confidence": confidence})


if __name__ == "__main__":
    app.run(debug=True)
