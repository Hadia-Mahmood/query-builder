
import React, { useState, useEffect } from 'react';
import FormQuestion from '../FormQuestion';

const InstallRoofForm = ({ onFormComplete, formData, setFormData }) => {
  // State for all questions
  const [roofType, setRoofType] = useState(formData.roofType || "");
  const [flatRoofType, setFlatRoofType] = useState(formData.flatRoofType || "");
  const [flatRoofOther, setFlatRoofOther] = useState(formData.flatRoofOther || "");
  const [replacedFlatRoofType, setReplacedFlatRoofType] = useState(formData.replacedFlatRoofType || "");
  const [replacedFlatRoofOther, setReplacedFlatRoofOther] = useState(formData.replacedFlatRoofOther || "");
  const [slopedRoofType, setSlopedRoofType] = useState(formData.slopedRoofType || "");
  const [slopedRoofOther, setSlopedRoofOther] = useState(formData.slopedRoofOther || "");
  const [tileType, setTileType] = useState(formData.tileType || "");
  const [tileOther, setTileOther] = useState(formData.tileOther || "");
  const [rubberType, setRubberType] = useState(formData.rubberType || "");
  const [rubberOther, setRubberOther] = useState(formData.rubberOther || "");
  const [shingleType, setShingleType] = useState(formData.shingleType || "");
  const [shingleOther, setShingleOther] = useState(formData.shingleOther || "");
  const [woodType, setWoodType] = useState(formData.woodType || "");
  const [replacedRoofType, setReplacedRoofType] = useState(formData.replacedRoofType || "");
  const [replacedRoofOther, setReplacedRoofOther] = useState(formData.replacedRoofOther || "");
  const [isLeaking, setIsLeaking] = useState(formData.isLeaking || "");
  const [insuranceClaim, setInsuranceClaim] = useState(formData.insuranceClaim || "");
  const [squareFootage, setSquareFootage] = useState(formData.squareFootage || "");
  const [stories, setStories] = useState(formData.stories || "");
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [formProgress, setFormProgress] = useState(0);
  
  // Form options
  const roofTypes = ["Sloped or pitched", "Flat"];
  
  const flatRoofTypes = [
    "I'm not sure",
    "PVC single-ply membrane",
    "TPO single-ply membrane",
    "Torch down modified bitumen",
    "EPDM rubber membrane",
    "Silicone spray",
    "Built-up tar and gravel",
    "Other"
  ];
  
  const slopedRoofTypes = [
    "Shingle or shake",
    "Tile",
    "Rubber",
    "Metal",
    "Slate",
    "Other"
  ];
  
  const tileTypes = [
    "Clay",
    "Concrete",
    "I'm not sure",
    "Other"
  ];
  
  const rubberTypes = [
    "EPDM rubber membrane",
    "Rubber shingles",
    "I'm not sure",
    "Other"
  ];
  
  const shingleTypes = [
    "Asphalt",
    "Composite",
    "Wood",
    "Rubber",
    "Other"
  ];
  
  const woodTypes = [
    "Shingle",
    "Shake",
    "Not sure"
  ];
  
  const roofReplacementTypes = [
    "Shingle or shake",
    "Tile",
    "Rubber",
    "Metal",
    "Slate",
    "I'm not sure",
    "No replacement, this is a new installation",
    "Other"
  ];
  
  const flatRoofReplacementTypes = [
    "I'm not sure",
    "PVC single-ply membrane",
    "TPO single-ply membrane",
    "Torch down modified bitumen",
    "EPDM rubber membrane",
    "Silicone spray",
    "Built-up tar and gravel",
    "Nothing, this is a new installation",
    "Other"
  ];
  
  const leakingOptions = [
    "Yes",
    "No",
    "I'm not sure"
  ];
  
  const insuranceClaimOptions = [
    "Yes",
    "No",
    "I'm not sure"
  ];
  
  const squareFootageOptions = [
    "Under 1000 sq ft",
    "1000-2000 sq ft",
    "2000-3000 sq ft",
    "Over 3000 sq ft",
    "I'm not sure"
  ];
  
  const storyOptions = [
    "One floor",
    "Two floors",
    "Three or more floors"
  ];

  // Determine which question to show
  const showQuestion = (questionNumber) => {
    return currentQuestion >= questionNumber;
  };

  // Calculate the form progress
  useEffect(() => {
    const totalQuestions = 9; // Maximum number of questions possible
    // Adjust progress based on current question
    const progress = Math.min(((currentQuestion - 1) / totalQuestions) * 100, 100);
    setFormProgress(progress);
  }, [currentQuestion]);

  // Update parent component with form data
  useEffect(() => {
    const newFormData = {
      ...formData,
      roofType,
      flatRoofType,
      flatRoofOther,
      replacedFlatRoofType,
      replacedFlatRoofOther,
      slopedRoofType,
      slopedRoofOther,
      tileType,
      tileOther,
      rubberType,
      rubberOther,
      shingleType,
      shingleOther,
      woodType,
      replacedRoofType,
      replacedRoofOther,
      isLeaking,
      insuranceClaim,
      squareFootage,
      stories
    };
    setFormData(newFormData);
    
    // Check if form is complete
    if (stories) {
      onFormComplete(newFormData);
    }
  }, [
    roofType, flatRoofType, flatRoofOther, replacedFlatRoofType, 
    replacedFlatRoofOther, slopedRoofType, slopedRoofOther, 
    tileType, tileOther, rubberType, rubberOther, 
    shingleType, shingleOther, woodType, replacedRoofType, 
    replacedRoofOther, isLeaking, insuranceClaim, 
    squareFootage, stories
  ]);

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
          question="Is your roof sloped or flat?"
          options={roofTypes}
          value={roofType}
          onChange={(e) => {
            setRoofType(e.target.value);
            if (e.target.value === "Flat") {
              setCurrentQuestion(2);
            } else if (e.target.value === "Sloped or pitched") {
              setCurrentQuestion(2);
            }
          }}
          isVisible={showQuestion(1)}
        />

        {roofType === "Flat" && (
          <FormQuestion
            question="What kind of flat roof do you want to install?"
            options={flatRoofTypes}
            value={flatRoofType}
            onChange={(e) => {
              setFlatRoofType(e.target.value);
              setCurrentQuestion(3);
            }}
            showTextbox={true}
            textboxValue={flatRoofOther}
            onTextboxChange={(e) => setFlatRoofOther(e.target.value)}
            isVisible={showQuestion(2)}
          />
        )}

        {roofType === "Flat" && flatRoofType && (
          <FormQuestion
            question="What kind of roof is being replaced?"
            options={flatRoofReplacementTypes}
            value={replacedFlatRoofType}
            onChange={(e) => {
              setReplacedFlatRoofType(e.target.value);
              if (e.target.value === "Nothing, this is a new installation") {
                setCurrentQuestion(6);
              } else {
                setCurrentQuestion(5);
              }
            }}
            showTextbox={true}
            textboxValue={replacedFlatRoofOther}
            onTextboxChange={(e) => setReplacedFlatRoofOther(e.target.value)}
            isVisible={showQuestion(3)}
          />
        )}

        {roofType === "Sloped or pitched" && (
          <FormQuestion
            question="What kind of roof do you want?"
            options={slopedRoofTypes}
            value={slopedRoofType}
            onChange={(e) => {
              setSlopedRoofType(e.target.value);
              if (e.target.value === "Shingle or shake") {
                setCurrentQuestion(3);
              } else if (e.target.value === "Tile" || e.target.value === "Rubber") {
                setCurrentQuestion(3);
              } else {
                setCurrentQuestion(4);
              }
            }}
            showTextbox={true}
            textboxValue={slopedRoofOther}
            onTextboxChange={(e) => setSlopedRoofOther(e.target.value)}
            isVisible={showQuestion(2)}
          />
        )}

        {slopedRoofType === "Tile" && (
          <FormQuestion
            question="What kind of tile roof do you want to install?"
            options={tileTypes}
            value={tileType}
            onChange={(e) => {
              setTileType(e.target.value);
              setCurrentQuestion(4);
            }}
            showTextbox={true}
            textboxValue={tileOther}
            onTextboxChange={(e) => setTileOther(e.target.value)}
            isVisible={showQuestion(3)}
          />
        )}

        {slopedRoofType === "Rubber" && (
          <FormQuestion
            question="What kind of rubber roof do you want to install?"
            options={rubberTypes}
            value={rubberType}
            onChange={(e) => {
              setRubberType(e.target.value);
              setCurrentQuestion(4);
            }}
            showTextbox={true}
            textboxValue={rubberOther}
            onTextboxChange={(e) => setRubberOther(e.target.value)}
            isVisible={showQuestion(3)}
          />
        )}

        {slopedRoofType === "Shingle or shake" && (
          <FormQuestion
            question="What kind of shingle roof do you want to install?"
            options={shingleTypes}
            value={shingleType}
            onChange={(e) => {
              setShingleType(e.target.value);
              if (e.target.value === "Wood") {
                // Don't advance the question yet
              } else {
                setCurrentQuestion(4);
              }
            }}
            showTextbox={true}
            textboxValue={shingleOther}
            onTextboxChange={(e) => setShingleOther(e.target.value)}
            isVisible={showQuestion(3)}
          />
        )}

        {shingleType === "Wood" && (
          <FormQuestion
            question="What type of wood?"
            options={woodTypes}
            value={woodType}
            onChange={(e) => {
              setWoodType(e.target.value);
              setCurrentQuestion(4);
            }}
            isVisible={true}
          />
        )}

        {((roofType === "Sloped or pitched" && (
          slopedRoofType === "Shingle or shake" && shingleType ||
          slopedRoofType === "Tile" && tileType ||
          slopedRoofType === "Rubber" && rubberType ||
          ["Metal", "Slate", "Other"].includes(slopedRoofType)
        ))) && (
          <FormQuestion
            question="What kind of roof is being replaced?"
            options={roofReplacementTypes}
            value={replacedRoofType}
            onChange={(e) => {
              setReplacedRoofType(e.target.value);
              if (e.target.value === "No replacement, this is a new installation") {
                setCurrentQuestion(6);
              } else {
                setCurrentQuestion(5);
              }
            }}
            showTextbox={true}
            textboxValue={replacedRoofOther}
            onTextboxChange={(e) => setReplacedRoofOther(e.target.value)}
            isVisible={showQuestion(4)}
          />
        )}

        {((roofType === "Flat" && replacedFlatRoofType && replacedFlatRoofType !== "Nothing, this is a new installation") ||
          (roofType === "Sloped or pitched" && replacedRoofType && replacedRoofType !== "No replacement, this is a new installation")) && (
          <FormQuestion
            question="Is the existing roof leaking or damaged?"
            options={leakingOptions}
            value={isLeaking}
            onChange={(e) => {
              setIsLeaking(e.target.value);
              setCurrentQuestion(6);
            }}
            isVisible={showQuestion(5)}
          />
        )}

        {(currentQuestion >= 6) && (
          <FormQuestion
            question="Are you filing an insurance claim for this project?"
            options={insuranceClaimOptions}
            value={insuranceClaim}
            onChange={(e) => {
              setInsuranceClaim(e.target.value);
              setCurrentQuestion(7);
            }}
            isVisible={showQuestion(6)}
          />
        )}

        {insuranceClaim && (
          <FormQuestion
            question="What's the approximate square footage of your home?"
            options={squareFootageOptions}
            value={squareFootage}
            onChange={(e) => {
              setSquareFootage(e.target.value);
              setCurrentQuestion(8);
            }}
            isVisible={showQuestion(7)}
          />
        )}

        {squareFootage && (
          <FormQuestion
            question="How many stories tall is your home?"
            options={storyOptions}
            value={stories}
            onChange={(e) => {
              setStories(e.target.value);
              setCurrentQuestion(9);
            }}
            isVisible={showQuestion(8)}
          />
        )}
      </div>
    </div>
  );
};

export default InstallRoofForm;
