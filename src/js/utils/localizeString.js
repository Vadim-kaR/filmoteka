import lengArr from '../locale/langs';
export default key =>
  lengArr[key] ? lengArr[key][localStorage.getItem('lang') || 'en'] : key;
