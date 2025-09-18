import { useEffect, useState } from "react";
import Header from "./Header";
import './MovieDetailsPage.css';
import axios from "axios";
import { useParams } from "react-router";

const API_KEY = "a5627a0a6e7111a4902132a7a87c6fcc";
const BASE_URL = "https://api.themoviedb.org/3";

function MovieDetailsPage({wishList, addToWishList, removeFromWishList, getGenreNames}){
    const [movie, setMovie] = useState({});
    const { id } = useParams();
    const isInWishlist = movie.id ? wishList.some(m => m.id === movie.id) : false;
    const [loading, setLoading] = useState(false);
    const [trailerKey, setTrailerKey] = useState("");
    const [cast, setCast] = useState(null);
 
    useEffect(() => { 
        const fetchDetails = async () => {
            setLoading(true);
            try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${id}?api_key=a5627a0a6e7111a4902132a7a87c6fcc&language=en-US`            );
            setMovie(response.data);
            } catch (error) {
            console.log("Error fetching movie details:", error);
            } finally {
            setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    useEffect(() => { 
        const fetchTrailer = async () => {
            setLoading(true);
            try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${id}/videos?api_key=a5627a0a6e7111a4902132a7a87c6fcc&language=en-US&page=1`
            );
            setTrailerKey(response.data.results[0].key);
            } catch (error) {
            console.log("Error fetching Trailer:", error);
            } finally {
             setLoading(false);
            }
        };
        fetchTrailer();
    }, [id]);

    useEffect(() => {
        const fetchCast = async () => {
            setLoading(true);
            try {
            const response = await axios.get(
                `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
            );
            setCast(response.data.cast.slice(0, 15));
            } catch (error) {
            console.log("Error fetching Cast:", error);
            } finally {
             setLoading(false);
            }
        };
        fetchCast();
    }, [id]);


    return (
        <>
            <Header />
            {loading ? <p>Loading...</p> :
            <div className="containerDiv">
                <div className="posterdiv">
                    <img className="posterImg" src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                         alt={movie.title} />
                </div>
                <div className="detailsDiv">
                    <h2 className="movieTitle">{movie.title}</h2>
                    <p className="movieYear">{movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}</p>
                    <div className="genreAndTime">
                        <p className="movieGenre">{getGenreNames(movie.genres?.map(g => g.id) || [])}</p>
                        <p className="movieTime">{movie.runtime} min</p>
                    </div>
                    <button className="wishListBtn" onClick={() =>
                        isInWishlist ? removeFromWishList(movie.id) : addToWishList(movie)
                        }>{isInWishlist ? "★ Wishlisted" : "☆ Add to Wishlist"}</button>
                    <button className="playTrailerBtn">Play Trailer</button>
                    <p className="description">{movie.overview}</p>
                    <button className="watchNow">Watch Now On </button>
                </div>
            </div>
            } 

                {cast ? (<div className="castContainer">
                    <h3 className="castHeading">Top Cast</h3>
                    <div className="castScroll">
                        {cast.map((actor) => (
                        <div key={actor.id} className="castCard">
                            <img src={ actor.profile_path
                                ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                                : "https://via.placeholder.com/150x200?text=No+Image"
                            } alt={actor.name} />
                            <p className="actorName">{actor.name}</p>
                            <p className="characterName">as {actor.character}</p>
                        </div>
                        ))}
                    </div>
                </div> ) : <p>Cast Details Unavailable!</p> }

            <div className="trailerShow">
                {trailerKey ? ( <iframe
                    className="videoDiv"
                    src={`https://www.youtube.com/embed/${trailerKey}`}
                    title="YouTube trailer"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen></iframe> ) : ( <p>No trailer available</p>
                )}
            </div>
        </>
    );
}

export default MovieDetailsPage;