const parallax = document.querySelector('.parallax-wrap');
const layers = parallax.children;
var i=0;

function moveLayersDependOnScroll(wScroll){
  Array.from(layers).forEach(layers=>{
    const divider  = layers.dataset.speed;
    let strafe = wScroll* divider /10;
    // console.log(i++);

    layers.style.transform = `translateY(-${strafe}%)`;
  })
  i=0;
  // for( i=0;i<layers.length;i++){
  //   const divider  = layers.dataset.speed;
  //   const strafe = wScroll* divider /10;
  //   layers.style.transform = `translateY(-${strafe}%)`;
  // }

}
window.addEventListener('scroll', e=>{
  const wSroll = window.pageYOffset;
  moveLayersDependOnScroll(wSroll);
  // console.log(layers);
})