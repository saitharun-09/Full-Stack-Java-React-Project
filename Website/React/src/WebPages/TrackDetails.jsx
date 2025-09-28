import { useLocation } from "react-router-dom";
import "./TrackDetails.css";
import Header from "./Header";

function TrackDetails() {
  const location = useLocation();
  const { meeting } = location.state;
  if (!meeting) {
    return <p>No data available</p>;
  }

  return (
    <>
    <Header/>
    <h2 className="gp-full-name">{meeting.meeting_official_name}</h2>
    <div className="track-details-container">
      <div className="track-image">
        <p>Track Image Placeholder</p>
      </div>

      <div className="track-info">
        <h2 className="gp-name">{meeting.meeting_name}</h2>
        <p className="track-short-name">{meeting.circuit_short_name}, {meeting.country_name}</p>
        <p className="laps">No. of Laps: 61</p>
        <div className="TicketsSection">
        <label className="tickets-Label-Name" htmlFor="NoOfTickets">Tickets:</label>
          <select id="NoOfTickets">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        <div className="booking-section">
          <button className="ticket-btn">Book Tickets</button>
        </div>
      </div>
    </div>
    </>
  );
}

export default TrackDetails;