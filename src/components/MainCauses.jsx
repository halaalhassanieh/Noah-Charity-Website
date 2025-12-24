import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchCauses,
  donateToCause,
  deleteCause,
} from "../redux/causes/causesSlice";

const MainCauses = ({ cardsnumber, displayButton, displaySearch }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { causes, loading } = useSelector((state) => state.causes);

  const [search, setSearch] = useState("");
  const [selectedCause, setSelectedCause] = useState(null);
  const [donation, setDonation] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const causesPerPage = cardsnumber;

  /* =========================
     Fetch Causes
  ========================= */
  useEffect(() => {
    dispatch(fetchCauses());
  }, [dispatch]);

  /* =========================
     Donate
  ========================= */
  const handleDonate = async (causeId) => {
    const amount = Number(donation || customAmount);
    if (!amount || amount <= 0) {
      return alert("Please enter a valid donation amount.");
    }

    try {
      await dispatch(donateToCause({ causeId, amount })).unwrap();
      alert(`Successfully donated $${amount}!`);
      setDonation(null);
      setCustomAmount("");
    } catch (err) {
      alert(
        err ||
          "Failed to process donation, please check your wallet or connection."
      );
    }
  };

  /* =========================
     Delete (Admin)
  ========================= */
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this cause?")) return;
    dispatch(deleteCause(id));
  };

  /* =========================
     Filtering & Pagination
  ========================= */
  const filteredCauses = causes.filter((cause) =>
    cause.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCauses.length / causesPerPage);
  const startIndex = (currentPage - 1) * causesPerPage;
  const paginatedCauses = filteredCauses.slice(
    startIndex,
    startIndex + causesPerPage
  );

  if (loading) {
    return (
      <div className="p-8 font-vietnam text-center text-gray/600">
        Loading causes...
      </div>
    );
  }

  return (
    <div className="p-3 md:p-14 bg-gray/100 font-vietnam min-h-screen">
      {/* Header */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-6 pb-4 border-b-4 border-black">
          <h2 className="custom-xl:text-[50px] custom-tap:text-[45px] text-[40px] text-black font-bold pb-3 custom-tap:w-2/3 w-3/4">
            Latest Causes
          </h2>

          {displayButton && (
            <button
              onClick={() => navigate("/causes")}
              className="text-black border-2 border-black px-4 py-2 rounded-lg text-sm font-bold transition hover:bg-black hover:text-white"
            >
              More causes
            </button>
          )}
        </div>

        {displaySearch && (
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search causes by title..."
            className="w-full mb-4 p-2 text-sm border border-gray-600 rounded-lg focus:outline-none focus:border-red-wine"
          />
        )}
      </div>

      {/* Causes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedCauses.map((cause) => {
          const progress =
            cause.goal > 0
              ? Math.min((cause.raised / cause.goal) * 100, 100)
              : 0;

          return (
            <div
              key={cause._id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition flex flex-col justify-between"
            >
              {cause.image && (
                <img
                  src={cause.image}
                  alt={cause.title}
                  className="w-full max-h-56 object-cover rounded-lg mb-4"
                />
              )}

              <div>
                <h3 className="text-xl font-bold text-black mb-2">
                  {cause.title}
                </h3>
                <p className="text-gray/600 mb-2 line-clamp-3">
                  {cause.description}
                </p>

                <div className="text-sm text-black/60 space-y-1 mb-2">
                  <p>
                    <strong>Goal:</strong> ${cause.goal}
                  </p>
                  <p>
                    <strong>Raised:</strong> ${cause.raised}
                  </p>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                  <div
                    className="bg-red-wine h-3 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="mt-3 flex flex-col gap-2">
                <button
                  onClick={() => setSelectedCause(cause)}
                  className="w-full bg-black hover:bg-red-wine text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
                >
                  View Details
                </button>

                {isAdmin && (
                  <button
                    onClick={() => handleDelete(cause._id)}
                    className="w-full bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
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
                currentPage === i + 1
                  ? "bg-red-wine text-white"
                  : "bg-gray-200"
              } hover:bg-red-wine`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((p) => Math.min(p + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Modal */}
      {selectedCause && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setSelectedCause(null)}
              className="absolute top-4 right-4 text-gray-600 hover:text-red-600 text-xl font-bold"
            >
              X
            </button>

            <h2 className="text-2xl font-bold text-black mb-3">
              {selectedCause.title}
            </h2>

            {selectedCause.image && (
              <img
                src={selectedCause.image}
                alt={selectedCause.title}
                className="w-full max-h-72 object-cover rounded-lg mb-4"
              />
            )}

            <p className="text-gray-700 mb-4">
              {selectedCause.description}
            </p>

            <div className="border-t border-gray-300 pt-4">
              <h3 className="text-lg font-semibold text-black mb-2">
                Choose the donation amount
              </h3>

              <div className="flex space-x-3 mb-3">
                {[100, 200, 300, 400, 500].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => {
                      setDonation(amount);
                      setCustomAmount("");
                    }}
                    className={`px-4 py-2 rounded-lg font-semibold border ${
                      donation === amount
                        ? "bg-red-wine text-white border-red-wine"
                        : "bg-gray-100 text-black border-gray-400 hover:bg-gray-200"
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>

              <input
                type="number"
                value={customAmount}
                onChange={(e) => {
                  setDonation(null);
                  setCustomAmount(e.target.value);
                }}
                placeholder="Or enter any amount you want here.."
                className="w-full p-2 border border-gray-400 rounded-lg mb-4 focus:outline-none focus:border-red-wine"
              />

              <button
                onClick={() => handleDonate(selectedCause._id)}
                className="w-full bg-red-wine text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-red-wine transition duration-200"
              >
                Donate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainCauses;
