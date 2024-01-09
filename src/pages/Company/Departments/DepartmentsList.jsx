import React from 'react'
import './DepartmentsList.css'
const DepartmentsList = ({departments}) => {


  return (
    <div>
      <div className="table">
      <div className="flex flex-row mb-2">
      <div className="flex-1 text-white/50 opacity-0">Color</div>
        <div className="flex-1 text-white/50">Name</div>
        <div className="flex-1 text-white/50">Employees</div>
        <div className="flex-1 text-white/50">Incidents</div>
      </div>
      {departments?.map((department)=>{
        const bgColorClass = `bg-${department.color}-400`;
        console.log('Generated class:', bgColorClass);
        return <div key={department.id} className="flex flex-row mb-2">
        <div className={`flex-none w-[40px] h-[40px] ${bgColorClass} rounded-md`}></div>
        <div className="flex-1 ml-28">{department.department_name}</div>
        <div className="flex-1">{department.number_of_employees}</div>
        <div className="flex-1">tba</div>
      </div>
      })}

      
    </div>
    </div>
  )
}

export default DepartmentsList
