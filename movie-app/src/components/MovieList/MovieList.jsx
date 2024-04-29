import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../MovieCard/MovieCard';
import '../MovieList/MovieList.css';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pagesToShow = 1;

  const fetchMovies = async (page) => {
    try {
      const response = await axios.get(
        'https://api.themoviedb.org/3/discover/movie',
        {
          params: {
            api_key: '6d1f155c4dac5e099715cb247e4b015d',
            sort_by: 'popularity.desc',
            page: page,
            language: 'ru-RU',
          },
        }
      );
      const newMovies = response.data.results;
      setMovies(prevMovies => [...prevMovies, ...newMovies]);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const handleShowMore = () => {
    setCurrentPage(currentPage + pagesToShow);
    fetchMovies(currentPage + pagesToShow);
  };

  return (
    <div className="movie-list-container">
      <h2>Популярные фильмы</h2>
      <div className="movie-list">
        {movies.map((movie, index) => (
          <MovieCard key={`${movie.id}${index}`} movie={movie} />
        ))}
      </div>
      <div className="show-more">
        <button onClick={handleShowMore}>Показать еще</button>
      </div>
    </div>
  );
};

export default MovieList;
