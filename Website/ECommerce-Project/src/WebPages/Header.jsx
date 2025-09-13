import MainLogo from "../Assets/react.svg";
import '../App.css'

function Header() { 
    return (
        <>
            <div className="Header">
                <img className='mainLogo' src={MainLogo} alt="logo"/>
            <input className='inputField' type="text" placeholder='Search'/>
            <button className='homeSearchBtn'>S</button>
            <button className='wishList'>WishList</button>
            <button className='AccBtn'>Account</button>
            </div>

            <div className="evenTypes">
                <button className='types'>Movies</button>
                <button className='types'>Events</button>
                <button className='types'>Concerts</button>
                <button className='types'>Stand-Ups</button>
                <button className='types'>Plays</button>
                <button className='types'>Sports</button>
                <button className='types'>Activities</button>
                <button className='types'>#LiveNow</button>
            </div>
        </>
    );
}

export default Header;