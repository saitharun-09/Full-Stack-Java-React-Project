import { Link, useNavigate } from "react-router-dom";
import MainLogo from "../Assets/react.svg";
import '../App.css'
import { useState } from "react";

function Header() { 
  const [searchQuery, setSearchQuery] = useState("");

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

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
                        placeholder='Search Movies, Series  F1 Races...'/>
                <button className='homeSearchBtn' type="submit">S</button>
                </form>
                <Link to="/wishlist">
                    <button className='wishList'>WishList</button>
                </Link>
                <Link to={isLoggedIn ? "/profile" : "/login"}>
                    <button className='AccBtn'>
                        {isLoggedIn ? "Profile" : "Account"}
                    </button>
                </Link>
            </div>

            <div className="evenTypes">
                <Link to = "/">
                    <button className='types'>Movies</button>
                </Link>
                <Link to = "/series">
                    <button className='types'>Series</button>
                </Link>
                <Link to = "/f1">
                    <button className='types'>F1 Races</button>
                </Link>
                <Link to = "/Nowplaying">
                    <button className='types'>#NowPlaying</button>
                </Link>
            </div>
        </>
    );
}

export default Header;