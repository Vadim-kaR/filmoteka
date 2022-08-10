import refs from '../constants/refs';
refs.upBtn.addEventListener('click', onUpClick);                 // Set the listener on Button Up
// handle a click on the button Up
function onUpClick() {
  document.documentElement.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 70) {                      // on / off button up
      refs.upBtn.classList.add("on-screen")}
        else {refs.upBtn.classList.remove("on-screen")}
});

export default {onUpClick};
