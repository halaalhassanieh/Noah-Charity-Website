import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/auth/authSlice";
import {
  fetchUser,
  rechargeWallet,
  clearUser,
} from "../redux/user/userSlice";

const ProfileModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, id } = useSelector((state) => state.auth);
  const { email, wallet } = useSelector((state) => state.user);

  const [amount, setAmount] = useState("");

  /* =======================
     Fetch user
  ======================= */
  useEffect(() => {
    if (token && id) {
      dispatch(fetchUser({ id, token }));
    }
  }, [dispatch, id, token]);

  /* =======================
     Logout
  ======================= */
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearUser());
    onClose();
    navigate("/login");
  };

  /* =======================
     Recharge
  ======================= */
  const handleRecharge = () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    dispatch(rechargeWallet({ amount, token }))
      .unwrap()
      .then((res) => {
        if (res.status === "approved") {
          alert("Wallet recharge approved!");
        } else {
          alert("Recharge request sent but not yet approved.");
        }
        setAmount("");
      })
      .catch(() => alert("Recharge failed"));
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
            className="w-full px-3 py-2 border rounded-md mb-2"
          />
          <button
            onClick={handleRecharge}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
          >
            Request Funds
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl"
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
