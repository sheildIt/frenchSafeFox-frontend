import React,{useState, useEffect} from 'react'
import './ScenarioPage.css'
import { Link } from 'react-router-dom'

const ScenarioPage = () => {

  const [scenarios,setScenarios] = useState([])

  useEffect(()=>{
    getScenarios()
  },[])

  console.log(scenarios)
  const getScenarios = async()=>{
    try {
      let response = await fetch(`http://localhost:8000/company/get_scenarios/`)
      if(response.status===200){
        let data = await response.json()
        setScenarios(data)
      }
    } catch (error) {
      
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
        return <div className="flex flex-row mb-2">
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
