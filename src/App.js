import React,{useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";  // Make sure Home component is exported as default
import Options from "./components/Options";  // Make sure Options component is exported as default
import Login from "./components/Login";  // User Login (default export)
import AdminLogin from "./components/AdminLogin";  // Admin Login (default export)
import Register from "./components/Register";  // Registration (default export)
import Dashboard from "./components/Dashboard";  // Dashboard page (default export)
import CompanyList from "./components/CompanyList";  // Company List page (default export)
import AdminDashboard from "./components/AdminDashboard";  // Admin Dashboard page (default export)
import BookingHistory from "./components/BookingHistory";  // Booking History page (default export)
import ManageBookings from "./components/ManageBookings";  // Manage Bookings page (default export)
import AvailableServices from "./components/AvailableServices";  // Available Services page (default export)
import Booking from "./components/Booking";
import Receipt from "./components/Receipt";
import ThankYou from "./components/ThankYou";
import ChangePassword from "./components/ChangePassword";
import UserBookingHistory from "./components/UserBookingHistory";
import AdminFeedback from "./components/AdminFeedback";
import ViewUsers from "./components/ViewUsers";
import DynamicCostCalculator from "./components/DynamicCostCalculator";
import FakeChatBot from "./components/FakeChatBot";
import "bootstrap/dist/css/bootstrap.min.css";  // Import Bootstrap CSS

const App = () => {
    useEffect(() =>{
        document.title="Packers & Movers";
    },[]);
    return (
        <Router>
            <Routes>
                {/* Home and Options Pages */}
                <Route path="/" element={<Home />} />
                <Route path="/options" element={<Options />} />

                {/* Authentication Pages */}
                <Route path="/login" element={<Login />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/register" element={<Register />} />

                {/* Dashboard and Company List Pages */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/available-services" element={<AvailableServices />} />
                <Route path="/user-booking-history" element={<UserBookingHistory />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/dynamic-cost-calculator" element={<DynamicCostCalculator />} />
                <Route path="/fake-chat-bot" element={<FakeChatBot/>}/>


                {/* Admin Pages */}
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/company-list" element={<CompanyList />} />
                <Route path="/booking-history" element={<BookingHistory />} />
                <Route path="/manage-bookings" element={<ManageBookings />} />
                <Route path="/book" element={<Booking />} />
                <Route path="/receipt" element={<Receipt />} />
                <Route path="/thank-you" element={<ThankYou />} />
                <Route path="/admin-feedback" element={<AdminFeedback />} />
                <Route path="/view-users" element={<ViewUsers />} />
            </Routes>
        </Router>
    );
};

export default App;
