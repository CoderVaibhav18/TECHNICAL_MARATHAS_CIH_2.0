from app.speech_input import recognize_speech_from_mic
from app.chatbot import mediscan_chat

text = recognize_speech_from_mic(lang='hi-IN')  # or 'mr-IN', 'en-IN'
if text:
    result = mediscan_chat(text)
    print(f"\nBot says: {result['text']}")
