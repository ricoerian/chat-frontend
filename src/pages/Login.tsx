import { useState, useEffect } from "react";
import { login } from "../services/authService";
import { useAuthStore } from "../store/authStore";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useToast } from "../context/ToastContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { token, setToken, setIdUser, setUsername: setUsernamee } = useAuthStore();
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    if (token) {
      navigate("/chat");
    }
  }, [token, navigate]);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      showToast("Username and password must be filled!", "error");
      return;
    }

    setLoading(true);
    try {
      const data = await login(username, password);
      setToken(data.token);
      setIdUser(data.user_id);
      setUsernamee(data.username);
      showToast("Login successful!", "success");
      navigate("/chat");
    } catch {
      showToast("Login failed! Please check your username and password.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">Login</h2>

        <div className="flex flex-col gap-4">
          <input
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 p-3 rounded-lg text-white cursor-pointer"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-gray-600 text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register here!
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;