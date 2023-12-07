import EmailDrafts from "../../pages/Email/EmailDrafts";
import CompanyPage from "../../pages/Company/CompanyPage";
import EmailIcon from "../../assets/icons/menuIcons/emailIcon";
import CreateIcon from "../../assets/icons/menuIcons/createIcon";
import HomeIcon from "../../assets/icons/menuIcons/HomeIcon";
import GenerateEmail from "../../pages/Email/GenerateEmail";
import EmailTemplate from "../../pages/Email/EmailTemplate";
import ScenarioIcon from "../../assets/icons/menuIcons/ScenarioIcon";
import ScenarioPage from "../../pages/Scenario/ScenarioPage/ScenarioPage";

export const nav = [
  {
    id: 1,
    path: "companyID/:id",
    name: "/",
    icon: <HomeIcon/>,
    element: <CompanyPage />,
    isMenu: true,
  },
  {
    id: 2,
    path: "/emailDrafts",
    name: "Emails",
    icon: <EmailIcon/>,
    element: <EmailDrafts />,
    isMenu: true,
  },
  {
    id: 3,
    path: "/templates",
    name: "Create",
    icon: <CreateIcon/>,
    element: <EmailTemplate />,
    isMenu: true,
  },
  {
    id: 3,
    path: "/scenarios",
    name: "Create",
    icon: <ScenarioIcon/>,
    element: <ScenarioPage />,
    isMenu: true,
  },
];
