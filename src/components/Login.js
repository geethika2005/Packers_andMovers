import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        if (!username || !password) {
            setMessage("All fields are required!");
            return;
        }

        axios
            .post("http://localhost:5000/login", { username, password })
            .then((response) => {
                console.log("API Response:", response.data);
                if (response.data.success) {
                    setMessage("Login successful!");

                    // Save the userId to localStorage
                    localStorage.setItem("userId", response.data.user.id);

                    // Redirect to the dashboard
                    navigate("/dashboard");
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
        <div style={containerStyle}>
            {/* Background image with blur */}
            <div style={backgroundImageStyle}></div>

            <div style={formContainerStyle}>
                <div style={headerContainerStyle}>
                    <img
                        src="/logo2-modified.png"
                        alt="Logo"
                        style={logoStyle}
                    />
                    <h2 style={headerStyle}>User Login</h2>
                </div>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={inputStyle}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={inputStyle}
                />
                <button onClick={handleLogin} style={buttonStyle}>
                    Login
                </button>
                {message && <p style={messageStyle}>{message}</p>}
            </div>
        </div>
    );
};

// Inline Styles
const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontFamily: "'Roboto', sans-serif",
    padding: "0 20px",
    position: "relative", // Ensure content layers above background
    overflow: "hidden", // Prevent overflow
};

const backgroundImageStyle = {
    position: "absolute", // Positioning background behind content
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    background: "url('/bg2.jpg') no-repeat center center fixed", // Path to your image
    backgroundSize: "cover", // Cover the entire viewport
    filter: "blur(10px)", // Apply blur effect
    zIndex: -1, // Ensure it stays behind the content
};

const formContainerStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    width: "100%",
    textAlign: "center",
    boxSizing: "border-box",
    zIndex: 1, // Ensure the form stays above the background
    overflow:"hidden",
};

const headerContainerStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
    // Modify this to move logo to the left
    justifyContent: "flex-start", // Align logo and heading to the left
};

const logoStyle = {
    width: "80px", // Adjust the logo size as needed
    height: "80px", // Adjust the logo size as needed
    marginRight: "10px", // Space between logo and text
};

const headerStyle = {
    fontSize: "2rem",
    color: "#333",
};

const inputStyle = {
    margin: "10px 0",
    padding: "12px",
    width: "100%",
    borderRadius: "8px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
    fontSize: "1rem",
    transition: "border-color 0.3s ease",
};

const buttonStyle = {
    margin: "15px 0",
    padding: "12px 20px",
    fontSize: "1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    width: "100%",
    transition: "background-color 0.3s ease, transform 0.2s",
    outline: "none",
};

const messageStyle = {
    marginTop: "10px",
    color: "#f44336", // Red color for error message
    fontSize: "1rem",
};

export default Login;