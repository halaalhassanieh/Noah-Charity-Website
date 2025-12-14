import React from 'react'
import { useNavigate } from 'react-router-dom'

const Hero = ({ title1, title2, subtilte, buttonName, buttonPath }) => {
  const navigateExplore = useNavigate()

  const moveToCauses = () => {
    navigateExplore(buttonPath)
  }

  return (

    <div className='bg-hero bg-no-repeat bg-cover bg-center font-vietnam
    custom-3xl:h-[95vh] custom-xl:h-[90vh] custom-tap:h-[85vh] h-[65vh]'>

      <div className='custom-container '>

        <div className=' custom-tap:pt-[160px] pt-[90px]'>
          <h1 className='text-white font-bold py-2 text-shadow-black
            custom-2xl:text-8xl custom-xl:text-7xl custom-tap:text-6xl text-5xl '>{title1}</h1>

          <h1 className='text-white font-bold py-2 text-shadow-black
            custom-2xl:text-8xl custom-xl:text-7xl custom-tap:text-6xl text-5xl'>{title2}</h1>

        </div>
        <p className='text-white/60 custom-tap:text-xl text-base custom-tap:w-2/4 w-5/6 custom-tap:pt-10 pt-7 text-shadow-black'>{subtilte}</p>
        <button className='text-white bg-red-wine rounded-xl py-2 custom-tap:mt-10 mt-7 
                    custom-2xl:px-10 custom-xl:px-8 px-5
                    custom-xl:font-bold  font-medium
                    custom-2xl:text-base text-sm ' onClick={(moveToCauses)}>{buttonName}</button>
      </div>
    </div>
  )
}

export default Hero
