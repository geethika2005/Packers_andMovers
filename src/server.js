const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection Pool
const db = mysql.createPool({
    connectionLimit: 10, // Maximum number of concurrent connections
    host: "localhost",
    user: "root",
    password: "Navyatanu@3y", // Your MySQL password
    database: "pack", // Your database name
});

// Check Database Connection
db.getConnection((err, connection) => {
    if (err) {
        console.error("Database connection failed:", err.message);
    } else {
        console.log("Connected to the MySQL database.");
        connection.release();
    }
});

// **User Login Endpoint**
// **User Login Endpoint**
app.post("/login", (req, res) => {
    const { username, password } = req.body; // Replace 'email' with 'username'

    if (!username || !password) {
        return res.json({ success: false, message: "All fields are required." });
    }

    const query = "SELECT * FROM userdata WHERE username = ? AND password = ?";
    db.query(query, [username, password], (err, result) => {
        if (err) {
            console.error("Error during login:", err.message);
            res.json({ success: false, message: "Database error during login." });
        } else if (result.length > 0) {
            res.json({ success: true, message: "Login successful!", user: result[0] });
        } else {
            res.json({ success: false, message: "Invalid username or password." });
        }
    });
});


// **Admin Login Endpoint (Static Credentials)**
app.post("/admin-login", (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "admin123") {
        res.json({ success: true, message: "Login successful!" });
    } else {
        res.json({ success: false, message: "Invalid username or password." });
    }
});

