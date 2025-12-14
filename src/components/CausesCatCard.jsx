

const CausesCatCard = ({icon,title,subtitle}) => {
  return (

    
      
      <div className="block justify-center items-center xl:p-6 p-7 bg-white rounded-[20px] font-vietnam">
        <div className="flex justify-center items-center text-red-wine xl:text-5xl text-4xl ">{icon}</div>
         <div className="font-bold xl:text-2xl text-xl text-center py-6 px-4">
            {title}</div>
         <div className="font-normal text-base text-gray/600 px-4
           text-center ">
            {subtitle}</div>
      </div>

    
  )
}

export default CausesCatCard
