// import Vue from 'vue';
// new Vue({
//   el:".reviews__slider",
//   data:{
//    style:{
//      height:'100%'
//    }
//   }
// });
document.addEventListener("DOMContentLoaded", e=>{
  let items = document.querySelectorAll('.reviews__item-wrap');
  for(i=0;i<items.length;i++){
    items[i].style.height="100%";
  }
});