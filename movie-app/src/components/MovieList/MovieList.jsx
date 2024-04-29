import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../MovieCard/MovieCard';
import '../MovieList/MovieList.css';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pagesToShow = 2;
  const [loadedMovieIds, setLoadedMovieIds] = useState([]);

  useEffect(() => {
    const fetchMovies = async (page) => {
      try {
        const responses = await Promise.all([
          axios.get(
            'https://api.themoviedb.org/3/discover/movie',
            {
              params: {
                api_key: '6d1f155c4dac5e099715cb247e4b015d',
                sort_by: 'popularity.desc',
                page: page,
                language: 'ru-RU',
              },
            }
          ),
          axios.get(
            'https://api.themoviedb.org/3/discover/movie',
            {
              params: {
                api_key: '6d1f155c4dac5e099715cb247e4b015d',
                sort_by: 'popularity.desc',
                page: page + 1,
                language: 'ru-RU',
              },
            }
          )
        ]);

        const newMovies = [
          ...responses[0].data.results.filter(movie => !loadedMovieIds.includes(movie.id)),
          ...responses[1].data.results.filter(movie => !loadedMovieIds.includes(movie.id))
        ];

        setMovies(prevMovies => [...prevMovies, ...newMovies]);
        setLoadedMovieIds(prevIds => [...prevIds, ...newMovies.map(movie => movie.id)]);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies(currentPage);
  }, [currentPage, loadedMovieIds]);

  const handleShowMore = () => {
    setCurrentPage(currentPage + pagesToShow);
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
