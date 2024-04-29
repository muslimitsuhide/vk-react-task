import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import RatingCircle from '../RatingCircle/RatingCircle';
import ActorCard from '../ActorCard/ActorCard';
import DateFormatter from '../DateFormatter/DateFormatter';
import './MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [showAllActors, setShowAllActors] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            params: {
              api_key: '6d1f155c4dac5e099715cb247e4b015d',
              language: 'ru-RU',
              append_to_response: 'credits',
            },
          }
        );
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const defaultActorImage = 'https://vk.com/images/dquestion_app_widget_2_b.png';

  let actorsToShow = movie.credits.cast.slice(0, 8);
  if (showAllActors) {
    actorsToShow = movie.credits.cast;
  }

  const handleShowAllActors = () => {
    setShowAllActors(true);
  };

  return (
    <div className="movie-details-container">
      <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} className="movie-poster" />
      <div className="movie-details-content">
        <h2 className="movie-open-title">{movie.title}</h2>
        <div className="rating-container">
          <RatingCircle rating={movie.vote_average} />
          <p className="movie-release-date">Дата выхода: <DateFormatter dateString={movie.release_date} /></p>
        </div>
        <p className="movie-overview">{movie.overview}</p>
        <div className="actors-gallery">
          <h3>Актеры</h3>
          <div className="actor-cards">
            {actorsToShow.map(actor => (
              <ActorCard
                key={actor.id}
                actor={actor}
                defaultImage={defaultActorImage}
              />
            ))}
          </div>
          {movie.credits.cast.length > 8 && !showAllActors && (
            <button className="show-all-actors-button" onClick={handleShowAllActors}>Показать всех актеров</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
