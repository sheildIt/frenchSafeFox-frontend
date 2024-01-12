import React from "react";
import "./DepartmentsList.css";
// eslint-disable-next-line react/prop-types
const DepartmentsList = ({ departments }) => {
  console.log(departments);

  return (
    <div className="flex flex-col rounded-md shadow-2xl">
      <p className="text-2xl font-bold text-white">
        Performance by departments
      </p>
      <div className="p-5 mt-5 bg-purpleBlue rounded-lg w-[450px] h-[250px] xl:h-[300px] xl:w-[600px]">
        <div className="flex flex-row mb-2">
          <div className="flex-1 text-xl text-white/50">Name</div>
          <div className="flex-1 text-white/50">Employees</div>
          <div className="flex-1 text-white/50">Incidents</div>
        </div>
        {/* eslint-disable-next-line react/prop-types */}
        {departments?.map((department) => {
          return (
            <div key={department.id} className="flex flex-row mb-2 text-white">
              <div className="flex-1">{department.department_name}</div>
              <div className="flex-1">{department.number_of_employees}</div>
              <div className="flex-1">tba</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DepartmentsList;
