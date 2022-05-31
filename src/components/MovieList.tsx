import React from 'react';
import {MoviePropsType} from "../App";

type PropsType = {
    movies: Array<MoviePropsType>
    favouriteComponent: any
    handleFavouritesClick?: (movie:any) => void
}

const MovieList: React.FC<PropsType> = (
    {
        movies,
        favouriteComponent,
        handleFavouritesClick,
    }
) => {
    const FavouriteComponent = favouriteComponent;

    return (
        <>
            {movies.map((movie, index) => (
                <div key={index} className='image-container d-flex justify-content-start m-3'>
                    <img src={movie.Poster} alt='movie'></img>
                    <div onClick={() => handleFavouritesClick ? handleFavouritesClick(movie) : undefined}
                         className='overlay d-flex align-items-center justify-content-center'>
                        <FavouriteComponent />
                    </div>
                </div>
            ))}
        </>
    );
};

export default MovieList;