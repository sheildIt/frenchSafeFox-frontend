import { useState, useEffect } from "react";
import "./ScenarioPage.css";
import { Link } from "react-router-dom";
import { useRedux } from "../../../constants/reduxImports";
import useAxiosInstance from "../../../auth/axios/axiosInstance";
import TextAnalyze from "../../../components/AnalyzeComponent/TextAnalyze";
import PromptComponent from "../../../components/Prompt/PromptComponent";

const ScenarioPage = () => {
  const { currentCompanyId, currentToken, currentCompany } = useRedux();
  const [scenarios, setScenarios] = useState([]);
  const axiosInstance = useAxiosInstance();

  useEffect(() => {
    getScenarios();
  }, []);

  console.log(scenarios);
  const getScenarios = async () => {
    try {
      let response = await axiosInstance.get(
        `http://localhost:8000/email_base/get_scenarios/${currentCompanyId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(currentToken),
          },
        }
      );
      if (response.status === 200) {
        setScenarios(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex-1 p-10">
      <div className="flex-1 h-28">
        <div className="flex flex-row text-justify relative">
          <h2 className="text-3xl text-white flex flex-row ml-2 font-normal">
            Prompt automation |
            <p className="text-lightPurple ml-2">{currentCompany}</p>
          </h2>
        </div>
      </div>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col">
          <TextAnalyze />

          <div className="flex flex-col xl:flex-col mt-5 gap-5 w-[100%] h-[100%]">
            <p className="text-xl xl:text-2xl text-white text-justify">
              Prompts
            </p>
            <div className="flex text-white flex-row rounded-md bg-purpleBlue w-[100%] h-80 xl:h-[500px] shadow-2xl">
              <div className="table">
                <div className="flex flex-row mb-2">
                  <div className="flex-1 text-white/50">Name</div>
                  <div className="flex-1 text-white/50">Subjectline</div>
                  <div className="flex-1 text-white/50">Created</div>
                </div>

                {scenarios?.map((scenario, index) => {
                  const isEvenRow = index % 2 === 0; // Check if the row is even
                  const rowClassName = isEvenRow ? "bg-mainBlue" : "";
                  return (
                    <div
                      key={scenario.id}
                      className={`flex flex-row ${rowClassName} mb-2 rounded-lg py-2 mx-5`}
                    >
                      <div className="flex-1">{scenario.name}</div>
                      <div className="flex-1">TBA</div>
                      <div className="flex-1">{scenario.created_at}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* <div className="absolute right-32 top-20">
<Link
to={"/create_scenario/"}
className="bg-sky-600 p-4 rounded-md text-white"
>
New Scenario
</Link>
</div> */}
          </div>
        </div>
        <div className="flex-1 items-center bg-purpleBlue rounded-lg p-5 text-xl text-creme shadow-2xl">
          Prompt configuration
          <div className="flex-1 items-center">
            <PromptComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioPage;
