import React, { useEffect, useState } from "react";
import EditableText from "./Text/EditableText";

const ListComponent = ({ elements, onSaveText }) => {
  const [text, setText] = useState("");

  const handleTextSave = (id, newText) => {
    onSaveText(newText);
    console.log(newText);
  };
  useEffect(() => {}, [text]);

  return (
    <div className="relative">
      <ul className="flex flex-col">
        {elements?.map((element) => (
          <li
            className="hover:bg-gray-600 rounded-2xl cursor-pointer p-2"
            key={element.id}
          >
            <EditableText
              initialText={element.email_text}
              onSave={(newText) => handleTextSave(element.id, newText)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListComponent;
