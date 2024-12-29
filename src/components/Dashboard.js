import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [activeSection, setActiveSection] = useState("search");
    const [profile, setProfile] = useState({
        username: "",
        email: "",
        phone: "",
        address: "",
    });
    const [newProfile, setNewProfile] = useState(profile);
    const [feedbackText, setFeedbackText] = useState("");
    const [feedbacks, setFeedbacks] = useState([]);
    const [message, setMessage] = useState("");
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();

    const [cities, setCities] = useState([]);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [fromCustom, setFromCustom] = useState("");
    const [toCustom, setToCustom] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const fetchUserFeedbacks = useCallback(() => {
        axios
            .get(`http://localhost:5000/user-feedbacks?userId=${userId}`)
            .then((response) => {
                if (response.data.success) {
                    setFeedbacks(response.data.feedbacks);
                }
            })
            .catch(() => setMessage("Error fetching feedbacks."));
    }, [userId]);

    useEffect(() => {
        if (userId) {
            axios
                .get(`http://localhost:5000/profile?userId=${userId}`)
                .then((response) => {
                    if (response.data.success) {
                        setProfile(response.data.profile);
                        setNewProfile(response.data.profile);
                    }
                })
                .catch(() => setMessage("Error fetching profile data."));

            fetchUserFeedbacks();
        }

        axios
            .get("http://localhost:5000/cities")
            .then((response) => {
                if (response.data.success) {
                    setCities(response.data.cities);
                } else {
                    setErrorMessage("Failed to fetch cities.");
                }
            })
            .catch((error) => {
                console.error("Error fetching cities:", error);
                setErrorMessage("Error fetching cities.");
            });
    }, [userId, fetchUserFeedbacks]);

    const handleSubmitFeedback = () => {
        if (!feedbackText) {
            alert("Feedback cannot be empty.");
            return;
        }

        axios
            .post("http://localhost:5000/submit-feedback", { userId, feedbackText })
            .then((response) => {
                setMessage(response.data.message);
                setFeedbackText("");
                fetchUserFeedbacks();
            })
            .catch(() => setMessage("Error submitting feedback."));
    };

    const handleSearch = () => {
        let finalFrom = from === "Others" ? fromCustom : from;
        let finalTo = to === "Others" ? toCustom : to;

        if (!finalFrom || !finalTo) {
            setErrorMessage("Please provide both From and To locations.");
            return;
        }

        navigate("/available-services", { state: { from: finalFrom, to: finalTo } });
    };

    const handleProfileUpdate = () => {
        axios
            .post("http://localhost:5000/update-profile", { userId, ...newProfile })
            .then((response) => setMessage(response.data.message))
            .catch(() => setMessage("Error updating profile."));
    };

    const handleChangePassword = () => {
        navigate("/change-password");
    };

    const handleViewBookingHistory = () => {
        navigate("/user-booking-history");
    };
    const handleFakeChatBot = () => {
        navigate("/fake-chat-bot"); // Navigate to the FakeChatBot component
    };

    return (
        <div style={dashboardContainer}>
            <div style={sidebarStyle}>
                <h3 style={sidebarTitle}>Dashboard</h3>
                <button style={navButton} onClick={() => setActiveSection("search")}>Search Services</button>
                <button style={navButton} onClick={() => setActiveSection("profile")}>Profile</button>
                <button style={navButton} onClick={() => setActiveSection("feedback")}>Feedback</button>
                <button onClick={() => navigate("/dynamic-cost-calculator")} style={dynamicCostButton}>Dynamic Cost Calculator</button>
                <button onClick={handleFakeChatBot} style={chatBotButton}>ChatBot</button> {/* Added ChatBot Button */}
            </div>

            <div style={contentStyle}>
                {/* Search Services Section */}
                {activeSection === "search" && (
                    <div style={sectionStyle}>
                        <h3 style={sectionTitle}>Search for Available Services</h3>
                        <div style={formGroup}>
                            <label>From Location:</label>
                            <select value={from} onChange={(e) => setFrom(e.target.value)} style={dropdownStyle}>
                                <option value="">Select City</option>
                                {cities.map((city, index) => (
                                    <option key={index} value={city}>{city}</option>
                                ))}
                                <option value="Others">Others</option>
                            </select>
                            {from === "Others" && (
                                <input
                                    type="text"
                                    placeholder="Enter From Location"
                                    value={fromCustom}
                                    onChange={(e) => setFromCustom(e.target.value)}
                                    style={inputStyle} />
                            )}
                        </div>

                        <div style={formGroup}>
                            <label>To Location:</label>
                            <select value={to} onChange={(e) => setTo(e.target.value)} style={dropdownStyle}>
                                <option value="">Select City</option>
                                {cities.map((city, index) => (
                                    <option key={index} value={city}>{city}</option>
                                ))}
                                <option value="Others">Others</option>
                            </select>
                            {to === "Others" && (
                                <input
                                    type="text"
                                    placeholder="Enter To Location"
                                    value={toCustom}
                                    onChange={(e) => setToCustom(e.target.value)}
                                    style={inputStyle} />
                            )}
                        </div>

                        <button onClick={handleSearch} style={buttonStyle}>Search</button>
                        {errorMessage && <p style={errorStyle}>{errorMessage}</p>}
                    </div>
                )}

                {/* Profile Section */}
                {activeSection === "profile" && (
                    <div style={sectionStyle}>
                        <h3 style={sectionTitle}>Your Profile</h3>
                        <div style={formGroup}>
                            <label>Username:</label>
                            <input
                                type="text"
                                value={newProfile.username}
                                onChange={(e) => setNewProfile({ ...newProfile, username: e.target.value })}
                                style={inputStyle} />
                        </div>
                        <div style={formGroup}>
                            <label>Email:</label>
                            <input
                                type="email"
                                value={newProfile.email}
                                onChange={(e) => setNewProfile({ ...newProfile, email: e.target.value })}
                                style={inputStyle} />
                        </div>
                        <div style={formGroup}>
                            <label>Phone:</label>
                            <input
                                type="text"
                                value={newProfile.phone}
                                onChange={(e) => setNewProfile({ ...newProfile, phone: e.target.value })}
                                style={inputStyle} />
                        </div>
                        <div style={formGroup}>
                            <label>Address:</label>
                            <textarea
                                value={newProfile.address}
                                onChange={(e) => setNewProfile({ ...newProfile, address: e.target.value })}
                                style={textareaStyle} />
                        </div>
                        <div style={buttonGroup}>
                            <button onClick={handleProfileUpdate} style={buttonStyle}>Update Profile</button>
                            <button onClick={handleChangePassword} style={buttonStyle}>Change Password</button>
                            <button onClick={handleViewBookingHistory} style={buttonStyle}>View Booking History</button>
                            
                        </div>
                    </div>
                )}

                {/* Feedback Section */}
                {activeSection === "feedback" && (
                    <div style={sectionStyle}>
                        <h3 style={sectionTitle}>Submit Feedback</h3>
                        <div style={feedbackContainer}>
                            <textarea
                                placeholder="Enter your feedback"
                                value={feedbackText}
                                onChange={(e) => setFeedbackText(e.target.value)}
                                style={textareaStyle}
                            ></textarea>
                            <button onClick={handleSubmitFeedback} style={submitFeedbackButton}>Submit Feedback</button>
                        </div>

                        <h3 style={sectionTitle}>Your Feedback</h3>
                        {feedbacks.length > 0 ? (
                            <table style={feedbackTableStyle}>
                                <thead>
                                    <tr>
                                        <th style={tableHeaderStyle}>Feedback</th>
                                        <th style={tableHeaderStyle}>Admin Reply</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {feedbacks.map((fb, index) => (
                                        <tr key={index}>
                                            <td style={tableCellStyle}>{fb.feedback_text}</td>
                                            <td style={tableCellStyle}>{fb.admin_reply || "No reply yet"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No feedback submitted yet.</p>
                        )}
                    </div>
                )}

            </div>

            {/* Message */}
            {message && <p style={messageStyle}>{message}</p>}
        </div>
    );
}

// Styles

const dashboardContainer = {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    flexWrap: "wrap",
    backgroundImage: "url('/bg2.jpg')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    overflow: "hidden",
};

const sidebarStyle = {
    width: "20%",
    backgroundColor: "#343a40",
    color: "white",
    padding: "20px",
    textAlign: "center",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
};

const sidebarTitle = {
    fontSize: "24px",
    fontWeight: "bold",
};

const navButton = {
    display: "block",
    backgroundColor: "#007bff",
    color: "white",
    margin: "10px auto",
    padding: "12px 0",
    border: "none",
    cursor: "pointer",
    width: "80%",
    borderRadius: "5px",
    transition: "background-color 0.3s",
    fontSize: "16px",
};

const dynamicCostButton = {
    padding: "12px 0",
    backgroundColor: "#28a745",
    color: "#fff",
    width: "80%",
    marginTop: "10px",
    borderRadius: "5px",
    fontSize: "16px",
};

const contentStyle = {
    flex: 1,
    padding: "20px",
    backgroundColor: "linear-gradient(135deg, #ffffff, #f2f2f2)",
    borderRadius: "5px",
    marginLeft: "20px",
    overflowY: "auto",
};

const sectionStyle = {
    margin: "20px auto",
    width: "100%",
    maxWidth: "800px",
    textAlign: "left",
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const sectionTitle = {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "20px",
};

const formGroup = {
    marginBottom: "15px",
};

const dropdownStyle = {
    marginTop: "8px",
    padding: "10px",
    width: "100%",
    borderRadius: "5px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
};

const inputStyle = {
    display: "block",
    marginTop: "8px",
    padding: "10px",
    width: "100%",
    borderRadius: "5px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
};

const textareaStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
    fontSize: "16px",
    resize: "none",
    height: "120px",
};

const buttonStyle = {
    padding: "12px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    marginTop: "15px",
    borderRadius: "5px",
    transition: "background-color 0.3s",
    fontSize: "16px",
};

const buttonGroup = {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    flexWrap: "wrap",
    marginTop: "20px",
};

const feedbackContainer = {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
};

const submitFeedbackButton = {
    alignSelf: "flex-start",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s",
};

const feedbackTableStyle = {
    width: "100%",
    marginTop: "15px",
    borderCollapse: "collapse",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "#fff",
};

const tableHeaderStyle = {
    backgroundColor: "#007bff",
    color: "white",
    fontSize: "16px",
};

const tableCellStyle = {
    border: "1px solid #ddd",
    padding: "12px",
    textAlign: "left",
};

const errorStyle = {
    color: "red",
    marginTop: "10px",
};

const messageStyle = {
    color: "green",
    marginTop: "20px",
    fontSize: "16px",
};
const chatBotButton = {
    padding: "12px 0",
    backgroundColor: "#ffc107", // Use a yellow background for the ChatBot button
    color: "#fff",
    width: "80%",
    marginTop: "10px",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
};

export default Dashboard;
