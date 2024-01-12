import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Analytics from "./Analytics/Analytics";
import DepartmentList from "./Departments/DepartmentsList";
import TableEmails from "./TableView/TableEmails";
import useAxiosInstance from "../../auth/axios/axiosInstance";
import NewsComponent from "../../components/News/NewsComponent";
import { useRedux } from "../../constants/reduxImports";
import { logOut } from "../../auth/redux/companyReducer";
import { cleanOut } from "../../auth/redux/departmentsReducer";
import { config } from "../../constants/constants";

const CompanyPage = () => {
  const { dispatch, currentCompany, currentCompanyId, currentDepartmentList } =
    useRedux();
  const axiosInstance = useAxiosInstance();
  const BASE_URL = config.url.BASE_URL;

  const [liveEmails, setLiveEmails] = useState([]);

  const handleLogout = () => {
    dispatch(logOut());
    dispatch(cleanOut());
  };

  useEffect(() => {
    fetchLiveEmails();
  }, []);

  const fetchLiveEmails = async () => {
    try {
      let response = await axiosInstance(
        `${BASE_URL}/email_base/email_templates/${currentCompanyId}/?is_live=True`
      );
      if (response.status === 200) {
        setLiveEmails(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col p-10 mx-10">
      <div className="flex-1 h-28">
        <div className="flex flex-row text-justify">
          <h2 className="text-3xl flex flex-row  ml-2 font-normal">
            Home dashboard |
            <p className="text-lightPurple ml-2">{currentCompany}</p>
          </h2>
        </div>
      </div>
      <div className="flex flex-col xl:flex-row lg:flex-row mt-5 mb-5 gap-5">
        <div className="mt-11">
          <Analytics />
        </div>

        <div className="text-justify">
          <DepartmentList departments={currentDepartmentList.departments} />
        </div>

        <div className="text-justify">
          <NewsComponent />
        </div>
      </div>

      <div className="flex-1">
        <div className="flex flex-row relative">
          <p className="text-2xl font-bold text-justify">
            Live Emails{" "}
            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-600 opacity-80"></span>
          </p>
          <button className="absolute right-0 -top-2 bg-purpleBlue text-white hover:bg-slate-600 duration-200 cursor-pointer">
            Sort by Date
          </button>
        </div>
        <TableEmails emails={liveEmails} />
      </div>
    </div>
  );
};

export default CompanyPage;
