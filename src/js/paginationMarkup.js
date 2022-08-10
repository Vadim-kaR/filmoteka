import refs from '../constants/refs';

function renderSpan(value) {
  return `<span data-value='${value}'>${value}</span>`;
}

export function renderingPaginationMarkup(currentPage) {
  let maxPage = refs.input?.value
    ? Number(JSON.parse(localStorage.getItem('searchData'))?.onSearchTotalPages)
    : Number(localStorage.getItem('trendingTotalPages'));
  const pagesArray = Array.apply(null, {
    length: maxPage ?? 0,
  })
    .map(Number.call, Number)
    .map(item => item + 1);
  let result =
    pagesArray.length <= 3
      ? pagesArray.map(item => renderSpan(item)).join('')
      : pagesArray
        .map(item => {
          if (
            item === maxPage ||
            item === 1 ||
            item === currentPage - 1 ||
            item === currentPage + 1 ||
            item === currentPage - 2 ||
            item === currentPage + 2 ||
            item === currentPage
          ) {
            return renderSpan(item);
          }
          if (document.documentElement.clientWidth > 420) {
            if (item === currentPage - 3 || item === currentPage + 3) {
              return "<span data-value='dots'>...</span>";
            }
          }
          return '';
        })
        .join('');
  if (currentPage > 1) {
    result =
      `<span class='pagination__prev' data-span='prev'>←</span>` +
      result;
  }
  if (currentPage >= 1 && currentPage !== maxPage && maxPage !== 0) {
    result =
      result +
      `<span class='pagination__next' data-span='next'>	
      →</span>`;
  }
  if (refs.paginationList) {
    refs.paginationList.innerHTML = result;
    refs.paginationList.querySelectorAll('span').forEach(item => {
      if (item.innerHTML == currentPage) {
        item.classList.toggle('active');
      }
    });
  }
}
