import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileCircle from "./ProfileCircle";

const NavBar = ({ icon, logo, NavLinkData, LoginButton }) => {
  const [MenuButton, setMenuButton] = useState(false);
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const ToggleNav = () => {
    setMenuButton(!MenuButton);
  };

  const OpenLogin = () => {
    navigate(LoginButton.path);
  };

  return (
    <div
      className={
        MenuButton
          ? "bg-black/65 font-vietnam"
          : "bg-gradient-to-b from-black to-transparent font-vietnam"
      }
    >
      <div className="custom-container flex justify-between items-center custom-3xl:py-5 py-4">
        {/* Logo */}
        <div className="flex justify-center items-center gap-3">
          <img
            className="custom-3xl:h-16 custom-2xl:h-14 h-10 rounded-full shadow-sm shadow-black"
            src={logo}
            alt="logo"
          />
          <div className="text-white font-bold text-shadow-black custom-2xl:text-4xl custom-xl:text-4xl custom-tap:text-2xl text-2xl">
            Noah
          </div>
        </div>

        {/* Links */}
        <div>
          <button
            className="custom-tap:hidden block text-white/60 text-xl"
            onClick={ToggleNav}
          >
            {icon}
          </button>

          <ul className="custom-tap:flex hidden items-center gap-3">
            {NavLinkData.map((e, i) => (
              <NavLink key={i} to={e.path}>
                <li className="text-white/60 text-sm py-1 px-2">
                  {e.elementName}
                </li>
              </NavLink>
            ))}
          </ul>
        </div>

        {/* Login / Profile */}
        <div className="flex items-center">
          {isAuthenticated ? (
            <ProfileCircle />
          ) : (
            <button
              className="text-white bg-red-wine rounded-2xl py-1 shadow-sm shadow-black
              px-5 text-sm font-medium"
              onClick={OpenLogin}
            >
              {LoginButton.elementName}
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {MenuButton && (
        <div className="custom-container custom-tap:hidden flex justify-center">
          <ul className="flex flex-col items-center gap-3 py-1">
            {NavLinkData.map((e, i) => (
              <NavLink key={i} to={e.path}>
                <li className="text-white/60 text-sm py-1 px-2">
                  {e.elementName}
                </li>
              </NavLink>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavBar;
