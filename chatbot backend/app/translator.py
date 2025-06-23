from googletrans import Translator

translator = Translator()

# Detect language and translate to English
def translate_to_english(text, force_lang=None):
    detected_lang = force_lang or translator.detect(text).lang
    translated = translator.translate(text, src=detected_lang, dest='en')
    return translated.text, detected_lang


# Translate back to original language
def translate_from_english(text, target_lang):
    translated = translator.translate(text, src='en', dest=target_lang)
    return translated.text

