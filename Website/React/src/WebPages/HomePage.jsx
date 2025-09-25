import axios from 'axios';
import '../App.css';
import Card from './Card.jsx';
import Header from "./Header";
import ImgSlider from '../WebPages/ImgSlider.jsx';
import { useEffect, useState } from 'react';

const API_KEY = "a5627a0a6e7111a4902132a7a87c6fcc";
const BASE_URL = "https://api.themoviedb.org/3";

function HomePage({ addToWishList, removeFromWishList, wishList, getGenreNames }) {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
      axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
        .then(response => setPopularMovies(response.data.results))
        .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    axios.get(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`)
      .then((response) => {
        setTopRatedMovies(response.data.results);
      })
      .catch((err) => console.error("Error fetching top rated movies:", err));
  }, []);

  return (
    <>
      <Header />
      <ImgSlider />

      <div className="cardContainer">
        <h3 className='moviesHeading'>Popular Movies</h3>
        {loading ? <p>Loading movies...</p> 
        : popularMovies.map((movie) => {
          const isInWishlist = wishList.some((m) => m.id === movie.id);

          return (
            <Card
              key={movie.id}
              id={movie.id}
            //  movie={movie}
              poster={movie.poster_path
                ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                : "https://via.placeholder.com/200x300?text=No+Image"}
              name={movie.title}
              genre={getGenreNames(movie.genre_ids)}
              year={movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}
              isInWishlist={isInWishlist}
              addToWishList={addToWishList}
              removeFromWishList={removeFromWishList}
              //onFavClick={() => addToWishList(movie)}
            />
          );
        })}
      </div>

      <div className="cardContainer">
        <h3 className='moviesHeading'>Top Rated Movies</h3>
        {loading ? <p>Loading movies...</p> 
        : topRatedMovies.map((movie) => {
          const isInWishlist = wishList.some((m) => m.id === movie.id);

          return (
            <Card
              key={movie.id}
              id={movie.id}
            //  movie={movie}
              poster={movie.poster_path
                ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                : "https://via.placeholder.com/200x300?text=No+Image"}
              name={movie.title}
              genre={getGenreNames(movie.genre_ids)}
              year={movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}
              isInWishlist={isInWishlist}
              addToWishList={addToWishList}
              removeFromWishList={removeFromWishList}
            //  onFavClick={() => addToWishList(movie)}
            />
          );
        })}
      </div>
    </>
  );
}

export default HomePage;