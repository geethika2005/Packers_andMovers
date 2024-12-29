import React, { useState, useEffect } from "react";

const Receipt = () => {
    const [receipt, setReceipt] = useState("");

    useEffect(() => {
        // Retrieve the saved receipt from localStorage
        const savedReceipt = localStorage.getItem("receipt");
        if (savedReceipt) {
            setReceipt(savedReceipt);
        }
    }, []);

    return (
        <div style={containerStyle}>
            <h2>Your Receipt</h2>
            {receipt ? (
                <div>
                    <pre>{receipt}</pre>
                </div>
            ) : (
                <p>No receipt found.</p>
            )}
        </div>
    );
};

// Inline Styles
const containerStyle = {
    textAlign: "center",
    marginTop: "30px",
};

export default Receipt;
