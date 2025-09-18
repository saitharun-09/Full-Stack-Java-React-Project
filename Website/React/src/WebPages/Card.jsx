 import { useNavigate } from "react-router-dom";

function Card({ poster, name, genre, year, onFavClick, isInWishlist, id}) {
  const navigate = useNavigate();
  return (
    <div className="card">
      <button className="favBtn" onClick={onFavClick}>
        {isInWishlist ? "★" : "☆"}</button>
      <div className="posterDiv">
        <img className="moviePoster" src={poster} alt={name} onClick={() => navigate(`/movie/${id}`)} /> 
      </div>
      <h2 className="movieName">{name}</h2>
      <p className="movieGenre">{genre}</p>
      <p className="movieYear">{year}</p>
    </div>
  );
}

export default Card;