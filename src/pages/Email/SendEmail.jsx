/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useRedux } from "../../constants/reduxImports";
import EmployeeCard from "../../components/EmployeeCard/EmployeeCard";
import { config } from "../../constants/constants";
import useAxiosInstance from "../../auth/axios/axiosInstance";
import { useNavigate, useLocation } from "react-router-dom";
import "../../../node_modules/flowbite/dist/datepicker";

const SendEmail = () => {
  const BASE_URL = config.url.BASE_URL;
  const axiosInstance = useAxiosInstance();
  const { currentDepartmentList, currentCompanyId, currentToken } = useRedux();
  const location = useLocation();
  const { search } = location;
  const params = new URLSearchParams(search);
  const subject = params.get("subject");
  const message = params.get("message");
  const uuid = params.get("uuid");
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [sendOption, setSendOption] = useState("");

  const [dateValue, setDateValue] = useState();
  const [timeValue, setTimeValue] = useState();
  const [selectedDep, setSelectedDep] = useState();
  const recipientList = employees.map((employee) => employee.email_address);
  const fetchItemsFromAPI = async (dep_id) => {
    // Use the selected department value to filter items
    let apiEndpoint = `${BASE_URL}/company/employees_list/${currentCompanyId}/`;

    // Check if a department is selected
    if (dep_id) {
      // Append the department query parameters to the API endpoint
      apiEndpoint += `?department=${dep_id}`;
    }

    const response = await axiosInstance.get(apiEndpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(currentToken),
      },
    });

    if (response.status === 200) {
      setEmployees(response.data);
    }
  };

  const handleSelectedDepartment = (e) => {
    const selectedValue = e.target.value;
    try {
      // Attempt to parse the value as JSON
      const selected = JSON.parse(selectedValue);

      // Check if the parsed value is an object
      if (selected && typeof selected === "object") {
        setSelectedDep(selected);
        fetchItemsFromAPI(selected.id);
      } else {
        // Handle the case where the value is not a valid JSON object
        console.error("Invalid JSON format:", selectedValue);
        setEmployees([]);
        // Optionally, you can set an error state or show a message to the user
      }
    } catch (error) {
      // Handle the case where JSON parsing fails
      console.error("Error parsing JSON:", error);
      setEmployees([]);
      // Optionally, you can set an error state or show a message to the user
    }
  };

  const sendEmail = async () => {
    try {
      // Check if a department is selected
      if (!selectedDep) {
        console.error("Please choose a department.");
        // Optionally, you can set an error state or show a message to the user
        return;
      }
      const recipientList = employees.map((employee) => employee.email_address);

      // Make a POST request to the Django API endpoint
      const response = await axiosInstance.post(
        `${BASE_URL}/email_base/send_email/${uuid}`,
        {
          subject: subject, // Replace with your subject
          message: message, // Replace with your message
          recipient_list: recipientList,
          company: currentCompanyId,

          // Replace with the actual recipient email
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentToken}`,
          },
        }
      );

      // Handle the response from the server
      if (response.status === 200) {
        console.log("Emails sent!");
        navigate("/home");
        // Optionally, you can show a success message to the user
      } else {
        console.error("Error sending email:", response.data);
        // Optionally, you can set an error state or show an error message to the user
      }
    } catch (error) {
      console.error("Error sending email:", error);
      // Optionally, you can set an error state or show an error message to the user
    }
  };

  const scheduleEmail = async () => {
    // try {
    // Check if a department is selected
    if (!selectedDep) {
      console.error("Please choose a department.");
      // Optionally, you can set an error state or show a message to the user
      return;
    }
    const merge_time_values = dateValue + " " + timeValue;
    // Make a POST request to the Django API endpoint
    console.log(merge_time_values);
    const response = await axiosInstance.post(
      `${BASE_URL}/email_base/schedule_email/${uuid}`,
      {
        subject: subject, // Replace with your subject
        message: message, // Replace with your message
        recipient_list: recipientList,
        company: currentCompanyId,
        scheduled_time: merge_time_values,

        // Replace with the actual recipient email
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentToken}`,
        },
      }
    );
    console.log(response);
    // Handle the response from the server
    if (response.status === 200) {
      console.log("Emails sent!");
      navigate("/home");
      // Optionally, you can show a success message to the user
    } else {
      console.error("Error sending email:", response.data);
      // Optionally, you can set an error state or show an error message to the user
    }
    // } catch (error) {
    //   console.error("Error sending email:", error);
    //   // Optionally, you can set an error state or show an error message to the user
    // }
  };

  const handleSendOption = (e) => {
    setSendOption(e.target.value);
  };
  const handleDate = (e) => {
    setDateValue(e.target.value);
  };

  const handleTimeChange = (event) => {
    const newTimeValue = event.target.value;
    setTimeValue(newTimeValue);
    // You can perform additional actions or validations here
  };

  console.log(dateValue, timeValue);
  return (
    <div className="flex flex-col p-5 mx-10 h-screen">
      <div className="flex flex-row relative p-5">
        <h2 className="text-justify text-2xl">Send email</h2>
      </div>
      <div className="flex flex-row p-5">
        <div className="bg-white w-[30%] h-[120%] rounded-2xl flex flex-col p-5 relative">
          <p className="text-xl text-black font-normal p-2">
            Send configuration
          </p>
          <div className="relative">
            <select
              onChange={handleSelectedDepartment}
              className="w-full rounded-md h-10 mt-2 bg-creme text-grayLight text-sm font-normal pl-3 pr-8 cursor-pointer"
            >
              {/* Add your select options here */}
              <option value="option1">Choose department list</option>
              {currentDepartmentList.departments.map((department) => {
                return (
                  <option
                    key={department.id}
                    value={JSON.stringify(department)}
                  >
                    {department.department_name}
                  </option>
                );
              })}
            </select>
          </div>
          <p className="txt-normal text-black font-normal text-justify p-2 mt-2">
            Recipients: ({selectedDep?.number_of_employees ?? 0})
          </p>
          <div className="flex-none flex-row h-32 p-2">
            <ul className="inline-flex text-black">
              {employees?.map((employee_obj) => {
                return (
                  <EmployeeCard key={employee_obj.id} employee={employee_obj}>
                    {employee_obj}
                  </EmployeeCard>
                );
              })}
            </ul>
          </div>
          <div className="relative">
            <select
              onChange={handleSendOption}
              className="w-full rounded-md h-10 mt-2 bg-creme text-grayLight text-sm font-normal pl-3 pr-8 cursor-pointer"
            >
              {/* Add your select options here */}
              <option value="option1">Choose send option</option>
              <option value={"Send now"}>Send</option>
              <option value={"Schedule"}>Schedule</option>
            </select>
          </div>
          {sendOption === "Schedule" ? (
            <div className="flex flex-col bg-creme rounded-md w-full h-[130px] mt-2">
              <div className="flex flex-row p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-grayLight"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                  />
                </svg>
                <div className="flex flex-col ml-2">
                  <div className="relative max-w-sm">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"></div>
                    <input
                      onChange={handleDate}
                      type="date"
                      className="bg-gray-500 border border-gray-300 text-sm text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Select date"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-row p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-grayLight"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <div className="flex flex-col ml-2">
                  <input
                    className="bg-gray-500 rounded-lg duration-300"
                    type="time"
                    id="timeInput"
                    name="timeInput"
                    value={timeValue}
                    onChange={handleTimeChange}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
          {sendOption === "Schedule" ? (
            <button
              onClick={scheduleEmail}
              className="w-26 absolute bottom-4 bg-green-600"
            >
              Schedule
            </button>
          ) : (
            <button
              onClick={sendEmail}
              className="w-20 absolute bottom-4 bg-green-600"
            >
              Send
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SendEmail;
