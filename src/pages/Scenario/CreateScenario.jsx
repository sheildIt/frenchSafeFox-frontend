import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosInstance from "../../auth/axios/axiosInstance";
import { useRedux } from "../../constants/reduxImports";

const CreateScenario = () => {
  const axiosInstance = useAxiosInstance();
  const { currentCompanyId, currentToken } = useRedux(); //companies id

  const navigate = useNavigate();
  const [name, setName] = useState();
  const [title, setTitle] = useState();
  const [poi, setPoi] = useState();
  const [emailPoi, setEmailPoi] = useState();
  const [scenario, setScenario] = useState();

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handlePoi = (e) => {
    setPoi(e.target.value);
  };

  const handleEmail = (e) => {
    setEmailPoi(e.target.value);
  };

  const handleScenario = (e) => {
    setScenario(e.target.value);
  };
  console.log("COMPANY", currentCompanyId);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: name,
      title: title,
      POI: poi,
      poi_email: emailPoi,
      company: currentCompanyId,
      scenario: scenario,
    };

    // Make an API call to create the object with formData
    // try {
    const response = await axiosInstance.post(
      "http://localhost:8000/company/create_scenario",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(currentToken),
        },
      }
    );

    if (response.status === 201) {
      // Handle success, e.g., redirect or show a success message
      console.log("Object created successfully");
      navigate("/scenarios");
    } else {
      console.log(response);
      // Handle error, e.g., show an error message
      console.error("Error creating object");
    }
    // } catch (error) {
    //   console.error('Error:', error);
    // }
  };

  return (
    <form
      className="flex flex-col p-2 items-center text-justify"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-row gap-2">
        <div className="mb-3">
          <input
            type="text"
            onChange={handleName}
            value={name}
            className="bg-creme border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-40"
            placeholder="Name"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            value={title}
            onChange={handleTitle}
            className="bg-creme border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-40"
            placeholder="Subjectline/Title"
            required
          />
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <div className="mb-3">
          <input
            type="text"
            value={poi}
            onChange={handlePoi}
            className="bg-creme border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-40"
            placeholder="POI"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            value={emailPoi}
            onChange={handleEmail}
            className="bg-creme border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-40"
            placeholder="Email of POI"
            required
          />
        </div>
      </div>
      <div className="flex mb-5">
        <textarea
          value={scenario}
          onChange={handleScenario}
          className="bg-creme border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-80 h-[140px]"
          placeholder="Write a scenario here.."
        ></textarea>
      </div>
      <button
        type="submit"
        className="text-white bg-purple-700 hover:bg-purple-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-2 py-1 text-center"
      >
        Create
      </button>
    </form>
  );
};

export default CreateScenario;