// **Registration Endpoint**
app.post("/register", (req, res) => {
    const { username, email, password, phone, address } = req.body;

    if (!username || !email || !password || !phone || !address) {
        return res.json({ success: false, message: "All fields are required." });
    }

    const query = "INSERT INTO userdata (username, email, password, phone, address) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [username, email, password, phone, address], (err) => {
        if (err) {
            console.error("Error during registration:", err.message);
            return res.json({ success: false, message: "Error during registration. Email may already exist." });
        } else {
            res.json({ success: true, message: "Registration successful!" });
        }
    });
});
app.get("/profile", (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.json({ success: false, message: "User ID is required." });
    }

    const query = "SELECT username, email, phone, address FROM userdata WHERE id = ?";
    db.query(query, [userId], (err, result) => {
        if (err) {
            console.error("Error fetching user profile:", err.message);
            return res.json({ success: false, message: "Error fetching profile data." });
        }
        if (result.length > 0) {
            res.json({ success: true, profile: result[0] });
        } else {
            res.json({ success: false, message: "User not found." });
        }
    });
});
app.get("/profile", (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.json({ success: false, message: "User ID is required." });
    }

    const query = "SELECT username, email, phone, address FROM userdata WHERE id = ?";
    db.query(query, [userId], (err, result) => {
        if (err) {
            console.error("Error fetching user profile:", err.message);
            return res.json({ success: false, message: "Error fetching profile data." });
        }
        if (result.length > 0) {
            res.json({ success: true, profile: result[0] });
        } else {
            res.json({ success: false, message: "User not found." });
        }
    });
});
//profile fetch
app.get("/profile", (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.json({ success: false, message: "User ID is required." });
    }

    const query = "SELECT username, email, phone, address FROM userdata WHERE id = ?";
    db.query(query, [userId], (err, result) => {
        if (err) {
            console.error("Error fetching user profile:", err.message);
            return res.json({ success: false, message: "Error fetching profile data." });
        }
        if (result.length > 0) {
            res.json({ success: true, profile: result[0] });
        } else {
            res.json({ success: false, message: "User not found." });
        }
    });
});
//update profile end point
app.post("/update-profile", (req, res) => {
    const { userId, username, email, phone, address } = req.body;

    if (!userId || !username || !email || !phone || !address) {
        return res.json({ success: false, message: "All fields are required." });
    }

    const query = "UPDATE userdata SET username = ?, email = ?, phone = ?, address = ? WHERE id = ?";
    db.query(query, [username, email, phone, address, userId], (err) => {
        if (err) {
            console.error("Error updating profile:", err.message);
            return res.json({ success: false, message: "Error updating profile." });
        }
        res.json({ success: true, message: "Profile updated successfully!" });
    });
});
//change password end point
app.post("/change-password", (req, res) => {
    const { userId, currentPassword, newPassword } = req.body;

    if (!userId || !currentPassword || !newPassword) {
        return res.json({ success: false, message: "All fields are required." });
    }

    // Check current password
    const query = "SELECT password FROM userdata WHERE id = ?";
    db.query(query, [userId], (err, result) => {
        if (err) {
            console.error("Error checking current password:", err.message);
            return res.json({ success: false, message: "Error validating current password." });
        }
        if (result.length > 0 && result[0].password === currentPassword) {
            // Update to new password
            const updateQuery = "UPDATE userdata SET password = ? WHERE id = ?";
            db.query(updateQuery, [newPassword, userId], (updateErr) => {
                if (updateErr) {
                    console.error("Error updating password:", updateErr.message);
                    return res.json({ success: false, message: "Error updating password." });
                }
                res.json({ success: true, message: "Password changed successfully!" });
            });
        } else {
            res.json({ success: false, message: "Current password is incorrect." });
        }
    });
});
// Fetch Distinct Cities for Dropdowns
app.get("/cities", (req, res) => {
    const query = `
        SELECT DISTINCT from_location AS city FROM companies
        UNION
        SELECT DISTINCT to_location AS city FROM companies
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching cities:", err.message);
            return res.json({ success: false, message: "Error fetching cities." });
        }
        res.json({ success: true, cities: results.map((row) => row.city) });
    });
});



// **Fetch Available Companies for Users (Available Services)**
app.get("/available-services", (req, res) => {
    const { from, to } = req.query;

    // Validate query parameters
    if (!from || !to) {
        return res.json({ success: false, message: "Both 'From' and 'To' locations are required." });
    }

    // Query to fetch company data, including cost_per_km
    const query = `
        SELECT company_name, cost_per_km, phone_number, rating, from_location, to_location
        FROM companies
        WHERE from_location = ? AND to_location = ?
    `;

    db.query(query, [from, to], (err, results) => {
        if (err) {
            console.error("Error fetching services:", err.message);
            return res.json({ success: false, message: "Error fetching available services." });
        }

        if (results.length > 0) {
            res.json({ success: true, companies: results });
        } else {
            res.json({ success: false, message: "No services found for the selected locations." });
        }
    });
});


// **Booking Endpoint**
// **Booking Endpoint**
app.post("/book", (req, res) => {
    const { userId, companyName, fromLocation, toLocation, cost } = req.body;

    if (!userId || !companyName || !fromLocation || !toLocation || !cost) {
        return res.json({ success: false, message: "All fields are required for booking." });
    }

    const query = `
        INSERT INTO booking_history (user_id, company, from_location, to_location, cost, booking_date) 
        VALUES (?, ?, ?, ?, ?, NOW())
    `;

    db.query(query, [userId, companyName, fromLocation, toLocation, cost], (err) => {
        if (err) {
            console.error("Error during booking:", err.message);
            return res.json({ success: false, message: "Error saving booking." });
        }
        res.json({ success: true, message: "Booking successful!" });
    });
});


// **Fetch User Bookings**
// **Fetch User Bookings**
// **Fetch User Bookings**
// Fetch User Booking History
app.get("/user-bookings", (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.json({ success: false, message: "User ID is required." });
    }

    const query = `
        SELECT booking_id, company, from_location, to_location, cost, booking_date
        FROM booking_history
        WHERE user_id = ?
        ORDER BY booking_date DESC
    `;

    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error("Error fetching booking history:", err.message);
            return res.json({ success: false, message: "Error fetching booking history." });
        }

        if (results.length > 0) {
            res.json({ success: true, bookings: results });
        } else {
            res.json({ success: false, message: "No bookings found." });
        }
    });
});





// **Fetch All Companies for Admin**
// **Fetch Unique Companies for Admin**
app.get("/admin-companies", (req, res) => {
    const query = `
        SELECT DISTINCT company_name, phone_number, rating 
        FROM companies
        GROUP BY company_name, phone_number, rating
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching companies:", err.message);
            return res.json({ success: false, message: "Error fetching companies." });
        }
        res.json({ success: true, companies: results });
    });
});


