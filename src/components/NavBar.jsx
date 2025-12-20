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

        <div className={MenuButton?"bg-black/65 font-vietnam":" bg-gradient-to-b from-black to-transparent font-vietnam  "}>

            <div className='custom-container flex justify-between items-center  custom-3xl:py-5 py-4 '>

                {/* div contains the logo pic */}
                <div className='flex justify-center items-center gap-3'>
                    <div>
                    <img className='custom-3xl:h-16 custom-2xl:h-14 h-10 rounded-full shadow-sm shadow-black' src={logo} alt="logo" /> </div>
                    <div className='text-white font-bold text-shadow-black
                        custom-2xl:text-4xl custom-xl:text-4xl custom-tap:text-2xl text-2xl'>Noah</div>
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
                <div className='flex justify-center items-center '>

                    {localStorage.getItem("token") ? (

                        // Show profile circle only when logged in
                        <ProfileCircle />
                    ) : (
                        // Show login button only when not logged in
                        <button
                            className='text-white bg-red-wine rounded-2xl py-1 shadow-sm shadow-black
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

            <div className='custom-container  custom-tap:hidden flex justify-center items-center'>

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
