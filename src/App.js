import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

const MOVIE_API_URL = 'https://swapi.dev/api/films/';
const LOADING = 'Loading...';
const NO_MOVIES = 'Found no movies.';

const App = () => {
  const [movies, setMovies] = useState([])
  const [pageState, setPageState] = useState();

  const fetchMoviesHandler = async () => {

    try {
      const response = await fetch(MOVIE_API_URL);
      setPageState(() => {
        return <p>{LOADING}</p >
      })
      if (!response.ok) {
        throw new Error('Something went wrong');
      } else {
        const data = await response.json();
        const moviesData = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            releaseDate: movieData.release_date,
            openingText: movieData.opening_crawl
          }
        })

        setMovies(moviesData);
        setPageState(() => {
          return moviesData.length > 0 ? <MoviesList movies={moviesData} /> : <p>{NO_MOVIES}</p>;
        })
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {pageState}
      </section>
    </React.Fragment>
  );
}

export default App;
