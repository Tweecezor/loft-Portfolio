let hamburger_open = document.querySelector('#hamburger-menu-open');
let hamburger_close = document.querySelector('#close-hamburger');
let hamburger_menu = document.querySelector('.hamburger-nav');
let noScroll = document.querySelector('body');
hamburger_open.addEventListener('click',e=>{
  e.preventDefault();
  hamburger_menu.style.transform = `translateX(-100%)`;
  noScroll.classList.add('noScroll');
})
hamburger_close.addEventListener('click',e=>{
  e.preventDefault();
  hamburger_menu.style.transform = `initial`;
  noScroll.classList.remove('noScroll');
})