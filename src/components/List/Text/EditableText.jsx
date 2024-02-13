import React, { useState, useRef } from "react";

const EditableText = ({ initialText, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);
  const handleDoubleClick = () => {
    setIsEditing(true);
  };
  const handleChange = (event) => {
    setText(event.target.value);
  };
  const handleBlur = () => {
    console.log("BLURED?");
    setIsEditing(false);
    onSave(text);
    // Save the changes or perform any required actions here
  };
  console.log(text);
  return (
    <div onDoubleClick={handleDoubleClick}>
      {isEditing ? (
        <textarea
          type="text"
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          className="border-none outline-none bg-transparent h-[500px] w-full"
        />
      ) : (
        <span>{text}</span>
      )}
    </div>
  );
};

export default EditableText;
