import '../App.css';
import Card from './Card.jsx';
import Header from "./Header";
import ImgSlider from '../WebPages/ImgSlider.jsx';
import { useEffect, useState } from 'react';

function HomePage({ addToWishList, wishList }) {
  const [movies, setMovies] = useState([]); 
  const [recomendedMovies, setRecomendedMovies] = useState([]);

  useEffect(() => {
    fetch('https://www.omdbapi.com/?s=batman&apikey=2954b3dd')
      .then((Response) => Response.json())
      .then((data) => {
        if (data.Search) setMovies(data.Search);
      });
  }, []);

  useEffect(() => {
    fetch('https://www.omdbapi.com/?s=Harry+Potter&apikey=2954b3dd')
      .then((Response) => Response.json())
      .then((data) => {
        if (data.Search) setRecomendedMovies(data.Search);
      });
  }, []);

  return (
    <>
      <Header />
      <ImgSlider />

      <div className="cardContainer">
        <h3 className='moviesHeading'>Top Recommended Movies</h3>
        {movies.map((movie) => {
          const isInWishlist = wishList.some((m) => m.imdbID === movie.imdbID);

          return (
            <Card
              key={movie.imdbID}
              poster={movie.Poster !== "N/A" ? movie.Poster :
                "http://img.omdbapi.com/?s=Batman&apikey=2954b3dd"}
              name={movie.Title}
              genre={movie.Type}
              year={movie.Year}
              isInWishlist={isInWishlist}
              onFavClick={() => addToWishList(movie)}
            />
          );
        })}
      </div>

      <div className='upComingContainer'>
        <h3 className='upComingHeading'>Coming Soon Near You</h3>
        {recomendedMovies.map((movie) => {
          const isInWishlist = wishList.some((m) => m.imdbID === movie.imdbID);

          return (
            <Card
              key={movie.imdbID}
              poster={movie.Poster !== "N/A" ? movie.Poster :
                "http://img.omdbapi.com/?s=Harry+Potter&apikey=2954b3dd"}
              name={movie.Title}
              genre={movie.Type}
              year={movie.Year}
              isInWishlist={isInWishlist}
              onFavClick={() => addToWishList(movie)}
            />
          );
        })}
      </div>
    </>
  );
}

export default HomePage;