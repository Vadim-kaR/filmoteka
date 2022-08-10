import { api } from './api';
import constants from '../../constants/constants';

export default async function getTrendingMoviesData(page) {
  try {
    const getTrendingMoviesDataParams = {
      page,
      language: localStorage.lang,
    };
    const response = await api.get(constants.TRENDING_URL, {
      params: getTrendingMoviesDataParams,
    });

    return response.data; // returns an object with request data{ page, results, total_pages, total_results }. To access the movies list (an array of objects) use response.data.results
  } catch (error) {
    console.log('error :>> ', error);
  }
}
