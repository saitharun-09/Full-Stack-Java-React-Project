import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card.jsx';
import Header from "./Header";
import { useSearchParams } from "react-router-dom";

const API_KEY = "a5627a0a6e7111a4902132a7a87c6fcc";
const BASE_URL = "https://api.themoviedb.org/3";

function SearchPage({ addToWishList, removeFromWishList, wishList, getGenreNames }) {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  useEffect(() => { 
    if (!query) return;

    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const movieRes = await axios.get(
          `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
        );
        const movies = (movieRes.data.results || []).map(item => ({ ...item, type: 'movie' }));

        const tvRes = await axios.get(
          `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
        );
        const tvShows = (tvRes.data.results || []).map(item => ({ ...item, type: 'tv' }));

        setSearchResults([...movies, ...tvShows]);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <>
      <Header />

      <div className="cardContainer">
        <h3 className='moviesHeading'>Results found for "{query}"</h3>

        {loading && <p>Loading...</p>}

        {!loading && searchResults.length === 0 && <p>No results found.</p>}

        {!loading && searchResults.map((item) => {
          const isInWishlist = wishList.some(m => m.id === item.id);

          return (
            <Card
              key={`${item.type}-${item.id}`}
              id={item.id}
              movie={item}
              poster={item.poster_path
                ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
                : "https://via.placeholder.com/200x300?text=No+Image"}
              name={item.title || item.name}
              genre={getGenreNames(item.genre_ids || item.genres?.map(g => g.id) || [])}
              year={item.release_date?.slice(0, 4) || item.first_air_date?.slice(0, 4) || "N/A"}
              isInWishlist={isInWishlist}
              addToWishList={addToWishList}
              removeFromWishList={removeFromWishList}
              type={item.type}
            />
          );
        })}
      </div>
    </>
  );
}

export default SearchPage;