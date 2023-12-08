import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useRedux } from "../../constants/reduxImports";
import { setCompanyCredentials } from "../../auth/redux/companyReducer";
import useAxiosInstance from "../../auth/axios/axiosInstance";

const CompanyRegister = ({showModal,onClose}) => {
    const [companyName, setCompanyName] = useState('');
    const [departmentName, setDepartmentName] = useState([]);
    const [show, setShow] = useState(showModal);
    const {currentToken} = useRedux()
    const axiosInstance = useAxiosInstance()
    // Add more state variables for other fields...
  
    // Function to handle changes in the company name field
    const handleName = (e) => {
      setCompanyName(e.target.value);
    };
  
    // Function to handle changes in the department name field
    const handleDepartments = (e) => {
      setDepartmentName(e.target.value);
    };

    const handleClose = () =>{
        onClose()
        setShow(false)
    }

    const handleShow = () => {
        setShow(true);
      };

      useEffect(() => {
        if (showModal) {
          handleShow();
        }
      }, [showModal]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Create your form data object
        const formData = {
          company_name: companyName,
          departments_list: departmentName,
          // Add other fields...
        };
    
        try {
          // Make your API call to submit the form data
          const response = await axiosInstance.post('http://localhost:8000/company/register',
          formData, 
          {
            headers: {
              'Content-Type': 'application/json',
              "Authorization": "Bearer " + String(currentToken)
            },
          });
    
          // Handle the response as needed
          if (response.status===201) {
            console.log('Form submitted successfully');
            setShow(false)
          } else {
            console.error('Form submission failed');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

  return (
    <>
    {show ? (
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-[30%] my-6 mx-auto">
              
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="absolute right-2 top-2">
                  <svg xmlns="http://www.w3.org/2000/svg" onClick={handleClose} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-black hover:bg-gray-300 duration-200 cursor-pointer">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
              </div>
              {/*header*/}
              <div className="flex flex-row gap-5 p-5 border-b border-solid rounded-t">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-black w-8 h-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>

                <h3 className="text-3xl font-semibold text-black">
                  New company
                </h3>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
              <form class="flex flex-col w-[100%]" onSubmit={handleSubmit}>
            <div className='flex flex-row gap-5'>
            <div class="mb-5">
                <input type="text"
                onChange={handleName} value={companyName} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5" placeholder="Company name.." required/>
            </div>
            <div class="mb-5">
                <input type="text" value={departmentName}
                onChange={handleDepartments} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5" placeholder="Departments, separate it with comma.." required/>
            </div>
            </div>
           
            
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create</button>
        </form>
               
              </div>
              {/*footer*/}
              <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                
                <button
                  className="bg-gray-900 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit"
                
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    ) : null}
  </>
  )
}

export default CompanyRegister
