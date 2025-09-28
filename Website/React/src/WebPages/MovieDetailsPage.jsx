import { useEffect, useState } from "react";
import Header from "./Header";
import './MovieDetailsPage.css';
import axios from "axios";
import { useParams } from "react-router-dom";

const API_KEY = "a5627a0a6e7111a4902132a7a87c6fcc";
const BASE_URL = "https://api.themoviedb.org/3";

function MovieDetailsPage({ type = "movie", wishList, addToWishList, removeFromWishList, getGenreNames}) {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [cast, setCast] = useState([]);
  const [trailerKey, setTrailerKey] = useState("");
  const [loading, setLoading] = useState(false);

  const endpoint = type === "tv" ? "tv" : "movie";
  const titleField = type === "tv" ? "name" : "title";
  const dateField = type === "tv" ? "first_air_date" : "release_date";
  const runtimeField = type === "tv" ? null : "runtime";

  const isInWishlist = item.id ? wishList.some(m => m.id === item.id) : false;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}/${endpoint}/${id}?api_key=${API_KEY}&language=en-US`
        );
        setItem(response.data);
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id, endpoint]);

  useEffect(() => {
    const fetchTrailer = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}/${endpoint}/${id}/videos?api_key=${API_KEY}&language=en-US`
        );
        setTrailerKey(response.data.results?.[0]?.key || "");
      } catch (error) {
        console.error("Error fetching trailer:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrailer();
  }, [id, endpoint]);

  useEffect(() => {
    const fetchCast = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}/${endpoint}/${id}/credits?api_key=${API_KEY}&language=en-US`
        );
        setCast(response.data.cast?.slice(0, 15) || []);
      } catch (error) {
        console.error("Error fetching cast:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCast();
  }, [id, endpoint]);

  return (
    <>
      <Header />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="containerDiv" style={{
    backgroundImage: item.poster_path ? `url(https://image.tmdb.org/t/p/original${item.poster_path})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'}}>
                 
        <div className="overlay" />
            <div className="posterDetailsContent">
            <div className="posterdiv">
                <img
                className="posterImg"
                src={
                    item.poster_path
                    ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={item[titleField]}
                />
            </div>
            <div className="detailsDiv">
                <h2 className="movieTitle">{item[titleField]}</h2>
                <p className="movieYear">{item[dateField]?.slice(0, 4) || "N/A"}</p>
                <div className="genreAndTime">
                <p className="movieGenre">{getGenreNames(item.genres?.map(g => g.id) || [])}</p>
                {runtimeField && item[runtimeField] && (
                    <p className="movieTime">{item[runtimeField]} min</p>
                )}
                </div>
                <button
                className="wishListBtn"
                onClick={() =>
                    isInWishlist ? removeFromWishList(item.id) : addToWishList(item)
                }
                >
                {isInWishlist ? "★ Wishlisted" : "☆ Add to Wishlist"}
                </button>
                <button className="playTrailerBtn">Play Trailer</button>
                <p className="description">{item.overview}</p>
                <button className="watchNow">Watch Now On</button>
            </div>
            </div>
        </div>

      )}

      {cast.length > 0 ? (
        <div className="castContainer">
          <h3 className="castHeading">Top Cast</h3>
          <div className="castScroll">
            {cast.map(actor => (
              <div key={actor.id} className="castCard">
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                      : "https://via.placeholder.com/150x200?text=No+Image"
                  }
                  alt={actor.name}
                />
                <p className="actorName">{actor.name}</p>
                <p className="characterName">as {actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Cast Details Unavailable!</p>
      )}

      <div className="trailerShow">
        {trailerKey ? (
          <iframe
            className="videoDiv"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="YouTube trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <p>No trailer available</p>
        )}
      </div>
    </>
  );
}

export default MovieDetailsPage;