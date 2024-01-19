import { useState } from "react";
import CreateScenario from "../../pages/Scenario/CreateScenario";
const PromptComponent = () => {
  const [isManual, setIsManual] = useState(true);

  const handleToggle = () => {
    setIsManual((prevIsManual) => !prevIsManual);
  };

  return (
    <div className="flex flex-col">
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

      <div className="flex-1 bg-mainBlue rounded-lg mt-4 items-center">
        {isManual ? <CreateScenario /> : <div>Automatic</div>}
      </div>
    </div>
  );
};

export default PromptComponent;
