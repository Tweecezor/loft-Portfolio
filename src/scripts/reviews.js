import Vue from 'vue';
import Flickity from 'vue-flickity';
const axios = require('axios');
axios.defaults.baseURL = 'https://webdev-api.loftschool.com';
// import {mapState} from 'vuex';
 
new Vue({
  el:".reviews",
  components: {
    Flickity
  },
  props:{
    infoName : String,
    infoText : String,
    infoImage: String,
    infoStatus : String
  },
  data() {
    return {
      info : [],
      flickityOptions: {
      initialIndex: 0,
      prevNextButtons: false,
      pageDots: false,
      wrapAround: false,
      groupCells:true,
      contain:true,
      freeScroll:false,
      selectedAttraction: 0.01,
      friction: 0.15,
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
    },
    makeArrayWithRequiredImages(data) {
      return data.map(item =>{
        const requirePic = require(`../images/content/${item.avatar}`);
        item.avatar = requirePic;
        return item;
      })
    }
  },
  // computed:{
  //   ...mapState('reviews',{
  //     review: state=>{
  //       return state.reviews
  //     }
  //   })
  // }
  async created(){
    const data = require('./reviews.json');
    // console.log(data)
    this.info = this.makeArrayWithRequiredImages(data);
    // const response = await axios.get('/reviews/154');
    // console.log(response.data)
    // this.info = response.data
    // console.log(this.info)
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