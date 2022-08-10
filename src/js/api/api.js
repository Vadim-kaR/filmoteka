import constants from './../../constants/constants';

const axios = require('axios');

export const api = axios.create({
  baseURL: constants.BASE_URL,
  params: {
    api_key: constants.API_KEY,
  },
});
