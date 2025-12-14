import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ProfileModal = ({ onClose }) => {
  
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  const [email,setemail]=useState("")
  const [wallet,setwallet]=useState("")
  const [amount, setAmount] = useState();

  const navigate = useNavigate();


   // function to get user info 
 
useEffect(() => {
  axios.get(`https://hope-lfey.onrender.com/api/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setemail(res.data.email);
      setwallet(res.data.wallet);
    })
    .catch((error) => {
      alert("Cannot get user information");
      console.error(error);
    });
}, [id, token]); 

  //funtion to logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
     onClose();
  };



 // fuction to send request for wallet recharge
 const handleRecharge = async () => {
  if (!amount || isNaN(amount) || Number(amount) <= "") {
    alert("Please enter a valid amount.");
    return;
  }

  try {
    const res = await axios.post(
      "https://hope-lfey.onrender.com/api/wallet-requests",
      { amount},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (res.data.status === "approved") {
      alert("Wallet recharge approved!");
      setAmount("");
      
    } else {
      alert("Recharge request sent but not yet approved.");
    }
  } catch (err) {
    console.error("Recharge failed:", err);
    alert("Recharge failed");
  }
};

  return (
    
    <div className="absolute top-14 right-0 w-72 bg-white shadow-xl rounded-xl border border-gray-300 z-50 p-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Profile</h3>
        <p className="text-sm text-gray-600 mb-4 break-all">{email}</p>

        <div className="mb-4">
          <p className="text-sm font-medium mb-1">
            Wallet: <span className="text-green-600 font-bold">${wallet}</span>
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-red-wine">Request Wallet Recharge</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full px-3 py-2 border rounded-md mb-2"
          />
          <button
            onClick={handleRecharge}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
          >
            Request Funds
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl transition"
        >
          Logout
        </button>
      </div>

      <button
        onClick={onClose}
        className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
      >
        ×
      </button>
    </div>
  );
};

export default ProfileModal;
