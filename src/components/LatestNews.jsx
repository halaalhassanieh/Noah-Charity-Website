import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchBlogs } from "../redux/blogs/blogsSlice";

const LatestNews = ({
  blogsnumber = 3,
  displayButton = true,
  displaySearch = true,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { blogs, loading } = useSelector((state) => state.blogs);

  const [selectedBlog, setSelectedBlog] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const blogsPerPage = blogsnumber;

  useEffect(() => {
    if (!blogs.length) {
      dispatch(fetchBlogs());
    }
  }, [dispatch, blogs.length]);

  // Filter
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  if (loading) {
    return (
      <div className="p-8 font-vietnam text-center text-gray/600">
        Loading blogs...
      </div>
    );
  }

  return (
    <div className="custom-tap:py-[80px] py-[70px]">
      <div className="custom-container">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b-4 border-black">
          <h2 className="custom-xl:text-[50px] custom-tap:text-[45px] text-[40px] text-black font-bold pb-3 custom-tap:w-2/3 w-3/4">
            Latest News and Blog
          </h2>

          {displayButton && (
            <button
              onClick={() => navigate("/news")}
              className="text-black border-2 border-black px-4 py-2 rounded-lg text-sm font-bold transition hover:bg-black hover:text-white"
            >
              More news
            </button>
          )}
        </div>

        {/* Search */}
        {displaySearch && (
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search blogs by title..."
            className="w-full mb-6 p-2 text-sm border border-gray-600 rounded-lg focus:outline-none focus:border-red-wine"
          />
        )}

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 custom-tap:grid-cols-2 custom-xl:grid-cols-3 gap-6">
          {paginatedBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition flex flex-col justify-between"
            >
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full max-h-60 object-cover rounded-lg mb-4"
                />
              )}

              <div>
                <div className="text-sm text-black/60 space-y-1">
                  <p>
                    <strong>Created:</strong>{" "}
                    {new Date(blog.createdAt).toLocaleString()}
                  </p>
                </div>

                <h3 className="text-xl font-bold text-black mb-1">
                  {blog.title}
                </h3>

                <p className="text-gray/600 mb-2 max-h-5 line-clamp-3">
                  {blog.description}
                </p>
              </div>

              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => setSelectedBlog(blog)}
                  className="w-full bg-red-wine text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-5 space-x-2">
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
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedBlog(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-2">
              {selectedBlog.title}
            </h2>

            <p className="text-sm text-black/60 mb-4">
              {new Date(selectedBlog.createdAt).toLocaleString()}
            </p>

            {selectedBlog.image && (
              <img
                src={selectedBlog.image}
                alt={selectedBlog.title}
                className="w-full mb-4 rounded"
              />
            )}

            <p className="text-black whitespace-pre-wrap">
              {selectedBlog.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LatestNews;
