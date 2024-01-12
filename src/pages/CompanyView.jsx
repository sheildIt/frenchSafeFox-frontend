import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import StartPage from "./StartPage";
import { logOut } from "../auth/redux/authSlice";
import { useRedux } from "../constants/reduxImports";
import useAxiosInstance from "../auth/axios/axiosInstance";
import AuthModal from "../components/Modal/AuthModal";
import CompanyRegister from "../components/Modal/CompanyRegister";

const CompanyView = () => {
  const [companies, setCompanies] = useState([]);
  const {dispatch, currentToken} = useRedux()
  const navigate = useNavigate()
  const axiosInstance = useAxiosInstance()
  const [show, setShow] = useState(false);
  const [showComp, setShowComp] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState({company: null,
    departments: [],});
  
  useEffect(() => {
    getCompanies();
  }, []);

  const getCompanies = async () => {
    try {
      let response = await axiosInstance.get("http://localhost:8000/company/get/",{
        method:'GET',
        headers:{
          "Content-Type":"application/json",
          "Authorization": "Bearer " + String(currentToken)
        }
      });

      if (response.status === 200) {
        
        setCompanies(response.data);
      }
    } catch (error) {}
  };
  const getDepartments = () =>{
    try {
      
    } catch (error) {
      
    }
  }

  const handleLogout = () =>{
    dispatch(logOut());
    localStorage.removeItem("refreshToken");
    navigate('/login')
  }

  const openModal = async (company) => {
    setShow(true);
    setSelectedCompany(company);
    try {
      const departmentResponse = await axiosInstance.get(
        `http://localhost:8000/company/get_departments/${company.id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(currentToken),
          },
        }
      );
  
      if (departmentResponse.status === 200) {
        const departments = departmentResponse.data;
        
        setSelectedCompany({
          company: company,
          departments: departments,
        });
      }
    } catch (error) {
      // Handle error
      console.error('Error fetching departments:', error);
    }
  };

  const openCompanyRegModal = () =>{

    setShowComp(true)
  }



  return (
    <div className="flex-1 p-10">
      <p className="flex items-start">
        <svg xmlns="http://www.w3.org/2000/svg" onClick={handleLogout} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="text-red w-6 h-6 cursor-pointer">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
      </svg>
          </p>
      <div className="flex flex-col items-center justify-center p-10">
      <StartPage/>
<div className="flex flex-row p-10 border rounded-lg w-full">
  <div className="max-w-sm bg-gray-800 border border-gray-200 rounded-lg ml-3 w-36 h-40 shadow dark:bg-gray-800 dark:border-gray-700 hover:bg-sky-900 duration-300 cursor-pointer">
  <svg xmlns="http://www.w3.org/2000/svg" onClick={openCompanyRegModal} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 text-white mx-auto mt-14">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
</svg>

  </div>
<ul className="flex flex-row">
  {companies?.map((company) => {
    return  <div key={company.id} className="max-w-sm bg-gray-800 border border-gray-200 rounded-lg ml-3 w-36 h-40 shadow dark:bg-gray-800 dark:border-gray-700">
        {/* <a href="#">
            <img class="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
        </a> */}
        <div className="p-5">
            <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{company.company_name}</h5>
            </a>
            
            <Link onClick={() => openModal(company)} className="inline-flex items-center px-2 py-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                View
                 
            </Link>
        </div>
    </div>
    
  })}
</ul>
</div>
<AuthModal onClose={() => setShow(false)} showModal={show} company={selectedCompany} />
<CompanyRegister onClose={() => setShowComp(false)} showModal={showComp} />
</div>

    </div>
  );
};

export default CompanyView;
