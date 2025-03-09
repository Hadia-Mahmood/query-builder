
import React, { useState } from 'react';
import InstallRoofForm from './InstallRoofForm';
import RepairRoofForm from './RepairRoofForm';
import CleanRoofForm from './CleanRoofForm';
import SkylightForm from './SkylightForm';
import InspectRoofForm from './InspectRoofForm';
import OtherRoofForm from './OtherRoofForm';
import CarpenterForm from '../carpenter/CarpenterForm';

const RoofingFormController = ({ 
  projectType, 
  setProjectName, 
  setDescription, 
  setPrice,
  setTimeframe,
  location,
  handleLocationChange,
  userData,
  handleContactChange,
  projectName,
  description,
  price,
  timeframe
}) => {
  const [formData, setFormData] = useState({});
  const [isSpecificFormComplete, setIsSpecificFormComplete] = useState(false);

  const handleSpecificFormComplete = (data) => {
    setFormData(data);
    setIsSpecificFormComplete(true);
    
    // Set project name based on the roofing type
    if (!projectName) {
      let name = "Roofing Project - ";
      if (projectType === "Install or replace a roof") {
        name += "Installation";
      } else if (projectType === "Repair a roof") {
        name += "Repair";
      } else if (projectType === "Clean a roof") {
        name += "Cleaning";
      } else if (projectType === "Install, repair or maintain skylights") {
        name += "Skylights";
      } else if (projectType === "Inspect a roof") {
        name += "Inspection";
      } else {
        name += "Other";
      }
      setProjectName(name);
    }
    
    // Set description based on form data
    const descriptionText = generateDescription(data, projectType);
    setDescription(descriptionText);
  };

  const generateDescription = (data, projectType) => {
    let description = `Roofing project: ${projectType}. `;
    
    // Add specific details based on project type
    if (projectType === "Install or replace a roof") {
      description += `Roof type: ${data.roofType || 'Not specified'}. `;
      if (data.roofType === "Flat") {
        description += `Flat roof type: ${data.flatRoofType || 'Not specified'}. `;
        description += `Replaced roof type: ${data.replacedFlatRoofType || 'Not specified'}. `;
      } else if (data.roofType === "Sloped or pitched") {
        description += `Sloped roof type: ${data.slopedRoofType || 'Not specified'}. `;
        if (data.slopedRoofType === "Tile") {
          description += `Tile type: ${data.tileType || 'Not specified'}. `;
        } else if (data.slopedRoofType === "Rubber") {
          description += `Rubber type: ${data.rubberType || 'Not specified'}. `;
        } else if (data.slopedRoofType === "Shingle or shake") {
          description += `Shingle type: ${data.shingleType || 'Not specified'}. `;
          if (data.shingleType === "Wood") {
            description += `Wood type: ${data.woodType || 'Not specified'}. `;
          }
        }
        description += `Replaced roof type: ${data.replacedRoofType || 'Not specified'}. `;
      }
      description += `Leaking: ${data.isLeaking || 'Not specified'}. `;
      description += `Insurance claim: ${data.insuranceClaim || 'Not specified'}. `;
      description += `Square footage: ${data.squareFootage || 'Not specified'}. `;
      description += `Stories: ${data.stories || 'Not specified'}. `;
    } else if (projectType === "Repair a roof") {
      description += `Roof type: ${data.roofType || 'Not specified'}. `;
      description += `Problem: ${data.problemType || 'Not specified'}. `;
      description += `Emergency: ${data.emergencyRepair || 'Not specified'}. `;
      description += `Insurance claim: ${data.insuranceClaim || 'Not specified'}. `;
    }
    // Add more conditions for other project types as needed
    
    return description;
  };

  // Render appropriate form based on project type
  const renderSpecificForm = () => {
    switch (projectType) {
      case "Install or replace a roof":
        return (
          <InstallRoofForm 
            onFormComplete={handleSpecificFormComplete} 
            formData={formData} 
            setFormData={setFormData} 
          />
        );
      case "Repair a roof":
        return (
          <RepairRoofForm 
            onFormComplete={handleSpecificFormComplete} 
            formData={formData} 
            setFormData={setFormData} 
          />
        );
      case "Clean a roof":
        return (
          <CleanRoofForm 
            onFormComplete={handleSpecificFormComplete} 
            formData={formData} 
            setFormData={setFormData} 
          />
        );
      case "Install, repair or maintain skylights":
        return (
          <SkylightForm 
            onFormComplete={handleSpecificFormComplete} 
            formData={formData} 
            setFormData={setFormData} 
          />
        );
      case "Inspect a roof":
        return (
          <InspectRoofForm 
            onFormComplete={handleSpecificFormComplete} 
            formData={formData} 
            setFormData={setFormData} 
          />
        );
      case "Other":
        return (
          <OtherRoofForm 
            onFormComplete={handleSpecificFormComplete} 
            formData={formData} 
            setFormData={setFormData} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {!isSpecificFormComplete ? (
        renderSpecificForm()
      ) : (
        <CarpenterForm 
          projectName={projectName}
          setProjectName={setProjectName}
          description={description}
          setDescription={setDescription}
          price={price}
          setPrice={setPrice}
          timeframe={timeframe}
          setTimeframe={setTimeframe}
          location={location}
          handleLocationChange={handleLocationChange}
          userData={userData}
          handleContactChange={handleContactChange}
        />
      )}
    </div>
  );
};

export default RoofingFormController;
