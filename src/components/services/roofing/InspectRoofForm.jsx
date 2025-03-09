
import React, { useState, useEffect } from 'react';
import FormQuestion from '../FormQuestion';

const InspectRoofForm = ({ onFormComplete, formData, setFormData }) => {
  const [inspectionReason, setInspectionReason] = useState(formData.inspectionReason || "");
  const [inspectionReasonOther, setInspectionReasonOther] = useState(formData.inspectionReasonOther || "");
  const [roofAge, setRoofAge] = useState(formData.roofAge || "");
  const [roofType, setRoofType] = useState(formData.roofType || "");
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [formProgress, setFormProgress] = useState(0);
  
  // Form options
  const inspectionReasons = [
    "Regular maintenance",
    "Suspected damage or leak",
    "Pre-purchase inspection",
    "Insurance requirement",
    "Warranty validation",
    "Other"
  ];
  
  const roofAgeOptions = [
    "Less than 5 years",
    "5-10 years",
    "10-20 years",
    "More than 20 years",
    "I'm not sure"
  ];
  
  const roofTypes = ["Sloped or pitched", "Flat", "I'm not sure"];

  // Determine which question to show
  const showQuestion = (questionNumber) => {
    return currentQuestion >= questionNumber;
  };

  // Calculate the form progress
  useEffect(() => {
    const totalQuestions = 3; // Maximum number of questions for inspection
    const progress = Math.min(((currentQuestion - 1) / totalQuestions) * 100, 100);
    setFormProgress(progress);
  }, [currentQuestion]);

  // Update parent component with form data
  useEffect(() => {
    const newFormData = {
      ...formData,
      inspectionReason,
      inspectionReasonOther,
      roofAge,
      roofType
    };
    setFormData(newFormData);
    
    // Check if form is complete
    if (roofType) {
      onFormComplete(newFormData);
    }
  }, [inspectionReason, inspectionReasonOther, roofAge, roofType]);

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
        <FormQuestion
          question="Why do you need a roof inspection?"
          options={inspectionReasons}
          value={inspectionReason}
          onChange={(e) => {
            setInspectionReason(e.target.value);
            setCurrentQuestion(2);
          }}
          showTextbox={true}
          textboxValue={inspectionReasonOther}
          onTextboxChange={(e) => setInspectionReasonOther(e.target.value)}
          isVisible={showQuestion(1)}
        />

        {inspectionReason && (
          <FormQuestion
            question="How old is your roof?"
            options={roofAgeOptions}
            value={roofAge}
            onChange={(e) => {
              setRoofAge(e.target.value);
              setCurrentQuestion(3);
            }}
            isVisible={showQuestion(2)}
          />
        )}

        {roofAge && (
          <FormQuestion
            question="What type of roof do you have?"
            options={roofTypes}
            value={roofType}
            onChange={(e) => {
              setRoofType(e.target.value);
              setCurrentQuestion(4);
            }}
            isVisible={showQuestion(3)}
          />
        )}
      </div>
    </div>
  );
};

export default InspectRoofForm;
