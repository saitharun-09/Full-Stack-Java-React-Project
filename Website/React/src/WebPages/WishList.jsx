import Header from './Header.jsx';
import '../App.css'
import Card from './Card.jsx';

function WishList({wishList, removeFromWishList}) {
  return (
    <div>
        <Header />
        <div className='cardContainer'>
          <h2>Your Personal Wish List ★ </h2>
          {wishList.length===0 ? (<h3 className='noFavPara'>No Favorite's Yet</h3>) : (wishList.map((movie) =>
            <Card
                key={movie.imdbID}
                poster={movie.Poster}
                name={movie.Title}
                genre={movie.Type}
                year={movie.Year}
                isInWishlist={true}
                onFavClick={() => removeFromWishList(movie.imdbID)}
            />
          ))}
        </div>
    </div>
  );
}

export default WishList;