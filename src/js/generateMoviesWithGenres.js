import getGenresIds from './api/getGanresId';

export default async function generateMoviesWithGenres(data) {
  try {
    const genres = await getGenresIds();

    // Creating an object that stores data for handlebars template
    return data.map(movie => {
      const catArr = [];
      const dataRelease = movie.release_date?.slice(0, 4) || 2022;
      const nameOfFilm = movie.title.toUpperCase();
      const movieInfo = {
        name: nameOfFilm,
        release: dataRelease,
        id: movie.id,
        genres: catArr,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
      };

      // Comparing ganres taken from the general ganre array with IDs and adding ganres' values in the object for handlebars template
      const genresFilm = function () {
        movie.genre_ids.map(id =>
          genres.find(el => {
            if (el.id === id) {
              return catArr.push(el.name);
            }
          })
        );
      };

      genresFilm();
      movieInfo.genres = movieInfo.genres.join(', ');
      return movieInfo;
    });
  } catch (error) {
    console.log('error :>> ', error);
  }
}
