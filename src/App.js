import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HouseGrid from "./components/HouseGrid";
import HouseDetails from "./pages/HouseDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import MyBookings from "./pages/MyBookings";
import Verify from "./pages/Verify";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import Dashboard from "./pages/admin/Dashboard";
import AdminHouses from "./pages/admin/AdminHouses";
import AdminBookings from "./pages/admin/AdminBookings";



function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/bookings" element={<AdminBookings/>}/>
        <Route path="/admin/houses" element={<AdminHouses />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify/:token" element={<Verify />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset/:token" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/bookings" element={<MyBookings />} />
        <Route path="/" element={<Home />} />
        <Route path="/house/:id" element={<HouseDetails />} />
      </Routes>
    </Router>
  );
}

export default App;