
import React from 'react';
import { USStates } from '../../../common/Constant';

const CarpenterForm = ({ 
  projectName, 
  setProjectName, 
  description, 
  setDescription, 
  price, 
  setPrice, 
  timeframe, 
  setTimeframe, 
  location, 
  handleLocationChange, 
  userData, 
  handleContactChange 
}) => {
  return (
    <>
      {/* Timeframe Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          What's the title of the project?
        </label>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Title"
          className="input input-bordered w-full mt-1 mb-2"
        />
        <label className="block text-sm font-medium text-gray-700">
          Write the project details
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder=""
          className="input input-bordered w-full mt-1 mb-2"
        />
        <label className="block text-sm font-medium text-gray-700">
          Your budget for this Project (Prices will be in USD)
        </label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Add Price Here"
          className="input input-bordered w-full mt-1 mb-2"
        />
        <label
          htmlFor="timeframe"
          className="block text-sm font-medium text-gray-700"
        >
          Great, when would you like to get this done?
        </label>
        <select
          id="timeframe"
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="select select-bordered w-full mt-1"
        >
          <option value="">Select timeframe</option>
          <option value="flexible">I am flexible</option>
          <option value="48hours">Within 48 hours</option>
          <option value="week">Within a week</option>
          <option value="month">Within a month</option>
          <option value="year">Within a year</option>
        </select>
      </div>

      {/* Location Fields */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          What's the location for the project?
        </label>

        <select
          value={location.state}
          onChange={(e) => {
            handleLocationChange(e);
          }}
          className="select select-bordered w-full mt-1"
          name="state"
        >
          <option value="" name="">
            Select State
          </option>
          {Object.keys(USStates)?.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={location.city}
          onChange={(e) => {
            handleLocationChange(e);
          }}
          className="select select-bordered w-full mt-1"
          name="city"
        >
          <option value="" name="">
            Select City
          </option>
          {USStates[location?.state]?.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="street"
          value={location.street}
          onChange={handleLocationChange}
          placeholder="Street Address"
          className="input input-bordered w-full mt-1 mb-2"
        />

        <input
          type="text"
          name="zipcode"
          value={location.zipcode}
          onChange={handleLocationChange}
          placeholder="Zipcode"
          className="input input-bordered w-full mt-1"
        />
      </div>

      {/* Contact Details */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Let's get acquainted
        </label>
        <input
          type="text"
          name="firstName"
          value={userData && userData[0] ? userData[0].firstName : ''}
          onChange={handleContactChange}
          placeholder="First Name"
          className="input input-bordered w-full mt-1 mb-2 capitalize"
          disabled={true}
        />
        <input
          type="text"
          name="lastName"
          value={userData && userData[0] ? userData[0].lastName : ''}
          onChange={handleContactChange}
          placeholder="Last Name"
          className="input input-bordered w-full mt-1 mb-2 capitalize"
          disabled={true}
        />
        <input
          type="text"
          name="phone"
          value={userData && userData[0] ? `+${userData[0].number}` : ''}
          onChange={handleContactChange}
          placeholder="Phone Number"
          className="input input-bordered w-full mt-1 mb-2 capitalize"
          disabled={true}
        />
        <input
          type="email"
          name="email"
          value={userData && userData[0] ? userData[0].email : ''}
          onChange={handleContactChange}
          placeholder="Email"
          className="input input-bordered w-full mt-1"
          disabled={true}
        />
      </div>
    </>
  );
};

export default CarpenterForm;
