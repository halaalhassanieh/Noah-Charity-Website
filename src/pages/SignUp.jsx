import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../redux/auth/authSlice";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup({ userName, email, password }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex items-center justify-center bg-gray-100 font-vietnam py-4 px-4">
      <div className="custom-container w-full max-w-2xl bg-white p-9 rounded-2xl shadow-custom border border-gray-300">
        <h2 className="text-4xl font-bold text-center text-red-wine mb-8">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8 text-lg">
          {error && (
            <p className="text-red-500 text-center font-medium">{error}</p>
          )}

          <div>
            <label className="block text-gray-600 mb-1 text-xl">Username</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="w-full px-6 py-4 border border-gray-300 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1 text-xl">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-5 py-4 border border-gray-300 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1 text-xl">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-5 py-4 border border-gray-300 rounded-xl"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-wine text-white py-3 text-xl rounded-xl"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          <p className="text-md text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-red-wine hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
