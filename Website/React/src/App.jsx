import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useState, useEffect, Children } from 'react';
import axios from 'axios';
import HomePage from './WebPages/HomePage.jsx';
import SearchPage from './WebPages/SearchPage.jsx';
import MovieDetailsPage from './WebPages/MovieDetailsPage.jsx';
import WishList from './WebPages/WishList.jsx';
import Login from './WebPages/Login.jsx';
import SignUp from './WebPages/SignUp.jsx';
import Profile from './WebPages/Profile.jsx';
import ProtectedRoute from './WebPages/ProtectedRoute.jsx';
import NowPlaying from './WebPages/NowPlaying.jsx';
import Series from './WebPages/Series.jsx';
import F1 from './WebPages/F1.jsx';
import TrackDetails from './WebPages/TrackDetails.jsx';
import Payments from './WebPages/Payments.jsx';

const API_KEY = "a5627a0a6e7111a4902132a7a87c6fcc";
const BASE_URL = "https://api.themoviedb.org/3";

function App() {
  const [wishList, setWishList] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchWishList(token);
      setIsAuthenticated(true);
    }
  },[])

  const fetchWishList = async (token) => {
    try {
      const response = await axios.get("http://localhost:8085/api/wishlist/", {
        headers: { Authorization : `Bearer ${token}`},
      });

      const fetchMovieDetails = await Promise.all(response.data.map(async (item) => {
          const movieDetails = await axios.get(`${BASE_URL}/movie/${item.movieId}?api_key=${API_KEY}`);
          return movieDetails.data;
      }));

      const uniqueMovies = Array.from(new Map(fetchMovieDetails.map(
        (movie) => [movie.id, movie])).values());

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
      if (wishList.some((m) => m.id === movie.id)) return;
      
      setWishList((prev) => [...prev, movie]);

      await axios.post(`http://localhost:8085/api/wishlist/${movie.id}`,{},
        {headers : {Authorization: `Bearer ${token}`} }
      );
    } catch (error) {
      console.log("Error adding to wishlist: ",error)
      setWishList((prev) => prev.filter((m) => m.id !== movie.id));
    }
  }

  const removeFromWishList = async (movieId) => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please Login First!");
        return;
      }
      const prevWishList = [...wishList];
      setWishList((prev) => prev.filter((m) => m.id !== movieId));
      try {
        await axios.delete(`http://localhost:8085/api/wishlist/${movieId}`,{
          headers:{ Authorization:`Bearer ${token}`},
        });
      } catch (error) {
          console.log(error)
          setWishList(prevWishList);
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
      <Route path="/tv/:id" element={<MovieDetailsPage type="tv"
                                                       wishList={wishList}
                                                       addToWishList={addToWishList}
                                                       removeFromWishList={removeFromWishList}
                                                       getGenreNames={getGenreNames} />} />
      <Route path='/movie/:id' element={<MovieDetailsPage  type="movie" addToWishList={addToWishList} removeFromWishList={removeFromWishList} wishList={wishList} getGenreNames={getGenreNames} />} />
      <Route path='/wishlist' element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <WishList wishList={wishList} removeFromWishList={removeFromWishList} getGenreNames={getGenreNames}
             isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        </ProtectedRoute> } />
      <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/profile' element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <Profile isAuthenticated={isAuthenticated}
                   setIsAuthenticated={setIsAuthenticated}
                   setWishList={setWishList}/>
        </ProtectedRoute>} />
      <Route path='/series' element={<Series wishList={wishList} 
                                             addToWishList={addToWishList}
                                             removeFromWishList={removeFromWishList} 
                                             getGenreNames={getGenreNames}/>}/>
      <Route path='/nowplaying' element={<NowPlaying wishList={wishList} 
                                                     addToWishList={addToWishList}
                                                     removeFromWishList={removeFromWishList} 
                                                     getGenreNames={getGenreNames}/>}/>
      <Route path='/f1' element={<F1/>}/>
      <Route path="/track/:meetingKey" element={<TrackDetails />} />
      <Route path='/payments' element={<Payments />} />
    </Routes>
  );
}

export default App;