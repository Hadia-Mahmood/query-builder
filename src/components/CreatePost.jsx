
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import {
  useCreateProjectMutation,
  useGetServicesQuery,
} from "../api/ProjectApi/projectEndpoint";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import CarpenterForm from "./services/carpenter/CarpenterForm";
import RoofingFormController from "./services/roofing/RoofingFormController";
import FormQuestion from "./services/FormQuestion";

const CreatePost = () => {
  const navigate = useNavigate();
  const [serviceName, setServiceName] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [projectName, setProjectName] = useState("");
  const [location, setLocation] = useState({
    street: "",
    city: "",
    state: "",
    zipcode: "",
  });
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  const [completed, setCompleted] = useState(false);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [roofingType, setRoofingType] = useState("");

  // Roofing project type options
  const roofingProjectTypes = [
    "Install or replace a roof",
    "Repair a roof",
    "Clean a roof",
    "Install, repair or maintain skylights",
    "Inspect a roof",
    "Other"
  ];

  const userData = useSelector((state) => state?.general?.userData);
  const service = useSelector((state) => state?.general?.service);

  const { data: services, isLoading } = useGetServicesQuery({});
  const [createProject] = useCreateProjectMutation();

  useEffect(() => {
    if (service) {
      setServiceId(service);
      const filterService = services?.filter((item) => item._id === service);
      setServiceName(filterService?.[0]?.name);
    }
  }, [service, services]);

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setLocation((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const onChangeService = (data) => {
    setServiceId(data?._id);
    setServiceName(data?.name);
    setRoofingType(""); // Reset roofing type when service changes
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = {
      serviceId,
      title: projectName,
      timeframe,
      location,
      price,
      description,
    };
    createProject(postData).then((res) => {
      if (res?.data) {
        navigate("/dashboard");
        toast.success("Project Created Successfully!");
      } else {
        toast.error("Error!");
      }
    });
    console.log("Form Submitted:", postData);
  };

  const handleRoofingTypeChange = (e) => {
    setRoofingType(e.target.value);
  };

  return (
    <>
      <Header />
      {completed ? (
        <div className="grid justify-center text-center">
          <div className="w-full max-w-md">
            <h1>Login</h1>
            <p className="text-lg">
              Select an option below to view your project.
            </p>

            <div className="mt-5">
              <label className="font-semibold">youremail321@gmail.com</label>
            </div>

            <br />
            <Link to="/signin">
              <button className="btn btn-lg bg-yellow">Login via Email</button>
            </Link>
            <div className="mt-4">
              <label className="font-bold">OR</label>
              <br />
            </div>
            <div className="mt-5 mb-4">
              <label className="font-semibold">(878) 458-8989</label>
            </div>
            <button className="btn btn-lg bg-yellow">Login via SMS</button>
            <hr className="mt-5 mb-5" />
            <label>Need Help?</label>
            <p className="text-blue-500 mt-2 cursor-pointer">
              homeowner@barnesnest.com
            </p>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Create Project
            </h2>
            <form onSubmit={handleSubmit}>
              {/* Service Dropdown */}
              <div className="mb-4">
                <label
                  htmlFor="service"
                  className="block text-sm font-medium text-gray-700"
                >
                  Service:
                </label>
                <select
                  id="service"
                  value={serviceId}
                  onChange={(e) => {
                    const selectedService = services.find(
                      (service) => service._id === e.target.value
                    );
                    onChangeService(selectedService);
                  }}
                  className="select select-bordered w-full mt-1"
                >
                  <option value="" name="">
                    Select a Service
                  </option>
                  {services?.map((item, index) => (
                    <option key={index} value={item._id}>
                      {item?.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Roofing Type Selection */}
              {serviceName === "Roofing" && (
                <div className="mb-4">
                  <FormQuestion
                    question="What kind of roofing project do you need help with?"
                    options={roofingProjectTypes}
                    value={roofingType}
                    onChange={handleRoofingTypeChange}
                    isVisible={true}
                  />
                </div>
              )}

              {/* Service-specific Forms */}
              {serviceName === "Carpenter" && (
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

              {/* Roofing Forms based on selected type */}
              {serviceName === "Roofing" && roofingType && (
                <RoofingFormController
                  projectType={roofingType}
                  setProjectName={setProjectName}
                  setDescription={setDescription}
                  setPrice={setPrice}
                  setTimeframe={setTimeframe}
                  location={location}
                  handleLocationChange={handleLocationChange}
                  userData={userData}
                  handleContactChange={handleContactChange}
                  projectName={projectName}
                  description={description}
                  price={price}
                  timeframe={timeframe}
                />
              )}

              {/* Submit Button (only show for completed forms) */}
              {((serviceName === "Carpenter") ||
                (serviceName === "Roofing" && roofingType)) && (
                <div>
                  <button
                    type="submit"
                    className="btn btn-success w-full mt-4 text-white"
                  >
                    Post
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePost;
