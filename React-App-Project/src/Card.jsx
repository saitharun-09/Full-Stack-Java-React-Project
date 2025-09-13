import reactLogo from './assets/react.svg';

function Card() {
    return (
        <div className="card">
            <img className='profilePic' src={reactLogo} alt="Profile Pic" />
            <h2 className='name'>Sai Tharun</h2>
            <p className='cardText'>Im a Java Full-Stack Developer and play video games</p>
        </div>
    );
}

export default Card;