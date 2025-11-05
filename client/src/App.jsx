import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import AddStory from "./pages/AddStory";
import Player from "./pages/Player";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./context/ThemeContext";
export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/add" element={<AddStory />} />
        <Route path="/player/:id" element={<Player />} />
      </Routes>
    </Router>
  );
}
