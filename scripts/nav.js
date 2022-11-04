const nav = document.querySelector('.nav');
const navElement = document.querySelector('.nav__element');

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {

    nav.style.backgroundColor = "#126A3A";

  } else {
    nav.style.backgroundColor = "#5C9247";

   
  }
}