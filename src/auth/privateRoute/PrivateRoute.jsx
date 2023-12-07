import { Route, Routes, Navigate, Outlet, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectCurrentToken } from '../redux/authSlice'

const PrivateRoute = () => {

    const token = useSelector(selectCurrentToken);
    const location = useLocation();
  
    return token ? (
      <Outlet />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default PrivateRoute
