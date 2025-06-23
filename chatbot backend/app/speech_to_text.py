import wave
import json
from vosk import Model, KaldiRecognizer

def transcribe_audio(audio_path):
    model = Model("model")  # You must download a Vosk model into /model
    wf = wave.open(audio_path, "rb")
    rec = KaldiRecognizer(model, wf.getframerate())

    results = []
    while True:
        data = wf.readframes(4000)
        if len(data) == 0:
            break
        if rec.AcceptWaveform(data):
            result = json.loads(rec.Result())
            results.append(result.get("text", ""))

    return " ".join(results)
