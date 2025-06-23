#!/usr/bin/env python3
"""
Example usage of the prediction endpoints
"""

import requests
import base64
import json


def encode_image_to_base64(image_path):
    """Convert image file to base64 string"""
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")


def test_xray_prediction(image_path):
    """Test X-ray prediction endpoint"""
    try:
        # Encode image to base64
        image_base64 = encode_image_to_base64(image_path)

        # Prepare request data
        data = {"image": image_base64}

        # Make request to prediction endpoint
        response = requests.post(
            "http://localhost:5000/predict_xray",
            json=data,
            headers={"Content-Type": "application/json"},
        )

        if response.status_code == 200:
            result = response.json()
            print("✅ X-ray prediction successful:")
            print(f"   Prediction: {result['prediction']}")
            print(f"   Confidence: {result['confidence']:.2f}")
            print(f"   Class Index: {result['class_index']}")
        else:
            print(f"❌ X-ray prediction failed: {response.status_code}")
            print(f"   Error: {response.text}")

    except Exception as e:
        print(f"❌ Error testing X-ray prediction: {e}")


def test_skin_prediction(image_path):
    """Test skin disease prediction endpoint"""
    try:
        # Encode image to base64
        image_base64 = encode_image_to_base64(image_path)

        # Prepare request data
        data = {"image": image_base64}

        # Make request to prediction endpoint
        response = requests.post(
            "http://localhost:5000/predict_skin",
            json=data,
            headers={"Content-Type": "application/json"},
        )

        if response.status_code == 200:
            result = response.json()
            print("✅ Skin disease prediction successful:")
            print(f"   Prediction: {result['prediction']}")
            print(f"   Confidence: {result['confidence']:.2f}")
            print(f"   Class Index: {result['class_index']}")
        else:
            print(f"❌ Skin disease prediction failed: {response.status_code}")
            print(f"   Error: {response.text}")

    except Exception as e:
        print(f"❌ Error testing skin disease prediction: {e}")


def test_with_sample_images():
    """Test with sample images (you'll need to provide actual image paths)"""
    print("=== Testing Prediction Endpoints ===\n")

    # Example usage - replace with actual image paths
    xray_image_path = "path/to/xray_image.jpg"  # Replace with actual path
    skin_image_path = "path/to/skin_image.jpg"  # Replace with actual path

    print("Testing X-ray prediction...")
    if xray_image_path != "path/to/xray_image.jpg":
        test_xray_prediction(xray_image_path)
    else:
        print("⚠️  Please provide a valid X-ray image path")

    print("\nTesting skin disease prediction...")
    if skin_image_path != "path/to/skin_image.jpg":
        test_skin_prediction(skin_image_path)
    else:
        print("⚠️  Please provide a valid skin image path")


if __name__ == "__main__":
    test_with_sample_images()
