import React, { useState, useEffect } from "react";
import axios from "axios";

const BookingHistory = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch booking history
    useEffect(() => {
        axios
            .get("http://localhost:5000/admin-bookings") // Backend endpoint
            .then((response) => {
                if (response.data.success) {
                    setBookings(response.data.bookings);
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.error("Error fetching booking history:", error);
                setLoading(false);
            });
    }, []);

    return (
        <div style={styles.background}>
            <div style={styles.overlay}>
                <div className="container mt-5 p-4" style={styles.container}>
                    <div style={styles.headerContainer}>
                        <img 
                            src="/logo2-modified.png" 
                            alt="Logo" 
                            style={styles.logo} 
                        />
                        <h2 className="text-center mb-4" style={styles.header}>Booking History</h2>
                    </div>
                    {loading ? (
                        <div style={styles.spinner}>Loading...</div> // Loading indicator
                    ) : (
                        <div className="table-responsive" style={styles.tableContainer}>
                            <table className="table table-bordered" style={styles.table}>
                                <thead className="thead-dark">
                                    <tr>
                                        <th>Booking ID</th>
                                        <th>Username</th>
                                        <th>From</th>
                                        <th>To</th>
                                        <th>Company</th>
                                        <th>Cost</th>
                                        <th>Booking Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.map((booking) => (
                                        <tr key={booking.booking_id} style={styles.tableRowHover}>
                                            <td>{booking.booking_id}</td>
                                            <td>{booking.username || "N/A"}</td>
                                            <td>{booking.from_location}</td>
                                            <td>{booking.to_location}</td>
                                            <td>{booking.company}</td>
                                            <td>₹{booking.cost}</td>
                                            <td>{new Date(booking.booking_date).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    background: {
        minHeight: "100vh",
        backgroundImage: "url('/bg2.jpg')", // Background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    overlay: {
        position: "absolute", // Ensures the overlay covers the entire background
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backdropFilter: "blur(8px)", // Apply the blur to the whole background
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
    },
    container: {
        backgroundColor: "rgba(255, 255, 255, 0.85)", // Slightly transparent white background
        borderRadius: "10px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "1100px",
        padding: "30px",
        textAlign: "center",
    },
    headerContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "15px",
        marginBottom: "20px",
    },
    logo: {
        width: "80px", // Adjust the size of the logo
        height: "80px",
    },
    header: {
        fontSize: "2.5rem",
        fontWeight: "bold",
        color: "#333",
        textShadow: "1px 1px 5px rgba(0, 0, 0, 0.2)",
        marginBottom: "20px",
    },
    tableContainer: {
        maxHeight: "500px",
        overflowY: "auto",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    },
    th: {
        backgroundColor: "#007BFF",
        color: "#fff",
        padding: "12px 15px",
        textAlign: "center",
        fontWeight: "bold",
    },
    td: {
        padding: "12px 15px",
        textAlign: "center",
        fontSize: "0.9rem",
    },
    tableRowHover: {
        backgroundColor: "#f5f5f5", // Light grey on hover
        cursor: "pointer",
    },
    spinner: {
        fontSize: "2rem",
        color: "#333",
        textAlign: "center",
        marginTop: "50px",
    },
    "@media (max-width: 768px)": {
        container: {
            padding: "15px",
        },
        logo: {
            width: "60px",
            height: "60px",
        },
        header: {
            fontSize: "2rem",
        },
        table: {
            fontSize: "0.9rem",
        },
        th: {
            padding: "8px 10px",
        },
        td: {
            padding: "8px 10px",
        },
    },
};

export default BookingHistory;
