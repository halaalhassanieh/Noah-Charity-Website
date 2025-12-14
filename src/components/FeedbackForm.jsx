import { useState } from "react";
import { contactInfoData } from "../constants/Constants";
import axios from 'axios';

const FeedbackForm = () => {
  const limit= 3;
  const token = localStorage.getItem('token');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
 const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subject || !message) {
      alert('Please fill in all fields.');
      return;
    }

    const formData = new FormData();
    formData.append('subject', subject);
    formData.append('message', message);
    

    try {
      const response = await axios.post('https://hope-lfey.onrender.com/api/feedback',{subject,message}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Feedback created successfully!');
      console.log(response.data);

      // Reset form
      setSubject('');
      setMessage('');
    } catch (error) {
      console.error(error);
      alert('Error creating feedback. Please try again.');
    }
  };

  return (
    <div>
      <div className="custom-container font-vietnam ">
            <div className="   flex md:flex-nowrap flex-wrap bg-gray/100 rounded-3xl "  >
                      <div className=" flex justify-start items-start bg-black p-10 text-white custom-tap:w-auto w-full rounded-3xl">
                        <ul>
                          <li className="sm:mb-9 mb-6 p-2 text-4xl font-bold"> Share love, <br></br> donate hope. </li>
                          {contactInfoData.slice(0, limit).map((info, index) => (
                            <li className="flex justify-start items-center gap-2 font-normal text-grey/15 custom-2xl:text-lg lg:text-base text-[15px] leading-[22.5px] my-5"
                              key={index}>
                              <span className="text-xl text-red-wine ">{info.icons}</span>{info.info}
                            </li>
                          ))}
            
                        </ul>
             </div>
        
        <form onSubmit={handleSubmit} className="space-y-4 p-12 w-full bg-gray/100 rounded-3xl">
           <div>
          <label className="block text-black font-semibold mb-3 text-2xl">Subject :</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-3 border border-gray/600 rounded-lg focus:outline-none focus:border-red-wine"
            placeholder="Subject "
            required
          />
        </div>

        {/* message */}
        <div>
          <label className="block text-black font-semibold mb-3 text-2xl">Message :</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 border border-gray/600 rounded-lg focus:outline-none focus:border-red-wine min-h-[120px]"
            placeholder="Write your message content here..."
            required
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-red-wine text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-red-wine transition duration-200"
        >
          Create
        </button>
        </form>
       </div>
      </div>
    </div>
  )
}

export default FeedbackForm
