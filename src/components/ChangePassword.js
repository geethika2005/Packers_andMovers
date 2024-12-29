import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId"); // Get the userId from localStorage

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");

    const handlePasswordChange = () => {
        axios
            .post("http://localhost:5000/change-password", { userId, currentPassword, newPassword })
            .then((response) => {
                setMessage(response.data.message);
                if (response.data.success) {
                    navigate("/dashboard"); // Redirect to Dashboard on success
                }
            })
            .catch((error) => {
                console.error("Error changing password:", error);
                setMessage("Error changing password.");
            });
    };

    return (
        <div style={styles.container}>
            <div style={styles.formWrapper}>
                <h2 style={styles.heading}>Change Password</h2>
                <div style={styles.inputWrapper}>
                    <label style={styles.label}>Current Password:</label>
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputWrapper}>
                    <label style={styles.label}>New Password:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        style={styles.input}
                    />
                </div>
                <button onClick={handlePasswordChange} style={styles.button}>
                    Change Password
                </button>
                {message && <p style={styles.message}>{message}</p>}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundImage: "url('/bg2.jpg')", // Background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        textAlign: "center",
    },
    formWrapper: {
        backgroundColor: "rgba(255, 255, 255, 0.8)", // Slight transparency for form background
        padding: "40px 50px",
        borderRadius: "10px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
        width: "100%",
        maxWidth: "500px", // Max width for the form to keep it compact
    },
    heading: {
        marginBottom: "30px",
        color: "#007bff",
        fontSize: "24px",
        fontWeight: "bold",
    },
    inputWrapper: {
        marginBottom: "20px",
        textAlign: "left",
    },
    label: {
        fontSize: "14px",
        color: "#333",
        marginBottom: "5px",
        display: "block",
    },
    input: {
        padding: "10px",
        fontSize: "14px",
        width: "100%",
        borderRadius: "5px",
        border: "1px solid #ccc",
        marginBottom: "10px",
        boxSizing: "border-box", // To include padding in width
    },
    button: {
        padding: "10px 20px",
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        width: "100%",
        fontSize: "16px",
        transition: "background-color 0.3s ease",
    },
    buttonHover: {
        backgroundColor: "#218838",
    },
    message: {
        marginTop: "20px",
        color: "#d9534f", // Red color for error or success messages
        fontSize: "14px",
    },
};

export default ChangePassword;
