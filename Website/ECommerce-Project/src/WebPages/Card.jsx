function Card({ poster, name, genre, year }) {
    return (
        <div className="card">
            <button className="favBtn">★</button>
            <div className='posterDiv'>
                <img className='moviePoster' src={poster} alt="Poster" />
            </div>
            <h2 className='movieName'>{name}</h2>
            <p className='movieGenre'>{genre}</p>
            <p className='movieYear'>{year}</p>
        </div>
    );
}

export default Card;