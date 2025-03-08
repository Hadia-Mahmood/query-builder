
import React, { useState, useEffect } from 'react';

const FormQuestion = ({ 
  question, 
  options, 
  onChange, 
  value, 
  showTextbox = false, 
  isVisible = true, 
  textboxValue = "", 
  onTextboxChange = () => {},
  textboxLabel = "Please explain"
}) => {
  const [isRendered, setIsRendered] = useState(false);
  
  useEffect(() => {
    // Add a small delay for the animation to work properly
    const timer = setTimeout(() => {
      setIsRendered(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;
  
  return (
    <div className={`form-question w-full mb-8 ${isRendered ? 'entered' : 'entering'}`}>
      <div className="mb-2">
        <span className="text-xs font-medium text-roof-dark/70 tracking-wide uppercase">Question</span>
      </div>
      <h3 className="text-xl font-medium text-gray-900 mb-4">{question}</h3>
      
      <div className="relative">
        <select
          value={value || ""}
          onChange={onChange}
          className="dropdown-select w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-roof focus:border-transparent transition-all appearance-none"
        >
          <option value="" disabled>Select an option</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      
      {showTextbox && value === "Other" && (
        <div className="mt-4 animate-fade-in">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {textboxLabel}
          </label>
          <textarea
            value={textboxValue}
            onChange={onTextboxChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-roof focus:border-transparent transition-all resize-none"
            rows={3}
            placeholder="Please provide more details..."
          />
        </div>
      )}
    </div>
  );
};

export default FormQuestion;
