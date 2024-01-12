import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useRedux } from "../../constants/reduxImports";
import {useNavigate} from "react-router-dom"
import { setCompanyCredentials } from "../../auth/redux/companyReducer";
import { setDepartments } from "../../auth/redux/departmentsReducer";
import { setTemplates } from "../../auth/redux/templateReducer";
import useAxiosInstance from "../../auth/axios/axiosInstance";
import { config } from "../../constants/constants";

const AuthModal = ({showModal, onClose,company}) => {
    const params = useParams();
    const BASE_URL = config.url.BASE_URL
    const axiosInstance = useAxiosInstance()
    const {dispatch} = useRedux()
    const [show, setShow] = useState(showModal);
    const navigate = useNavigate()
    const [code, setCode] = useState()
    

    const handleCode = (e)=>{
        setCode(e.target.value)
    }

  const handleClose = (e) => {
    onClose();
    setShow(false);
  };

 
  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {
    if (showModal) {
      handleShow();
    }
  }, [showModal]);

  const handleAuthentication = () => {
    // Your authentication logic
    if(code==='test123'){

        dispatch(setCompanyCredentials({...company.company}))
        dispatch(setDepartments({...company.departments}))
        navigate(`/home`);
        setShow(false)
    }
  
  };

  const templateAPI = async()=>{
    let response = await axiosInstance.get(`${BASE_URL}/company/`)
  }

  return (
    <>
      {show ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                
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
                    Authentication
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-black text-lg leading-relaxed">
                    Authentication required, check your email for code
                  </p>
                  <input onChange={handleCode} type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 required"/>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                  
                  <button
                    className="bg-gray-900 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleAuthentication}
                  >
                    Authenticate
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

export default AuthModal
