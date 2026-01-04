import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WalletRechargeCard from "./WalletRechargeCard";
import { fetchWalletRequests } from "../redux/walletRequests/walletRequestsSlice";

const WalletRechargeRequests = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const { requests, loading } = useSelector(
    (state) => state.walletRequests
  );

  const cardsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchWalletRequests(token));
  }, [dispatch, token]);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentRequests = requests.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(requests.length / cardsPerPage);

  if (loading) {
    return (
      <div className="p-8 font-vietnam text-center text-gray/600">
        Loading requests...
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="p-8 font-vietnam text-center text-gray/600">
        No pending wallet recharge requests found.
      </div>
    );
  }

  return (
    <div className="w-full custom-tap:px-12 px-1 custom-tap:py-[55px] py-3 font-vietnam bg-gray/100">
      <h2 className="text-2xl text-red-wine font-bold pb-3 border-b-4 border-black">
        All wallet requests
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-3">
        {currentRequests.map((request) => (
          <WalletRechargeCard key={request._id} request={request} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 space-x-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-full ${
                currentPage === i + 1
                  ? "bg-red-wine text-white"
                  : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletRechargeRequests;
