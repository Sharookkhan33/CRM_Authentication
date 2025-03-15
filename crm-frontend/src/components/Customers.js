import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Customers = () => {
  const { auth } = useContext(AuthContext);
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      if (!auth) {
        setError("Unauthorized: Please log in first.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/customers", {
          headers: { Authorization: `Bearer ${auth}` },
        });
        setCustomers(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch customers.");
      }
    };

    fetchCustomers();
  }, [auth]);

  return (
    <div className="customer-container">
      <h1>Customers</h1>
      {error && <p className="error">{error}</p>}
      <ul>
        {customers.map((customer) => (
          <li key={customer._id} className="customer-item">
            {customer.name} - {customer.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Customers;
