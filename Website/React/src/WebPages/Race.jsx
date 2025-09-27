import { useEffect, useState } from "react";
import RaceCard from "./RaceCard";
import "./Race.css";
import fallbackImg from "../Assets/flower.jpeg";

function Race() {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    async function fetchMeetings() {
      try {
        const res = await fetch("https://api.openf1.org/v1/meetings?year=2024");
        const data = await res.json();
        const filtered = data.filter(
            (m) => !m.meeting_name.toLowerCase().includes("testing")
        );

        setMeetings(filtered);
      } catch (error) {
        console.error("Error fetching meetings:", error);
      }
    }
    fetchMeetings();
  }, []);

  return (
    <div className="RacesContainer">
        <h2 className="f1Heading">Formula 1 Schedule</h2>
        <div className="RaceGrid">
        {meetings.map((meeting, index) => (
            <RaceCard 
            meeting={meeting}
            key={meeting.meeting_key}
            num={index + 1}
            name={meeting.meeting_name}
            country={meeting.country_name}
            img={fallbackImg}
            />
        ))}
        </div>
    </div>
  );
}

export default Race;