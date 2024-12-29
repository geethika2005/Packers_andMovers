import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DynamicCostCalculator = () => {
    const [from, setFrom] = useState(""); // From location
    const [to, setTo] = useState("");     // To location
    const [weight, setWeight] = useState(0); // Weight input for dynamic cost
    const [serviceType, setServiceType] = useState("Standard"); // Service Type
    const [insurance, setInsurance] = useState(false); // Insurance option
    const [calculatedCost, setCalculatedCost] = useState(null); // Calculated cost
    const [error, setError] = useState(""); // Error handling
    const navigate = useNavigate();

    // Cost calculation logic
    const calculateDynamicCost = () => {
        if (weight <= 0) {
            setError("Please enter a valid weight.");
            return;
        }

        const weightCost = weight * 50; // ₹50 per kg for weight
        const insuranceCost = insurance ? 500 : 0; // ₹500 for insurance
        const serviceMultiplier = serviceType === "Premium" ? 1.5 : 1.0;

        const distance = 10; // Fixed distance (example)
        const baseCost = distance * 10; // ₹10 per km

        const dynamicTotalCost = (baseCost + weightCost + insuranceCost) * serviceMultiplier;

        setCalculatedCost(dynamicTotalCost.toFixed(2));
        setError(""); // Clear any error
    };

    // Navigate to the available services page
    const navigateToAvailableServices = () => {
        if (!from || !to) {
            setError("Please enter both 'From' and 'To' locations.");
            return;
        }

        navigate("/available-services", {
            state: { from, to }
        });
    };

    return (
        <div style={containerStyle}>
            <div style={headingContainerStyle}>
                <h2 style={headingStyle}>Dynamic Cost Calculator</h2>
            </div>
            <div style={formStyle}>
                <label style={labelStyle}>From Location:</label>
                <input
                    type="text"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    style={inputStyle}
                    placeholder="Enter From location"
                />

                <label style={labelStyle}>To Location:</label>
                <input
                    type="text"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    style={inputStyle}
                    placeholder="Enter To location"
                />

                <label style={labelStyle}>Weight (in kg):</label>
                <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    style={inputStyle}
                    min="0"
                />

                <label style={labelStyle}>Service Type:</label>
                <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    style={dropdownStyle}
                >
                    <option value="Standard">Standard</option>
                    <option value="Premium">Premium</option>
                </select>

                <label style={labelStyle}>
                    <input
                        type="checkbox"
                        checked={insurance}
                        onChange={(e) => setInsurance(e.target.checked)}
                    />
                    Include Insurance
                </label>

                <div style={buttonGroupStyle}>
                    <button onClick={calculateDynamicCost} style={buttonStyle}>
                        Calculate Cost
                    </button>

                    <button onClick={navigateToAvailableServices} style={buttonStyle}>
                        Go to Available Services
                    </button>
                </div>

                {calculatedCost && (
                    <div style={resultStyle}>
                        <h3>Estimated Cost: ₹{calculatedCost}</h3>
                    </div>
                )}

                {error && <p style={errorStyle}>{error}</p>}
            </div>
        </div>
    );
};

// Improved Styles

const containerStyle = { 
    textAlign: "center", 
    marginTop: "50px", 
    padding: "0 15px", 
    position: "relative", 
    minHeight: "100vh", 
    backgroundImage: "url('/bg2.jpg')", 
    backgroundSize: "cover", 
    backgroundPosition: "center", 
    backgroundRepeat: "no-repeat", // Prevents image repetition
    overflow: "hidden"
};

const headingContainerStyle = {
    display: "inline-block", 
    backgroundColor: "rgba(255, 255, 255, 0.7)", 
    padding: "5px 10px", 
    borderRadius: "8px", 
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)", 
    marginBottom: "20px",
    marginTop:"20px"
};

const headingStyle = {
    fontSize: "2.5rem",
    color: "#333",
    margin: "0",
    fontFamily: "'Roboto', sans-serif",
    textAlign: "center",
};

const formStyle = { 
    margin: "20px auto", 
    padding: "20px", 
    background: "rgba(255, 255, 255, 0.9)", 
    borderRadius: "12px", 
    width: "100%", 
    maxWidth: "600px",
    boxSizing: "border-box", 
    position: "relative", 
    zIndex: 2
};

const labelStyle = {
    display: "block", 
    marginBottom: "8px", 
    fontSize: "16px", 
    color: "#333", 
    fontWeight: "600"
};

const inputStyle = { 
    display: "block", 
    margin: "10px 0", 
    padding: "12px", 
    width: "100%", 
    borderRadius: "5px", 
    border: "1px solid #ccc", 
    fontSize: "16px",
};

const dropdownStyle = { 
    ...inputStyle, 
    fontSize: "16px" 
};

const buttonStyle = { 
    padding: "12px 20px", 
    backgroundColor: "#007bff", 
    color: "#fff", 
    border: "none", 
    borderRadius: "5px", 
    cursor: "pointer", 
    fontSize: "16px", 
    width: "100%",
    maxWidth: "220px",
    marginBottom: "10px", 
    transition: "background-color 0.3s ease, transform 0.2s ease"
};

const resultStyle = { 
    marginTop: "20px", 
    fontWeight: "bold", 
    fontSize: "18px" 
};

const errorStyle = { 
    color: "red", 
    marginTop: "10px", 
    fontSize: "14px" 
};

const buttonGroupStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    flexWrap: "wrap", 
    marginTop: "15px", 
};

export default DynamicCostCalculator;
