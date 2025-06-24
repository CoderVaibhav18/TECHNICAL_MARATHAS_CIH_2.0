import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np


app = Flask(__name__)
CORS(app)

# Load models
skin_model = load_model("model/skin_disease_model.h5")
xray_model = load_model("model/xray_model_pneumonia_vs_normal.h5")

skin_labels = ['Acne', 'Eczema', 'Fungal', 'Psoriasis', 'Other']
xray_labels = ['Normal', 'Pneumonia']

def prepare_image(img, target_size):
    img = img.resize(target_size)
    img = image.img_to_array(img)
    img = img / 255.0
    img = np.expand_dims(img, axis=0)
    return img

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/predict/skin', methods=['POST'])
def predict_skin():
    file = request.files.get('image')
    if file:
        img = image.load_img(file, target_size=(224, 224))
        img_tensor = prepare_image(img, (224, 224))
        preds = skin_model.predict(img_tensor)
        result = {
            'prediction': skin_labels[np.argmax(preds)],
            'confidence': float(np.max(preds))
        }
        return jsonify(result)
    return jsonify({'error': 'No image uploaded'}), 400

@app.route('/predict/xray', methods=['POST'])
def predict_xray():
    file = request.files.get('image')
    if file:
        img = image.load_img(file, target_size=(224, 224))
        img_tensor = prepare_image(img, (224, 224))
        preds = xray_model.predict(img_tensor)
        result = {
            'prediction': xray_labels[np.argmax(preds)],
            'confidence': float(np.max(preds))
        }
        return jsonify(result)
    return jsonify({'error': 'No image uploaded'}), 400

if __name__ == '__main__':
    app.run(debug=True)