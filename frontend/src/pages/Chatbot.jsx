import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMicrophone, FaPaperPlane, FaLanguage, FaUserMd } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';
import Navbar from '../components/Navbar';

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { 
      text: "Hello! I'm MediBot, your AI health assistant. How can I help you today?", 
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const handleSend = async () => {
    if (message.trim()) {
      const newMessage = {
        text: message,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      setIsBotTyping(true);
      try {
        const response = await fetch('http://localhost:5000/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: newMessage.text,
            lang: selectedLanguage.code
          })
        });
        if (!response.ok) {
          const errorData = await response.json();
          setMessages(prev => [...prev, {
            text: errorData.reply || 'सर्वर से जवाब नहीं मिला।',
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }]);
        } else {
          const data = await response.json();
          setMessages(prev => [...prev, {
            text: data.reply,
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            audio: data.audio
          }]);
        }
      } catch (error) {
        setMessages(prev => [...prev, {
          text: 'नेटवर्क या सर्वर में समस्या है।',
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }
      setIsBotTyping(false);
    }
  };

  const toggleRecording = () => {
    if (!isRecording) {
      // Start speech recognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert('Speech recognition is not supported in this browser.');
        return;
      }
      const recognition = new SpeechRecognition();
      recognition.lang = selectedLanguage.code === 'hi' ? 'hi-IN' : selectedLanguage.code === 'mr' ? 'mr-IN' : 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognition.start();
      setIsRecording(true);
      recognition.onresult = async (event) => {
        const speechResult = event.results[0][0].transcript;
        setMessage(speechResult);
        setIsRecording(false);
        // Wait for state update, then send
        setTimeout(() => handleSend(), 100);
      };
      recognition.onerror = (event) => {
        alert('Voice input failed: ' + event.error);
        setIsRecording(false);
      };
      recognition.onend = () => {
        setIsRecording(false);
      };
    } else {
      setIsRecording(false);
      // No way to programmatically stop recognition in all browsers
    }
  };

  const handleLanguageSelect = (lang) => {
    setSelectedLanguage(lang);
    setLanguageMenuOpen(false);
  };

  const speakMessage = (text, langCode) => {
    if (!window.speechSynthesis) return;
    const utterance = new window.SpeechSynthesisUtterance(text);
    if (langCode === 'hi') {
      utterance.lang = 'hi-IN';
    } else if (langCode === 'mr') {
      utterance.lang = 'mr-IN';
    } else {
      utterance.lang = 'en-US';
    }
    window.speechSynthesis.speak(utterance);
  };

  // Helper to render text with *bold* support and newlines/paragraphs like ChatGPT
  const renderWithFormatting = (text) => {
    // Split by double newlines for paragraphs
    const paragraphs = text.split(/\n\n+/g);
    return paragraphs.map((para, pIdx) => {
      // Split by single newline for line breaks
      const lines = para.split(/\n/g);
      return (
        <p key={pIdx} style={{ marginBottom: pIdx < paragraphs.length - 1 ? '0.5em' : 0 }}>
          {lines.map((line, lIdx) => [
            ...line.split(/(\*[^*]+\*)/g).map((part, i) =>
              /^\*[^*]+\*$/.test(part) ? <b key={i}>{part.slice(1, -1)}</b> : part
            ),
            lIdx < lines.length - 1 ? <br key={lIdx + '-br'} /> : null
          ])}
        </p>
      );
    });
  };

  useEffect(() => {
    if (messages.length < 2) return;
    const lastMsg = messages[messages.length - 1];
    if (lastMsg.sender === 'bot') {
      // If audio is present, play it, else use speech synthesis
      if (lastMsg.audio) {
        const audio = new Audio(lastMsg.audio);
        audio.play();
      } else {
        speakMessage(lastMsg.text, selectedLanguage.code);
      }
    }
  }, [messages, selectedLanguage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isBotTyping]);

  useEffect(() => {
    if (isBotTyping) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [isBotTyping]);

  return (
    <>
      <Navbar/>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4 md:space-y-6 max-w-4xl mx-auto"
      >
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-500"
          >
            MediBot - Your AI Health Assistant
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-500 md:text-base text-sm font-normal"
          >
            Describe your symptoms in voice or text. Available in multiple languages.
          </motion.p>
        </div>

        <motion.div 
          initial={{ scale: 0.97, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-3 md:p-4 shadow"
        >
          <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-gray-50 to-white p-3 flex justify-between items-center border-b">
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-sky-400 to-indigo-400 w-8 h-8 rounded-md flex items-center justify-center">
                  <FaUserMd className="text-white text-base" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-700 text-sm">MediBot Assistant</h2>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                    <span className="text-xs text-gray-500">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-1">
                <button 
                  onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                  className="relative bg-white p-1.5 rounded-full shadow text-sky-600 hover:bg-sky-50 transition-colors"
                >
                  <FaLanguage className="text-base" />
                </button>
                <button className="bg-white p-1.5 rounded-full shadow text-sky-600 hover:bg-sky-50 transition-colors">
                  <IoMdSettings className="text-base" />
                </button>
              </div>
              
              {/* Language Selection Menu */}
              <AnimatePresence>
                {languageMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-4 top-16 bg-white rounded-xl shadow-lg z-50 border border-gray-200 overflow-hidden"
                  >
                    <div className="p-2 border-b">
                      <h3 className="font-medium text-gray-700 text-sm">Select Language</h3>
                    </div>
                    <ul className="max-h-60 overflow-y-auto">
                      {languages.map((lang) => (
                        <li key={lang.code}>
                          <button
                            className={`flex items-center w-full px-3 py-2 text-left hover:bg-sky-50 ${
                              selectedLanguage.code === lang.code ? 'bg-sky-50' : ''
                            }`}
                            onClick={() => handleLanguageSelect(lang)}
                          >
                            <span className="text-lg mr-2">{lang.flag}</span>
                            <span className="font-normal text-sm">{lang.name}</span>
                            {selectedLanguage.code === lang.code && (
                              <span className="ml-auto text-sky-600">✓</span>
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Chat Messages Area */}
            <div className="h-[320px] md:h-[360px] overflow-y-auto p-3 space-y-3 relative bg-gradient-to-b from-white to-gray-50">
              <div className="text-center text-xs text-gray-400 py-1">
                Today, {new Date().toLocaleDateString()}
              </div>
              
              <AnimatePresence>
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="max-w-xs md:max-w-md">
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        className={`p-2.5 rounded-2xl relative ${
                          msg.sender === 'user' 
                            ? 'bg-gradient-to-r from-sky-400 to-indigo-500 text-white rounded-br-none' 
                            : 'bg-white text-gray-700 border border-gray-100 rounded-bl-none'
                        } shadow-sm text-sm font-normal`}
                      >
                        {renderWithFormatting(msg.text)}
                        
                        <div className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-sky-100' : 'text-gray-400'}`}>
                          {msg.timestamp}
                        </div>
                        {/* Chat bubble tip */}
                        <div 
                          className={`absolute bottom-0 w-2.5 h-2.5 ${
                            msg.sender === 'user' 
                              ? 'bg-gradient-to-r from-sky-400 to-indigo-500 -right-2'
                              : 'bg-white border-b border-l border-gray-100 -left-2'
                          }`}
                          style={{ 
                            clipPath: msg.sender === 'user' 
                              ? 'polygon(0% 0%, 100% 0%, 100% 100%)' 
                              : 'polygon(0% 0%, 100% 100%, 0% 100%)'
                          }}
                        ></div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
                
                {/* Bot typing indicator */}
                {isBotTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none p-2.5 flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse"></div>
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-2 border-t bg-white">
              <div className="flex items-center">
                <input
                  type="text"
                  className="flex-1 border border-gray-200 rounded-l-2xl py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                  placeholder="Type your symptoms or health concerns..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <motion.button 
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={toggleRecording}
                  className={`px-3 py-2 border-y ${
                    isRecording 
                      ? 'bg-red-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <motion.div
                    animate={isRecording ? { scale: [1, 1.1, 1] } : {}}
                    transition={isRecording ? { repeat: Infinity, duration: 1 } : {}}
                  >
                    <FaMicrophone className="text-base" />
                  </motion.div>
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSend}
                  className="bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600 text-white px-3 py-2 rounded-r-2xl transition text-base"
                  disabled={!message.trim()}
                >
                  <FaPaperPlane />
                </motion.button>
              </div>
              
              <div className="flex flex-col md:flex-row justify-between items-center mt-2">
                <p className="text-xs text-gray-400 mb-2 md:mb-0 font-normal">
                  Tip: Use voice input by clicking the microphone button, or type your symptoms directly.
                </p>
                
                <div className="flex items-center bg-sky-50 rounded-full px-2 py-0.5">
                  <span className="text-xs text-sky-700 mr-1">Language:</span>
                  <span className="text-base mr-1">{selectedLanguage.flag}</span>
                  <span className="text-xs font-normal text-sky-800">{selectedLanguage.name}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Chatbot;