import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRedux } from "../../constants/reduxImports";
import useAxiosInstance from "../../auth/axios/axiosInstance";
import { config } from "../../constants/constants";
import EditableText from "../../components/List/Text/EditableText";

const EditorView = () => {
  const { currentCompany } = useRedux();
  const axiosInstance = useAxiosInstance();
  const [emailElements, setEmailElements] = useState([]);
  const [emailText, setEmailText] = useState("");
  const [subjectline, setSubjectline] = useState("");
  const [elementId, setElementId] = useState("");
  const [saved, setSaved] = useState(false);
  const BASE_URL = config.url.BASE_URL;
  const params = useParams();

  useEffect(() => {
    //getEmailDocument();
    getEmailElements();
  }, []);

  useEffect(() => {
    if (emailElements.length > 0) {
      setElementId(emailElements[0].id);
      setEmailText(emailElements[0].email_text);
      setSubjectline(emailElements[0].email_subjectline);
    }
  }, [emailElements]);

  useEffect(() => {}, [saved]);

  setTimeout(() => setSaved(false), 3000);

  const getEmailElements = async () => {
    let response = await axiosInstance.get(
      `${BASE_URL}/email_base/email_elements/${params.id}`
    );
    if (response.status === 200) {
      setEmailElements(response.data);
      setElementId(response.data[0].id);
    }
  };

  const handleTextSave = (id, newText, subjectline) => {
    setEmailText(newText);
    setElementId(id);
    setSubjectline(subjectline);
  };

  const handleSubjectlineChange = (event) => {
    setSubjectline(event.target.value);
    console.log(event.target.value);
  };

  const saveEmailDocument = async () => {
    const data = {
      email_text: emailText,
      email_subjectline: subjectline,
    };
    let response = await axiosInstance.put(
      `${BASE_URL}/email_base/email_elements_detail/${elementId}/`,
      data
    );
    // eslint-disable-next-line no-constant-condition
    if (response.status === 200 || 201) {
      console.log("success");
      setSaved(true);
    }
  };

  return (
    <div className="flex flex-col p-10">
      <div className="flex-1 h-28 mb-10">
        <div className="flex flex-row text-justify relative">
          <h2 className="text-3xl text-white flex flex-row font-normal">
            Edit document |
            <p className="text-lightPurple ml-2">{currentCompany}</p>
          </h2>
          <div className="flex flex-row gap-2 absolute right-0">
            {saved ? (
              <span className="text-green-600 my-auto">Saved!</span>
            ) : (
              <></>
            )}
            <button
              className="bg-purpleBlue shadow-xl"
              onClick={saveEmailDocument}
            >
              {/* eslint-disable-next-line no-undef */}
              <img src={"../images/saveWhite.png"} width={30} />
            </button>
            <button className="bg-purpleBlue shadow-xl">To send</button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 grid-rows-1 gap-4">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col items-start p-5 bg-purpleBlue rounded-2xl h-[120px] shadow-xl">
            <span className="text-xl">Email subjectline</span>
            <input
              className="bg-white rounded-lg mt-2 text-black p-2 w-full"
              type="text"
              value={subjectline}
              onChange={handleSubjectlineChange}
            />
          </div>

          <div className="flex flex-row justify-between p-5 bg-purpleBlue rounded-2xl">
            <div className="bg-white p-5 rounded-2xl w-[25%]">
              <span className="text-black font-semibold font-sans">
                Other layouts(TBA)
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 p-5 bg-purpleBlue rounded-2xl shadow-xl">
          <div className="flex flex-col border-creme text-justify border-2 p-5 border-dashed rounded-2xl h-[500px] mx-16 overflow-auto">
            <ul className="flex flex-col">
              {emailElements?.map((element) => (
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
        </div>
      </div>
    </div>
  );
};

export default EditorView;
