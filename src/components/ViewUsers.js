import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const ViewUsers = () => {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:5000/view-users")
            .then((response) => {
                if (response.data.success) {
                    setUsers(response.data.users);
                } else {
                    setMessage("No users found.");
                }
            })
            .catch(() => setMessage("Error fetching users."));
    }, []);

    const handleDeleteUser = (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            axios
                .post("http://localhost:5000/delete-user", { userId })
                .then((response) => {
                    if (response.data.success) {
                        alert("User deleted successfully!");
                        setUsers(users.filter((user) => user.id !== userId));
                    } else {
                        alert(response.data.message);
                    }
                })
                .catch(() => alert("Error deleting user."));
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.background}></div>
            <h2 style={styles.heading}>View Users</h2>
            {message && <p style={styles.message}>{message}</p>}

            {users.length > 0 ? (
                <div style={styles.tableWrapper}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>User ID</th>
                                <th style={styles.th}>Username</th>
                                <th style={styles.th}>Email</th>
                                <th style={styles.th}>Phone</th>
                                <th style={styles.th}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} style={styles.tableRow}>
                                    <td style={styles.td}>{user.id}</td>
                                    <td style={styles.td}>{user.username}</td>
                                    <td style={styles.td}>{user.email}</td>
                                    <td style={styles.td}>{user.phone}</td>
                                    <td style={styles.td}>
                                        <button
                                            onClick={() => handleDeleteUser(user.id)}
                                            style={styles.button}
                                        >
                                            <FontAwesomeIcon icon={faTrashAlt} style={styles.icon} />
                                            Delete Account
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p style={styles.noUsers}>No users available.</p>
            )}
        </div>
    );
};

// Styles
const styles = {
    container: {
        padding: "20px",
        maxWidth: "1000px",
        margin: "20px auto", // Reduced margin to ensure less space between heading and table
        backgroundColor: "#f9f9f9",
       
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        position: "relative",
        overflow: "hidden",
    },
    background: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: "url('/bg2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "blur(5px)",
        zIndex: -1,
    },
    heading: {
        fontSize: "2rem",
        fontWeight: "bold",
        color: "#333",
        marginBottom: "10px", // Reduced space
        textAlign: "center",
        zIndex: 1,
    },
    tableWrapper: {
        overflowX: "auto",
        position: "relative",
        zIndex: 1,
        marginTop: "10px", // Reduced top margin
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        backgroundColor: "#fff",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    th: {
        backgroundColor: "#007BFF",
        color: "#fff",
        padding: "10px 12px", // Reduced padding
        textAlign: "left",
        fontWeight: "bold",
        borderBottom: "2px solid #ddd",
    },
    td: {
        padding: "10px 12px", // Reduced padding
        textAlign: "left",
        borderBottom: "1px solid #ddd",
        color: "#333",
    },
    button: {
        padding: "8px 12px",
        backgroundColor: "#d9534f",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        fontSize: "14px",
    },
    icon: {
        marginRight: "5px",
    },
    noUsers: {
        textAlign: "center",
        fontSize: "1.2rem",
        color: "#666",
        marginTop: "20px",
    },
};

export default ViewUsers;
