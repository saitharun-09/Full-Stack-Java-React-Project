 import { useState , useEffect} from 'react';
import axios from 'axios';
import Card from './Card.jsx';
import Header from "./Header";
import { useSearchParams } from "react-router-dom";

const API_KEY = "a5627a0a6e7111a4902132a7a87c6fcc";
const BASE_URL = "https://api.themoviedb.org/3";

function SearchPage({ addToWishList, wishList , getGenreNames}) {
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  useEffect(() => { 
    if (query) {
    axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`)
        .then((response) => {  console.log("API Response:", response.data); 
          setSearchResults(response.data.results || [])})
        .catch((error) => console.error("Error Fetching", error));
    }
  }, [query]);
  
  return (
    <>
      <Header />

      <div className="cardContainer">
        <h3 className='moviesHeading'>Results found for {query}</h3>
        
        {searchResults.map((movie) => {
          const isInWishlist = wishList.some((m) => m.id === movie.id);

          return (
            <Card
              key={movie.id}
              id={movie.id}
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

export default SearchPage;