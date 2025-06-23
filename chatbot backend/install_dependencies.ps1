# Mediscan Dependencies Installation Script (PowerShell)
Write-Host "========================================" -ForegroundColor Green
Write-Host "Mediscan Dependencies Installation" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Step 1: Upgrade pip
Write-Host "Step 1: Upgrading pip..." -ForegroundColor Yellow
try {
    python -m pip install --upgrade pip
    Write-Host "Pip upgraded successfully" -ForegroundColor Green
} catch {
    Write-Host "Failed to upgrade pip. Trying with --user flag..." -ForegroundColor Yellow
    python -m pip install --upgrade pip --user
}

Write-Host ""

# Step 2: Install TensorFlow CPU version
Write-Host "Step 2: Installing TensorFlow CPU version..." -ForegroundColor Yellow
try {
    pip install tensorflow-cpu --user
    Write-Host "TensorFlow CPU installed successfully" -ForegroundColor Green
} catch {
    Write-Host "TensorFlow CPU installation failed. Trying alternative approach..." -ForegroundColor Red
    Write-Host "Please try running as Administrator or use virtual environment." -ForegroundColor Red
    Read-Host "Press Enter to continue"
    exit 1
}

Write-Host ""

# Step 3: Install other dependencies
Write-Host "Step 3: Installing other dependencies..." -ForegroundColor Yellow
$dependencies = @(
    "flask",
    "google-generativeai", 
    "python-dotenv",
    "vosk",
    "gtts",
    "googletrans==4.0.0-rc1",
    "flask-cors",
    "gTTS",
    "SpeechRecognition",
    "pyaudio",
    "pillow",
    "numpy"
)

foreach ($dep in $dependencies) {
    try {
        Write-Host "Installing $dep..." -ForegroundColor Cyan
        pip install $dep --user
        Write-Host "$dep installed successfully" -ForegroundColor Green
    } catch {
        Write-Host "Failed to install $dep" -ForegroundColor Red
    }
}

Write-Host ""

# Step 4: Verify TensorFlow installation
Write-Host "Step 4: Verifying TensorFlow installation..." -ForegroundColor Yellow
try {
    $result = python -c "import tensorflow as tf; print('TensorFlow version:', tf.__version__)"
    Write-Host $result -ForegroundColor Green
} catch {
    Write-Host "TensorFlow verification failed." -ForegroundColor Red
    Read-Host "Press Enter to continue"
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Installation completed successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "You can now run the application with:" -ForegroundColor Yellow
Write-Host "python app.py" -ForegroundColor Cyan
Write-Host ""
Read-Host "Press Enter to exit" 