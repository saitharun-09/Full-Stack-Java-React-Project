import Header from './Header.jsx';
import Card from './Card.jsx';
import '../App.css';

function WishList({ wishList, removeFromWishList, getGenreNames, isAuthenticated }) {
  const handleRemove = (movieId) => {
  if (!isAuthenticated) {
    alert("You need to login!");
    return;
  }
  removeFromWishList(movieId);
};

  return (
    <>
      <Header />
      <div className="cardContainer">
        <h2>Your Personal Wish List ★</h2>
        {wishList.length === 0 ? (
          <h3 className="noFavPara">No Favorite's Yet</h3>
        ) : (
          wishList.map(movie => (
            <Card
              key={movie.id}
              id={movie.id}
              movie={(movie)}
              poster={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : "https://via.placeholder.com/200x300?text=No+Image"}
              name={movie.title}
              genre={getGenreNames(movie.genre_ids || [] || "N/A")}
              year={movie.release_date ? movie.release_date.slice(0,4) : "N/A"}
              isInWishlist={true}
              removeFromWishList={handleRemove}
            />
          ))
        )}
      </div>
    </>
  );
}

export default WishList;