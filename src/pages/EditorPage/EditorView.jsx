import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRedux } from "../../constants/reduxImports";
import useAxiosInstance from "../../auth/axios/axiosInstance";
import { config } from "../../constants/constants";
import EditableText from "../../components/List/Text/EditableText";

const EditorView = () => {
  const { currentCompany } = useRedux();
  const axiosInstance = useAxiosInstance();
  const [emailBody, setEmailBody] = useState("");
  const [emailElements, setEmailElements] = useState([]);
  const [emailText, setEmailText] = useState("");
  const [elementId, setElementId] = useState("");
  const BASE_URL = config.url.BASE_URL;
  const params = useParams();

  useEffect(() => {
    //getEmailDocument();
    getEmailElements();
  }, []);

  useEffect(() => {}, [emailText]);
  //   const getEmailDocument = async () => {
  //     try {
  //       let response = await axiosInstance.get(
  //         `${BASE_URL}/email_base/email_templates_detail/${params.id}`
  //       );
  //       if (response.status === 200) {
  //         setEmailElements(response.data);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const getEmailElements = async () => {
    let response = await axiosInstance.get(
      `${BASE_URL}/email_base/email_elements/${params.id}`
    );
    if (response.status === 200) {
      setEmailElements(response.data);
    }
  };

  const handleTextSave = (id, newText) => {
    setEmailText(newText);
    setElementId(id);
    // Perform any other actions if needed
    console.log("Save text", newText);
  };
  console.log(emailText);

  const saveEmailDocument = async () => {
    const data = {
      email_text: emailText,
    };
    let response = await axiosInstance.put(
      `${BASE_URL}/email_base/email_elements_detail/${elementId}/`,
      data
    );
    // eslint-disable-next-line no-constant-condition
    if (response.status === 200 || 201) {
      console.log("success");
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
            <button className="bg-purpleBlue" onClick={saveEmailDocument}>
              {/* eslint-disable-next-line no-undef */}
              <img src={"../images/saveWhite.png"} width={30} />
            </button>
            <button className="bg-purpleBlue">To send</button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 grid-rows-1 gap-4">
        <div className="flex flex-col gap-3">
          <div className="flex flex-row p-5 bg-purpleBlue rounded-2xl h-[100px]">
            <span className="text-xl">Email configuration</span>
          </div>

          <div className="flex flex-row justify-between p-5 bg-purpleBlue rounded-2xl">
            <div className="bg-white p-5 rounded-2xl w-[25%]">
              <span className="text-black font-semibold font-sans">Text</span>
            </div>
            <div className="bg-white p-5 rounded-2xl w-[25%] h-[100px]">
              <span className="text-black font-semibold font-sans">Image</span>
            </div>
            <div className="bg-white p-5 rounded-2xl w-[25%]">
              <span className="text-black font-semibold font-sans">Image</span>
            </div>
          </div>
        </div>

        <div className="flex-1 p-5 bg-purpleBlue rounded-2xl">
          <div className="flex flex-col border-creme text-justify border-2 p-5 border-dashed rounded-2xl h-[500px] mx-16 overflow-auto">
            <span className="text-xl mb-2">{emailBody.email_subjectline}</span>

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
