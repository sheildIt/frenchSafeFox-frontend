import React, {useEffect, useState} from 'react'
import { useRedux } from '../../constants/reduxImports'
import useAxiosInstance from '../../auth/axios/axiosInstance'

const Employees = () => {
const {currentDepartmentList,currentToken} = useRedux()
const [clicked, isClicked] = useState()
const [selected, setSelected] = useState([])
const [dropdownVisible, setDropdownVisible] = useState(true);
const [employees, setEmployees] = useState([])
const axiosInstance = useAxiosInstance()


useEffect(()=>{
  fetchItemsFromAPI()
  document.querySelector('[data-dropdown-toggle="dropdown"]').click();
},[selected])


const handleDropdownToggle = () => {
  // Toggle dropdown visibility
  setDropdownVisible(!dropdownVisible);
};
console.log(selected)
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
  let apiEndpoint = `http://localhost:8000/company/employees_list/1/`;
    
    // Check if a department is selected
    if (selected.length > 0) {
      // Append the department query parameters to the API endpoint
      apiEndpoint += `?department=${selected.join('&department=')}`;
    }

    const response = await axiosInstance.get(apiEndpoint, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + String(currentToken)
      }
    });

  if(response.status === 200){
    setEmployees(response.data)
  }
};

  return (
    <div className='flex flex-col p-10'>
        <div className='flex flex-row p-2 relative'>
          <h2 className='text-white font-light text-2xl'>Employees list</h2>
          <div class="flex flex-col items-center justify-center absolute right-0">
            <button id="dropdownDefault" data-dropdown-toggle="dropdown"
            onClick={handleDropdownToggle}
              className='text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center'
              type="button">
              Filter by category
              <svg class="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
          <div id="dropdown" className={`z-10 ${dropdownVisible ? '' : 'hidden'} w-56 p-3 bg-white rounded-lg shadow dark:bg-gray-700 absolute right-0 top-12`}>
            <h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">
              Departments
            </h6>
            <ul class="space-y-2 text-sm" aria-labelledby="dropdownDefault">
          
              {currentDepartmentList.departments.map((department)=>{
                return <li key={department.id} class="flex items-center">
                <input id={department.department_name} onChange={() => handleDepartmentSelection(department)} type="checkbox" value=""
                  class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

                <label for="fitbit" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                  {department.department_name}
                </label>
              </li>
              })}
            </ul>
          </div>
          
          </div>
          
        </div>
        <div className='flex flex-col w-full mt-20'>
        <div className="flex flex-row mb-2 w-full">
      <div className="flex-1 text-white/50 opacity-0">Color</div>
        <div className="flex-1 text-white/50">First Name</div>
        <div className="flex-1 text-white/50">Last Name</div>
        <div className="flex-1 text-white/50">Email</div>
        <div className="flex-1 text-white/50">Department</div>
        <div className="flex-1 text-white/50">Incidents</div>
        <div className="flex-1 text-white/50">Created</div>
        <div className="flex-1 text-white/50">Action</div>
      </div>
      <hr></hr>
        <ul className='flex-1 w-full mt-2'>
            {employees?.map((employee)=>{
     
              
              return <li key={employee.id} className='flex flex-row'>
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
    </div>
  )



  
}

export default Employees
