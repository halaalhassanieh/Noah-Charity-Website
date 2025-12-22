import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const DashboardRouteProtect = ({ adminOnly = true }) => {
  const { isAuthenticated, isAdmin, loading } = useSelector(
    (state) => state.auth
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated || (adminOnly && !isAdmin)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default DashboardRouteProtect;
