export default {
  isAuth: false,
  userName: '',
  userEmail: '',
  userUiid: '',
  movieLists: {},
  clear: function () {
    this.isAuth = false;
    this.userName = '';
    this.userEmail = '';
    this.userUiid = '';
    this.movieLists = {};
  },
};
