import axios from 'axios';

const configOMB = {
    baseURL: 'http://www.omdbapi.com',
};
const key = 'ec66a6a';
const axiosInstance = axios.create(configOMB);

const API = {
    getMovieRequest: (searchValue: string) => {
        const query = `/?apikey=${key}&s=${searchValue}`
        return axiosInstance.get(query)
    }
};


export default API;