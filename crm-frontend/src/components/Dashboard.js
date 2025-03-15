import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles.css"; // Import custom CSS

const Dashboard = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  if (!auth) {
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome to Your Dashboard</h1>
      <p>Manage your customers and business operations.</p>

      <div className="dashboard-links">
        <button className="nav-btn" onClick={() => navigate("/customers")}>
          View Customers
        </button>
        <button className="nav-btn" onClick={() => navigate("/reports")}>
          View Reports
        </button>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
