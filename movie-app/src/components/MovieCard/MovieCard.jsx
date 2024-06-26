import React from 'react';
import { Link } from 'react-router-dom';
import RatingCircle from '../RatingCircle/RatingCircle';
import DateFormatter from '../DateFormatter/DateFormatter';

const defaultImage = 'https://vk.com/images/dquestion_app_widget_2_b.png';

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`} className="movie-item">
      <img
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : defaultImage}
        alt={movie.title}
        className="movie-image"
      />
      <div className="movie-details">
        <div className="movie-info">
          <RatingCircle rating={movie.vote_average} />
        </div>
        <div className="movie-info">
          <p className="movie-title">{movie.title}</p>
        </div>
        <div className="movie-info">
          <p className="movie-date"><DateFormatter dateString={movie.release_date} /></p>
        </div>
      </div>
      <div className="movie-description">
        <p>{movie.overview || 'Нет обзора на фильм'}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
