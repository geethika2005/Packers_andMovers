import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [reply, setReply] = useState("");
    const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);

    // Fetch All Feedbacks
    useEffect(() => {
        axios
            .get("http://localhost:5000/admin-feedbacks")
            .then((response) => {
                if (response.data.success) {
                    setFeedbacks(response.data.feedbacks);
                }
            })
            .catch(() => console.error("Error fetching feedbacks."));
    }, []);

    // Submit Reply
    const handleReplySubmit = (feedbackId) => {
        axios
            .post("http://localhost:5000/admin-reply-feedback", { feedbackId, adminReply: reply })
            .then(() => {
                alert("Reply submitted successfully!");
                setReply("");
                setSelectedFeedbackId(null);
                window.location.reload(); // Reload to fetch updated feedbacks
            })
            .catch(() => alert("Error submitting reply."));
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.background}></div>
            <div style={styles.container}>
                <h2 style={styles.heading}>
                    <img 
                        src="/logo2-modified.png" 
                        alt="Logo" 
                        style={styles.logo} 
                    />
                    Feedback Management
                </h2>
                <div style={styles.tableContainer}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>User</th>
                                <th style={styles.th}>Feedback</th>
                                <th style={styles.th}>Admin Reply</th>
                                <th style={styles.th}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feedbacks.map((fb, index) => (
                                <tr
                                    key={fb.feedback_id}
                                    style={{
                                        ...styles.tableRow,
                                        ...(index % 2 === 0 ? {} : styles.tableRowAlt), // Apply alternate row style
                                        ":hover": { backgroundColor: "#d9f1ff" } // Add hover effect here
                                    }}
                                >
                                    <td style={styles.td}>{fb.username}</td>
                                    <td style={styles.td}>{fb.feedback_text}</td>
                                    <td style={styles.td}>{fb.admin_reply || "No reply yet"}</td>
                                    <td style={styles.td}>
                                        {selectedFeedbackId === fb.feedback_id ? (
                                            <div style={styles.replyContainer}>
                                                <input
                                                    type="text"
                                                    placeholder="Enter reply"
                                                    value={reply}
                                                    onChange={(e) => setReply(e.target.value)}
                                                    style={styles.input}
                                                />
                                                <button
                                                    onClick={() => handleReplySubmit(fb.feedback_id)}
                                                    style={styles.submitButton}
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => setSelectedFeedbackId(fb.feedback_id)}
                                                style={styles.replyButton}
                                            >
                                                Reply
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// Styles
const styles = {
    wrapper: {
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    background: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage: `url("/bg2.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "blur(8px)",
        zIndex: 1,
    },
    container: {
        position: "relative",
        zIndex: 2,
        width: "100%",
        maxWidth: "1200px",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: "10px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        overflow: "hidden",
    },
    heading: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        fontSize: "2rem",
        color: "#333",
        marginBottom: "20px",
        fontFamily: "Arial, sans-serif",
    },
    logo: {
        width: "60px",
        height: "60px",
    },
    tableContainer: {
        overflowX: "auto",
        borderRadius: "8px",
        maxWidth: "100%",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        fontFamily: "Arial, sans-serif",
    },
    th: {
        backgroundColor: "#e3f2fd",
        color: "#333",
        padding: "12px",
        textAlign: "left",
        fontWeight: "bold",
        fontSize: "1rem",
        borderBottom: "2px solid #ddd",
        whiteSpace: "nowrap",
    },
    td: {
        padding: "10px",
        fontSize: "0.95rem",
        textAlign: "left",
        borderBottom: "1px solid #ddd",
        wordWrap: "break-word",
    },
    tableRow: {
        backgroundColor: "#fff",
        transition: "background-color 0.3s ease",
    },
    tableRowAlt: {
        backgroundColor: "#f9f9f9",
        transition: "background-color 0.3s ease",
    },
    replyContainer: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },
    input: {
        padding: "8px 10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        fontSize: "1rem",
        flex: "1",
    },
    submitButton: {
        padding: "8px 15px",
        backgroundColor: "#4CAF50",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
    },
    replyButton: {
        padding: "8px 12px",
        backgroundColor: "#007BFF",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
    },
};

export default AdminFeedback;
