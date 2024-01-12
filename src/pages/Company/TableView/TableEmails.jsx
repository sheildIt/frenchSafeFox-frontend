import React from "react";
import "./TableList.css";
const TableEmails = ({ emails }) => {
  return (
    <div className="flex-none bg-purpleBlue rounded-lg shadow-lg h-[150px]">
      <div className="table">
        <div className="flex flex-row mb-3 text-white/50 p-2 border-b border-lightPurple/20 mr-2 ml-2">
          <div className="flex-1">Theme</div>
          <div className="flex-1">Created</div>
          <div className="flex-1">Analytics</div>
          <div className="flex-1">Action</div>
        </div>
        {emails.map((email) => {
          return (
            <div
              key={email.id}
              className="flex flex-row mb-2 text-white/75 mr-2 ml-2"
            >
              <div className="flex-1">{email.email_subjectline}</div>
              <div className="flex-1">{email.created_at}</div>
              <div className="flex-1">TBA</div>
              <div className="flex-1">TBA</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TableEmails;
