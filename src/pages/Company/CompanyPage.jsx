import { useState, useEffect } from "react";
import Analytics from "./Analytics/Analytics";
import DepartmentList from "./Departments/DepartmentsList";
import TableEmails from "./TableView/TableEmails";
import useAxiosInstance from "../../auth/axios/axiosInstance";
import NewsComponent from "../../components/News/NewsComponent";
import { useRedux } from "../../constants/reduxImports";
import { config } from "../../constants/constants";
import { setAnalyticsData } from "../../auth/redux/analyticsReducer";

const CompanyPage = () => {
  const {
    currentCompany,
    currentCompanyId,
    currentDepartmentList,
    currentAnalyticsData,
    dispatch,
  } = useRedux();
  const axiosInstance = useAxiosInstance();
  const BASE_URL = config.url.BASE_URL;
  const [currentPage, setCurrentPage] = useState(1);
  const [liveEmails, setLiveEmails] = useState([]);
  const [analyticsData, setAnaData] = useState({
    total_emails_sent: null,
    total_reported_emails: null,
    total_employes: null,
  });

  const itemsPerPage = 3;
  const totalPages = Math.ceil(liveEmails?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = liveEmails?.slice(startIndex, endIndex);

  useEffect(() => {
    fetchLiveEmails();
    if (currentAnalyticsData.stored === false) {
      fetchAnalytics();
    }
  }, []);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const fetchAnalytics = async () => {
    try {
      let response = await axiosInstance.get(
        `${BASE_URL}/company/analytics_metrics/${currentCompanyId}`
      );
      if (response.status === 200) {
        setAnaData(response.data);
        console.log(response.data);
        dispatch(
          setAnalyticsData({
            total_email_sents: response.data.total_emails_sent,
            total_reported_email: response.data.total_reported_email,
            total_employees: response.data.total_employees,
            stored: true,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    <div className="flex flex-col p-10">
      <div className="flex-1 h-28">
        <div className="flex flex-row text-justify relative">
          <h2 className="text-2xl xl:text-3xl text-white flex flex-row font-semibold">
            Home dashboard |
            <p className="text-lightPurple ml-2">{currentCompany}</p>
          </h2>
          <div className="flex flex-row gap-2 absolute right-0">
            <span className="text-sm text-white/50">Last refreshed:</span>
            <div className="flex flex-row bg-purpleBlue text-creme text-lg p-2 rounded-lg shadow-xl hover:bg-purple-600 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
                onClick={fetchAnalytics}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col xl:flex-row lg:flex-row mt-5 mb-5 gap-5">
        <div className="mt-11">
          <Analytics analytics={currentAnalyticsData} />
        </div>

        <div className="text-justify">
          <DepartmentList departments={currentDepartmentList.departments} />
        </div>

        <div className="text-justify">
          <NewsComponent viewType={"Overview"} />
        </div>
      </div>

      <div className="flex-1">
        <div className="flex flex-row relative">
          <p className="text-xl xl:text-2xl text-white font-bold text-justify">
            Live Emails{" "}
            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-600 opacity-80"></span>
          </p>
          {totalPages > 1 && (
            <div className="absolute right-36 -top-2">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    type="button"
                    className="px-3 py-2 bg-purpleBlue ml-2 hover:bg-purple-600 duration-200 rounded-lg text-white"
                    data-mdb-ripple-color="dark"
                    key={page}
                    id="paginationBtn"
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
          )}
          <button className="absolute right-0 -top-2 text-sm xl:text-base bg-purpleBlue text-creme hover:bg-purple-600 duration-200 cursor-pointer shadow-xl">
            Sort by Date
          </button>
        </div>
        <TableEmails emails={displayedItems} />
      </div>
    </div>
  );
};

export default CompanyPage;
