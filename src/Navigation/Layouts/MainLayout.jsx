import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import NavBar from "../../components/NavBar";
import logo from "/assets/noah_logo.jpg";
import { FaBars } from "react-icons/fa";

const MainLayout = () => {
  const { pathname } = useLocation();
  const { isAuthenticated, isAdmin } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const NavLinkData = [
    { elementName: "Home", path: "/" },
    { elementName: "Causes", path: "/causes" },
    { elementName: "News", path: "/news" },
    { elementName: "About & Contact", path: "/aboutUs" },
  ];

  // نفس النتيجة القديمة
  if (isAuthenticated && isAdmin) {
    NavLinkData.push({
      elementName: "Dashboard",
      path: "/dashboard",
    });
  }

  const LoginButton = {
    elementName: isAuthenticated ? "Logout" : "Login",
    path: isAuthenticated ? "/" : "/login",
  };

  return (
    <div className="min-h-screen">
      <div className="relative">
        <div className="fixed w-full mb-10">
          <NavBar
            icon={<FaBars />}
            logo={logo}
            LoginButton={LoginButton}
            NavLinkData={NavLinkData}
          />
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
