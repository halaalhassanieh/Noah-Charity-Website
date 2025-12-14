import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Make sure it's installed: npm install axios

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await axios.post("https://hope-lfey.onrender.com/api/auth/register", {
        userName,
        email,
        password,
      });

      setSuccess("Account created successfully, you can now Click the Login button to enter your account:");
      setUserName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 font-vietnam py-4 px-4">
      <div className="custom-container w-full max-w-2xl bg-white p-9 rounded-2xl shadow-custom border border-gray-300">
        <h2 className="text-4xl font-bold text-center text-red-wine mb-8">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8 text-lg">
          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-600 text-center">{success}</p>}

          <div>
            <label htmlFor="userName" className="block text-gray-600 mb-1 text-xl">
              Username
            </label>
            <input
              id="userName"
              name="userName"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="w-full px-6 py-4 border border-gray-300 rounded-xl bg-white/60 text-black focus:outline-none focus:ring-4 focus:ring-red-wine"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-600 mb-1 text-xl">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full px-5 py-4 border border-gray-300 rounded-xl bg-white/60 text-black focus:outline-none focus:ring-4 focus:ring-red-wine"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-600 mb-1 text-xl">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="w-full px-5 py-4 border border-gray-300 rounded-xl bg-white/60 text-black focus:outline-none focus:ring-4 focus:ring-red-wine"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-red-300" : "bg-red-wine hover:bg-red-wine"
            } text-white py-3 text-xl rounded-xl transition duration-200 font-semibold`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          <p className="text-md text-center text-gray-600 ">
            Already have an account?{" "}
            <Link to="/login" className="text-red-wine hover:underline font-medium">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
