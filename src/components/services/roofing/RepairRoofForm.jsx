
import React, { useState, useEffect } from 'react';
import FormQuestion from '../FormQuestion';

const RepairRoofForm = ({ onFormComplete, formData, setFormData }) => {
  const [roofType, setRoofType] = useState(formData.roofType || "");
  const [problemType, setProblemType] = useState(formData.problemType || "");
  const [problemOther, setProblemOther] = useState(formData.problemOther || "");
  const [emergencyRepair, setEmergencyRepair] = useState(formData.emergencyRepair || "");
  const [insuranceClaim, setInsuranceClaim] = useState(formData.insuranceClaim || "");
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [formProgress, setFormProgress] = useState(0);
  
  // Form options
  const roofTypes = ["Sloped or pitched", "Flat", "I'm not sure"];
  
  const problemTypes = [
    "Leaking roof",
    "Missing shingles or tiles",
    "Storm damage",
    "Sagging roof",
    "Damaged flashing",
    "Other"
  ];
  
  const emergencyOptions = [
    "Yes, it's an emergency",
    "No, it's not urgent",
    "I'm not sure"
  ];
  
  const insuranceClaimOptions = [
    "Yes",
    "No",
    "I'm not sure"
  ];

  // Determine which question to show
  const showQuestion = (questionNumber) => {
    return currentQuestion >= questionNumber;
  };

  // Calculate the form progress
  useEffect(() => {
    const totalQuestions = 4; // Maximum number of questions for repair
    const progress = Math.min(((currentQuestion - 1) / totalQuestions) * 100, 100);
    setFormProgress(progress);
  }, [currentQuestion]);

  // Update parent component with form data
  useEffect(() => {
    const newFormData = {
      ...formData,
      roofType,
      problemType,
      problemOther,
      emergencyRepair,
      insuranceClaim
    };
    setFormData(newFormData);
    
    // Check if form is complete
    if (insuranceClaim) {
      onFormComplete(newFormData);
    }
  }, [roofType, problemType, problemOther, emergencyRepair, insuranceClaim]);

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
          question="What type of roof do you have?"
          options={roofTypes}
          value={roofType}
          onChange={(e) => {
            setRoofType(e.target.value);
            setCurrentQuestion(2);
          }}
          isVisible={showQuestion(1)}
        />

        {roofType && (
          <FormQuestion
            question="What problem are you having with your roof?"
            options={problemTypes}
            value={problemType}
            onChange={(e) => {
              setProblemType(e.target.value);
              setCurrentQuestion(3);
            }}
            showTextbox={true}
            textboxValue={problemOther}
            onTextboxChange={(e) => setProblemOther(e.target.value)}
            isVisible={showQuestion(2)}
          />
        )}

        {problemType && (
          <FormQuestion
            question="Is this an emergency repair?"
            options={emergencyOptions}
            value={emergencyRepair}
            onChange={(e) => {
              setEmergencyRepair(e.target.value);
              setCurrentQuestion(4);
            }}
            isVisible={showQuestion(3)}
          />
        )}

        {emergencyRepair && (
          <FormQuestion
            question="Are you filing an insurance claim for this project?"
            options={insuranceClaimOptions}
            value={insuranceClaim}
            onChange={(e) => {
              setInsuranceClaim(e.target.value);
              setCurrentQuestion(5);
            }}
            isVisible={showQuestion(4)}
          />
        )}
      </div>
    </div>
  );
};

export default RepairRoofForm;
