import { useState } from "react";
import API from "../api/storyApi";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", { username, password });
      localStorage.setItem("adminToken", res.data.token);
      navigate("/admin/dashboard");
    } catch {
      alert("Invalid login");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-6 rounded-lg w-80"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="border p-2 w-full rounded mb-3"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full rounded mb-3"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-indigo-600 text-white p-2 w-full rounded hover:bg-indigo-700">
          Login
        </button>
      </form>
    </div>
  );
}
