import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MovieList from './components/MovieList/MovieList';
import MovieDetails from './components/MovieDetails/MovieDetails';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<MovieList />} />
      <Route path='/movie/:id' element={<MovieDetails />} />
    </Routes>
  );
}

export default App;
