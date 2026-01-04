import { useDispatch } from "react-redux";
import { updateWalletRequest } from "../redux/walletRequests/walletRequestsSlice";
import { useState } from "react";

const WalletRechargeCard = ({ request }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [actionLoading, setActionLoading] = useState(false);

  if (!request) return null;

  const { _id, user, amount, createdAt } = request;

  const userName =
    typeof user === "object"
      ? user.userName || user.name || "Unnamed User"
      : "Unknown User";

  const userId = typeof user === "object" ? user._id : user;

  const handleAction = async (status) => {
    if (!window.confirm(`Are you sure you want to ${status} this request?`))
      return;

    setActionLoading(true);

    dispatch(
      updateWalletRequest({
        id: _id,
        userId,
        amount,
        status: status === "approve" ? "approved" : "rejected",
        token,
      })
    )
      .unwrap()
      .then(() => alert(`Request ${status} successfully`))
      .catch(() => alert("Failed to update request"))
      .finally(() => setActionLoading(false));
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md font-vietnam">
      <div className="flex flex-wrap justify-between mb-4">
        <div className="">
          <h3 className="text-lg font-bold">{userName}</h3>
          <p className="custom-xl:text-sm custom-tap:text-xs text-sm text-gray-600 flex">User ID: {userId}</p>
          <p className="custom-xl:text-sm custom-tap:text-xs text-sm text-gray-600">
            {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="text-red-wine font-bold text-xl">+${amount}</div>
      </div>

      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => handleAction("approve")}
          disabled={actionLoading}
          className="bg-green-500 text-white px-4 py-2 rounded-xl disabled:opacity-50"
        >
          Approve
        </button>

        <button
          onClick={() => handleAction("reject")}
          disabled={actionLoading}
          className="bg-red-500 text-white px-4 py-2 rounded-xl disabled:opacity-50"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default WalletRechargeCard;
