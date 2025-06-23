import google.generativeai as genai
import os
from dotenv import load_dotenv
from .translator import translate_to_english, translate_from_english
from gtts import gTTS
import uuid

load_dotenv()

# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-2.5-flash")

# System prompt for domain restriction
SYSTEM_PROMPT = """
You are MediScanAI - a health-focused AI assistant designed for rural healthcare support.

You must only answer questions related to:
- Symptoms and early diagnosis
- Medical care suggestions
- Use of MediScanAI platform
- Preventive care and health awareness

🚫 If asked anything unrelated (e.g., cricket, politics), respond with:
"I'm here to help only with healthcare and medical topics. Please consult the right expert for other topics."

Respond politely and clearly in simple terms.
"""


def mediscan_chat(user_input, manual_lang='auto'):
    # Step 1: Translate to English for Gemini input
    if manual_lang != "auto":
        translated_input, _ = translate_to_english(user_input, force_lang=manual_lang)
        source_lang = manual_lang
    else:
        translated_input, source_lang = translate_to_english(user_input)
    
    # Step 2: Get response from Gemini
    convo = model.start_chat(history=[])
    gemini_response = convo.send_message(f"{SYSTEM_PROMPT}\n\nUser: {translated_input}")
    raw_output = gemini_response.text

    # Step 3: Translate Gemini's output ONLY if language is not English
    if manual_lang == "en":
        final_text = raw_output
    else:
        target_lang = manual_lang if manual_lang != "auto" else source_lang
        final_text = translate_from_english(raw_output, target_lang)

    # Step 4: Generate TTS using final_text
    tts = gTTS(text=final_text, lang=manual_lang if manual_lang != "auto" else source_lang)
    filename = f"speech_{uuid.uuid4()}.mp3"
    path = f"static/audio/{filename}"
    tts.save(path)

    return {
        "text": final_text,
        "audio_path": f"/{path}"
    }
