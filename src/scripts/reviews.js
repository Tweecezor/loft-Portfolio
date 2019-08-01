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
    // infoName : String,
    // infoText : String,
    // infoImage: String,
    // infoStatus : String
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
      },
      isCreate:false,
      height:'',
      sliderCount:0
     
    }
  },
  methods: {
    next() {
      // this.$refs.flickity.resize();
      this.sliderCount++;
      this.$refs.flickity.next();
    },
 
    previous() {
      this.sliderCount--;
      this.$refs.flickity.previous();
    },
    checkArrows(){
      if(this.$refs.flickity.selectedIndex() == 0){
        this.$refs.arrow_left.disabled=true;
        this.$refs.arrow_right.disabled=false;
      } else if(this.$refs.flickity.selectedIndex() == this.$refs.flickity.slides().length-1){
        this.$refs.arrow_right.disabled=true;
        this.$refs.arrow_left.disabled=false;
      } else{
        this.$refs.arrow_left.disabled=false;
        this.$refs.arrow_right.disabled=false;
      }
    },
    // makeArrayWithRequiredImages(data) {
    //   return data.map(item =>{
    //     const requirePic = require(`../images/content/${item.avatar}`);
    //     item.avatar = requirePic;
    //     return item;
    //   })
    // },
    makeArrayWithRequiredImages(data) {
      return data.map(item =>{
        const requirePic = (`https://webdev-api.loftschool.com/${item.photo}`);
        item.photo = requirePic;
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
    // const data = require('./reviews.json');
    // console.log(data)
    const response = await axios.get('/reviews/154');
   
    // console.log(response.data)
    // this.info = response.data
    this.info = this.makeArrayWithRequiredImages(response.data);
    this.isCreate = true;
    // console.log(this.info)
  },
  watch:{
    isCreate(){
      this.height="200px"
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