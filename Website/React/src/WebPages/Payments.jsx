import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import "./Payments.css";

function MyPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/payments/my-payments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPayments(response.data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [token]);

  if (loading) return <p className="loading-text">Loading your payments...</p>;

  return (
    <>
      <Header />
      <div className="payments-container">
        <h2 className="payments-title">My Payments</h2>
        {payments.length === 0 ? (
          <p className="no-payments">No payments found.</p>
        ) : (
          <table className="payments-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Amount (₹)</th>
                <th>Status</th>
                <th>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id}>
                  <td>{p.razorpayOrderId}</td>
                  <td>{p.amount / 100}</td>
                  <td className={`status ${p.status.toLowerCase()}`}>
                    {p.status.toUpperCase()}
                  </td>
                  <td>{p.receipt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default MyPayments;