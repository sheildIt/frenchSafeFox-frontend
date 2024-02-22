import React, { useState, useEffect } from "react";
import { useRedux } from "../../constants/reduxImports";
import useAxiosInstance from "../../auth/axios/axiosInstance";
import { config } from "../../constants/constants";
import { useNavigate } from "react-router-dom";

const GenerateEmail = () => {
  const {
    currentToken,
    currentDepartmentList,
    currentCompany,
    currentCompanyId,
  } = useRedux();
  const axiosInstance = useAxiosInstance();
  const BASE_URL = config.url.BASE_URL;
  const navigate = useNavigate();
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [loading, setLoading] = useState(false);
  const [emailTemplate, setEmailTemplate] = useState(null);
  const [emailBody, setEmailBody] = useState(null);
  const [emailTitle, setEmailTitle] = useState(null);
  const [scenario, setScenario] = useState({});
  const [url, setUrl] = useState();
  const [selectedScenario, setselectedScenario] = useState({});
  const [scenarioObjects, setScenarioObjects] = useState([]);
  const [selectedDepartemnt, setSelectedDepartmend] = useState();
  const [emailType, setEmailType] = useState();
  const [selectedDepartments, setSelectedDepartments] = useState([]);

  const allSelection = {
    name: "All departments",
  };

  useEffect(() => {
    getScenarios();
  }, []);
  console.log(currentDepartmentList);
  const handleTemplate = (e) => {
    setEmailTemplate(e.target.value);
  };

  const handleUrl = (e) => {
    setUrl(e.target.value);
  };

  const handleEmailType = (e) => {
    setEmailType(e.target.value);
  };
  console.log(emailType);
  const handleScenario = (e) => {
    setScenario(e.target.value);
    setselectedScenario(JSON.parse(e.target.value));
  };

  const handleDepartment = (e) => {
    const selected = JSON.parse(e.target.value);
    setSelectedDepartmend(selected); // Store the selected department object

    if (selected.name === "All departments") {
      // If 'All' is selected, set the department state to all department IDs
      const allDepartments = currentDepartmentList.departments.map(
        (dept) => dept
      );
      setSelectedDepartments(allDepartments);
    } else {
      // Otherwise, set the department state to the selected department object
      setSelectedDepartments([selected]);
    }
  };

  const getScenarios = async () => {
    try {
      let response = await axiosInstance.get(
        `${BASE_URL}/email_base/get_scenarios/${currentCompanyId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(currentToken),
          },
        }
      );
      if (response.status === 200) {
        setScenarioObjects(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const promtp_request = async () => {
    setLoading(true);
    //const linkPlaceholder = "[Insert Link Here]";
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Write me an email without subjectline for ${selectedDepartemnt.department_name} department in ${currentCompany} company based on the following rules:
            
              1. Insert this link: ${url} in a subtle way dont use any paranthesis.
              2. Signing off from email use ${selectedScenario.POI}
              3. After every 3rd sentance create an empty row space between next 3 sentances.
              4. When finishing off write that in new line with at least 4 empty rows between last sentance and the signoff.  
            
            The email theme is: ${selectedScenario.scenario}. The email should be written in a ${emailType} style.  
              `,
          },
        ],
        max_tokens: 500,
      }),
    };
    try {
      let response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        options
      );
      if (response.status === 200) {
        console.log(response);
        const data = await response.json();

        setEmailBody(data.choices[0].message.content);
        setEmailTitle(selectedScenario.title);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const createEmail = async () => {
    const data = {
      template_type: emailTemplate,
      email_type: emailType,
      friendly_url: url,
      scenario: selectedScenario.id,
      email_theme: selectedScenario.name,
      scheduled: false,
      email_sents: 0,
      company: currentCompanyId,
      email_elements: [
        {
          email_subjectline: emailTitle,
          email_text: emailBody,
          // Add other fields as needed
        },
        // Add more email elements as needed
      ],
    };

    let response = await axiosInstance.post(
      `${BASE_URL}/email_base/email_templates/${currentCompanyId}/`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(currentToken),
        },
      }
    );
    if (response.status === 201) {
      await createElements(response.data.id);
    } else {
      console.log("error");
      setLoading(false);
    }
  };

  const createElements = async (document_id) => {
    const data = {
      email_subjectline: emailTitle,
      email_text: emailBody,
    };
    //try {
    let response = await axiosInstance.post(
      `${BASE_URL}/email_base/email_elements/${document_id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(currentToken),
        },
      }
    );
    if (response.status === 201) {
      setLoading(false);
      navigate("/emailDrafts");
    } else {
      console.log("error");
      setLoading(false);
    }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <div className="flex flex-col mx-10">
      <div className="flex-1 p-5 relative">
        <button
          className="flex-1 px-2 py-1 bg-green-700/50 absolute right-20"
          onClick={createEmail}
        >
          Create
        </button>
      </div>
      <div className="flex flex-row p-5 ml-5 relative">
        <div className="flex-none border w-[40%] h-[100%] absolute top-10 rounded-lg">
          <div className="flex flex-col gap-5">
            <select
              onChange={handleTemplate}
              value={emailTemplate}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
              placeholder="Choose Template Type"
              required
            >
              <option value="choose">Choose Template Type</option>
              <option value="Type1">Standard Email</option>
              <option value="Type2">Phishing Email</option>
            </select>
            <select
              onChange={handleEmailType}
              value={emailType}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
              placeholder="Choose Template Type"
              required
            >
              <option value="choose">Choose Email Type</option>
              <option value="PROMOTIONAL">Promotional Email</option>
              <option value="COLD">Cold Email</option>
              <option value="OTHER">Other</option>
            </select>
            <select
              onChange={handleScenario}
              value={scenario}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
              placeholder="Choose Template Type"
              required
            >
              <option value="">Choose Scenario</option>
              {scenarioObjects?.map((scenario) => {
                return (
                  <option key={scenario.id} value={JSON.stringify(scenario)}>
                    {scenario.name}
                  </option>
                );
              })}
            </select>
            <input
              onChange={handleUrl}
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
              placeholder="Insert a target link.."
            />
            <h3>Select who will get this email below</h3>
            <div className="flex flex-col">
              <div className="flex-1 items-center">
                <select
                  onChange={handleDepartment}
                  value={JSON.stringify(selectedDepartemnt)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
                  placeholder="Choose Template Type"
                  required
                >
                  <option value={JSON.stringify(allSelection)}>All</option>
                  {currentDepartmentList.map((department) => {
                    return (
                      <option
                        key={department.id}
                        value={JSON.stringify(department)}
                      >
                        {department.progress.department.department_name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <button
              className="bg-green-500 text-white"
              onClick={promtp_request}
            >
              {!loading ? <p>Generate</p> : <p>Processing..</p>}
            </button>
          </div>
        </div>

        <div className="flex text-white flex-col gap-10 w-[550px] h-[590px] rounded-md p-10 absolute right-20 top-10">
          <h2 className="text-xl text-white font-semibold text-justify">
            {emailTitle}
          </h2>
          <p>{emailBody}</p>
        </div>
      </div>
    </div>
  );
};

export default GenerateEmail;
