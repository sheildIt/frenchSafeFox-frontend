import React from "react";
import "./DepartmentsList.css";
// eslint-disable-next-line react/prop-types
const DepartmentsList = ({ departments }) => {
  console.log(departments);

  return (
<<<<<<< HEAD
    <div>
      <div className="table">
      <div className="flex flex-row mb-2">
      {/* <div className="flex-1 text-white/50 opacity-0">Color</div> */}
        <div className="flex-1 text-white/50">Name</div>
        <div className="flex-1 text-white/50">Employees</div>
        <div className="flex-1 text-white/50">Incidents</div>
      </div>
      {departments?.map((department)=>{
        // const bgColorClass = `bg-${department.color}-400`;
        // console.log('Generated class:', bgColorClass);
        return <div className="flex flex-row mb-2">
        {/* <div className={`flex-none w-[40px] h-[40px] ${bgColorClass} rounded-md`}></div> */}
        <div className="flex-1 text-white">{department.department_name}</div>
        <div className="flex-1 text-white">tba</div>
        <div className="flex-1 text-white">tba</div>
=======
    <div className="flex flex-col rounded-md shadow-2xl">
      <p className="text-2xl font-bold text-white">
        Performance by departments
      </p>
      <div className="p-5 mt-5 bg-purpleBlue rounded-lg w-[450px] h-[250px] xl:h-[300px] xl:w-[600px]">
        <div className="flex flex-row mb-2 xl:text-xl text-white">
          <div className="flex-1">Name</div>
          <div className="flex-1">Employees</div>
          <div className="flex-1">Incidents</div>
        </div>
        {/* eslint-disable-next-line react/prop-types */}
        {departments?.map((department) => {
          return (
            <div
              key={department.id}
              className="flex flex-row mb-2 text-white/50"
            >
              <div className="flex-1">{department.department_name}</div>
              <div className="flex-1">{department.number_of_employees}</div>
              <div className="flex-1">tba</div>
            </div>
          );
        })}
>>>>>>> 60ec78bb27b7e1e09c40b05eca9c81668f18779b
      </div>
    </div>
  );
};

export default DepartmentsList;
