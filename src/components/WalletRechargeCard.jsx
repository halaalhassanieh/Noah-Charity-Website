import axios from "axios";
import { useState } from "react";

const WalletRechargeCard = ({ request, onAction }) => {
  const [actionLoading, setActionLoading] = useState(false);
  const token = localStorage.getItem("token");

  // Defensive validation (allow amount = 0)
  if (
    !request ||
    !request._id ||
    !request.user ||
    request.amount == null ||
    !request.createdAt
  ) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-xl font-vietnam mb-4">
        Invalid or incomplete request data.
      </div>
    );
  }

  const { _id, user, amount, createdAt } = request;

  // Normalize user data safely
  const userName =
    typeof user === "object"
      ? user.userName || user.name || "Unnamed User"
      : "Unknown User";

  const userId = typeof user === "object" ? user._id : user;

  const handleStatusChange = async (status) => {
    if (actionLoading) return;

    if (!token) {
      alert("Unauthorized. Please log in again.");
      return;
    }

    if (!window.confirm(`Are you sure you want to ${status} this request?`)) {
      return;
    }

    try {
      setActionLoading(true);

      const finalStatus = status === "approve" ? "approved" : "rejected";
      const url = `https://hope-lfey.onrender.com/api/wallet-requests/${_id}`;

      await axios.put(
        url,
        {
          user: userId, // always send user ID
          amount,
          status: finalStatus,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(`Request ${finalStatus} successfully`);
      onAction(_id); // notify parent to remove card
    } catch (error) {
      console.error("Axios error:", error.response?.data || error.message);
      alert("Failed to update request status");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md font-vietnam max-w-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-bold text-black">{userName}</h3>
          <p className="text-gray/600 text-sm">User ID: {userId}</p>
          <p className="text-gray/600 text-sm">
            Requested on: {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="text-red-wine text-xl font-bold">+${amount}</div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => handleStatusChange("approve")}
          disabled={actionLoading}
          className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition disabled:opacity-50"
        >
          {actionLoading ? "Processing..." : "Approve"}
        </button>

        <button
          onClick={() => handleStatusChange("reject")}
          disabled={actionLoading}
          className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition disabled:opacity-50"
        >
          {actionLoading ? "Processing..." : "Reject"}
        </button>
      </div>
    </div>
  );
};

export default WalletRechargeCard;
