// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import Header from './components/Header';
import Home from './pages/Home';
import Scan from './pages/Scan';
import Chatbot from './pages/Chatbot';
import Info from './pages/Info';
import { AnimatePresence, motion } from 'framer-motion';

// Wrapper component for page transition

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/info" element={<Info />} />
      </Routes>
    </AnimatePresence>
    </Router>
  );
}

export default App;