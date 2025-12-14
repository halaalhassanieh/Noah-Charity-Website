import { useEffect, useState } from "react";
import axios from "axios";
import WalletRechargeCard from "./WalletRechargeCard";

const WalletRechargeRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // Show 6 cards per page (2 rows × 3 cards)
  const cardsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchWalletRequests();
  }, []);

  const fetchWalletRequests = async () => {
    try {
      

      const response = await axios.get('https://hope-lfey.onrender.com/api/wallet-requests', {
        headers: { Authorization: `Bearer ${token}` },
        
      });

      const pendingRequests = response.data.filter(
        (req) => req.status === "pending"
      );

      setRequests(pendingRequests);
    } catch (error) {
      console.error("Error fetching wallet requests:", error);
      alert("Failed to load wallet requests.");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = (id) => {
    setRequests((prev) => prev.filter((req) => req._id !== id));
  };

  // Pagination logic
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentRequests = requests.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(requests.length / cardsPerPage);

  if (loading) {
    return <div className="p-8 font-vietnam text-center text-gray/600">Loading requests...</div>;
  }

  if (requests.length === 0) {
    return <div className="p-8 font-vietnam text-center text-gray/600">No pending wallet recharge requests found.</div>;
  }

  return (
    <div className="w-full custom-tap:px-12 px-1 custom-tap:py-[55px] py-3 font-vietnam bg-gray/100">
      <h2 className="text-2xl text-red-wine font-bold pb-3 border-b-4 border-black">
        All wallet requests
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-3">
        {currentRequests.map((request) => (
          <WalletRechargeCard
            key={request._id}
            request={request}
            onAction={handleAction}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-full ${
                currentPage === i + 1 ? "bg-red-wine text-white" : "bg-gray-200"
              } hover:bg-red-wine`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletRechargeRequests;
