import { api } from './api';
import constants from '../../constants/constants';

const getOneMovieByIdParams = {
  language: localStorage.lang || 'en',
};
//To make a request of one movie by movie-id, it is neccesary to pass movie-id as an function argument
//You can find movie-id as an HTML data atribute here: < a class='movie-card' data-movie-id={ { id } }>
export default async function getOneMovieById(movieId) {
  try {
    // request for one movie data by movie_id
    const response = await api.get(
      `${constants.GET_ONE_MOVIE_URL}/${movieId}`,
      {
        params: getOneMovieByIdParams,
      }
    );
    // array of our beloved genres:)
    const genresArr = [];
    // an object with all the necessary properties for further rendering
    const movieData = {
      id: response.data.id,
      poster_path: response.data.poster_path,
      title: response.data.title,
      vote_average: response.data.vote_average,
      vote_count: response.data.vote_count,
      popularity: response.data.popularity,
      original_title: response.data.original_title,
      genres: genresArr,
      overview: response.data.overview,
    };

    // generating an array of our beloved genres:)
    response.data.genres.map(genre => {
      genresArr.push(genre.name);
    });
    movieData.genres = movieData.genres.join(', ');
    return movieData;
  } catch (error) {
    console.log(
      'error.code :>> ',
      error.code,
      'error.message :>> ',
      error.message
    );
  }
}
