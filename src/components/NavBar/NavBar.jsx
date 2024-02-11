import { nav } from "./navigations";
import { Link } from "react-router-dom";
import { useRedux } from "../../constants/reduxImports";
import { logOut } from "../../auth/redux/companyReducer";
import { cleanOut } from "../../auth/redux/departmentsReducer";

const NavBar = () => {
  const { dispatch } = useRedux();

  const handleLogout = () => {
    dispatch(logOut());
    dispatch(cleanOut());
  };

  return (
   
      <div className="flex flex-col items-center justify-center border-r-2 border-lightPurple/20 h-[100%] w-[10%]">
        <div className="flex items-center justify-center rounded-md p-4 text-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-8 w-8 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
            />
          </svg>
        </div>

        <div className="space-y-80 rounded-md">
          <ul className="flex flex-col gap-5">
            {nav?.map((navItems) => {
              return (
                <Link
                  to={`${navItems.path}`}
                  key={navItems.id}
                  className="hover:bg-slate-200 text-white hover:text-purple-700 cursor-pointer flex flex-row rounded-lg w-32 gap-2"
                >
                  <p>{navItems.icon}</p>
                  <p className=" font-normal">{navItems.name}</p>
                </Link>
              );
            })}
          </ul>
          <div className="flex items-center justify-center pb-5">
            <Link onClick={handleLogout} to={"/"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    
  );
};

export default NavBar;
