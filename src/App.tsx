import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";

export type MoviesPropsType = {
  movies: Array<MoviePropsType>
}

export type MoviePropsType = {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

const App = () => {
  const [movies, setMovies] = useState<Array<MoviePropsType>>([]);
  const [searchValue, setSearchValue] = useState<string>('')

  const getMovieRequest = async (searchValue:string) => {
      const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=ec66a6a`;

      const response = await fetch(url);
      const responseJson = await response.json()

      if (responseJson.Search) {
          setMovies(responseJson.Search)
      }
  }

  useEffect(()=> {
      getMovieRequest(searchValue);
  },[searchValue])

  return (
      <div className='container-fluid movie-app'>
          <div className= 'row d-flex align-items-center mt-4 mb-4'>
              <MovieListHeading heading='Movies'/>
              <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
          </div>
        <div className='row'>
          <MovieList movies={movies} />
        </div>
      </div>
  );
};

export default App;
