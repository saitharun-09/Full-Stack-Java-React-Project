import { Link, useNavigate } from "react-router-dom";
import MainLogo from "../Assets/react.svg";
import '../App.css'
import { useState } from "react";

function Header() { 
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

    return (
        <>
            <div className="Header">
                <Link to="/">
                    <img className='mainLogo' src={MainLogo} alt="logo"/>
                </Link>
                <form  onSubmit={handleSubmit} >
                <input  className='inputField' 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder='Search Movies, Events,  F1 Races...'/>
                <button className='homeSearchBtn' type="submit">S</button>
                </form>
                <Link to="/wishlist">
                    <button className='wishList'>WishList</button>
                </Link>
                <Link to="/login" >
                    <button className='AccBtn'>Account</button>
                </Link>
            </div>

            <div className="evenTypes">
                <button className='types'>Movies</button>
                <button className='types'>Events</button>
                <button className='types'>Concerts</button>
                <button className='types'>F1 Races</button>
                <button className='types'>Sports</button>
                <button className='types'>#LiveNow</button>
            </div>
        </>
    );
}

export default Header;