import { useLocation } from "react-router-dom";
import "./TrackDetails.css";

function TrackDetails() {
  const location = useLocation();
  const { meeting } = location.state;
  if (!meeting) {
    return <p>No data available</p>;
  }

  return (
    <div className="track-details-container">
      {}
      <div className="track-image">
        <p>Track Image Placeholder</p>
      </div>

      {}
      <div className="track-info">
        <h2>{meeting.circuit_short_name}</h2>
        <p>Track Name: {meeting.meeting_name}</p>
        <p>Official Name: {meeting.meeting_official_name}</p>
        <p>Country: {meeting.country_name}</p>
        <p>No. of Laps: TDB</p> {}
      </div>
        <button className="ticket-btn">Book Tickets</button>
    </div>
  );
}

export default TrackDetails;
