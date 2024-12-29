import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        if (!username || !password) {
            setMessage("All fields are required!");
            return;
        }

        // Send login request to the backend
        axios
            .post("http://localhost:5000/admin-login", { username, password })
            .then((response) => {
                if (response.data.success) {
                    setMessage("Login successful!");
                    navigate("/admin-dashboard");
                } else {
                    setMessage(response.data.message || "Invalid credentials.");
                }
            })
            .catch((error) => {
                console.error("Login error:", error);
                setMessage("An error occurred. Please try again.");
            });
    };

    return (
        <div style={styles.container}>
            <div style={styles.overlay}></div>
            <div style={styles.card}>
                {/* Header Section */}
                <div style={styles.headerContainer}>
                    <img src="/logo2-modified.png" alt="Logo" style={styles.logo} />
                    <h2 style={styles.header}>Admin Login</h2>
                </div>
                {/* Input Fields */}
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                />
                <button onClick={handleLogin} style={styles.button}>
                    Login
                </button>
                {message && <p style={styles.message}>{message}</p>}
            </div>
        </div>
    );
};

const styles = {
    container: {
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        overflow: "hidden",
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage: "url('/bg2.jpg')", // Background image path
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "blur(8px)", // Apply the blur effect here
        zIndex: 1,
    },
    card: {
        position: "relative",
        zIndex: 2,
        backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent background for the login card
        borderRadius: "10px",
        padding: "30px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
        textAlign: "center",
        width: "90%",
        maxWidth: "400px",
    },
    headerContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start", // Align logo and text to the left
        marginBottom: "20px",
        gap: "10px", // Add space between logo and text
    },
    logo: {
        width: "80px", // Adjust size as needed
        height: "80px",
    },
    header: {
        fontSize: "24px",
        fontWeight: "600",
        color: "#333",
    },
    input: {
        margin: "10px 0",
        padding: "15px",
        width: "100%",
        borderRadius: "5px",
        border: "1px solid #ccc",
        fontSize: "16px",
        boxSizing: "border-box",
    },
    button: {
        marginTop: "20px",
        padding: "15px 20px",
        fontSize: "16px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        width: "100%",
        fontWeight: "600",
        transition: "background-color 0.3s ease",
    },
    message: {
        marginTop: "15px",
        fontSize: "14px",
        color: "red",
        textAlign: "center",
    },
};

export default AdminLogin;