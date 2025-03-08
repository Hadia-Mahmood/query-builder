
import React from 'react';
import RoofingForm from '../components/RoofingForm';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <div className="relative overflow-hidden">
        {/* Header */}
        <header className="px-6 py-8 md:py-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-semibold text-gray-900">Roof<span className="text-roof">Query</span></div>
              <nav className="hidden md:flex space-x-8">
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">How it Works</a>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Pros</a>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Resources</a>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
              </nav>
            </div>
          </div>
        </header>
        
        {/* Hero Section */}
        <div className="px-6 py-12 md:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-block px-3 py-1 rounded-full bg-roof-light text-roof-dark text-xs font-medium tracking-wide mb-4">
                FIND THE RIGHT ROOFING CONTRACTORS
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
                Your Perfect Roof Starts <span className="text-roof">Here</span>
              </h1>
              <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
                Answer a few questions about your roofing project and we'll connect you with the right professionals.
              </p>
            </div>
            
            {/* Form Card */}
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm glassmorphism border border-gray-100">
                <div className="p-8 md:p-12">
                  <RoofingForm />
                </div>
              </div>
              
              {/* Trust Elements */}
              <div className="mt-10 md:mt-12 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-roof" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Verified Professionals</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-roof" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Free to Use</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-roof" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>100% Satisfaction Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="hidden md:block absolute -bottom-24 -left-24 w-96 h-96 bg-roof/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="hidden md:block absolute -top-24 -right-24 w-96 h-96 bg-roof/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>
    </div>
  );
};

export default Index;
