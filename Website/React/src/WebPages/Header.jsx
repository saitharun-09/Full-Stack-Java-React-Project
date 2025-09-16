import { Link } from "react-router-dom";
import MainLogo from "../Assets/react.svg";
import '../App.css'

function Header() { 
    return (
        <>
            <div className="Header">
                 <Link to="/">
                    <img className='mainLogo' src={MainLogo} alt="logo"/>
                 </Link>
            <input className='inputField' type="text" placeholder='Search Movies, Events, Races...'/>
            <button className='homeSearchBtn'>S</button>
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