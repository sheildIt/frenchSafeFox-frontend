import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";

const Layout = () => {
  return (
    <div className="flex h-[100%]">
      <NavBar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
