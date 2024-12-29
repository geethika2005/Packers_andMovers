import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:5000/admin-bookings")
            .then((response) => {
                if (response.data.success) {
                    setBookings(response.data.bookings);
                } else {
                    setMessage("No bookings found.");
                }
            })
            .catch(() => setMessage("Error fetching bookings."));
    }, []);

    const handleCancelBooking = (bookingId) => {
        axios
            .post("http://localhost:5000/cancel-booking", { bookingId })
            .then((response) => {
                if (response.data.success) {
                    alert(response.data.message);
                    setBookings(bookings.filter((booking) => booking.booking_id !== bookingId));
                } else {
                    alert(response.data.message);
                }
            })
            .catch(() => {
                alert("Error canceling the booking.");
            });
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.background}></div>
            <div style={styles.container}>
                <div style={styles.headingContainer}>
                    <img src="./logo2-modified.png" alt="Logo" style={styles.logo} />
                    <h2 style={styles.heading}>Manage Bookings</h2>
                </div>
                <p style={styles.message}>{message}</p>

                {bookings.length > 0 ? (
                    <div style={styles.tableContainer}>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th>Booking ID</th>
                                    <th>User Name</th>
                                    <th>Company Name</th>
                                    <th>From Location</th>
                                    <th>To Location</th>
                                    <th>Cost</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking) => (
                                    <tr key={booking.booking_id} style={styles.tableRow}>
                                        <td>{booking.booking_id}</td>
                                        <td>{booking.username}</td>
                                        <td>{booking.company}</td>
                                        <td>{booking.from_location}</td>
                                        <td>{booking.to_location}</td>
                                        <td>{booking.cost}</td>
                                        <td>
                                            <button
                                                onClick={() => handleCancelBooking(booking.booking_id)}
                                                style={styles.cancelButton}
                                            >
                                                Cancel Booking
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div style={styles.emptyState}>
                        <p>No bookings available.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

// Styles
const styles = {
    wrapper: {
        position: "relative",
        minHeight: "100vh", // Ensure it covers the full viewport height
        overflow: "hidden",
    },
    background: {
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        background: "url('/bg2.jpg') no-repeat center center fixed",
        backgroundSize: "cover",
        filter: "blur(8px)", // Blur effect
        zIndex: "-1", // Ensures the background stays behind everything
    },
    container: {
        position: "relative", // Position relative to ensure proper stacking
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "1200px",
        margin: "50px auto", // Center the container with some margin from top
        backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent background for readability
        borderRadius: "10px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    },
    headingContainer: {
        display: "flex",
        alignItems: "center",
        marginBottom: "20px",
    },
    logo: {
        width: "80px",
        height: "auto",
        marginRight: "10px",
    },
    heading: {
        fontSize: "2.5rem",
        color: "#333",
    },
    message: {
        color: "red",
        textAlign: "center",
        fontSize: "1.1rem",
    },
    tableContainer: {
        width: "100%",
        overflowX: "auto",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        borderRadius: "10px",
        overflow: "hidden",
        backgroundColor: "#fff",
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
    },
    tableRow: {
        transition: "all 0.3s ease",
    },
    cancelButton: {
        padding: "8px 12px",
        backgroundColor: "#d9534f",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s",
    },
    emptyState: {
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#f2f2f2",
        borderRadius: "10px",
    },
};

export default ManageBooking;
