import React from "react";

const ThankYou = () => {
    return (
        <div style={outerContainerStyle}>
            <div style={boxStyle}>
                <div style={headerContainerStyle}>
                    <img 
                        src="/logo2-modified.png" 
                        alt="Logo" 
                        style={logoStyle} 
                    />
                    <h2 style={headingStyle}>Thank You for Your Order!</h2>
                </div>
                <p style={messageStyle}>
                    Your booking has been successfully completed.<br /> The receipt has been generated and saved.
                </p>
            </div>
        </div>
    );
};

// Inline Styles
const outerContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundImage: "url('/bg2.jpg')", // Background image (can be changed)
    backgroundSize: "cover",
    backgroundPosition: "center",
    margin: "0",
};

const boxStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.85)", // Light semi-transparent box
    padding: "40px 50px",
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    maxWidth: "600px",
    width: "100%",
    textAlign: "center",
};

const headerContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
};

const logoStyle = {
    width: "80px", // Adjust size of the logo as needed
    height: "80px",
    marginRight: "5px", // Space between logo and text
};

const headingStyle = {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#333",
    margin: "0", // Remove margin to align better with the logo
};

const messageStyle = {
    fontSize: "18px",
    color: "#555",
    lineHeight: "1.6",
    marginBottom: "20px",
};

export default ThankYou;
