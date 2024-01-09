import React,{useState, useEffect} from 'react'
import { Link, useParams  } from 'react-router-dom'
import Analytics from './Analytics/Analytics'
import DepartmentList from './Departments/DepartmentsList'
import TableEmails from './TableView/TableEmails'
import useAxiosInstance from '../../auth/axios/axiosInstance'
import { useRedux } from '../../constants/reduxImports'
import { logOut } from '../../auth/redux/companyReducer'
import { cleanOut } from '../../auth/redux/departmentsReducer'
import { config } from '../../constants/constants'

const CompanyPage = () => {
    const { dispatch, currentToken, currentCompany, currentCompanyId, currentDepartmentList } = useRedux();
    const axiosInstance = useAxiosInstance()
    const BASE_URL = config.url.BASE_URL

    const [liveEmails, setLiveEmails] = useState([])

    const handleLogout = () =>{
      dispatch(logOut())
      dispatch(cleanOut())
    }

    useEffect(()=>{
      fetchLiveEmails()
    },[])

    const fetchLiveEmails = async()=>{
      try {
        let response = await axiosInstance(`${BASE_URL}/email_base/email_templates/${currentCompanyId}/?is_live=True`)
        if(response.status===200){
          setLiveEmails(response.data)
        }
      } catch (error) {
        
      }
    }

    return (
      <div className='flex flex-col p-10'>
          <div className='flex-1 mx-10 h-28'><div className='flex flex-row text-justify'>
            <Link onClick={handleLogout} to={'/'}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>
            </svg></Link>
            <h2 className='text-2xl ml-2'>How secure it is today in <p className='text-gradient'>{currentCompany}?</p></h2>
            </div></div>
          <div className='flex flex-row mt-8'>
          <div className="flex-1 mx-10"><Analytics/></div>
          <div className="flex-1 flex-col mx-10 text-justify"><p className='text-2xl font-extralight'>Performance by departments</p><DepartmentList departments={currentDepartmentList.departments}/></div>
          </div>
          <div className="flex-1 ml-14"><p className='text-2xl font-extralight text-justify'>Live Emails <span class="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-600 opacity-80"></span></p><TableEmails emails={liveEmails}/></div>
      </div>
  )
}

export default CompanyPage
