// DashboardRouteProtect.jsx
import { Navigate, Outlet } from "react-router-dom";

const DashboardRouteProtect = () => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const token = localStorage.getItem("token");

  if (!token || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default DashboardRouteProtect;
