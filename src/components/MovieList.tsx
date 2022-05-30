import React from 'react';
import {MoviePropsType} from "../App";

type PropsType = {
    movies: Array<MoviePropsType>
}

const MovieList = (props:PropsType) => {
    return (
        <>
            {props.movies.map((movie, index) => (
                <div key = {index} className='image-container d-flex justify-content-start m-3'>
                    <img src={movie.Poster} alt='movie'></img>
                </div>
            ))}
        </>
    );
};

export default MovieList;