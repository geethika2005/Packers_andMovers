import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [message, setMessage] = useState("");
    const [recaptchaValue, setRecaptchaValue] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Packers & Movers";
    }, []);

    const handleRegister = () => {
        if (!username || !email || !password || !phone || !address || !recaptchaValue) {
            setMessage("All fields are required and reCAPTCHA must be completed!");
            return;
        }

        axios
            .post("http://localhost:5000/register", { username, email, password, phone, address, recaptchaValue })
            .then((response) => {
                if (response.data.success) {
                    setMessage("Registration successful! Redirecting...");
                    setTimeout(() => navigate("/options"), 2000);
                } else {
                    setMessage(response.data.message || "Registration failed.");
                }
            })
            .catch(() => setMessage("An error occurred. Please try again."));
    };

    const handleRecaptchaChange = (value) => setRecaptchaValue(value);

    return (
        <div style={styles.outerContainer}>
            <div style={styles.backgroundImage}></div>
            <div style={styles.formContainer}>
                <div style={styles.headerContainer}>
                    <img src="/logo2-modified.png" alt="Logo" style={styles.logo} />
                    <h2 style={styles.heading}>Create an Account</h2>
                </div>

                <p style={styles.subText}>Join us to get started with Packers & Movers</p>

                <div style={styles.scrollableContent}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={styles.input}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        style={styles.input}
                    />
                    <textarea
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        style={styles.textarea}
                    />
                    <div style={styles.recaptchaContainer}>
                        <ReCAPTCHA
                            sitekey="6Lc1fZwqAAAAAPRGMGi3TVU9vdrVlYf37hk53OPy"
                            onChange={handleRecaptchaChange}
                        />
                    </div>
                    <button onClick={handleRegister} style={styles.button}>
                        Register
                    </button>
                </div>

                {message && <p style={styles.message}>{message}</p>}
            </div>
        </div>
    );
};

const styles = {
    outerContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        position: "relative",
        fontFamily: "'Arial', sans-serif",
        padding: "0 20px",
        boxSizing: "border-box",
        overflow: "hidden",
    },
    backgroundImage: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "url('/bg2.jpg') no-repeat center center fixed",
        backgroundSize: "cover",
        filter: "blur(8px)",
        zIndex: -1,
    },
    formContainer: {
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        width: "100%",
        maxWidth: "400px",
        textAlign: "center",
        maxHeight: "95vh", // Prevent container overflow
         // Enable scroll if needed
    },
    scrollableContent: {
        maxHeight: "75vh", // Ensure form inputs are scrollable
        overflowY: "auto",
        paddingBottom: "10px",
    },
    headerContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "10px",
    },
    logo: {
        width: "40px",
        height: "40px",
        marginRight: "10px",
    },
    heading: {
        fontSize: "1.5rem",
        margin: 0,
        color: "#333",
    },
    subText: {
        fontSize: "1rem",
        color: "#555",
        marginBottom: "15px",
    },
    input: {
        margin: "10px 0",
        padding: "10px",
        width: "100%",
        borderRadius: "8px",
        border: "1px solid #ddd",
        fontSize: "1rem",
        boxSizing: "border-box",
    },
    textarea: {
        margin: "10px 0",
        padding: "10px",
        width: "100%",
        height: "80px",
        borderRadius: "8px",
        border: "1px solid #ddd",
        resize: "none",
        fontSize: "1rem",
    },
    recaptchaContainer: {
        margin: "15px 0",
    },
    button: {
        padding: "10px",
        fontSize: "1rem",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        width: "100%",
        marginTop: "10px",
    },
    message: {
        marginTop: "10px",
        color: "red",
        fontSize: "0.9rem",
    },
};

export default Register;
