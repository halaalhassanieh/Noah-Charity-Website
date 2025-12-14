
const InfoBlock2 = ({sideimg,title,subtitle1,subtitle2}) => {
  return (
        <div className="custom-container xl:flex block items-center gap-[40px] xl:py-16 py-12 font-vietnam">

      <div className="w-full flex justify-center items-center">
        <img className="rounded-[20px] xl:w-full w-3/4" src={sideimg} alt="" /></div>


      <div className="w-full flex flex-col justify-center items-center
       px-10 xl:py-0 py-6 ">

        <h1 className=" custom-3xl:text-[60px] custom-2xl:text-[50px] custom-xl:text-[45px] text-[35px]
                font-bold xl:text-left text-center">
          {title}</h1>

      <div className=" custom-xl:flex custom-2xl:py-10 custom-tap:py-7 py-6 ">
        <p className=" font-normal  text-gray/600 px-2
                custom-2xl:text-xl text-base
               custom-xl:py-0 py-4 
                xl:text-left text-center">
          {subtitle1}</p>
          
        <p className=" font-normal  text-gray/600 px-2
                custom-2xl:text-xl text-base
                custom-xl:py-0 py-4 
                xl:text-left text-center">
          {subtitle2}</p>
      </div>

      </div>

    </div>
  )
}

export default InfoBlock2
