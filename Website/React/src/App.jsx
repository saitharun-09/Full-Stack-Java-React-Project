import {Routes, Route } from 'react-router-dom';
import HomePage from './WebPages/HomePage.jsx';
import WishList from './WebPages/WishList.jsx';
import Login from './WebPages/Login.jsx';
import { useState } from 'react';
import SignUp from './WebPages/SignUp.jsx';
import SearchPage from './WebPages/SearchPage.jsx';

function App() {
  const [wishList, setWishList] = useState([])
 // const [genre, setGenre] = useState([]);

  function addToWishList(movie) {
  if (!wishList.find((m) => m.id === movie.id)) {
    setWishList([...wishList, movie]);
  }
  }

  function removeFromWishList(id) {
    setWishList(wishList.filter((m) => m.id !== id));
  }


  return (
      <Routes>
        <Route index element={<HomePage addToWishList={addToWishList} wishList={wishList}/>} />
        <Route path='/wishlist' element={<WishList wishList={wishList} 
            removeFromWishList={removeFromWishList} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path="/search"
            element={<SearchPage addToWishList={addToWishList} wishList={wishList} />} />
      </Routes>
   
  );
}

export default App;