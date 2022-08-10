import { api } from './api';
import constants from '../../constants/constants';

export default async function getDataMovies(searchQuery, page) {
  const getDataMoviesParams = {
    query: searchQuery,
    page,
    language: localStorage.lang,
  };

  try {
    const response = await api.get(constants.SEARCH_URL, {
      params: getDataMoviesParams,
    });
    return await response.data; // returns an object with request data{ page, results, total_pages, total_results }. To access the movies list (an array of objects) use response.data.results
  } catch (error) {
    console.log('error :>> ', error);
  }
}
