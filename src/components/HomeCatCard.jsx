


const HomeCatCard = ({icon,title,subtitle}) => {
  return (
    <div className="xl:flex  gap-6 font-vietnam">
      <div className="flex justify-center items-center text-red-wine xl:text-5xl text-4xl ">{icon}</div>
      <div className="xl:block flex flex-col justify-center items-center
        xl:py-0 py-1">
         <div className="font-bold xl:text-2xl text-xl ">
            {title}</div>
         <div className="font-normal text-base text-gray/600 py-1
          xl:px-0 px-14 xl:text-start text-center ">
            {subtitle}</div>
      </div>
    </div>
  )
}

export default HomeCatCard
