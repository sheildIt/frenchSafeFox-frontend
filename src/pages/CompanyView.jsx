import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import StartPage from "./StartPage";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../auth/redux/authSlice";


const CompanyView = () => {
  const [companies, setCompanies] = useState([]);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    getCompanies();
  }, []);

  const getCompanies = async () => {
    try {
      let response = await fetch("http://localhost:8000/company/get/");

      if (response.status === 200) {
        let data = await response.json();
        setCompanies(data);
      }
    } catch (error) {}
  };


  const handleLogout = () =>{
    dispatch(logOut());
    localStorage.removeItem("refreshToken");
    navigate('/login')
  }

  return (
    <div className="flex-1">
      <p className="flex items-start">
        <svg xmlns="http://www.w3.org/2000/svg" onClick={handleLogout} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="text-red w-6 h-6 cursor-pointer">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
      </svg>
</p>
      <div className="flex flex-col items-center justify-center p-10">

<StartPage/>
<p className="text-3xl font-light mb-5">Company view list</p>
<ul>
  {companies?.map((company) => {
    return  <div key={company.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        {/* <a href="#">
            <img class="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
        </a> */}
        <div className="p-5">
            <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{company.company_name}</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
            <Link to={`companyID/${company.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                View more
                 <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </Link>
        </div>
    </div>
    
  })}
</ul>
</div>
    </div>
  );
};

export default CompanyView;
