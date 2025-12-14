import { useEffect, useState } from "react";
import sideimg from "/assets/sideimg3.jpeg";
import axios from "axios";
import { MdArrowForwardIos, MdOutlineArrowBackIosNew } from "react-icons/md";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get("https://hope-lfey.onrender.com/api/feedback");
      setFeedbacks(response.data);
    } catch (error) {
      console.error("Error fetching Feedbacks:", error);
      alert("Failed to load Feedbacks.");
    } finally {
      setLoading(false);
    }
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? feedbacks.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === feedbacks.length - 1 ? 0 : prev + 1
    );
  };

  if (loading) {
    return (
      <div className="p-8 font-vietnam text-center text-gray-600">
        Loading Feedbacks...
      </div>
    );
  }

  return (
    <div  className="custom-container xl:flex block items-start justify-center font-vietnam">
      {/* Feedbacks slider */}
      <div className="w-full xl:w-1/2 px-6 xl:px-0">
        <h1 className="text-red-wine custom-3xl:text-[60px] custom-2xl:text-[50px] custom-xl:text-[45px] text-[35px] font-bold xl:text-left text-center
        pb-3 border-b-4 border-black">
          Feedbacks
        </h1>

        <div className="relative w-full mt-6 p-12">
          {/* Slider */}
          {feedbacks.length > 0 && (
            <div className="xl:text-left text-center p-6">
              <p className="text-black text-[28px] md:text-[34px] font-extrabold leading-snug">
                {feedbacks[currentIndex].subject}
              </p>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mt-4">
                {feedbacks[currentIndex].message}
              </p>
              <div className="mt-6">
                <p className="text-black font-semibold">
                  {feedbacks[currentIndex].username}
                </p>
                <p className="text-gray-500 text-sm">Donor</p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute xl:-left-6 left-6 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-red-wine rounded-full p-2 shadow"
          >
            <MdOutlineArrowBackIosNew size={18} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute xl:-right-12 right-6 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-red-wine rounded-full p-2 shadow"
          >
            <MdArrowForwardIos size={18} />
          </button>

          {/* Dots */}
          <div className="flex justify-center mt-4 space-x-2 mb-3">
            {feedbacks.map((_, index) => (
              <span
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? "bg-red-wine" : "bg-gray-300"
                }`}
              ></span>
            ))}
          </div>
        </div>
      </div>

      {/* Side Image */}
      <div className="w-full xl:w-1/2 flex xl:justify-end justify-center items-center">
        <img
          className="rounded-[20px] w-2/4 xl:w-3/4 object-cover "
          src={sideimg}
          alt="Side"
        />
      </div>
    </div>
  );
};

export default Feedback;
