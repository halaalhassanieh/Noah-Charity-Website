import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/auth/authSlice";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex items-center justify-center bg-gray-100 font-vietnam px-6 h-screen">
      <div className="custom-container w-full max-w-2xl bg-white p-12 rounded-2xl shadow-custom border border-gray-300">
        <h2 className="text-3xl font-bold text-center text-red-wine mb-10">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 text-lg">
          {error && (
            <p className="text-red-500 text-center font-medium">{error}</p>
          )}

          <div>
            <label className="block text-gray-600 mb-2 text-xl">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-2 text-xl">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-xl"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-wine text-white py-4 text-xl rounded-xl"
          >
            {loading ? "Logging In..." : "Login"}
          </button>

          <p className="text-md text-center text-gray-600 mt-6">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-red-wine hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
