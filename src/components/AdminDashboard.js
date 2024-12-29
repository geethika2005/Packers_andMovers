import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate();

    // Functions to navigate to respective pages
    const navigateToCompanyList = () => navigate("/company-list");
    const navigateToBookingHistory = () => navigate("/booking-history");
    const navigateToManageBookingHistory = () => navigate("/manage-bookings");
    const navigateToViewUsers = () => navigate("/view-users");

    return (
        <div style={styles.background}>
            <div style={styles.overlay}>
                <div className="container mt-5 p-4" style={styles.container}>
                    <div className="d-flex align-items-center" style={styles.headerContainer}>
                        <img
                            src="/logo2-modified.png"
                            alt="Logo"
                            style={styles.logo}
                        />
                        <h2 className="text-center" style={styles.header}>
                            Admin Dashboard
                        </h2>
                    </div>

                    <div className="d-flex flex-column align-items-center mt-4">
                        <button
                            onClick={navigateToCompanyList}
                            className="btn btn-primary btn-lg mb-3"
                            style={styles.button}
                        >
                            View Company List
                        </button>
                        <button
                            onClick={navigateToBookingHistory}
                            className="btn btn-primary btn-lg mb-3"
                            style={styles.button}
                        >
                            View Booking History
                        </button>
                        <button
                            onClick={navigateToManageBookingHistory}
                            className="btn btn-primary btn-lg mb-3"
                            style={styles.button}
                        >
                            Manage Booking History
                        </button>
                        <button
                            onClick={() => navigate("/admin-feedback")}
                            className="btn btn-primary btn-lg mb-3"
                            style={styles.button}
                        >
                            View Feedback
                        </button>
                        <button
                            onClick={navigateToViewUsers}
                            className="btn btn-primary btn-lg mb-3"
                            style={styles.button}
                        >
                            View Users
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Custom styles
const styles = {
    background: {
        minHeight: "100vh",
        backgroundImage: "url('/bg2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
    },
    overlay: {
        minHeight: "100vh",
        width: "100%",
        backdropFilter: "blur(8px)", // Blurs the background image
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    container: {
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: "15px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
        padding: "30px",
        width: "100%",
        maxWidth: "500px",
        textAlign: "center",
    },
    headerContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center", // Ensures the heading is centered
        gap: "10px", // Adds space between the logo and the title
    },
    logo: {
        height: "80px",
        width: "80px",
        objectFit: "contain",
    },
    header: {
        fontSize: "2rem",
        fontWeight: "bold",
        color: "#333",
        textShadow: "1px 1px 5px rgba(0, 0, 0, 0.2)",
    },
    button: {
        padding: "15px 20px",
        fontSize: "18px",
        borderRadius: "8px",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
        transition: "all 0.3s ease",
        width: "100%",
    },
};

export default AdminDashboard;
