import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logout } from "../redux/auth/authSlice";

const ProfileModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, id } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [wallet, setWallet] = useState("");
  const [amount, setAmount] = useState("");

  /* =======================
     Get user info
  ======================= */
  useEffect(() => {
    if (!token || !id) return;

    axios
      .get(`https://hope-lfey.onrender.com/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setEmail(res.data.email);
        setWallet(res.data.wallet);
      })
      .catch((error) => {
        console.error(error);
        alert("Cannot get user information");
      });
  }, [id, token]);

  /* =======================
     Logout
  ======================= */
  const handleLogout = () => {
    dispatch(logout());
    onClose();
    navigate("/login");
  };

  /* =======================
     Wallet recharge
  ======================= */
  const handleRecharge = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    try {
      const res = await axios.post(
        "https://hope-lfey.onrender.com/api/wallet-requests",
        { amount },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.status === "approved") {
        alert("Wallet recharge approved!");
      } else {
        alert("Recharge request sent but not yet approved.");
      }

      setAmount("");
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
            Wallet:{" "}
            <span className="text-green-600 font-bold">${wallet}</span>
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-red-wine">
            Request Wallet Recharge
          </label>
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
