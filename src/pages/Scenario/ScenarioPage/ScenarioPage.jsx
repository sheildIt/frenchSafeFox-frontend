import React,{useState, useEffect} from 'react'
import './ScenarioPage.css'
import { Link } from 'react-router-dom'
import { useRedux } from '../../../constants/reduxImports'
import useAxiosInstance from '../../../auth/axios/axiosInstance'

const ScenarioPage = () => {
  const {currentCompanyId, currentToken} = useRedux()
  const [scenarios,setScenarios] = useState([])
  const axiosInstance = useAxiosInstance()
  useEffect(()=>{
    getScenarios()
  },[])

  console.log(scenarios)
  const getScenarios = async()=>{
    try {
      let response = await axiosInstance.get(`http://localhost:8000/company/get_scenarios/${currentCompanyId}`,{
        headers:{
          "Content-Type":"application/json",
          Authorization:"Bearer "+String(currentToken)
        }
      })
      if(response.status===200){
        
        setScenarios(response?.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex p-10 border h-[100%] rounded-md ml-5 relative'>
        <div className='flex flex-row border w-[70%] rounded-md'>
        <div className="table">
      <div className="flex flex-row mb-2">
        <div className="flex-1 text-white/50">Name</div>
        <div className="flex-1 text-white/50">Subjectline</div>
        <div className="flex-1 text-white/50">Created</div>
      </div>
      
      {scenarios?.map((scenario)=>{
        return <div className="flex flex-row mb-2 text-white">
        <div className="flex-1">{scenario.name}</div>
        <div className="flex-1">{scenario.title}</div>
        <div className="flex-1">{scenario.created_at}</div>
      </div>
      })}
      
    </div>
    
        </div>
        <div className='absolute right-32 top-20'>
        <Link to={'/create_scenario/'} className='bg-sky-600 p-4 rounded-md text-white'>New Scenario</Link>
        </div>
    </div>
  )
}

export default ScenarioPage
