import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRedux } from "../../constants/reduxImports";
import { useNavigate } from "react-router-dom";
import { setCompanyCredentials } from "../../auth/redux/companyReducer";
import { setDepartments } from "../../auth/redux/departmentsReducer";
import useAxiosInstance from "../../auth/axios/axiosInstance";
import { config } from "../../constants/constants";

const AuthModal = ({ showModal, onClose, company }) => {
  const params = useParams();
  const BASE_URL = config.url.BASE_URL;
  const axiosInstance = useAxiosInstance();
  const { dispatch } = useRedux();
  const [show, setShow] = useState(showModal);
  const navigate = useNavigate();
  const [code, setCode] = useState();
  const [sent, setSent] = useState(false);

  const handleCode = (e) => {
    setCode(e.target.value);
  };

  const handleClose = (e) => {
    onClose();
    setShow(false);
    setSent(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {}, []);

  useEffect(() => {
    if (showModal) {
      handleShow();
    }
  }, [showModal]);

  const handleAuthentication = async () => {
    try {
      // Check if the code is provided
      if (!code) {
        console.log("Please enter the authentication code.");
        return;
      }

      // Perform a request to validate the entered code
      const data = {
        auth_code: code,
      };

      let response = await axiosInstance.post(
        `${BASE_URL}/auth/validate-auth-code/`, // Replace with your endpoint for code validation
        data
      );

      // Check the response status
      if (response.status === 200) {
        // Authentication successful
        console.log("Authentication successful");

        dispatch(setCompanyCredentials({ ...company.company }));
        dispatch(setDepartments({ ...company.departments }));
        navigate(`/home`);
        setShow(false);

        // Close the authentication modal
        handleClose();
      } else {
        // Authentication failed
        console.log("Authentication failed");

        // Here, you can handle the failed authentication as needed
        // For example, display an error message to the user
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendAuthCode = async () => {
    try {
      const data = {
        user_email: "benarmys4@gmail.com",
      };
      let response = await axiosInstance.post(
        `${BASE_URL}/auth/generate-auth-code/`,
        data
      );

      if (response.status === 200) {
        setSent(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {show ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="absolute right-2 top-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={handleClose}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-black hover:bg-gray-300 duration-200 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                {/*header*/}
                <div className="flex flex-row gap-5 p-5 border-b border-solid rounded-t">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="text-black w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>

                  <h3 className="text-3xl font-semibold text-black">
                    Authentication
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-black text-lg leading-relaxed">
                    {!sent
                      ? "Authentication required press Send to get the code"
                      : "Authentication code sent"}
                  </p>
                  {!sent ? (
                    <div></div>
                  ) : (
                    <input
                      onChange={handleCode}
                      type="text"
                      id="first_name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 required"
                    />
                  )}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                  {!sent ? (
                    <button
                      className="bg-gray-900 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={sendAuthCode}
                    >
                      Get code
                    </button>
                  ) : (
                    <button
                      className="bg-gray-900 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={handleAuthentication}
                    >
                      Authenticate
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default AuthModal;
