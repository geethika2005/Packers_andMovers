import React from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

// Initialize AOS for scroll animations
AOS.init();

const Home = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate("/options"); // Navigate to Options page
    };

    return (
        <div style={outerContainerStyle}>
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                style={backgroundVideoStyle}
                src="/bg.mp4" // Path to the video in the public folder
            />

            {/* Content Box */}
            <div style={contentStyle}>
                <div style={headingContainerStyle}>
                    <img
                        src="/logo2-modified.png" // Path to your logo in the public folder
                        alt="Truck Logo"
                        style={logoStyle}
                    />
                    <h1 style={headingStyle}><b>Welcome to</b> <br /><b>Packers & Movers</b></h1>
                </div>
                <p style={subTextStyle}>Your trusted partner for relocation services.</p>

                {/* Media Section */}
                <div style={mediaContainerStyle}>
                    <video
                        autoPlay
                        loop
                        muted
                        style={gifStyle}
                        src="/truck.mp4" // Another video for the flexbox content
                        alt="Packers and Movers Animation"
                    />
                </div>

                {/* Get Started Button */}
                <button onClick={handleGetStarted} style={buttonStyle}>
                    Get Started
                </button>
            </div>
        </div>
    );
};

// Styles
const outerContainerStyle = {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    overflow: "hidden",
    fontFamily: "Arial, sans-serif",
    padding: "0 20px",
};

const backgroundVideoStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: -1,
    filter: "blur(10px)",
    transform: "scale(1.1)",
    backgroundAttachment: "fixed", // Parallax effect
};

const contentStyle = {
    textAlign: "center",
    maxWidth: "600px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    zIndex: 1,
    transition: "transform 0.3s ease", // For smooth animation on hover
};

const headingContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "10px",
};

const logoStyle = {
    width: "80px", // Adjust size as needed
    height: "80px",
    marginRight: "5px",
};

const headingStyle = {
    fontSize: "2.5rem",
    color: "#007bff",
};

const subTextStyle = {
    fontSize: "1.2rem",
    color: "#555555",
    marginBottom: "20px",
};

const mediaContainerStyle = {
    marginBottom: "20px",
};

const gifStyle = {
    width: "100%",
    maxWidth: "300px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.3s ease", // Smooth effect on hover
};

const buttonStyle = {
    padding: "12px 25px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#ffffff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.2s",
};

buttonStyle["&:hover"] = {
    backgroundColor: "#0056b3",
    transform: "scale(1.1)", // Slightly increase the size on hover
};

export default Home;