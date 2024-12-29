import React, { useState, useEffect } from "react";
import axios from "axios";

const CompanyList = () => {
    const [companies, setCompanies] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 5;

    // Fetch companies when the component mounts
    useEffect(() => {
        axios
            .get("http://localhost:5000/admin-companies")
            .then((response) => {
                if (response.data.success) {
                    setCompanies(response.data.companies);
                }
            })
            .catch((error) => {
                console.error("Error fetching companies:", error);
            });
    }, []);

    // Filter companies based on the search query
    const filteredCompanies = companies.filter((company) =>
        company.company_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Paginate filtered companies
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCompanies = filteredCompanies.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);

    // Helper function to render stars using Font Awesome
    const renderStars = (rating) => {
        const fullStars = Math.floor(rating); // Get the whole number part of the rating
        const halfStars = rating % 1 >= 0.5 ? 1 : 0; // If the decimal part is >= 0.5, add a half star
        const emptyStars = 5 - fullStars - halfStars; // Remaining empty stars to make up 5

        // Return an array of star icons using Font Awesome
        return (
            <>
                {"★".repeat(fullStars).split('').map((_, i) => (
                    <i key={`full-${i}`} className="fas fa-star" style={{ color: "gold" }}></i>
                ))}
                {halfStars ? (
                    <i className="fas fa-star-half-alt" style={{ color: "gold" }}></i>
                ) : null}
                {"☆".repeat(emptyStars).split('').map((_, i) => (
                    <i key={`empty-${i}`} className="fas fa-star" style={{ color: "gray" }}></i>
                ))}
            </>
        );
    };

    return (
        <div style={styles.background}>
            <div style={styles.overlay}>
                <div className="container mt-5 p-4" style={styles.container}>
                    <div className="d-flex align-items-center justify-content-center mb-4" style={styles.headerContainer}>
                        <img src="/logo2-modified.png" alt="Logo" style={styles.logo} />
                        <h2 className="text-center" style={styles.header}>Company List</h2>
                    </div>

                    <input
                        type="text"
                        placeholder="Search by company name"
                        className="form-control mb-3"
                        style={styles.searchBar}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    <div className="table-responsive">
                        <table className="table table-hover mt-4" style={styles.table}>
                            <thead className="thead-dark">
                                <tr>
                                    <th>Company Name</th>
                                    <th>Phone Number</th>
                                    <th>Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentCompanies.length > 0 ? (
                                    currentCompanies.map((company, index) => (
                                        <tr
                                            key={index}
                                            style={styles.row}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.rowHover.backgroundColor}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                                        >
                                            <td>{company.company_name}</td>
                                            <td>{company.phone_number}</td>
                                            <td>{renderStars(company.rating)}</td> {/* Updated to show dynamic stars */}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center">
                                            No companies available.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
                    <div className="d-flex justify-content-center mt-3">
                        <button
                            className="btn btn-primary mx-2"
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <button
                            className="btn btn-primary mx-2"
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Custom styles
const styles = {
    background: {
        minHeight: "100vh",
        backgroundImage: "url('/bg2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
    },
    overlay: {
        minHeight: "100vh",
        width: "100%",
        backdropFilter: "blur(6px)", // Blurs the background image
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    container: {
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        borderRadius: "15px",
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.4)",
        padding: "30px",
        width: "100%",
        maxWidth: "900px",
        textAlign: "center",
    },
    headerContainer: {
        display: "flex",
        alignItems: "center",
        gap: "15px",
    },
    logo: {
        height: "60px",
        width: "60px",
        objectFit: "contain",
    },
    header: {
        fontSize: "2rem",
        fontWeight: "bold",
        color: "#333",
        textShadow: "1px 1px 5px rgba(0, 0, 0, 0.2)",
        margin: 0,
    },
    searchBar: {
        borderRadius: "10px",
        padding: "10px",
    },
    table: {
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
    },
    row: {
        transition: "all 0.2s ease-in-out",
    },
    rowHover: {
        backgroundColor: "rgba(0, 123, 255, 0.1)", // Light blue highlight
    },
};

export default CompanyList;
