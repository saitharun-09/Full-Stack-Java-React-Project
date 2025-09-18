import Header from './Header.jsx';
import '../App.css'
import Card from './Card.jsx';

function WishList({wishList, removeFromWishList, getGenreNames}) {
  return (
    <>
      <Header />
      <div className='cardContainer'>
        <h2>Your Personal Wish List ★ </h2>
        {wishList.length===0 ? (
          <h3 className='noFavPara'>No Favorite's Yet</h3>
        ) : (
          wishList.map((movie) =>
            <Card
              key={movie.id}
              id={movie.id}
              poster={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                : "https://via.placeholder.com/200x300?text=No+Image"}
              name={movie.title}
              genre={getGenreNames(movie.genre_ids)}
              year={movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}
              isInWishlist={true}
              onFavClick={() => removeFromWishList(movie.id)}
            />
          )
        )}
      </div>
    </>
  );
}

export default WishList;