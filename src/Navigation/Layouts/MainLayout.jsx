import { Outlet, useLocation } from "react-router-dom"
import NavBar from "../../components/NavBar"
import logo from "/assets/noah_logo.jpg"
import { FaBars } from "react-icons/fa";
import { useEffect } from "react";


const MainLayout = () => {
  
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const NavLinkData = [

    {
      elementName: "Home",
      path: "/",
    },
    {
      elementName: "Causes",
      path: "/causes",
    },
    {
      elementName: "News",
      path: "/news",
    },
    {
      elementName: "About & Contact",
      path: "/aboutUs",
    },
    
  ]; if (localStorage.getItem("isAdmin") === "true") {
          NavLinkData.push({
            elementName: "Dashboard",
            path: "/dashboard",
          });}


  const LoginButton = {

    elementName: "Login",
    path: "/login",

  }
  return (

    <div className=" min-h-screen">
      <div className="relative">
        <div className="fixed w-full  mb-10"><NavBar icon={<FaBars />} logo={logo} LoginButton={LoginButton} NavLinkData={NavLinkData} /></div>
        <div className="w-full"><Outlet /></div>
      </div>

    </div>

  )
}

export default MainLayout


