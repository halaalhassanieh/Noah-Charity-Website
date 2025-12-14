// WalletRechargeCard.jsx
import axios from 'axios';
import { useState } from 'react';

const WalletRechargeCard = ({ request, onAction }) => {
  const [actionLoading, setActionLoading] = useState(false);
  const token = localStorage.getItem("token");

  if (
    !request ||
    !request._id ||
    !request.user ||
    !request.amount ||
    !request.createdAt
  ) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-xl font-vietnam mb-4">
         Invalid or incomplete request data.
      </div>
    );
  }

  const { _id, user, amount, createdAt } = request;

  const handleStatusChange = async (status) => {
    if (!window.confirm(`Are you sure you want to ${status} this request?`)) {
      return;
    }

    try {
      setActionLoading(true);
      const url = `https://hope-lfey.onrender.com/api/wallet-requests/${_id}`;

      await axios.put(
        url,
        {
          user: request.user._id || request.user, // send user ID
          amount: request.amount,
          status: status === "approve" ? "approved" : "rejected",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(`Request ${status}d successfully`);
      onAction(_id);  // notify parent to remove this request
    } catch (error) {
      console.error("Axios error:", error.response?.data || error.message);
      alert(`Failed to ${status} request`);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md font-vietnam max-w-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-bold text-black">
            {user.userName || user.name || 'Unnamed User'}
          </h3>
          <p className="text-gray/600 text-sm">User ID: {user._id}</p>
          <p className="text-gray/600 text-sm">
            Requested on: {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="text-red-wine text-xl font-bold">+${amount}</div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => handleStatusChange('approve')}
          className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition"
          disabled={actionLoading}
        >
          Approve
        </button>
        <button
          onClick={() => handleStatusChange('reject')}
          className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
          disabled={actionLoading}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default WalletRechargeCard;
