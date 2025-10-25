import { useLocation } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import "./TrackDetails.css";
import Header from "./Header";

function TrackDetails() {
  const location = useLocation();
  const { meeting } = location.state || {};
  const [noOfTickets, setNoOfTickets] = useState(1);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  if (!meeting) return <p>No data available</p>;

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleBooking = async () => {
    if (loading) return;
    setLoading(true);

    const res = await loadRazorpayScript();
    if (!res) {
      alert("Failed to load Razorpay SDK");
      setLoading(false);
      return;
    }

    try {
      const orderResponse = await axios.post(
        `http://localhost:8080/api/payments/create-order?noOfTickets=${noOfTickets}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const orderData = orderResponse.data;

      const options = {
        key: "rzp_test_RQC3kf0XuWwvwN",
        amount: orderData.amount,
        currency: orderData.currency,
        name: meeting.meeting_official_name,
        description: `${noOfTickets} ticket(s) for ${meeting.meeting_name}`,
        prefill: { email: email },
        order_id: orderData.razorpayOrderId,
        handler: async (response) => {
          try {
            const verifyResponse = await axios.post(
              "http://localhost:8080/api/payments/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            alert(verifyResponse.data);
          } catch (error) {
            console.error("Verification failed:", error);
            alert("Payment verification failed!");
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        alert("Payment failed or cancelled. Please try again.");
        console.error(response.error);
      });

      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Failed to create order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <h2 className="gp-full-name">{meeting.meeting_official_name}</h2>
      <div className="track-details-container">
        <div className="track-image">
          <p>Track Image Placeholder</p>
        </div>

        <div className="track-info">
          <h2 className="gp-name">{meeting.meeting_name}</h2>
          <p className="track-short-name">
            {meeting.circuit_short_name}, {meeting.country_name}
          </p>
          <p className="laps">No. of Laps: 61</p>

          <div className="booking-section">
            <div className="TicketsSection">
              <label htmlFor="NoOfTickets">Tickets:</label>
              <select
                id="NoOfTickets"
                value={noOfTickets}
                onChange={(e) => setNoOfTickets(Number(e.target.value))}
              >
                {[...Array(9)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <p>Ticket Price: ₹50,000</p>
              <p>Total: ₹{noOfTickets * 50000}</p>
            </div>
            <button
              className="ticket-btn"
              onClick={handleBooking}
              disabled={loading}
            >
              {loading ? "Processing..." : "Book Tickets"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default TrackDetails;