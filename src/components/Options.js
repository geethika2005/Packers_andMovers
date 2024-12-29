import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Options = () => {
    const [hover, setHover] = useState(false);
    const navigate = useNavigate();

    const handleMouseEnter = () => setHover(true);
    const handleMouseLeave = () => setHover(false);

    return (
        <div style={containerStyle}>
            <div style={overlayStyle}></div> {/* Overlay for better visibility */}
            <div style={contentContainerStyle}>
                <h2 style={headerStyle}>Select an Option</h2>
                <div style={buttonsContainerStyle}>
                    <button
                        style={hover ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
                        onClick={() => navigate("/admin-login")}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        Admin Login
                    </button>
                    <button
                        style={hover ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
                        onClick={() => navigate("/login")}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        User Login
                    </button>
                    <button
                        style={hover ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
                        onClick={() => navigate("/register")}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
};

// Inline Styles with media queries for responsiveness
const containerStyle = {
    position: "relative",
    width: "100%",
    height: "100vh",
    backgroundImage: "url('/bg2.jpg')", // Fixed background image
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
};

const overlayStyle = {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
    backdropFilter: "blur(10px)", // Blurs the background
    zIndex: 1,
    animation: "pulse 2s infinite alternate",  // Animated overlay
};

const contentContainerStyle = {
    position: "relative",
    zIndex: 2,
    textAlign: "center",
    color: "#fff",
    padding: "0 20px",
    animation: "fadeIn 1s ease-in-out",
};

const headerStyle = {
    fontSize: "2.5rem", // Fixed header size
    color: "#fff",
    marginBottom: "30px",
    fontWeight: "600",
    textTransform: "uppercase",
};

const buttonsContainerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    alignItems: "center",
};

const buttonStyle = {
    padding: "15px 20px",
    fontSize: "18px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.2s, box-shadow 0.2s",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "200px", 
    textAlign: "center",
};

const buttonHoverStyle = {
    backgroundColor: "#0056b3",
    transform: "scale(1.05)",  // Adds scaling on hover
    boxShadow: "0 6px 10px rgba(0, 0, 0, 0.2)", // Hover shadow
    animation: "bounce 0.3s ease-in-out",  // Bounce animation
};

// Keyframes for fade and pulse animations
const animationStyle = {
    "@keyframes fadeIn": {
        "0%": { opacity: 0, transform: "translateY(30px)" },
        "100%": { opacity: 1, transform: "translateY(0)" },
    },
    "@keyframes pulse": {
        "0%": { backgroundColor: "rgba(0, 0, 0, 0.3)" },
        "100%": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
    },
    "@keyframes bounce": {
        "0%": { transform: "scale(1)" },
        "50%": { transform: "scale(1.1)" },
        "100%": { transform: "scale(1)" },
    },
};

export default Options;