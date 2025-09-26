import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Card from "./Card";

const API_KEY = "a5627a0a6e7111a4902132a7a87c6fcc";
const BASE_URL = "https://api.themoviedb.org/3";

function Series({ addToWishList, removeFromWishList, getGenreNames, wishList }) {
  const [popularSeries, setPopularSeries] = useState([]);
  const [topRatedSeries, setTopRatedSeries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        setLoading(true);
        const popularRes = await axios.get(
          `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        setPopularSeries(popularRes.data.results);

        const topRatedRes = await axios.get(
          `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`
        );
        setTopRatedSeries(topRatedRes.data.results);

      } catch (error) {
        console.error("Error fetching series:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSeries();
  }, []);

  return (
    <>
      <Header />
      <div className="cardContainer">
        <h3 className="moviesHeading">Popular TV Series </h3>
        {loading ? (
          <p>Loading series...</p>
        ) : (
          popularSeries.map((show) => {
            const isInWishlist = wishList.some((m) => m.id === show.id);

            return (
              <Card
                key={show.id}
                id={show.id}
                movie={show}
                poster={
                  show.poster_path
                    ? `https://image.tmdb.org/t/p/w200${show.poster_path}`
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                name={show.name}
                genre={getGenreNames(show.genre_ids)}
                year={ show.first_air_date ? show.first_air_date.slice(0, 4) : "N/A" }
                isInWishlist={isInWishlist}
                addToWishList={addToWishList}
                removeFromWishList={removeFromWishList}
              />
            );
          })
        )}
      </div>

      <div className="cardContainer">
        <h3 className="moviesHeading">Top Rated TV Series </h3>
        {loading ? (
          <p>Loading series...</p>
        ) : (
          topRatedSeries.map((show) => {
            const isInWishlist = wishList.some((m) => m.id === show.id);

            return (
              <Card
                key={show.id}
                id={show.id}
                movie={show}
                poster={
                  show.poster_path
                    ? `https://image.tmdb.org/t/p/w200${show.poster_path}`
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                name={show.name}
                genre={getGenreNames(show.genre_ids)}
                year={ show.first_air_date ? show.first_air_date.slice(0, 4) : "N/A" }
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

export default Series;