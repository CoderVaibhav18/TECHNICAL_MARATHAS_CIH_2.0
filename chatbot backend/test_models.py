#!/usr/bin/env python3
"""
Test script to verify model loading and basic functionality
"""

import tensorflow as tf
import numpy as np
import os


def test_model_loading():
    """Test if models can be loaded successfully"""

    # Model paths
    MODEL1_PATH = "./model/xray_model_pneumonia_vs_normal.h5"
    MODEL2_PATH = "./model/skin_disease_model.h5"

    print("Testing model loading...")

    # Test X-ray model
    try:
        if os.path.exists(MODEL1_PATH):
            model1 = tf.keras.models.load_model(MODEL1_PATH)
            print(f"✅ X-ray model loaded successfully")
            print(f"   Model input shape: {model1.input_shape}")
            print(f"   Model output shape: {model1.output_shape}")
        else:
            print(f"❌ X-ray model file not found at {MODEL1_PATH}")
    except Exception as e:
        print(f"❌ Error loading X-ray model: {e}")

    # Test skin disease model
    try:
        if os.path.exists(MODEL2_PATH):
            model2 = tf.keras.models.load_model(MODEL2_PATH)
            print(f"✅ Skin disease model loaded successfully")
            print(f"   Model input shape: {model2.input_shape}")
            print(f"   Model output shape: {model2.output_shape}")
        else:
            print(f"❌ Skin disease model file not found at {MODEL2_PATH}")
    except Exception as e:
        print(f"❌ Error loading skin disease model: {e}")


def test_dummy_prediction():
    """Test dummy prediction with random data"""

    MODEL1_PATH = "./model/xray_model_pneumonia_vs_normal.h5"
    MODEL2_PATH = "./model/skin_disease_model.h5"

    print("\nTesting dummy predictions...")

    # Test X-ray model with dummy data
    try:
        if os.path.exists(MODEL1_PATH):
            model1 = tf.keras.models.load_model(MODEL1_PATH)
            # Create dummy image data (224x224x3)
            dummy_image = np.random.random((1, 224, 224, 3))
            prediction = model1.predict(dummy_image)
            print(f"✅ X-ray model prediction successful")
            print(f"   Prediction shape: {prediction.shape}")
            print(f"   Prediction value: {prediction[0]}")
        else:
            print(f"❌ X-ray model file not found")
    except Exception as e:
        print(f"❌ Error with X-ray model prediction: {e}")

    # Test skin disease model with dummy data
    try:
        if os.path.exists(MODEL2_PATH):
            model2 = tf.keras.models.load_model(MODEL2_PATH)
            # Create dummy image data (224x224x3)
            dummy_image = np.random.random((1, 224, 224, 3))
            prediction = model2.predict(dummy_image)
            print(f"✅ Skin disease model prediction successful")
            print(f"   Prediction shape: {prediction.shape}")
            print(f"   Prediction values: {prediction[0]}")
        else:
            print(f"❌ Skin disease model file not found")
    except Exception as e:
        print(f"❌ Error with skin disease model prediction: {e}")


if __name__ == "__main__":
    print("=== Model Testing Script ===\n")
    test_model_loading()
    test_dummy_prediction()
    print("\n=== Testing Complete ===")
