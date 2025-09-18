import { Routes, Route } from 'react-router-dom';
import HomePage from './WebPages/HomePage.jsx';
import WishList from './WebPages/WishList.jsx';
import Login from './WebPages/Login.jsx';
import { useState , useEffect } from 'react';
import SignUp from './WebPages/SignUp.jsx';
import SearchPage from './WebPages/SearchPage.jsx';
import axios from 'axios';
import MovieDetailsPage from './WebPages/MovieDetailsPage.jsx';

const API_KEY = "a5627a0a6e7111a4902132a7a87c6fcc";
const BASE_URL = "https://api.themoviedb.org/3";

function App() {
  const [wishList, setWishList] = useState([])
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`)
      .then((response) => setGenres(response.data.genres))
      .catch((error) => console.error("Error fetching genres:", error));
  }, []);

   const getGenreNames = (ids) => {
    return ids
      .map((id) => {
        const genre = genres.find((g) => g.id === id);
        return genre ? genre.name : null;
      }).filter(Boolean).join(", ");
    };

  function addToWishList(movie) {
    const Genre = {...movie, genre_ids: movie.genre_ids || (movie.genres ? movie.genres.map(g => g.id)
       : []),
    };

    if (!wishList.find((m) => m.id === Genre.id)) {
      setWishList([...wishList, Genre]);
    }
  }


  function removeFromWishList(id) {
    setWishList(wishList.filter((m) => m.id !== id));
  }


  return (
      <Routes>
        <Route index element={<HomePage addToWishList={addToWishList} wishList={wishList} 
            getGenreNames={getGenreNames} />} />
        <Route path='/wishlist' element={<WishList wishList={wishList} 
            removeFromWishList={removeFromWishList} getGenreNames={getGenreNames} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/search' element={<SearchPage addToWishList={addToWishList} wishList={wishList} 
            getGenreNames={getGenreNames} />} />
        <Route path='/movie/:id' element={<MovieDetailsPage addToWishList={addToWishList} wishList={wishList} 
            removeFromWishList={removeFromWishList} getGenreNames={getGenreNames} />} />
      </Routes>
   
  );
}

export default App;