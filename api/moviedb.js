import axios from "axios";
import { apiKey } from "../constants";

const apiBaseUrl = `https://api.themoviedb.org/3`;
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
const UpcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;

const apiCall = async (endpoints, params) => {
    const options = {
        method: "GET",
        url: endpoints,
        params: params ? params : {},
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (erro) {
        console.log("error", erro);
        return {};
    }
};

/* Dynamic endpoints */
const movieDetailsEndpoint = (Id) =>
    `${apiBaseUrl}/movie/${Id}?api_key=${apiKey}`;

const movieCreditsEndpoint = (Id) =>
    `${apiBaseUrl}/movie/${Id}/credits?api_key=${apiKey}`;

const similarMoviesEndpoint = (Id) =>
    `${apiBaseUrl}/movie/${Id}/similar?api_key=${apiKey}`;

const personDetailsEndpoint = (Id) =>
    `${apiBaseUrl}/person/${Id}?api_key=${apiKey}`;

const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${apiKey}`;

const personsMoviesEndpoint = (Id) =>
    `${apiBaseUrl}/person/${Id}/movie_credits?api_key=${apiKey}`;
export const image500 = (path) =>
    path ? `https://image.tmdb.org/t/p/w500${path}` : null;

export const image342 = (path) =>
    path ? `https://image.tmdb.org/t/p/w342${path}` : null;

export const image185 = (path) =>
    path ? `https://image.tmdb.org/t/p/w185${path}` : null;

export const fechtTrendingMovies = () => {
    return apiCall(trendingMoviesEndpoint);
};
export const fechtUpcomingMovies = () => {
    return apiCall(UpcomingMoviesEndpoint);
};
export const fechtTopRatedMovies = () => {
    return apiCall(topRatedMoviesEndpoint);
};

export const fetchMovieDeails = (Id) => {
    return apiCall(movieDetailsEndpoint(Id));
};

export const fetchMovieCredits = (Id) => {
    return apiCall(movieCreditsEndpoint(Id));
};

export const fetchSimilarMovies = (Id) => {
    return apiCall(similarMoviesEndpoint(Id));
};

export const fechtPersonDetails = (Id) => {
    return apiCall(personDetailsEndpoint(Id));
};

export const fetchPersonsMovies = (Id) => {
    return apiCall(personsMoviesEndpoint(Id));
};

export const fetchSearchMovies = (params) => {
    return apiCall(searchMoviesEndpoint, params);
};
