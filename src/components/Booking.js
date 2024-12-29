import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Booking = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { company, from, to } = location.state || {};
    const userId = localStorage.getItem("userId");

    const [userData, setUserData] = useState({
        username: "",
        email: "",
        phone: "",
    });

    const [receipt, setReceipt] = useState("");
    const [message, setMessage] = useState("");

    const totalCost = company.cost_per_km * 10;

    // Fetch user data when the page loads
    useEffect(() => {
        if (userId) {
            axios
                .get(`http://localhost:5000/profile?userId=${userId}`)
                .then((response) => {
                    if (response.data.success) {
                        setUserData(response.data.profile);
                    } else {
                        setMessage("Failed to fetch user data.");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                    setMessage("Error fetching user data.");
                });
        }
    }, [userId]);

    const generateReceipt = () => {
        const receiptDetails = `
            User: ${userData.username}
            Email: ${userData.email}
            Phone: ${userData.phone}

            Company: ${company.company_name}
            From: ${from}
            To: ${to}
            Cost per km: ₹${company.cost_per_km}
            Total Cost: ₹${totalCost}
        `;
        setReceipt(receiptDetails);
    };

    const handleBooking = () => {
        if (!userId || !from || !to || !company || !company.cost_per_km) {
            setMessage("Missing booking details. Please try again.");
            return;
        }

        axios
            .post("http://localhost:5000/book", {
                userId,
                companyName: company.company_name,
                fromLocation: from,
                toLocation: to,
                cost: totalCost,
            })
            .then((response) => {
                if (response.data.success) {
                    alert("Booking successful!");
                    generateReceipt();
                } else {
                    setMessage(response.data.message || "Booking failed. Please try again.");
                }
            })
            .catch((error) => {
                console.error("Error during booking:", error);
                setMessage("An error occurred while processing your booking.");
            });
    };

    const saveReceipt = () => {
        const blob = new Blob([receipt], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "receipt.txt";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        localStorage.setItem("receipt", receipt);
        navigate("/thank-you");
    };

    return (
        <div style={backgroundStyle}>
            <div style={transparentBoxStyle}>
                <div style={cardStyle}>
                    <h2 style={headingStyle}>Booking Details</h2>
                    <div style={detailsContainerStyle}>
                        <p><strong>User:</strong> {userData.username}</p>
                        <p><strong>Email:</strong> {userData.email}</p>
                        <p><strong>Phone:</strong> {userData.phone}</p>

                        <p><strong>Company:</strong> {company.company_name}</p>
                        <p><strong>From:</strong> {from}</p>
                        <p><strong>To:</strong> {to}</p>
                        <p><strong>Cost per km:</strong> ₹{company.cost_per_km}</p>
                        <p><strong>Total Cost:</strong> ₹{totalCost}</p>
                    </div>

                    <div style={buttonContainerStyle}>
                        <button onClick={handleBooking} style={buttonStyle}>
                            Book Now
                        </button>
                    </div>

                    {receipt && (
                        <div style={receiptCardStyle}>
                            <h3 style={receiptHeadingStyle}>Receipt</h3>
                            <pre style={receiptStyle}>{receipt}</pre>
                            <div style={buttonContainerStyle}>
                                <button onClick={saveReceipt} style={buttonStyle}>
                                    Save Receipt
                                </button>
                            </div>
                        </div>
                    )}

                    {message && <p style={errorStyle}>{message}</p>}
                </div>
            </div>
        </div>
    );
};

// Styles remain the same as provided earlier
const backgroundStyle = {
    backgroundImage: "url('/bg2.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0",
    fontFamily: "'Poppins', sans-serif",
};

const transparentBoxStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    maxWidth: "600px",
    width: "90%",
    textAlign: "center",
};

const cardStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: "20px 30px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
};

const headingStyle = { marginBottom: "20px", fontSize: "24px", fontWeight: "600" };
const detailsContainerStyle = { marginBottom: "20px", fontSize: "16px", lineHeight: "1.6" };
const buttonContainerStyle = { display: "flex", justifyContent: "center" };
const buttonStyle = { padding: "10px 20px", backgroundColor: "#28a745", color: "#fff", border: "none", borderRadius: "50px", cursor: "pointer" };
const receiptCardStyle = { backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "12px", marginTop: "20px" };
const receiptHeadingStyle = { fontSize: "20px", fontWeight: "600", textAlign: "center" };
const receiptStyle = { backgroundColor: "#d3f9d8", padding: "15px", borderRadius: "8px", textAlign: "left", lineHeight: "1.6" };
const errorStyle = { color: "red", marginTop: "15px", textAlign: "center" };

export default Booking;
