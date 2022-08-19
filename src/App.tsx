import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddToFavourites';
import RemoveFavourites from './components/ RemoveFavourites'
import AddFavourite from "./components/AddToFavourites";

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

function App() {
    const [movies, setMovies] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [favourites, setFavourites] = useState([]);

    const getMovieRequest = async (searchValue:string) => {
        const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;

        const response = await fetch(url);
        const responseJson = await response.json();

        if (responseJson.Search) {
            setMovies(responseJson.Search);
        }
    }

    useEffect(() => {
        getMovieRequest(searchValue);
    }, [searchValue])

    useEffect(() => {
        const movieFavourites = JSON.parse(
            // @ts-ignore
            localStorage.getItem('movies-favourites' | '[]' )
        );

        if (movieFavourites) {
            setFavourites(movieFavourites);
        }
    }, [])

    const addFavouriteMovie = (movie:MoviePropsType) => {
        const newFavouriteList = [...favourites, movie];
        debugger
        const favouriteExists = favourites.filter(
            (favourite:any) => favourite.imdbID === movie.imdbID
        )

        if (favouriteExists.length === 0) {
            //@ts-ignore
            setFavourites(newFavouriteList);
            saveToLocalStorage(newFavouriteList);
        }
    }

    const removeFavouriteMovie = (movie:MoviePropsType) => {
        const newFavouriteList = favourites.filter(
            (favourite:any) => favourite.imdbID !== movie.imdbID
        );

        setFavourites(newFavouriteList);
        saveToLocalStorage(newFavouriteList);
    }

    const saveToLocalStorage = (items:Array<MoviePropsType>) => {
        localStorage.setItem('movies-favourites', JSON.stringify(items))
    }

    let RemoveFavourite;

    return (
        <div className='container-fluid movie-app'>
            <div className='row d-flex align-items-center mt-4 mb-4'>
                <MovieListHeading heading=' 🎞️ Movies APP ' />
                <SearchBox
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                />
            </div>
            <div className='row'>
                <MovieList
                    movies={movies}
                    favouriteComponent={AddFavourite}
                    handleFavouritesClick={addFavouriteMovie}
                />
            </div>

            <div className='row d-flex align-items-center mt-4 mb-4'>
                <MovieListHeading heading=' ❤️ Favourites ' />
            </div>
            <div className='row'>
                <MovieList
                    movies={favourites}
                    favouriteComponent={RemoveFavourites}
                    handleFavouritesClick={removeFavouriteMovie}
                />
            </div>
        </div>
    );
}

export default App;
