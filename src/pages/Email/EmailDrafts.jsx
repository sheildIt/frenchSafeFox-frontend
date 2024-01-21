import { useEffect, useState } from "react";
import useAxiosInstance from "../../auth/axios/axiosInstance";
import { useRedux } from "../../constants/reduxImports";
import { config } from "../../constants/constants";
import DraftModal from "../../components/Modal/DraftModal";

const EmailDrafts = () => {
  const BASE_URL = config.url.BASE_URL;
  const axiosInstance = useAxiosInstance();
  const { currentToken, currentCompanyId, currentCompany } = useRedux();
  const [emailDrafts, setEmailDrafts] = useState([]);
  const [selectedDraft, setSelectedDraft] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getDrafts();
  }, []);

  const getDrafts = async () => {
    let response = await axiosInstance.get(
      `${BASE_URL}/email_base/email_templates/${currentCompanyId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(currentToken),
        },
      }
    );

    if (response.status === 200) {
      setEmailDrafts(response.data);
    } else {
      console.log("error");
    }
  };

  const handleSendButtonClick = (draft) => {
    setSelectedDraft(draft);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setSelectedDraft(null);
    setShowModal(false);
  };

  const truncateText = (text, limit) => {
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };

  return (
    <div className="flex flex-col p-10 mx-10">
      <div className="flex flex-row relative">
        <div className="flex-1 h-28">
          <div className="flex flex-row text-justify relative">
            <h2 className="text-3xl flex flex-row ml-2 font-normal">
              Email documents |
              <p className="text-lightPurple ml-2">{currentCompany}</p>
            </h2>
          </div>
        </div>
        <div className="bg-purpleBlue flex flex-row gap-5 w-[10%] p-2 py-2 justify-center items-center rounded-lg shadow-xl absolute right-0 top-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 hover:bg-purple-500 duration-200 cursor-pointer rounded-lg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
            />
          </svg>
          <div className="border-r-2 border-purple-800 h-6"></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 hover:bg-purple-500 duration-200 cursor-pointer rounded-lg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
            />
          </svg>
        </div>
        <div className="bg-purpleBlue flex flex-row w-[10%] p-2 py-2 justify-center items-center shadow-xl absolute right-[12%] top-2 hover:bg-purple-500 duration-200 cursor-pointer rounded-lg">
          Filter by Date
        </div>
      </div>
      <div className="flex flex-row mt-2">
        <div className="flex-none h-[100%] w-[100%] bg-purpleBlue p-5 rounded-lg shadow-xl overflow-auto">
          <ul className="flex flex-wrap gap-4">
            {emailDrafts?.map((email) => {
              return (
                <li
                  key={email.id}
                  className="group w-[18%] h-[40%] bg-creme rounded-xl relative shadow-xl"
                >
                  <div className="flex flex-col p-2">
                    <div className="flex flex-row relative">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4 h-4 text-black"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                        />
                      </svg>

                      <p className="text-black font-sans text-start text-small ml-2">
                        {truncateText(email.email_subjectline, 15)}
                      </p>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-black/50 absolute right-0 hover:bg-white rounded-full hover:cursor-pointer duration-200"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                        />
                      </svg>
                    </div>
                    <div
                      onClick={() => handleSendButtonClick(email)}
                      className="bg-white text-white flex-none rounded-lg h-[140px] w-[195px] xl:h-[220px] xl:w-[258px] mt-2 text-xs xl:text-sm p-5 hover:cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1"
                        stroke="currentColor"
                        className="w-12 h-15 xl:w-20 xl:h-20 text-purple-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="text-black/50 font-bold text-start text-xs ml-2">
                    Created • {email.created_at}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <DraftModal
        confirmLeave={handleModalClose}
        showModal={showModal}
        email_obj={selectedDraft}
      />
    </div>
  );
};

export default EmailDrafts;
