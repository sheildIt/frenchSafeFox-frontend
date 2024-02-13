import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useAxiosInstance from "../../auth/axios/axiosInstance";
import { config } from "../../constants/constants";

const DraftModal = ({ confirmLeave, showModal, email_obj }) => {
  const handleClose = () => {
    confirmLeave();
  };
  const axiosInstance = useAxiosInstance();
  const BASE_URL = config.url.BASE_URL;

  const [emailObj, setEmailObj] = useState({
    email_text: "",
    email_subjectline: "",
  });
  useEffect(() => {
    if (email_obj?.id) {
      getElementsBody();
    }
  }, [email_obj]);

  useEffect(() => {}, [emailObj]);

  const getElementsBody = async () => {
    let response = await axiosInstance.get(
      `${BASE_URL}/email_base/email_elements/${email_obj?.id}`
    );
    if (response.status === 200) {
      setEmailObj(response.data[0]);
    }
  };
  console.log(emailObj);
  return (
    <div
      className={`fixed inset-0 ${
        showModal ? "block" : "hidden"
      } overflow-y-auto`}
    >
      <div className="flex items-center justify-center h-screen">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="flex flex-col relative bg-white p-8 w-[600px] h-[615px] mx-auto rounded-md">
          <div className="absolute top-0 right-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              onClick={handleClose}
              stroke="currentColor"
              className="w-8 h-8 text-black hover:bg-creme cursor-pointer duration-200 rounded-md"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
          <div className="flex flex-row">
            <div
              className={`flex flex-col w-[400px] h-[550px] text-black font-semibold bg-creme shadow-lg p-5 rounded-md overflow-y-auto`}
            >
              {emailObj ? emailObj.email_text : "Loading..."}
            </div>
            <div className="flex flex-col gap-2 bg-darkBlue rounded-md ml-4 p-2">
              <Link
                className="bg-creme text-grayLight"
                to={`/edit/${email_obj?.id}`}
              >
                Open Editor
              </Link>
              <Link
                to={`/send_email?uuid=${email_obj?.id}&subject=${emailObj?.email_text}&message=${emailObj?.email_text}`}
                className="bg-creme text-grayLight px-2 py-1 rounded-lg"
              >
                Send
              </Link>
              <button className="bg-creme text-grayLight">Schedule</button>
            </div>
          </div>
          {/* <div className="mt-6">
            <button
              className="bg-gray-800 hover:bg-green-400 text-white font-bold py-2 px-4 border border-blue-700 rounded"
              onClick={handleClose}
            >
              Close
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default DraftModal;
