import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Authentication = () => {
  const { isAuthenticated, loading } = useSelector(
    (state) => state.auth
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Loading...
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default Authentication;
