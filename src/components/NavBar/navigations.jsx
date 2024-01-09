import EmailDrafts from "../../pages/Email/EmailDrafts";
import CompanyPage from "../../pages/Company/CompanyPage";
import EmailIcon from "../../assets/icons/menuIcons/emailIcon";
import CreateIcon from "../../assets/icons/menuIcons/createIcon";
import HomeIcon from "../../assets/icons/menuIcons/HomeIcon";
import GenerateEmail from "../../pages/Email/GenerateEmail";
import Employees from "../../pages/Employees/Employees";
import EmailTemplate from "../../pages/Email/EmailTemplate";
import ScenarioIcon from "../../assets/icons/menuIcons/ScenarioIcon";
import ScenarioPage from "../../pages/Scenario/ScenarioPage/ScenarioPage";
import EmployeesIcon from "../../assets/icons/menuIcons/EmployeesIcon";

export const nav = [
  {
    id: 1,
    path: "home",
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
    path: "/create_email",
    name: "Create",
    icon: <CreateIcon/>,
    element: <GenerateEmail />,
    isMenu: true,
  },
  {
    id: 4,
    path: "/scenarios",
    name: "Create",
    icon: <ScenarioIcon/>,
    element: <ScenarioPage />,
    isMenu: true,
  },
  {
    id: 5,
    path: "/employees/",
    name: "Employees",
    icon: <EmployeesIcon/>,
    element: <Employees />,
    isMenu: true,
  },
];
