import { useNavigate } from "react-router-dom";

function Card({ movie, poster, name, genre, year, addToWishList, removeFromWishList, isInWishlist }) {
  const navigate = useNavigate();
   const handleFavClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to login first!");
      return;
    }

    if (isInWishlist) {
      removeFromWishList(movie.id);
    } else {
      addToWishList(movie);
    }
  };

  return (
    <div className="card">
      <button className="favBtn" onClick={handleFavClick}>
        {isInWishlist ? "★" : "☆"} </button>
      <div className="posterDiv">
        <img className="moviePoster" src={poster} alt={name} onClick={() => navigate(`/movie/${movie.id}`)} /> 
      </div>
      <h2 className="movieName">{name}</h2>
      <p className="movieGenre">{genre}</p>
      <p className="movieYear">{year}</p>
    </div>
  );
}

export default Card;