import React from 'react'
import './TableList.css'
const TableEmails = () => {
  return (
    <div>
      <div className="table">
      <div className="flex flex-row mb-2 text-white/50">
        <div className="flex-1">Theme</div>
        <div className="flex-1">Created</div>
        <div className="flex-1">Analytics</div>
        <div className="flex-1">Action</div>
      </div>
      <div className="flex flex-row mb-2">
        <div className="flex-1">Christmas</div>
        <div className="flex-1">Random Date</div>
        <div className="flex-1">Unavailable</div>
        <div className="flex-1">Leave Blank</div>
      </div>
      
    </div>
    </div>
  )
}

export default TableEmails
