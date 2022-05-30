import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddToFavourites';
import RemoveFavourites from './components/ RemoveFavourites'

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
    const [favourites, setFavourites] = useState<Array<MoviePropsType>>([])

    const getMovieRequest = async (searchValue: string) => {
        const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=ec66a6a`;

        const response = await fetch(url);
        const responseJson = await response.json()

        if (responseJson.Search) {
            setMovies(responseJson.Search)
        }
    }

    const addFavouriteMovie = (movie: MoviePropsType) => {
        const newFavouriteList = [...favourites, movie];
        setFavourites(newFavouriteList);
        saveToLocalStorage(newFavouriteList)
    };

    const removeFavoriteMovies = (movie: MoviePropsType) => {
        const newFavouriteList = favourites.filter(
            (favourite) => favourite.imdbID !== movie.imdbID
        );
        setFavourites(newFavouriteList)
        saveToLocalStorage(newFavouriteList)
    }

    useEffect(() => {
        getMovieRequest(searchValue);
    }, [searchValue]);

    useEffect(() => {
        debugger
        const movieFavourites = JSON.parse(
            localStorage.getItem('react-movie-app-favourites') || ''
        );

        setFavourites(movieFavourites);
    }, []);
    //!!!!
    const saveToLocalStorage = (items: any) => {
        localStorage.setItem('react-movie-app-favorites', JSON.stringify(items))
    }

    return (
        <div className='container-fluid movie-app'>
            <div className='row d-flex align-items-center mt-4 mb-4'>
                <MovieListHeading heading='Movies'/>
                <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
            </div>
            <div className='row'>
                <MovieList movies={movies}
                           handleFavouritesClick={addFavouriteMovie}
                           favouriteComponent={AddFavourites}
                />
            </div>
            <div className='row d-flex align-items-center mt-4 mb-4'>
                <MovieListHeading heading='Favourites'/>
            </div>
            <div className='row'>
                <MovieList movies={favourites}
                           favouriteComponent={removeFavoriteMovies}
                           handleFavouritesClick={RemoveFavourites}
                />
            </div>
        </div>
    );
};

export default App;
