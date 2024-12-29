import React, { useEffect, useState } from "react";
import axios from "axios";

const UserBookingHistory = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem("userId"); // Get userId from localStorage
    console.log("User ID:", userId);

    useEffect(() => {
        // Fetch user booking history from the server
        axios
            .get(`http://localhost:5000/user-bookings?userId=${userId}`)
            .then((response) => {
                if (response.data.success) {
                    setBookings(response.data.bookings);
                } else {
                    setError("No bookings found.");
                }
            })
            .catch(() => {
                setError("Error fetching booking history.");
            });
    }, [userId]);

    return (
        <div style={styles.container}>
            <div style={styles.tableWrapper}>
                <h2 style={styles.heading}>User Booking History</h2>
                {error ? (
                    <p>{error}</p>
                ) : bookings.length > 0 ? (
                    <table className="table table-bordered mt-3" style={styles.table}>
                        <thead className="thead-dark">
                            <tr>
                                <th>Company</th>
                                <th>From Location</th>
                                <th>To Location</th>
                                <th>Cost</th>
                                <th>Booking Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
                                <tr key={booking.booking_id}>
                                    <td>{booking.company}</td>
                                    <td>{booking.from_location}</td>
                                    <td>{booking.to_location}</td>
                                    <td>₹{booking.cost}</td>
                                    <td>{new Date(booking.booking_date).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No booking history available.</p>
                )}
            </div>
        </div>
    );
};

// Styles
const styles = {
    container: {
        padding: "20px",
        backgroundImage: "url('/bg2.jpg')", // Add background image
        backgroundSize: "cover", // Cover the entire container
        backgroundPosition: "center",
        minHeight: "100vh", // Ensure it takes the full height of the page
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    tableWrapper: {
        backgroundColor: "rgba(255, 255, 255, 0.8)", // Light background for table area
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        width: "80%", // Make the table width responsive
        maxWidth: "1000px", // Maximum width for large screens
    },
    heading: {
        textAlign: "center",
        marginBottom: "20px",
        fontSize: "24px",
        color: "#007bff", // Blue color for heading
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
    },
};

export default UserBookingHistory;
