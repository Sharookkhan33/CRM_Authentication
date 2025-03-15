import { Link } from "react-router-dom";
import "../styles.css"; // Import custom styles

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to CRM</h1>
      <p>Manage your customers and business efficiently.</p>
      <div className="home-buttons">
        <Link to="/login" className="btn-primary">Login</Link>
        <Link to="/register" className="btn-secondary">Register</Link>
      </div>
    </div>
  );
};

export default Home;