// **Fetch All Bookings for Admin**
// Fetch All Bookings for Admin
// **Fetch All Bookings for Admin (with Username)**
app.get("/admin-bookings", (req, res) => {
    const query = `
        SELECT 
            bh.booking_id, 
            bh.from_location, 
            bh.to_location, 
            bh.company, 
            bh.cost, 
            bh.booking_date, 
            u.username
        FROM booking_history bh
        INNER JOIN userdata u ON bh.user_id = u.id
        ORDER BY bh.booking_date DESC
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching bookings:", err.message);
            return res.json({ success: false, message: "Error fetching bookings." });
        }
        res.json({ success: true, bookings: results });
    });
});
// Fetch all users for admin
app.get("/view-users", (req, res) => {
    const query = "SELECT id, username, email, phone FROM userdata"; // Select users
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching users:", err.message);
            return res.json({ success: false, message: "Error fetching users." });
        }
        res.json({ success: true, users: results });
    });
});

// Delete a user account for admin
app.post("/delete-user", (req, res) => {
    const { userId } = req.body;  // Get userId from request body

    if (!userId) {
        return res.json({ success: false, message: "User ID is required." });
    }

    // Delete user from userdata table
    const deleteQuery = "DELETE FROM userdata WHERE id = ?";
    db.query(deleteQuery, [userId], (err) => {
        if (err) {
            console.error("Error deleting user:", err.message);
            return res.json({ success: false, message: "Error deleting user." });
        }

        res.json({ success: true, message: "User and related data deleted successfully!" });
    });
});



// **Cancel a Booking for Admin**
// **Cancel a Booking for Admin**
app.post("/cancel-booking", (req, res) => {
    const { bookingId } = req.body;

    if (!bookingId) {
        return res.json({ success: false, message: "Booking ID is required." });
    }

    const query = "DELETE FROM booking_history WHERE booking_id = ?";
    db.query(query, [bookingId], (err) => {
        if (err) {
            console.error("Error canceling booking:", err.message);
            return res.json({ success: false, message: "Error canceling booking." });
        }
        res.json({ success: true, message: "Booking canceled successfully!" });
    });
});

// Delete User Account and Their Bookings

// Submit Feedback (User)
app.post("/submit-feedback", (req, res) => {
    const { userId, feedbackText } = req.body;

    if (!userId || !feedbackText) {
        return res.json({ success: false, message: "Feedback cannot be empty." });
    }

    const query = "INSERT INTO feedback (user_id, feedback_text) VALUES (?, ?)";
    db.query(query, [userId, feedbackText], (err) => {
        if (err) {
            console.error("Error submitting feedback:", err.message);
            return res.json({ success: false, message: "Error submitting feedback." });
        }
        res.json({ success: true, message: "Feedback submitted successfully!" });
    });
});

// Fetch Feedback for Admin
app.get("/admin-feedbacks", (req, res) => {
    const query = `
        SELECT f.feedback_id, f.feedback_text, f.admin_reply, u.username
        FROM feedback f
        JOIN userdata u ON f.user_id = u.id
        ORDER BY f.created_at DESC
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching feedbacks:", err.message);
            return res.json({ success: false, message: "Error fetching feedbacks." });
        }
        res.json({ success: true, feedbacks: results });
    });
});

// Reply to Feedback (Admin)
app.post("/admin-reply-feedback", (req, res) => {
    const { feedbackId, adminReply } = req.body;

    if (!feedbackId || !adminReply) {
        return res.json({ success: false, message: "Reply cannot be empty." });
    }

    const query = "UPDATE feedback SET admin_reply = ? WHERE feedback_id = ?";
    db.query(query, [adminReply, feedbackId], (err) => {
        if (err) {
            console.error("Error replying to feedback:", err.message);
            return res.json({ success: false, message: "Error sending reply." });
        }
        res.json({ success: true, message: "Reply sent successfully!" });
    });
});

// Fetch Feedback for Users
app.get("/user-feedbacks", (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.json({ success: false, message: "User ID is required." });
    }

    const query = `
        SELECT feedback_text, admin_reply, created_at 
        FROM feedback 
        WHERE user_id = ?
    `;
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error("Error fetching feedbacks:", err.message);
            return res.json({ success: false, message: "Error fetching feedbacks." });
        }
        res.json({ success: true, feedbacks: results });
    });
});


// **Start the Server**
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
