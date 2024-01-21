import { useState } from "react";
import CreateScenario from "../../pages/Scenario/CreateScenario";
import NewsComponent from "../News/NewsComponent";
const PromptComponent = () => {
  const [isManual, setIsManual] = useState(true);

  const handleToggle = () => {
    setIsManual((prevIsManual) => !prevIsManual);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row bg-mainBlue w-32 xl:w-36 rounded-xl mt-4">
        <div
          className={`cursor-pointer text-sm xl:text-normal px-2 py-2 xl:px-3 xl:py-3 rounded-l-xl ${
            isManual ? "bg-purple-700" : "bg-mainBlue"
          } duration-300`}
          onClick={handleToggle}
        >
          Manual
        </div>
        <div
          className={`cursor-pointer text-sm xl:text-normal px-2 py-2 xl:px-3 xl:py-3 rounded-r-xl ${
            isManual ? "bg-mainBlue" : "bg-purple-700"
          } duration-300`}
          onClick={handleToggle}
        >
          Automate
        </div>
      </div>
      <div className="mt-2">
        {isManual ? (
          <p className="text-sm text-justify text-white/50">
            Create the prompt manually by inserting the information in input
            fields.
          </p>
        ) : (
          <p className="text-sm text-justify text-white/50">
            AI automation will create a narrative based on news below, you can
            reload news if you wish to see something else.
          </p>
        )}
      </div>
      <div className=" bg-mainBlue rounded-lg mt-2 items-center h-[330px] xl:h-[550px] w-[100%]">
        {isManual ? <CreateScenario /> : <NewsComponent />}
      </div>
    </div>
  );
};

export default PromptComponent;
