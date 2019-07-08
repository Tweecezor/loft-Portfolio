import Vue from 'vue';
import Flickity from 'vue-flickity';
 
new Vue({
  el:".reviews",
  components: {
    Flickity
  },
 
  data() {
    
    return {
      flickityOptions: {
      initialIndex: 0,
      prevNextButtons: false,
      pageDots: false,
      wrapAround: false,
      groupCells:true,
      contain:true,
      freeScroll:false,
      selectedAttraction: 0.01,
      friction: 0.15
      // autoPlay: true
      // selectedAttraction:0.1,
      // friction:0.8
      // height: '100%'     
      }
    }
  },
 
  methods: {
    next() {
      this.$refs.flickity.next();
    },
 
    previous() {
      this.$refs.flickity.previous();
    },
    checkArrows(){
      if(this.$refs.flickity.selectedIndex() == 0){
        this.$refs.arrow_left.disabled=true;
      } else if(this.$refs.flickity.selectedIndex() == this.$refs.flickity.slides().length-1){
        this.$refs.arrow_right.disabled=true;
      } else{
        this.$refs.arrow_left.disabled=false;
        this.$refs.arrow_right.disabled=false;
      }
    }
  }
});


// if(this.$refs.flickity.selectedIndex() == 0){
//   this.$el.querySelector('.reviews__btn--prev').disabled=true;
// } else if(this.$refs.flickity.selectedIndex() == this.$refs.flickity.slides().length-1){
//   this.$el.querySelector('.reviews__btn--next').disabled=true;
// } else{
//   this.$el.querySelector('.reviews__btn--prev').disabled=false;
//   this.$el.querySelector('.reviews__btn--next').disabled=false;
// }