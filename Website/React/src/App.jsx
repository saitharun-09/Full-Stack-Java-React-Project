import {Routes, Route } from 'react-router-dom';
import HomePage from './WebPages/HomePage.jsx';
import WishList from './WebPages/WishList.jsx';
import Login from './WebPages/Login.jsx';
import { useState } from 'react';
import SignUp from './WebPages/SignUp.jsx';

function App() {
  const [wishList, setWishList] = useState([])

  function addToWishList(movie){
    if (!wishList.find((m) => m.imdbID===movie.imdbID)){
      setWishList([...wishList, movie]);
    }
  }

  function removeFromWishList(imdbID) {
    setWishList(wishList.filter((m) => m.imdbID !== imdbID));
  }

  return (
      <Routes>
        <Route index element={<HomePage addToWishList={addToWishList} wishList={wishList}/>} />
        <Route path='/wishlist' element={<WishList wishList={wishList} 
            removeFromWishList={removeFromWishList} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
   
  );
}

export default App;