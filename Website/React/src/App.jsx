import { Routes, Route } from 'react-router-dom';
import { useState, useEffect, Children } from 'react';
import axios, { AxiosHeaders } from 'axios';
import HomePage from './WebPages/HomePage.jsx';
import SearchPage from './WebPages/SearchPage.jsx';
import MovieDetailsPage from './WebPages/MovieDetailsPage.jsx';
import WishList from './WebPages/WishList.jsx';
import Login from './WebPages/Login.jsx';
import SignUp from './WebPages/SignUp.jsx';
import Profile from './WebPages/Profile.jsx';
import ProtectedRoute from './WebPages/ProtectedRoute.jsx';

const API_KEY = "a5627a0a6e7111a4902132a7a87c6fcc";
const BASE_URL = "https://api.themoviedb.org/3";

function App() {
  const [wishList, setWishList] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) setIsAuthenticated(true);
    if (token) fetchWishList(token);
  },[])

  const fetchWishList = async (token) => {
    try {
      const response = await axios.get("http://localhost:8085/api/wishlist/", {
        headers: { Authorization : `Bearer ${token}`},
      });
      const fetchMovieDetails = await Promise.all(response.data.map(async(item) => {
          const movieDetails = await axios.get(`${BASE_URL}/movie/${item.movieId}?api_key=${API_KEY}`);
          return movieDetails.data;
      }));
      const uniqueMovies = Array.from(new Map(fetchMovieDetails.map((movie) => 
        [movie.id = movie])).values());
      setWishList(uniqueMovies);
    } catch (error) {
      console.log(error)
    }
  };

  const addToWishList = async (movie) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please Login to add Fav");
        return;
      }
      if (wishList.some((m) => m.id === movie.id))

      await axios.post(`http://localhost:8085/api/wishlist/${movie.id}`,{},
        {headers : {Authorization: `Bearer ${token}`} }
      ) ;
    } catch (error) {
      console.log(error)
    }
  }

  const removeFromWishList = async (movieId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please Login First!");
        return;
      }
      await axios.delete(`http://localhost:8085/api/wishlist/${movieId}`,{
        headers:{Authorization:`Bearer ${token}`}
      })
      setWishList((Prev) => Prev.filter((m) => m.id !== movieId))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`)
      .then(res => setGenres(res.data.genres))
      .catch(err => console.error(err));
  }, []);
  
  const getGenreNames = (ids) => ids
    .map(id => genres.find(g => g.id === id)?.name)
    .filter(Boolean)
    .join(", ");

  return (
    <Routes>
      <Route index element={<HomePage addToWishList={addToWishList} removeFromWishList={removeFromWishList} wishList={wishList} getGenreNames={getGenreNames} />} />
      <Route path='/search' element={<SearchPage addToWishList={addToWishList} removeFromWishList={removeFromWishList} wishList={wishList} getGenreNames={getGenreNames} />} />
      <Route path='/movie/:id' element={<MovieDetailsPage addToWishList={addToWishList} removeFromWishList={removeFromWishList} wishList={wishList} getGenreNames={getGenreNames} />} />
      <Route path='/wishlist' element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <WishList wishList={wishList} removeFromWishList={removeFromWishList} getGenreNames={getGenreNames} />
        </ProtectedRoute>
      } />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/profile' element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <Profile />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;