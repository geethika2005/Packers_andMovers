import React, { useState } from "react";
import { FaComments } from "react-icons/fa"; // Import FontAwesome Chat Icon

const FakeChatBot = () => {
    const [isOpen, setIsOpen] = useState(false); // Toggle open/close state
    const [messages, setMessages] = useState([
        { text: "Hi! I'm your Packers and Movers Assistant. How can I help you?", sender: "bot" }
    ]);
    const [input, setInput] = useState("");

    // Handle sending messages
    const handleSendMessage = () => {
        if (input.trim() === "") return;

        // Add user message
        const newMessage = { text: input, sender: "user" };
        setMessages((prev) => [...prev, newMessage]);

        // Simulate bot response after a delay
        setTimeout(() => {
            const botResponse = getBotResponse(input);
            setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
        }, 1000);

        setInput(""); // Clear input field
    };

    // Predefined bot responses
    const getBotResponse = (userInput) => {
        userInput = userInput.toLowerCase();
        if (userInput.includes("hello")) return "Hello! How can I help you?.";
        if (userInput.includes("booking")) return "You can check available services in the dashboard.";
        if (userInput.includes("status")) return "Go to 'Booking History' in your profile to view booking status.";
        if (userInput.includes("recommend")) return "I recommend checking services with higher ratings.";
        if (userInput.includes("thanks")) return "You're welcome! Let me know if you need more help.";
        if (userInput.includes("change password")) return "You can change password in profile section of dashboard.";
        if (userInput.includes("available services")) return "You can check the available services after enterning from and to location.";
        if (userInput.includes("change password")) return "You can change password in profile section of dashboard.";
        return "Sorry, I didn't understand that. Can you rephrase?";
    
    };

    // Toggle Chatbot visibility
    const toggleChatbot = () => setIsOpen(!isOpen);

    return (
        <div style={styles.pageContainer}>
            {/* Heading Box */}
            <div style={styles.headingBox}>
                {/* Logo */}
                <img src="/logo2-modified.png" alt="Logo" style={styles.logo} />

                {/* Heading */}
                <h1 style={styles.heading}>ChatBot</h1>
            </div>

            {/* Blurred background */}
            <div style={styles.blurredBackground}></div>

            {/* Chat Icon in the center */}
            <div style={styles.chatIcon} onClick={toggleChatbot}>
                <FaComments size={36} style={{ color: "white" }} />
            </div>

            {/* Chatbot Window */}
            {isOpen && (
                <div style={styles.chatContainer}>
                    <div style={styles.chatHeader}>
                        <span>🧾 Packers Assistant</span>
                        <button onClick={toggleChatbot} style={styles.closeButton}>✖</button>
                    </div>
                    <div style={styles.chatBox}>
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                style={
                                    msg.sender === "bot" ? styles.botMessage : styles.userMessage
                                }
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>
                    <div style={styles.inputArea}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            style={styles.inputField}
                        />
                        <button onClick={handleSendMessage} style={styles.sendButton}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
};

// Styles
const styles = {
    pageContainer: {
        width: "100%",
        height: "100vh",
        position: "relative",
        overflow: "hidden", // Prevent any overflow when applying blur
    },
    heading: {
        textAlign: "center",
        marginTop: "20px",
        fontSize: "36px",
        fontWeight: "bold",
        color: "#007bff", // Blue color for the heading
        position: "relative",
        zIndex: 2, // Ensure the heading is above the background and box
        marginLeft: "10px", // Adjust spacing between logo and heading
    },
    headingBox: {
        position: "absolute",
        top: "10%",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "rgba(255, 255, 255, 0.7)", // Transparent white background
        padding: "10px 20px",
        borderRadius: "10px", // Rounded corners for the box
        zIndex: 1, // Place the background behind the heading
        display: "flex",
        alignItems: "center", // Align logo and heading horizontally
        justifyContent: "center",
    },
    logo: {
        width: "60px", // Adjust the size of the logo
        height: "60px",
        marginRight: "10px", // Space between logo and heading
    },
    blurredBackground: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        backgroundImage: "url('/bg2.jpg')", // Background image path
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "blur(10px)", // Apply blur to background image
        transform: "scale(1.1)", // Slightly scale the background to cover all areas
    },
    chatIcon: {
        position: "absolute", // Positioning relative to page container
        top: "50%", // Center vertically
        left: "50%", // Center horizontally
        transform: "translate(-50%, -50%)", // Perfectly center the icon
        backgroundColor: "rgba(0, 123, 255, 0.7)", // Semi-transparent blue background
        color: "white",
        borderRadius: "50%",
        width: "70px",
        height: "70px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)", // Subtle shadow for visibility
        zIndex: 1000,
        transition: "transform 0.3s ease",
    },
    chatContainer: {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "350px",
        height: "450px",
        border: "1px solid #ccc",
        borderRadius: "15px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f7f9fc",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
        overflow: "hidden",
        zIndex: 1000,
    },
    chatHeader: {
        backgroundColor: "#007bff",
        color: "white",
        padding: "12px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "18px",
        fontWeight: "bold",
        borderTopLeftRadius: "15px",
        borderTopRightRadius: "15px",
    },
    closeButton: {
        background: "transparent",
        border: "none",
        color: "white",
        fontSize: "18px",
        cursor: "pointer",
    },
    chatBox: {
        flex: 1,
        padding: "10px 15px",
        overflowY: "auto",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #ccc",
    },
    botMessage: {
        backgroundColor: "#e9f5ff",
        color: "#333",
        padding: "10px",
        borderRadius: "10px",
        margin: "5px 0",
        textAlign: "left",
        maxWidth: "80%",
        fontSize: "14px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    },
    userMessage: {
        backgroundColor: "#d4edda",
        color: "#333",
        padding: "10px",
        borderRadius: "10px",
        margin: "5px 0",
        textAlign: "right",
        marginLeft: "auto",
        maxWidth: "80%",
        fontSize: "14px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    },
    inputArea: {
        display: "flex",
        alignItems: "center",
        padding: "10px",
        backgroundColor: "#f7f9fc",
        borderTop: "1px solid #ccc",
    },
    inputField: {
        flex: 1,
        padding: "10px",
        fontSize: "14px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        outline: "none",
        marginRight: "10px",
    },
    sendButton: {
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "8px",
        padding: "10px 20px",
        fontSize: "14px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
    },
    sendButtonHover: {
        backgroundColor: "#0056b3",
    },
};

export default FakeChatBot;
