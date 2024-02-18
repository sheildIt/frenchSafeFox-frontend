import React from "react";
import "./DepartmentsList.css";
// eslint-disable-next-line react/prop-types
const DepartmentsList = ({ departments }) => {
  console.log(departments);

  return (
    <div className="flex flex-col rounded-md shadow-2xl">
      <p className="text-xl xl:text-2xl font-bold text-white">
        Performance by departments
      </p>
      <div className="p-5 mt-5 bg-purpleBlue rounded-2xl w-[500px] h-72 xl:h-96 xl:w-[650px]">
        <div className="flex flex-row mb-2 font-semibold text-normal xl:text-2xl text-white">
          <div className="flex-1">Name</div>
          <div className="flex-1">Employees</div>
          <div className="flex-1">Incidents</div>
        </div>
        {/* eslint-disable-next-line react/prop-types */}
        {departments?.map((department) => {
          return (
            <div
              key={department.id}
              className="flex flex-row mb-2 text-white/50 text-normal xl:text-lg"
            >
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
