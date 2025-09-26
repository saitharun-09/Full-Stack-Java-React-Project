import { useEffect, useState } from "react";
import Card from "./Card";
import Header from "./Header";
import axios from "axios";

const API_KEY = "a5627a0a6e7111a4902132a7a87c6fcc";
const BASE_URL = "https://api.themoviedb.org/3";

function NowPlaying({ addToWishList, removeFromWishList, getGenreNames, wishList }) {
  const [loading, setLoading] = useState(false);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const [nowPlayingRes, upcomingRes] = await Promise.all([
          axios.get(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`),
          axios.get(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`)
        ]);

        setNowPlaying(nowPlayingRes.data.results);
        setUpcoming(upcomingRes.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      <Header />

      <div className="cardContainer">
        <h3 className="moviesHeading"> Playing Now in Theatres</h3>
        {loading ? (
          <p>Loading movies...</p>
        ) : (
          nowPlaying.map((movie) => {
            const isInWishlist = wishList.some((m) => m.id === movie.id);

            return (
              <Card
                key={movie.id}
                id={movie.id}
                movie={movie}
                poster={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                name={movie.title}
                genre={getGenreNames(movie.genre_ids)}
                year={movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}
                isInWishlist={isInWishlist}
                addToWishList={addToWishList}
                removeFromWishList={removeFromWishList}
              />
            );
          })
        )}
      </div>

      <div className="cardContainer">
        <h3 className="moviesHeading"> Upcoming Movies</h3>
        {loading ? (
          <p>Loading movies...</p>
        ) : (
          upcoming.map((movie) => {
            const isInWishlist = wishList.some((m) => m.id === movie.id);

            return (
              <Card
                key={movie.id}
                id={movie.id}
                movie={movie}
                poster={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                name={movie.title}
                genre={getGenreNames(movie.genre_ids)}
                year={movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}
                isInWishlist={isInWishlist}
                addToWishList={addToWishList}
                removeFromWishList={removeFromWishList}
              />
            );
          })
        )}
      </div>
    </>
  );
}

export default NowPlaying;
