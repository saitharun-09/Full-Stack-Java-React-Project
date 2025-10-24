import { useLocation } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import "./TrackDetails.css";
import Header from "./Header";

function TrackDetails() {
  const location = useLocation();
  const { meeting } = location.state || {};
  const [noOfTickets, setNoOfTickets] = useState(1);
  const token = localStorage.getItem("token");

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
    const res = await loadRazorpayScript();
    if (!res) return alert("Failed to load Razorpay SDK");

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
        order_id: orderData.razorpayOrderId,
        handler: async (response) => {
          const verifyResponse = await axios.post(
            "http://localhost:8080/api/payments/verify",
            {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            },
            { headers: { "Content-Type": "application/json" } }
          );
          alert(verifyResponse.data.message);
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Failed to create order.");
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
            </div>
            <button className="ticket-btn" onClick={handleBooking}>
              Book Tickets
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default TrackDetails;