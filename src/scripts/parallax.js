const parallax = document.querySelector('.parallax');
const layers = parallax.children;

function moveLayersDependOnScroll(wScroll){
  Array.from(layers).forEach(layers=>{
    const divider  = layers.dataset.speed;
    const strafe = wScroll* divider /10;
    layers.style.transform = `translateY(-${strafe}%)`;
  })

}
window.addEventListener('scroll', e=>{
  const wSroll = window.pageYOffset;
  moveLayersDependOnScroll(wSroll);
})