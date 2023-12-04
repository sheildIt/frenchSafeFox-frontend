import React from 'react'
import './DepartmentsList.css'
const DepartmentsList = () => {
  return (
    <div>
      <div className="table">
      <div className="flex flex-row mb-2">
        <div className="flex-1 text-white/50">Name</div>
        <div className="flex-1 text-white/50">Employees</div>
        <div className="flex-1 text-white/50">Incidents</div>
      </div>
      <div className="flex flex-row mb-2">
        <div className="flex-1">Marketing</div>
        <div className="flex-1">10</div>
        <div className="flex-1">2</div>
      </div>
      <div className="flex flex-row mb-2">
        <div className="flex-1">Finance</div>
        <div className="flex-1">3</div>
        <div className="flex-1">0</div>
      </div>
      
    </div>
    </div>
  )
}

export default DepartmentsList
