/* eslint-disable react/prop-types */
import "./TableList.css";

const TableEmails = ({ emails }) => {
  console.log(emails);
  return (
    <div className="flex-1 bg-purpleBlue rounded-2xl shadow-2xl h-[150px] xl:h-[200px]">
      <div className="table">
        <div className="flex flex-row text-white p-2 ml-2 text-sm xl:text-base">
          <div className="flex-1">Theme</div>
          <div className="flex-1">Created</div>
          <div className="flex-1">Analytics</div>
          <div className="flex-1">Action</div>
        </div>
        {emails?.map((email, index) => {
          const isEvenRow = index % 2 === 0; // Check if the row is even
          const rowClassName = isEvenRow ? "bg-mainBlue" : "";
          return (
            <div
              key={email.id}
              className={`flex flex-row mb-2  ${rowClassName} rounded-2xl py-2 mx-3 text-white/50 text-sm xl:text-base`}
            >
              <div className="flex-1">{email.email_theme}</div>
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
