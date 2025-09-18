import axios from 'axios';
import '../App.css';
import Card from './Card.jsx';
import Header from "./Header";
import ImgSlider from '../WebPages/ImgSlider.jsx';
import { useEffect, useState } from 'react';

const API_KEY = "a5627a0a6e7111a4902132a7a87c6fcc";
const BASE_URL = "https://api.themoviedb.org/3";

function HomePage({ addToWishList, wishList }) {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [genres, setGenres] = useState([]);
 // const [loading, setLoading] = useState([true]);

  useEffect(() => {
    axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
      .then((response) => {
        setPopularMovies(response.data.results);
      })
      .catch((err) => console.error("Error fetching popular movies:", err));
  }, []);

  useEffect(() => {
    axios.get(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`)
      .then((response) => {
        setTopRatedMovies(response.data.results);
      })
      .catch((err) => console.error("Error fetching top rated movies:", err));
  }, []);

  useEffect(() => {
    axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`)
      .then((response) => setGenres(response.data.genres))
      .catch((err) => console.error("Error fetching genres:", err));
  }, []);

    const getGenreNames = (ids) => {
    return ids
      .map((id) => {
        const genre = genres.find((g) => g.id === id);
        return genre ? genre.name : null;
      })
      .filter(Boolean)
      .join(", ");
  };

  return (
    <>
      <Header />
      <ImgSlider />

      <div className="cardContainer">
        <h3 className='moviesHeading'>Popular Movies</h3>
        {popularMovies.map((movie) => {
          const isInWishlist = wishList.some((m) => m.id === movie.id);

          return (
            <Card
              key={movie.id}
              poster={movie.poster_path
                ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                : "https://via.placeholder.com/200x300?text=No+Image"}
              name={movie.title}
              genre={getGenreNames(movie.genre_ids)}
              year={movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}
              isInWishlist={isInWishlist}
              onFavClick={() => addToWishList(movie)}
            />
          );
        })}
      </div>

      <div className="cardContainer">
        <h3 className='moviesHeading'>Top Rated Movies</h3>
        {topRatedMovies.map((movie) => {
          const isInWishlist = wishList.some((m) => m.id === movie.id);

          return (
            <Card
              key={movie.id}
              poster={movie.poster_path
                ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                : "https://via.placeholder.com/200x300?text=No+Image"}
              name={movie.title}
              genre={getGenreNames(movie.genre_ids)}
              year={movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}
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