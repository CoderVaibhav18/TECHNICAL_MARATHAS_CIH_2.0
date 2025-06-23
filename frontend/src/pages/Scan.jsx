import React, { useState, useRef } from 'react';
import Navbar from '../components/Navbar';

const Scan = () => {
  const [selectedType, setSelectedType] = useState('skin');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const fileInputRef = useRef(null);

  const imageTypes = [
    { id: 'skin', label: 'Skin Condition', icon: '🩺' },
    { id: 'xray', label: 'X-Ray Image', icon: '📷' },
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        setIsAnalyzing(true);

        setTimeout(() => {
          setIsAnalyzing(false);
          setAnalysisResult({
            condition: "Dermatitis",
            confidence: "87%",
            description: "The image shows signs of inflammatory skin condition with redness and scaling. This is likely contact dermatitis or eczema.",
            recommendations: [
              "Apply hydrocortisone cream 1-2 times daily",
              "Avoid potential irritants like harsh soaps",
              "Use fragrance-free moisturizers",
              "Consult a dermatologist if condition persists beyond 7 days"
            ],
            severity: "Moderate"
          });
        }, 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const clearImage = () => {
    setUploadedImage(null);
    setAnalysisResult(null);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">Medical Image Analysis</h1>
            <p className="text-base text-gray-500 max-w-2xl mx-auto">
              Upload a clear image of your medical condition for AI-powered preliminary assessment
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Image Type Selection */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg">
              <div className="bg-gradient-to-r from-sky-100 to-emerald-50 p-4">
                <div className="flex items-center">
                  <div className="bg-white p-1.5 rounded-lg mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <h2 className="text-base font-semibold text-gray-700">Select Image Type</h2>
                </div>
              </div>
              <div className="p-4 grid grid-cols-2 gap-2">
                {imageTypes.map(type => (
                  <button
                    key={type.id}
                    className={`p-3 rounded-lg text-left transition-all duration-200 flex items-center text-sm ${
                      selectedType === type.id
                        ? 'bg-emerald-50 border-2 border-emerald-400 text-emerald-800 shadow'
                        : 'bg-gray-50 text-gray-700 hover:bg-emerald-50 hover:border-emerald-200 border-2 border-transparent'
                    }`}
                    onClick={() => setSelectedType(type.id)}
                  >
                    <span className="text-xl mr-2">{type.icon}</span>
                    <span className="font-normal">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Image Upload */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg">
              <div className="bg-gradient-to-r from-indigo-50 to-violet-50 p-4">
                <div className="flex items-center">
                  <div className="bg-white p-1.5 rounded-lg mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                  </div>
                  <h2 className="text-base font-semibold text-gray-700">Upload Image</h2>
                </div>
              </div>
              <div className="p-4">
                <div
                  className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-indigo-200 rounded-lg bg-indigo-50 cursor-pointer hover:border-indigo-400 transition-colors duration-200 relative overflow-hidden"
                  onClick={triggerFileInput}
                >
                  {uploadedImage ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img
                        src={uploadedImage}
                        alt="Uploaded medical"
                        className="max-h-40 rounded-lg object-contain"
                      />
                      <button
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full"
                        onClick={e => {
                          e.stopPropagation();
                          clearImage();
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <div className="bg-indigo-100 p-2 rounded-full mb-2">
                        <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                        </svg>
                      </div>
                      <p className="text-indigo-700 font-normal text-base">Click to upload</p>
                      <p className="text-gray-500 text-xs mt-1">or drag and drop</p>
                      <p className="text-gray-400 text-xs mt-1">PNG, JPG, JPEG (max 10MB)</p>
                    </div>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                  />
                </div>

                {selectedType && !uploadedImage && (
                  <div className="mt-3 bg-sky-50 p-3 rounded-lg border border-sky-100">
                    <h3 className="font-semibold text-sky-700 flex items-center text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      Tips for {imageTypes.find(t => t.id === selectedType).label}
                    </h3>
                    <ul className="text-xs text-sky-700 mt-1 list-disc pl-4 space-y-1">
                      {selectedType === 'skin' && (
                        <>
                          <li>Capture in natural daylight if possible</li>
                          <li>Include a coin or ruler for scale</li>
                          <li>Take photos from multiple angles</li>
                        </>
                      )}
                      {selectedType === 'xray' && (
                        <>
                          <li>Ensure the image is properly lit</li>
                          <li>Capture the entire film without glare</li>
                          <li>Include patient ID if available</li>
                        </>
                      )}
                      {selectedType === 'eye' && (
                        <>
                          <li>Use macro mode if available</li>
                          <li>Ask patient to look in different directions</li>
                          <li>Capture both eyes for comparison</li>
                        </>
                      )}
                      {selectedType === 'wound' && (
                        <>
                          <li>Clean the area before photographing</li>
                          <li>Include a measuring device in the frame</li>
                          <li>Capture from directly above the wound</li>
                        </>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Analysis Results */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg">
            <div className="bg-gradient-to-r from-emerald-100 to-emerald-50 p-4">
              <div className="flex items-center">
                <div className="bg-white p-1.5 rounded-lg mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h2 className="text-base font-semibold text-gray-700">Analysis Results</h2>
              </div>
            </div>
            <div className="p-4">
              {isAnalyzing ? (
                <div className="py-8 flex flex-col items-center justify-center">
                  <div className="animate-pulse mb-4">
                    <div className="bg-emerald-100 border-2 border-white rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                      <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-base font-semibold text-emerald-700 mb-1">Analyzing your image</h3>
                  <p className="text-gray-500 text-sm">Our AI is processing your medical image</p>
                  <div className="w-32 h-2 bg-emerald-50 rounded-full mt-3 overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full animate-progress"></div>
                  </div>
                </div>
              ) : analysisResult ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="flex justify-center">
                    <div className="relative">
                      <img
                        src={uploadedImage}
                        alt="Medical analysis"
                        className="rounded-lg shadow max-h-56"
                      />
                      <div className="absolute top-0 right-0 bg-emerald-400 text-white px-2 py-1 rounded-bl-lg text-xs font-medium">
                        AI Confidence: {analysisResult.confidence}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="bg-emerald-50 p-3 rounded-lg mb-4">
                      <h3 className="text-lg font-semibold text-emerald-800 mb-1">{analysisResult.condition}</h3>
                      <div className="flex items-center mb-2">
                        <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full text-xs font-normal">
                          Severity: {analysisResult.severity}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm">{analysisResult.description}</p>
                    </div>
                    <div className="border-l-4 border-amber-400 pl-3 mb-4">
                      <h4 className="font-semibold text-amber-700 flex items-center text-sm mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        Recommendations
                      </h4>
                      <ul className="text-gray-700 text-xs space-y-1">
                        {analysisResult.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start">
                            <svg className="h-4 w-4 text-emerald-400 mr-1 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded font-normal text-sm transition-colors duration-200 flex items-center">
                        Save Report
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded font-normal text-sm transition-colors duration-200 flex items-center">
                        Find a Specialist
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded font-normal text-sm transition-colors duration-200 flex items-center"
                        onClick={clearImage}
                      >
                        Analyze Another
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center">
                  <div className="flex justify-center mb-3">
                    <div className="bg-gray-100 border-2 border-dashed rounded-lg w-12 h-12 flex items-center justify-center">
                      <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-base font-semibold text-gray-600 mb-1">No image uploaded</h3>
                  <p className="text-gray-500 text-sm max-w-md mx-auto">
                    Upload a medical image to receive an AI-powered preliminary analysis.
                    Our system will provide insights within seconds.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 text-center text-xs text-gray-400">
            <p className="max-w-2xl mx-auto">
              MediScanAI provides preliminary health insights only. This analysis is not a substitute for professional medical advice.
              Always consult with a qualified healthcare provider for diagnosis and treatment.
            </p>
            <div className="flex items-center justify-center mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>HIPAA Compliant • Secure & Private • Encrypted Analysis</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Scan;