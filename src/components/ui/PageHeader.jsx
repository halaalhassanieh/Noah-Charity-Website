import { useNavigate } from "react-router-dom"


const PageHeader = ({ page, title, subtitle }) => {
    const NavigateHome = useNavigate()

    const MoveHome = () => {
        NavigateHome("/")
    }

    return (
        <div className="custom-container flex flex-col justify-center items-center pt-[120px] pb-[80px] font-vietnam">
            <div className="text-base font-normal" onClick={(MoveHome)}> <button className=" text-gray/600">Home</button> {page}</div>
            <div className="font-bold xl:text-6xl text-5xl text-center py-5 px-4">{title}</div>
            <div className="text-base font-normal text-center p-10 custom-xl:w-2/4 w-3/4">{subtitle}</div>
        </div>
    )
}

export default PageHeader
