import { useState } from "react";
import { useDispatch } from "react-redux";
import { createFeedback } from "../redux/feedback/feedbackSlice";
import { contactInfoData } from "../constants/Constants";

const FeedbackForm = () => {
  const limit = 3;
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!subject || !message) {
      alert("Please fill in all fields.");
      return;
    }

    dispatch(createFeedback({ subject, message, token }))
      .unwrap()
      .then(() => {
        alert("Feedback created successfully!");
        setSubject("");
        setMessage("");
      })
      .catch(() => alert("Error creating feedback."));
  };

  return (
    <div className="custom-container font-vietnam">
      <div className="flex md:flex-nowrap flex-wrap bg-gray/100 rounded-3xl">
        <div className="bg-black custom-tap:w-auto w-full p-10 text-white rounded-3xl">
          <ul>
            <li className="mb-6 text-4xl font-bold">
              Share love,<br />donate hope.
            </li>
            {contactInfoData.slice(0, limit).map((info, i) => (
              <li key={i} className="flex gap-2 my-5">
                <span className="text-red-wine">{info.icons}</span>
                {info.info}
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-12 w-full">
          <div>
            <label className="font-semibold text-2xl">Subject :</label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
          </div>

          <div>
            <label className="font-semibold text-2xl">Message :</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 border rounded-lg min-h-[120px]"
            />
          </div>

          <button className="bg-red-wine text-white px-6 py-3 rounded-xl font-bold">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
