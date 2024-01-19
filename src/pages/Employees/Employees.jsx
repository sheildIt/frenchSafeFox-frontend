import { useEffect, useState } from "react";
import { useRedux } from "../../constants/reduxImports";
import useAxiosInstance from "../../auth/axios/axiosInstance";
import { config } from "../../constants/constants";

const Employees = () => {
  const { currentDepartmentList, currentToken, currentCompanyId } = useRedux();

  const [selected, setSelected] = useState([]);
  const [openContact, setOpenContact] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [employees, setEmployees] = useState([]);

  const [employee, setEmployee] = useState();
  const axiosInstance = useAxiosInstance();
  const BASE_URL = config.url.BASE_URL;

  useEffect(() => {
    fetchItemsFromAPI();
  }, [selected]);

  const handleDropdownToggle = () => {
    // Toggle dropdown visibility
    setDropdownVisible(!dropdownVisible);
  };

  const handleDepartmentSelection = (department) => {
    // Check if the department is already selected
    if (selected.includes(department.id)) {
      // If selected, remove it from the list
      setSelected((prevSelected) =>
        prevSelected.filter((selected) => selected !== department.id)
      );
    } else {
      // If not selected, add it to the list
      setSelected((prevSelected) => [...prevSelected, department.id]);
    }
  };

  const fetchItemsFromAPI = async () => {
    // Use the selected department value to filter items
    let apiEndpoint = `http://localhost:8000/company/employees_list/${currentCompanyId}/`;

    // Check if a department is selected
    if (selected.length > 0) {
      // Append the department query parameters to the API endpoint
      apiEndpoint += `?department=${selected.join("&department=")}`;
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

  const toggleEmployeeDrawer = (id) => {
    getEmployee(id);
    setOpenContact(true);
  };

  const closeContactDrawer = () => {
    setOpenContact(false);
  };

  const getEmployee = async (employee_id) => {
    try {
      let response = await axiosInstance.get(
        `${BASE_URL}/company/api/employees/${currentCompanyId}/${employee_id}/`
      );
      if (response.status === 200) {
        setEmployee(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col p-10 mx-10">
      <div className="flex-1">
        <div className="flex flex-row p-2 relative">
          <h2 className="text-white font-normal text-3xl">Employees list</h2>
          <div className="flex flex-row items-center bg-purpleBlue rounded-lg absolute right-0 shadow-2xl w-[28%]">
            <input
              className="bg-mainBlue rounded-lg p-1.5 ml-0.5 w-[50%]"
              placeholder="Search by name.."
            />
            <button
              id="dropdownDefault"
              data-dropdown-toggle="dropdown"
              onClick={handleDropdownToggle}
              className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
              type="button"
            >
              Filter by category
              <svg
                className="w-4 h-4 ml-2"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>

            <div
              id="dropdown"
              className={`z-10 ${
                dropdownVisible ? "" : "hidden"
              } w-56 p-3 bg-white rounded-lg shadow dark:bg-gray-700 absolute right-0 top-12`}
            >
              <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                Departments
              </h6>
              <ul
                className="space-y-2 text-sm"
                aria-labelledby="dropdownDefault"
              >
                {currentDepartmentList.departments.map((department) => {
                  return (
                    <li key={department.id} className="flex items-center">
                      <input
                        id={department.department_name}
                        onChange={() => handleDepartmentSelection(department)}
                        type="checkbox"
                        value=""
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />

                      <label
                        htmlFor="fitbit"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        {department.department_name}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        <div
          className={`mainContainer transition-width overflow-none ${
            openContact ? "w-[70%]" : "w-full"
          }`}
        >
          <div className="flex flex-col w-full mt-10 p-5 bg-purpleBlue rounded-xl h-[400px] shadow-2xl">
            <div className="flex flex-row mb-2 w-full">
              <div className="flex-1 text-white/50">#ID</div>
              <div className="flex-1 text-white/50">First Name</div>

              <div className="flex-1 text-white/50">Email</div>
              {!openContact && (
                <div className="flex-1 text-white/50">Department</div>
              )}
              <div className="flex-1 text-white/50">Incidents</div>
              <div className="flex-1 text-white/50">Created</div>
              {!openContact && (
                <div className="flex-1 text-white/50">Action</div>
              )}
            </div>

            <ul className="flex-1 w-full mt-2">
              {employees?.map((employee, index) => {
                const isEvenRow = index % 2 === 0; // Check if the row is even
                const rowClassName = isEvenRow ? "bg-mainBlue" : "";
                return (
                  <li
                    key={employee.id}
                    className={`flex flex-row ${rowClassName} rounded-lg py-2`}
                  >
                    <div className={`flex-1 text-normal`}>{employee.id}</div>
                    <div className="flex-1 text-normal">
                      {employee.first_name}
                    </div>

                    <div className="flex-1 text-normal">
                      {employee.email_address}
                    </div>
                    {!openContact && (
                      <div className="flex-1 text-normal">
                        {employee.department.department_name}
                      </div>
                    )}
                    <div className="flex-1 text-normal">
                      {employee.incidents}
                    </div>
                    <div className="flex-1 text-normal">
                      {employee.date_created}
                    </div>
                    {!openContact && (
                      <div className="flex-1 text-normal">
                        <div className="ml-[45%]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            onClick={() => toggleEmployeeDrawer(employee.id)}
                            className="w-6 h-6 text-lightPurple hover:bg-white duration-200 cursor-pointer rounded-lg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div
          className={`absolute top-[130px] right-0 h-[526px] w-[340px] xl:h-[648px] xl:w-[440px] shadow-2xl bg-purpleBlue rounded-2xl transition-transform transform ${
            openContact
              ? "xl:-translate-x-22 -translate-x-20"
              : "translate-x-full"
          }`}
        >
          <div className="flex flex-col p-4 relative items-center">
            <button
              className="bg-mainBlue hover:bg-gray-700 duration-300 text-white px-2 py-1 rounded-full absolute right-3 top-3"
              onClick={closeContactDrawer}
            >
              X
            </button>
            <p className="text-white text-xl mb-2">Employee view</p>

            <div className="flex flex-col items-center gap-2 p-4 w-full mx-5 h-[150px] rounded-lg">
              <div className="flex flex-col gap-3 relative">
                <img
                  className="w-24 h-24 mb-3 rounded-full shadow-lg"
                  src="/images/user.jpg"
                  alt="Bonnie image"
                />
              </div>
              <div className="flex flex-row items-center w-full relative">
                <h5 className="text-normal xl:text-xl font-normal text-white/50 dark:text-white">
                  #ID
                </h5>
                <span className="text-normal xl:text-xl text-white dark:text-gray-400 absolute right-0">
                  {employee?.id}
                </span>
              </div>
              <div className="flex flex-row items-center w-full relative">
                <h5 className="text-normal xl:text-xl font-normal text-white/50 dark:text-white">
                  First name
                </h5>
                <span className="text-normal xl:text-xl text-white dark:text-gray-400 absolute right-0">
                  {employee?.first_name}
                </span>
              </div>
              <div className="flex flex-row items-center w-full relative">
                <h5 className="text-normal xl:text-xl font-normal text-white/50 dark:text-white">
                  Last name
                </h5>
                <span className="text-normal xl:text-xl text-white dark:text-gray-400 absolute right-0">
                  {employee?.last_name}
                </span>
              </div>
              <div className="flex flex-row items-center w-full relative">
                <h5 className="text-normal xl:text-xl font-normal text-white/50 dark:text-white">
                  Department
                </h5>
                <span className="text-normal xl:text-xl text-white dark:text-gray-400 absolute right-0">
                  {employee?.department.department_name}
                </span>
              </div>
              {/* <button
                // onClick={updateContact}
                className="bg-darkBlue hover:bg-gray-700 duration-300 px-2 py-1 mt-2 text-white rounded-lg"
              >
                Update
              </button> */}
            </div>
          </div>
        </div>
      </div>
<<<<<<< HEAD
      <hr></hr>
        <ul className='flex-1 w-full mt-2'>
            {employees?.map((employee)=>{
     
              
              return <li key={employee.id} className='flex flex-row text-white'>
                <div className={`flex-none text-normal bg-${employee?.department.color}-400 w-[40px] h-[40px] rounded-md mb-2`}></div>
          <div className='flex-1 text-normal ml-32'>{employee.first_name}</div>
          <div className='flex-1 text-normal'>{employee.last_name}</div>
          <div className='flex-1 text-normal'>{employee.email_address}</div>
          <div className='flex-1 text-normal'>{employee.department.department_name}</div>
          <div className='flex-1 text-normal'>{employee.incidents}</div>
          <div className='flex-1 text-normal'>{employee.date_created}</div>
          <div className='flex-1 text-normal'>Action Button</div>
              </li>
            })}
            
          </ul>
        </div>
=======
>>>>>>> 60ec78bb27b7e1e09c40b05eca9c81668f18779b
    </div>
  );
};

export default Employees;
