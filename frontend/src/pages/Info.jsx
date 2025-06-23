import React from 'react';
import Navbar from '../components/Navbar';

const Info = () => {
  const photoTips = [
    "Ensure good lighting - use natural light when possible",
    "Keep the camera steady and focus clearly on the affected area",
    "Maintain appropriate distance - not too close, not too far",
    "Take multiple angles if needed for skin conditions",
    "Clean the area before photographing for better clarity",
    "Use the highest resolution setting on your device"
  ];

  const whenToVisitDoctor = [
    "Severe pain or discomfort",
    "Symptoms lasting more than 48 hours",
    "Difficulty breathing or chest pain",
    "High fever that doesn't subside",
    "Uncontrolled bleeding",
    "Loss of consciousness"
  ];
  
  const healthCenters = [
    { name: "City Primary Health Center", distance: "1.2 km", address: "123 Main St, Medical Complex", waitTime: "15 mins" },
    { name: "Community Health Center", distance: "2.5 km", address: "456 Health Ave, Wellness District", waitTime: "30 mins" },
    { name: "Suburban Health Clinic", distance: "3.8 km", address: "789 Care Blvd, Health Zone", waitTime: "45 mins" }
  ];

  const voiceExamples = [
    "I've had a persistent headache for three days",
    "There's a red rash on my left arm that itches",
    "I've been coughing with chest pain since yesterday",
    "My vision has been blurry for the past week",
    "I'm experiencing abdominal pain after meals"
  ];

  return (
    <>
      <Navbar/>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <h1 className="text-2xl md:text-3xl font-semibold text-sky-800 mb-2">Health Information & Guidelines</h1>
            <p className="text-base text-sky-600 max-w-3xl mx-auto font-normal">
              Essential information to help you use MediScanAI effectively and understand when to seek professional medical care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Photo Tips Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-200 hover:shadow-lg hover:-translate-y-1">
              <div className="bg-gradient-to-r from-sky-400 to-emerald-300 p-3">
                <div className="flex items-center">
                  <div className="bg-white p-1.5 rounded-lg mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h2 className="text-base font-semibold text-sky-900">How to Take Clear Medical Photos</h2>
                </div>
                <p className="text-sky-100 mt-1 text-xs font-normal">Tips for capturing clear images of skin conditions, X-rays, and eye problems</p>
              </div>
              
              <div className="p-4">
                <ul className="space-y-2">
                  {photoTips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <div className="bg-emerald-100 rounded-full p-1 mt-0.5 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-sm font-normal">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Voice Examples Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-200 hover:shadow-lg hover:-translate-y-1">
              <div className="bg-gradient-to-r from-indigo-400 to-purple-400 p-3">
                <div className="flex items-center">
                  <div className="bg-white p-1.5 rounded-lg mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <h2 className="text-base font-semibold text-indigo-900">Voice Symptom Examples</h2>
                </div>
                <p className="text-indigo-100 mt-1 text-xs font-normal">Learn how to describe your symptoms effectively using voice input</p>
              </div>
              
              <div className="p-4 space-y-3">
                {voiceExamples.map((example, index) => (
                  <div key={index} className="bg-indigo-50 p-3 rounded-lg border-l-4 border-indigo-300">
                    <p className="text-gray-700 italic text-sm font-normal">"{example}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* When to Visit Doctor Card */}
          <div className="bg-white rounded-xl shadow-md mb-8 overflow-hidden transition-transform duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="bg-gradient-to-r from-amber-400 to-orange-400 p-3">
              <div className="flex items-center">
                <div className="bg-white p-1.5 rounded-lg mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h2 className="text-base font-semibold text-amber-900">When to Visit a Doctor</h2>
              </div>
              <p className="text-amber-100 mt-1 text-xs font-normal">Understanding when AI advice should be followed up with professional consultation</p>
            </div>
            
            <div className="p-4">
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {whenToVisitDoctor.map((item, index) => (
                  <li key={index} className="flex items-start bg-orange-50 p-3 rounded-lg">
                    <div className="bg-orange-400 rounded-full h-5 w-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <span className="text-white text-xs font-semibold">!</span>
                    </div>
                    <span className="text-gray-800 text-sm font-normal">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Health Centers Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="bg-gradient-to-r from-emerald-400 to-green-400 p-3">
              <div className="flex items-center">
                <div className="bg-white p-1.5 rounded-lg mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="text-base font-semibold text-emerald-900">Government Health Centers</h2>
              </div>
              <p className="text-emerald-100 mt-1 text-xs font-normal">Find nearby PHC (Primary Health Centers) and CHC (Community Health Centers)</p>
            </div>
            
            <div className="p-4">
              <div className="space-y-3">
                {healthCenters.map((center, index) => (
                  <div key={index} className="border border-gray-100 rounded-lg p-4 hover:border-emerald-300 transition-colors duration-200">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                      <div className="mb-2 sm:mb-0">
                        <h3 className="font-semibold text-gray-800 text-base flex items-center">
                          {center.name}
                          <span className="ml-2 bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full font-normal">
                            {center.waitTime} wait
                          </span>
                        </h3>
                        <p className="text-gray-600 text-xs mt-1">{center.address}</p>
                      </div>
                      <div className="flex items-center sm:flex-col sm:items-end">
                        <span className="bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full text-xs font-normal">
                          {center.distance}
                        </span>
                        <button className="ml-2 sm:ml-0 sm:mt-2 flex items-center bg-sky-500 hover:bg-sky-600 text-white px-3 py-1.5 rounded-lg transition-colors duration-200 text-xs font-normal">
                          Get Directions
                          <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 text-center text-gray-400 text-xs">
            <p>MediScanAI provides preliminary health insights only. Always consult with a healthcare professional for diagnosis and treatment.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Info;