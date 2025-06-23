import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCamera, FaMicrophone, FaGlobe, FaArrowRight } from 'react-icons/fa';
import Navbar from '../components/Navbar';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Scan Medical Images",
      description: "Upload skin conditions, X-rays, or eye images for instant AI analysis",
      icon: <FaCamera className="text-sky-500 text-lg" />,
      link: "/scan",
      color: "from-sky-100 to-sky-50"
    },
    {
      title: "Voice Symptom Input",
      description: "Describe your symptoms using voice input in your preferred language",
      icon: <FaMicrophone className="text-violet-500 text-lg" />,
      link: "/chatbot",
      color: "from-violet-100 to-violet-50"
    },
    {
      title: "Multilingual Support",
      description: "Get medical advice in English, Hindi, or Marathi",
      icon: <FaGlobe className="text-emerald-500 text-lg" />,
      link: "/info",
      color: "from-emerald-100 to-emerald-50"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="space-y-8 md:space-y-12 max-w-6xl mx-auto px-4"
      >
        {/* Hero Section */}
        <div className="text-center py-8 md:py-12">
          <motion.h1
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-xl md:text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-500 mb-3"
          >
            AI-Powered Health Diagnosis
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-gray-500 mb-6 md:mb-10 text-sm md:text-base max-w-2xl mx-auto font-normal"
          >
            Accurate medical insights through advanced AI analysis of images and symptoms
          </motion.p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col md:flex-row gap-3 justify-center"
          >
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/scan')}
              className="bg-gradient-to-r from-sky-400 to-sky-600 hover:from-sky-500 hover:to-sky-700 text-white py-3 px-6 rounded-lg font-medium text-base flex items-center justify-center shadow-md"
            >
              Start Image Scan
              <FaArrowRight className="ml-2" />
            </motion.button>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/chatbot')}
              className="bg-gradient-to-r from-violet-400 to-violet-600 hover:from-violet-500 hover:to-violet-700 text-white py-3 px-6 rounded-lg font-medium text-base flex items-center justify-center shadow-md"
            >
              Talk to MediBot
              <FaArrowRight className="ml-2" />
            </motion.button>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 md:p-6 shadow"
        >
          <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-4 text-center">
            How MediScanAI Helps You
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-200 border border-gray-100"
              >
                <div className={`bg-gradient-to-r ${feature.color} h-1 w-full`} />
                <div className="p-4">
                  <div className="flex items-center mb-3">
                    <div className="bg-gray-50 p-2 rounded-lg mr-3">
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold text-gray-800 text-base">{feature.title}</h3>
                  </div>
                  <p className="text-gray-500 mb-4 text-sm">{feature.description}</p>
                  <button
                    onClick={() => navigate(feature.link)}
                    className="text-sky-600 hover:text-sky-800 font-normal flex items-center transition group text-sm"
                  >
                    Learn More
                    <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="bg-gradient-to-br from-sky-400 to-sky-600 rounded-xl p-4 text-white shadow">
            <h3 className="font-semibold text-base mb-2">Instant Analysis</h3>
            <p className="text-sky-100 text-xs">Get AI-powered diagnosis in seconds, not days</p>
          </div>

          <div className="bg-gradient-to-br from-violet-400 to-violet-700 rounded-xl p-4 text-white shadow">
            <h3 className="font-semibold text-base mb-2">24/7 Availability</h3>
            <p className="text-violet-100 text-xs">Access medical assistance anytime, anywhere</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl p-4 text-white shadow">
            <h3 className="font-semibold text-base mb-2">Privacy First</h3>
            <p className="text-emerald-100 text-xs">Your health data is encrypted and secure</p>
          </div>
        </motion.div>

        {/* Testimonial Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="bg-white rounded-xl p-4 shadow border border-gray-100"
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="bg-gray-100 border-2 border-dashed rounded-lg w-12 h-12 mr-4" />
            <div>
              <p className="text-gray-600 italic mb-2 text-sm">
                "MediScanAI helped identify my skin condition when local doctors were unsure.
                The AI analysis was accurate and the treatment recommendation worked perfectly."
              </p>
              <p className="text-sky-700 font-normal text-xs">- Rajesh K., Mumbai</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Home;