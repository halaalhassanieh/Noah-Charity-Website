import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import ProfileCircle from './ProfileCircle'

const NavBar = ({ icon, logo, NavLinkData, LoginButton }) => {

    const [MenuButton, setMenuButton] = useState(false)
    const NavigateLogin = useNavigate()
    const ToggleNav = () => {
        setMenuButton(!MenuButton)
    }

    const OpenLogin = () => {
        NavigateLogin(LoginButton.path)
    }

    return (

        <div className='bg-black font-vietnam '>

            <div className='custom-container flex justify-between items-center  custom-3xl:py-6 py-5 '>

                {/* div contains the logo pic */}
                <div>
                    <img className='custom-3xl:h-10 custom-2xl:h-9 h-8' src={logo} alt="logo" />
                </div>

                {/* div contains the main ul and the toggle bars button  */}
                <div className=" ">

                    {/* the menu button shows up on screens less than 786px and we use it to toggle the ul menu */}
                    <button className='custom-tap:hidden block text-white/60 text-xl ' onClick={(ToggleNav)}>{icon}</button>

                    <ul className="
                    custom-tap:flex 
                    custom-tap:justify-items-center 
                    custom-tap:items-center hidden
                    custom-2xl:gap-5 custom-xl:gap-4 gap-3
                 ">
                        {NavLinkData.map((e, i) => {
                            return (
                                <NavLink key={i} to={e.path} >
                                    <li className="text-white/60 font-normal py-1 
                                        custom-2xl:px-3 px-2
                                        custom-2xl:text-base text-sm">
                                        {e.elementName}</li></NavLink>
                            )
                        })
                        }
                    </ul>
                </div>

                {/* div contains the login button and profile circle*/}
                <div className='flex items-center gap-4'>

                    {localStorage.getItem("token") ? (

                        // Show profile circle only when logged in
                        <ProfileCircle />
                    ) : (
                        // Show login button only when not logged in
                        <button
                            className='text-white bg-red-wine rounded-2xl py-1
                 custom-2xl:px-10 custom-xl:px-8 px-5
                 custom-xl:font-bold font-medium
                 custom-2xl:text-base text-sm'
                            onClick={OpenLogin}
                        >
                            {LoginButton.elementName}
                        </button>
                    )}
                </div>
            </div>

            {/* div for the menu ul if menubutton is true it shows up  */}

            <div className='custom-container custom-tap:hidden flex justify-center items-center'>

                {MenuButton && (
                    <ul className="
                    flex flex-col 
                    justify-items-center 
                    items-center
                     gap-3 py-1
                 ">
                        {NavLinkData.map((e, i) => {
                            return (
                                <NavLink key={i} to={e.path} >
                                    <li className="text-white/60 text-sm font-normal py-1 px-2  ">

                                        {e.elementName}</li></NavLink>

                            )
                        })
                        }
                    </ul>
                )}
            </div>
        </div>
    )
}

export default NavBar
