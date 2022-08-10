import constants from '../../constants/constants';
import { api } from './api';

const getGenresIdsParams = {
  language: localStorage.lang || 'en',
};
// Get genres array
export default async function getGenresIds() {
  try {
    const response = await api.get(constants.MOVIE_GENRES_URL, {
      params: getGenresIdsParams,
    });

    return response.data.genres;
  } catch (error) {
    console.log('error.code :>> ', error.code);
  }
}
