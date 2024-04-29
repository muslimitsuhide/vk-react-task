import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useParams, Link } from 'react-router-dom';
import RatingCircle from '../RatingCircle/RatingCircle';
import ActorCard from '../ActorCard/ActorCard';
import DateFormatter from '../DateFormatter/DateFormatter';
import MovieCard from '../MovieCard/MovieCard';
import './MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [showAllActors, setShowAllActors] = useState(false);
  const [showAllSimilarMovies, setShowAllSimilarMovies] = useState(false);

  const defaultImage = 'https://vk.com/images/dquestion_app_widget_2_b.png';

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            params: {
              api_key: '6d1f155c4dac5e099715cb247e4b015d',
              language: 'ru-RU',
              append_to_response: 'credits,similar',
            },
          }
        );
        setMovie(response.data);
        setSimilarMovies(response.data.similar.results);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();

    setShowAllActors(false);
    setShowAllSimilarMovies(false);
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const defaultActorImage = 'https://vk.com/images/dquestion_app_widget_2_b.png';

  let actorsToShow = movie.credits.cast.slice(0, 7);
  if (showAllActors) {
    actorsToShow = movie.credits.cast;
  }

  let similarMoviesToShow = similarMovies.slice(0, 4);
  if (showAllSimilarMovies) {
    similarMoviesToShow = similarMovies;
  }

  const handleShowAllActors = () => {
    setShowAllActors(true);
  };

  const handleShowAllSimilarMovies = () => {
    setShowAllSimilarMovies(true);
  };

  return (
    <div className="movie-details-container">
      <Link to="/" className="back-to-home-link">
        <FontAwesomeIcon icon={faArrowLeft} />
      </Link>
      <img
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : defaultImage}
        alt={movie.title}
        className="movie-poster"
      />
      <div className="movie-details-content">
        <h2 className="movie-open-title">{movie.title}</h2>
        <div className="rating-container">
          <RatingCircle rating={movie.vote_average} />
          <p className="movie-release-date">
            Дата выхода: <span className="date-formatter"><DateFormatter dateString={movie.release_date} /></span>
          </p>
          <p className="movie-duration">
            Продолжительность: <span className="duration-num">{movie.runtime} мин. </span>
          </p>
        </div>
        <p className="movie-overview">
          Обзор: <span className="overview-text">{movie.overview || 'Обзора на фильм еще нет'}</span>
        </p>
        <div className="actors-gallery">
          <h3>Главные герои:</h3>
          <div className="actor-cards">
            {actorsToShow.map(actor => (
              <ActorCard
                key={actor.id}
                actor={actor}
                defaultImage={defaultActorImage}
              />
            ))}
          </div>
          {movie.credits.cast.length > 7 && !showAllActors && (
            <button className="show-all-actors-button" onClick={handleShowAllActors}>Показать всех</button>
          )}
        </div>
        <div className="similar-movies">
          <h3>Похожие фильмы:</h3>
          <div className="movie-list">
            {similarMoviesToShow.map(similarMovie => (
              <MovieCard key={similarMovie.id} movie={similarMovie} />
            ))}
          </div>
          {similarMovies.length > 4 && !showAllSimilarMovies && (
            <button className="show-all-movies-button" onClick={handleShowAllSimilarMovies}>Показать все</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
