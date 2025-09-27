import "./Race.css";
import { useNavigate } from "react-router-dom";

function RaceCard({ num, name, country, img, meeting }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/track/${meeting.meeting_key}`, { state: { meeting } });
  };
  return (
    <div className="Racecard"  onClick={handleClick}>
      <img className="RacecardImg" src={img} alt={name}/>
      <p className="RaceNum">Race {num}</p>
      <h2 className="Racename">{name}</h2>
      <p className="RaceCountry">{country}</p>
    </div>
  );
}

export default RaceCard;