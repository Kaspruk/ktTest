import axios from 'axios';
import interpolateUrl from '../../helpers/interpolateUrl';

const BASE_URL = `https://api.themoviedb.org/3`;
const API_KEY = `api_key=0485215329c893f49b488f10ea7cfb84`;

const URLS = {
    getAllMovies: `${BASE_URL}/discover/movie?/:page/:sort_by/:with_genres&${API_KEY}`,
    getTopRated: `${BASE_URL}/movie/top_rated?/&page=1&${API_KEY}`,
    getPopular: `${BASE_URL}/movie/popular?/&page=1&${API_KEY}`,
    getDetails: `${BASE_URL}/movie//:movieId?${API_KEY}`,
    getSimilar: `${BASE_URL}/movie//:movieId/similar?page=1&${API_KEY}`,
    getSearchMovie: `${BASE_URL}/search/movie?/:query&${API_KEY}`,
    getGenres: `${BASE_URL}https://api.themoviedb.org/3/genre/movie/list?&${API_KEY}`,
};

const movieFactory = () => ({

    discover: params => axios.get(interpolateUrl(URLS.getAllMovies, params))
            .then(res => Promise.resolve(res.data))
            .catch(err =>  Promise.reject(err)),

    getDetails: movieId => axios.get(interpolateUrl(URLS.getDetails, { movieId }))
        .then(res => Promise.resolve(res.data))
        .catch(err => Promise.reject(err)),

    getSimilar: movieId => axios.get(interpolateUrl(URLS.getSimilar, { movieId }))
        .then(res => Promise.resolve(res.data))
        .catch(err => Promise.reject(err)),

    getTopRated: () => axios.get(URLS.getTopRated)
        .then(res => Promise.resolve(res.data))
        .catch(err => Promise.reject(err)),

    getPopular: () => axios.get(URLS.getPopular)
        .then(res => Promise.resolve(res.data))
        .catch(err => Promise.reject(err)),

    getSearchMovie: query => axios.get(interpolateUrl(URLS.getSearchMovie, { query }))
        .then(res => Promise.resolve(res.data))
        .catch(err => Promise.reject(err)),

    getGenres: () => axios.get(URLS.getGenres)
        .then(res => Promise.resolve(res.data))
        .catch(err => Promise.reject(err)),

});


export default movieFactory;
