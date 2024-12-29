import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const AvailableServices = () => {
    const [companies, setCompanies] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const location = useLocation(); // Get passed location data
    const navigate = useNavigate();

    // Destructure 'from' and 'to' locations from location.state, with fallback to empty strings
    const { from, to } = location.state || { from: "", to: "" };

    // Fetch companies based on locations
    useEffect(() => {
        if (from && to) {
            // Fetch companies based on locations
            axios
                .get(`http://localhost:5000/available-services?from=${from}&to=${to}`)
                .then((response) => {
                    if (response.data.success) {
                        setCompanies(response.data.companies);
                    } else {
                        setErrorMessage(response.data.message || "No services found.");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching services:", error);
                    setErrorMessage("An error occurred while fetching services.");
                });
        } else {
            setErrorMessage("Invalid locations. Please provide both From and To locations.");
        }
    }, [from, to]);

    const handleBook = (company) => {
        // Navigating to booking page and passing company and location data
        navigate("/book", { state: { company, from, to } });
    };

    useEffect(() => {
        // Set background image and other styles
        document.body.style.backgroundImage = "url('/bg2.jpg')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.height = "100vh";
        document.body.style.margin = "0";

        // Create a div element for the blurred background overlay
        const blurDiv = document.createElement("div");
        blurDiv.style.position = "absolute";
        blurDiv.style.top = "0";
        blurDiv.style.left = "0";
        blurDiv.style.width = "100%";
        blurDiv.style.height = "100%";
        blurDiv.style.backgroundImage = "url('/bg2.jpg')";
        blurDiv.style.backgroundSize = "cover";
        blurDiv.style.backgroundPosition = "center";
        blurDiv.style.filter = "blur(8px)";
        blurDiv.style.zIndex = "-1"; // Keep it behind the content

        document.body.appendChild(blurDiv);

        // Cleanup the blur div when the component unmounts
        return () => {
            document.body.removeChild(blurDiv);
        };
    }, []); // Empty dependency array to run only once when the component mounts

    return (
        <div style={containerStyle}>
            <h2 style={headingStyle}>
                <span style={headingBoxStyle}>Available Services</span>
            </h2>
            {errorMessage ? (
                <p style={errorStyle}>{errorMessage}</p>
            ) : (
                <div style={tableContainerStyle}>
                    <div style={scrollableTableWrapperStyle}>
                        <table style={tableStyle}>
                            <thead>
                                <tr>
                                    <th>Company Name</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Cost</th>
                                    <th>Phone</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {companies.map((company) => (
                                    <tr key={company.company_name} style={tableRowStyle}>
                                        <td>{company.company_name}</td>
                                        <td>{company.from_location}</td>
                                        <td>{company.to_location}</td>
                                        <td>₹{company.cost_per_km}</td>
                                        <td>{company.phone_number}</td>
                                        <td>
                                            <button
                                                onClick={() => handleBook(company)}
                                                style={buttonStyle}
                                            >
                                                Book Now
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

// Inline Styles
const containerStyle = {
    textAlign: "center",
    marginTop: "30px",
    position: "relative",
    zIndex: 1,
    color: "#000", // Ensure text color is visible
};

const headingStyle = {
    fontSize: "32px", // Increase heading size
    fontWeight: "bold",
    marginBottom: "20px",
    zIndex: 10, // Ensure it stays above the background
    position: "relative",
};

const headingBoxStyle = {
    display: "inline-block",
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Light semi-transparent box
    padding: "10px 20px",
    borderRadius: "8px", // Rounded corners
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Subtle shadow
};

const tableContainerStyle = {
    position: "relative", // Ensure content is above the background
    zIndex: 2, // Ensure table is on top of any background images
};

const scrollableTableWrapperStyle = {
    overflowX: "auto", // Allow horizontal scrolling for small screens
    WebkitOverflowScrolling: "touch", // Enable smooth scrolling on iOS
    padding: "0 10px", // Add some padding for smaller screens
};

const tableStyle = {
    margin: "auto",
    borderCollapse: "collapse",
    width: "100%",
    maxWidth: "1000px", // Limit the width of the table
    border: "1px solid #ddd",
    backgroundColor: "#fff", // Light background for table
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for the table
};

const buttonStyle = {
    padding: "6px 12px",
    fontSize: "14px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
};

const tableRowStyle = {
    transition: "background-color 0.3s", // Smooth transition for hover effect
};

const errorStyle = {
    color: "red",
};

export default AvailableServices;
