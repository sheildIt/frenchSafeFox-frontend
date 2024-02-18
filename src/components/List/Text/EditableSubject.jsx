// EditableSubject.jsx
import React, { useState } from "react";

const EditableSubject = ({ initialText, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [subjectline, setSubjectline] = useState(initialText);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (event) => {
    setSubjectline(event.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onSave(subjectline);
  };
  console.log(initialText);
  return (
    <div onDoubleClick={handleDoubleClick}>
      {isEditing ? (
        <input
          className="bg-white rounded-lg mt-2"
          type="text"
          value={subjectline}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      ) : (
        <div className="bg-white rounded-lg mt-2">{subjectline}</div>
      )}
    </div>
  );
};

export default EditableSubject;
