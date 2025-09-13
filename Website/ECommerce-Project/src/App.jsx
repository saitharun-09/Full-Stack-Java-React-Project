import {Routes, Route } from 'react-router-dom';
//import {BrowserRouter, Routes, Route} from 'react';
import HomePage from './WebPages/HomePage.jsx';
import WishList from './WebPages/WishList.jsx';

function App() {
  return (
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='/wishlist' element={<WishList />} />
      </Routes>
   
  );
}

export default App;
