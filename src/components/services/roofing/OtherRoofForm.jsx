
import React, { useState, useEffect } from 'react';
import FormQuestion from '../FormQuestion';

const OtherRoofForm = ({ onFormComplete, formData, setFormData }) => {
  const [projectDetails, setProjectDetails] = useState(formData.projectDetails || "");
  const [roofType, setRoofType] = useState(formData.roofType || "");
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [formProgress, setFormProgress] = useState(0);
  
  // Form options
  const roofTypes = ["Sloped or pitched", "Flat", "I'm not sure"];

  // Determine which question to show
  const showQuestion = (questionNumber) => {
    return currentQuestion >= questionNumber;
  };

  // Calculate the form progress
  useEffect(() => {
    const totalQuestions = 2; // Maximum number of questions for other
    const progress = Math.min(((currentQuestion - 1) / totalQuestions) * 100, 100);
    setFormProgress(progress);
  }, [currentQuestion]);

  // Update parent component with form data
  useEffect(() => {
    const newFormData = {
      ...formData,
      projectDetails,
      roofType
    };
    setFormData(newFormData);
    
    // Check if form is complete
    if (roofType) {
      onFormComplete(newFormData);
    }
  }, [projectDetails, roofType]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <div className="mb-6">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-500"
            style={{ width: `${formProgress}%` }}
          ></div>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          {Math.round(formProgress)}% complete
        </div>
      </div>

      <div className="space-y-6">
        <div className="w-full mb-8">
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 uppercase tracking-wide">
              Question
            </label>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Please describe your roofing project in detail
          </h3>
          
          <textarea
            value={projectDetails}
            onChange={(e) => {
              setProjectDetails(e.target.value);
              if (e.target.value.trim()) {
                setCurrentQuestion(2);
              }
            }}
            className="input input-bordered w-full mt-1 mb-2"
            rows={5}
            placeholder="Please provide details about your project..."
          />
        </div>

        {projectDetails && (
          <FormQuestion
            question="What type of roof do you have?"
            options={roofTypes}
            value={roofType}
            onChange={(e) => {
              setRoofType(e.target.value);
              setCurrentQuestion(3);
            }}
            isVisible={showQuestion(2)}
          />
        )}
      </div>
    </div>
  );
};

export default OtherRoofForm;
