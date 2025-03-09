
import React, { useState, useEffect } from 'react';
import FormQuestion from '../FormQuestion';

const CleanRoofForm = ({ onFormComplete, formData, setFormData }) => {
  const [roofType, setRoofType] = useState(formData.roofType || "");
  const [cleaningReason, setCleaningReason] = useState(formData.cleaningReason || "");
  const [cleaningReasonOther, setCleaningReasonOther] = useState(formData.cleaningReasonOther || "");
  const [lastCleaning, setLastCleaning] = useState(formData.lastCleaning || "");
  const [squareFootage, setSquareFootage] = useState(formData.squareFootage || "");
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [formProgress, setFormProgress] = useState(0);
  
  // Form options
  const roofTypes = ["Sloped or pitched", "Flat", "I'm not sure"];
  
  const cleaningReasons = [
    "Moss or algae growth",
    "Debris removal",
    "Stains or discoloration",
    "Preparing for inspection or sale",
    "Regular maintenance",
    "Other"
  ];
  
  const lastCleaningOptions = [
    "Never been cleaned",
    "Within the last year",
    "1-3 years ago",
    "More than 3 years ago",
    "I'm not sure"
  ];
  
  const squareFootageOptions = [
    "Under 1000 sq ft",
    "1000-2000 sq ft",
    "2000-3000 sq ft",
    "Over 3000 sq ft",
    "I'm not sure"
  ];

  // Determine which question to show
  const showQuestion = (questionNumber) => {
    return currentQuestion >= questionNumber;
  };

  // Calculate the form progress
  useEffect(() => {
    const totalQuestions = 4; // Maximum number of questions for cleaning
    const progress = Math.min(((currentQuestion - 1) / totalQuestions) * 100, 100);
    setFormProgress(progress);
  }, [currentQuestion]);

  // Update parent component with form data
  useEffect(() => {
    const newFormData = {
      ...formData,
      roofType,
      cleaningReason,
      cleaningReasonOther,
      lastCleaning,
      squareFootage
    };
    setFormData(newFormData);
    
    // Check if form is complete
    if (squareFootage) {
      onFormComplete(newFormData);
    }
  }, [roofType, cleaningReason, cleaningReasonOther, lastCleaning, squareFootage]);

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
            question="Why do you need your roof cleaned?"
            options={cleaningReasons}
            value={cleaningReason}
            onChange={(e) => {
              setCleaningReason(e.target.value);
              setCurrentQuestion(3);
            }}
            showTextbox={true}
            textboxValue={cleaningReasonOther}
            onTextboxChange={(e) => setCleaningReasonOther(e.target.value)}
            isVisible={showQuestion(2)}
          />
        )}

        {cleaningReason && (
          <FormQuestion
            question="When was the last time your roof was professionally cleaned?"
            options={lastCleaningOptions}
            value={lastCleaning}
            onChange={(e) => {
              setLastCleaning(e.target.value);
              setCurrentQuestion(4);
            }}
            isVisible={showQuestion(3)}
          />
        )}

        {lastCleaning && (
          <FormQuestion
            question="What's the approximate square footage of your roof?"
            options={squareFootageOptions}
            value={squareFootage}
            onChange={(e) => {
              setSquareFootage(e.target.value);
              setCurrentQuestion(5);
            }}
            isVisible={showQuestion(4)}
          />
        )}
      </div>
    </div>
  );
};

export default CleanRoofForm;
