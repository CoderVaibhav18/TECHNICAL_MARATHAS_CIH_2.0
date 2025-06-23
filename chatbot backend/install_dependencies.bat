@echo off
echo ========================================
echo Mediscan Dependencies Installation
echo ========================================
echo.

echo Step 1: Upgrading pip...
python -m pip install --upgrade pip
if %errorlevel% neq 0 (
    echo Failed to upgrade pip. Trying with --user flag...
    python -m pip install --upgrade pip --user
)

echo.
echo Step 2: Installing TensorFlow CPU version (easier on Windows)...
pip install tensorflow-cpu --user
if %errorlevel% neq 0 (
    echo TensorFlow CPU installation failed. Trying alternative approach...
    echo Please try running as Administrator or use virtual environment.
    pause
    exit /b 1
)

echo.
echo Step 3: Installing other dependencies...
pip install flask google-generativeai python-dotenv vosk gtts googletrans==4.0.0-rc1 flask-cors gTTS SpeechRecognition pyaudio pillow numpy --user
if %errorlevel% neq 0 (
    echo Some dependencies failed to install. Please check the error messages above.
    pause
    exit /b 1
)

echo.
echo Step 4: Verifying TensorFlow installation...
python -c "import tensorflow as tf; print('TensorFlow version:', tf.__version__)"
if %errorlevel% neq 0 (
    echo TensorFlow verification failed.
    pause
    exit /b 1
)

echo.
echo ========================================
echo Installation completed successfully!
echo ========================================
echo.
echo You can now run the application with:
echo python app.py
echo.
pause 