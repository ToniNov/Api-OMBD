import React from 'react';

type PropsType = {
    heading: string
}

const MovieListHeading = (props:PropsType) => {
    return (
        <div className='col'>
            <h1>{props.heading}</h1>
        </div>
    );
};

export default MovieListHeading;