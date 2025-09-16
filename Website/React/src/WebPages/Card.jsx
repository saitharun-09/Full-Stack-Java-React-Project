function Card({ poster, name, genre, year, onFavClick, isInWishlist }) {
  return (
    <div className="card">
      <button className="favBtn" onClick={onFavClick}>
        {isInWishlist ? "★" : "☆"}</button>
      <div className="posterDiv">
        <img className="moviePoster" src={poster} alt={name} />
      </div>
      <h2 className="movieName">{name}</h2>
      <p className="movieGenre">{genre}</p>
      <p className="movieYear">{year}</p>
    </div>
  );
}

export default Card;