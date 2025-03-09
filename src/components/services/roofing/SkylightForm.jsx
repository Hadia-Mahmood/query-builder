
import React, { useState, useEffect } from 'react';
import FormQuestion from '../FormQuestion';

const SkylightForm = ({ onFormComplete, formData, setFormData }) => {
  const [projectType, setProjectType] = useState(formData.projectType || "");
  const [skylightCount, setSkylightCount] = useState(formData.skylightCount || "");
  const [skylightType, setSkylightType] = useState(formData.skylightType || "");
  const [skylightTypeOther, setSkylightTypeOther] = useState(formData.skylightTypeOther || "");
  const [roofType, setRoofType] = useState(formData.roofType || "");
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [formProgress, setFormProgress] = useState(0);
  
  // Form options
  const projectTypes = [
    "Install new skylights",
    "Replace existing skylights",
    "Repair skylights",
    "Maintain or service skylights"
  ];
  
  const skylightCountOptions = [
    "1",
    "2",
    "3",
    "4",
    "5 or more"
  ];
  
  const skylightTypeOptions = [
    "Fixed (non-opening)",
    "Vented (can be opened)",
    "Tubular",
    "Custom designed",
    "I'm not sure",
    "Other"
  ];
  
  const roofTypes = ["Sloped or pitched", "Flat", "I'm not sure"];

  // Determine which question to show
  const showQuestion = (questionNumber) => {
    return currentQuestion >= questionNumber;
  };

  // Calculate the form progress
  useEffect(() => {
    const totalQuestions = 4; // Maximum number of questions for skylights
    const progress = Math.min(((currentQuestion - 1) / totalQuestions) * 100, 100);
    setFormProgress(progress);
  }, [currentQuestion]);

  // Update parent component with form data
  useEffect(() => {
    const newFormData = {
      ...formData,
      projectType,
      skylightCount,
      skylightType,
      skylightTypeOther,
      roofType
    };
    setFormData(newFormData);
    
    // Check if form is complete
    if (roofType) {
      onFormComplete(newFormData);
    }
  }, [projectType, skylightCount, skylightType, skylightTypeOther, roofType]);

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
          question="What skylight project do you need help with?"
          options={projectTypes}
          value={projectType}
          onChange={(e) => {
            setProjectType(e.target.value);
            setCurrentQuestion(2);
          }}
          isVisible={showQuestion(1)}
        />

        {projectType && (
          <FormQuestion
            question="How many skylights do you need work on?"
            options={skylightCountOptions}
            value={skylightCount}
            onChange={(e) => {
              setSkylightCount(e.target.value);
              setCurrentQuestion(3);
            }}
            isVisible={showQuestion(2)}
          />
        )}

        {skylightCount && (
          <FormQuestion
            question="What type of skylights do you need?"
            options={skylightTypeOptions}
            value={skylightType}
            onChange={(e) => {
              setSkylightType(e.target.value);
              setCurrentQuestion(4);
            }}
            showTextbox={true}
            textboxValue={skylightTypeOther}
            onTextboxChange={(e) => setSkylightTypeOther(e.target.value)}
            isVisible={showQuestion(3)}
          />
        )}

        {skylightType && (
          <FormQuestion
            question="What type of roof do you have?"
            options={roofTypes}
            value={roofType}
            onChange={(e) => {
              setRoofType(e.target.value);
              setCurrentQuestion(5);
            }}
            isVisible={showQuestion(4)}
          />
        )}
      </div>
    </div>
  );
};

export default SkylightForm;
