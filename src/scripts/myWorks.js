import Vue from "vue";
const axios = require('axios');
axios.defaults.baseURL = 'https://webdev-api.loftschool.com';

const devStack={
  template:"#myWorks__dev_stack",
  props:{
    devStack:Array
  }
}
const info ={
  template:"#myWorks__info",
  components:{
    devStack
  },
  props:{
    currentWork:Object
  },
  computed:{
    devStackArray(){
      return this.currentWork.techs.split(',');
    }
  }
}

const controls={
  template:"#myWorks__btn_controls"
}

const preview = {
  template:"#myWorks__preview",
  data(){
    return{
      itemsArr : []
    }
  },
  props:{
    splicedWorks:Array,
    works:Array,
    currentWork:Object,
    currentIndex:Number
  }
}

const display ={
  template:"#myWorks__display",
  components:{
    preview,
    controls
  },
  props:{
    splicedWorks:Array,
    works:Array,
    currentWork:Object,
    currentIndex:Number
  }
}
new Vue({
el:"#myWorks__component",
template:"#myWorks__container",
components:{
  display,
  info
},
data(){
  return{
    works:[],
    currentIndex : 0,
    isCreate:false,
    newSplicePos:0,
    interval:600
  }
},
computed:{
  currentWork(){ 
      return this.works[this.currentIndex];
  },
  splicedWorks(){
    if(this.currentIndex % 3 == 0 && this.currentIndex !=0){
      return [...this.works].splice(this.newSplicePos,3);
    } else if(this.currentIndex > 3){
      return [...this.works].splice(this.newSplicePos,3);
    } else if(this.currentIndex < 3){
      this.newSplicePos = 0;
      return [...this.works].splice(0,3);
    }
      
  }
},
watch:{
  currentIndex(value){
    const lenghtOfElem = this.works.length-1;
    if(value<0) 
      this.currentIndex = lenghtOfElem;
    if(value==lenghtOfElem)
    this.newSplicePos = this.works.length - 3;
  }
},
methods:{
  makeArrayWithRequiredImages(data) {
    return data.map(item =>{
      const requirePic = (`https://webdev-api.loftschool.com/${item.photo}`);
      item.photo = requirePic;
      return item;
    })
  },
  handleSlide(direction){
   switch(direction){
     case 'next':
     document.querySelector('.myWorks__slider-current-pic-wrap').classList.remove('slide-enter');
     document.querySelector('.myWorks__slider-current-pic-wrap').classList.add('slide-leave');
     setTimeout(this.changeCurrentItemNext,this.interval);
     break;
      
     case 'prev':
     document.querySelector('.myWorks__slider-current-pic-wrap').classList.remove('slide-enter');
     document.querySelector('.myWorks__slider-current-pic-wrap').classList.add('slide-leave');
     setTimeout(this.changeCurrentItemPrev,this.interval);
     break;
   }
  },

  changeCurrentItemNext(){
    let worksLength = this.works.length-1;
    if(this.currentIndex !== worksLength){
      this.currentIndex++;
      document.querySelector('.myWorks__slider-prev').classList.remove('disabledBtn')
      document.querySelector('.myWorks__slider-prev').removeAttribute('disabled')
    }
    if(this.currentIndex === worksLength){
      document.querySelector('.myWorks__slider-next').classList.add('disabledBtn')
      document.querySelector('.myWorks__slider-next').setAttribute('disabled','disabled')
    }
    document.querySelector('.myWorks__slider-current-pic-wrap').classList.remove('slide-leave');
    document.querySelector('.myWorks__slider-current-pic-wrap').classList.add('slide-enter');
  },

  changeCurrentItemPrev(){
    if(this.currentIndex !== 0){
      this.currentIndex--;
      document.querySelector('.myWorks__slider-next').classList.remove('disabledBtn')
      document.querySelector('.myWorks__slider-next').removeAttribute('disabled')
    }

    if(this.currentIndex === 0){
      document.querySelector('.myWorks__slider-prev').classList.add('disabledBtn')
      document.querySelector('.myWorks__slider-prev').setAttribute('disabled','disabled')
    } 
    document.querySelector('.myWorks__slider-current-pic-wrap').classList.remove('slide-leave');
    document.querySelector('.myWorks__slider-current-pic-wrap').classList.add('slide-enter');
  },

  changeCurrentItemPreview(currentId){
    this.currentIndex = currentId;
    // console.log('lalaal')
    document.querySelector('.myWorks__slider-current-pic-wrap').classList.remove('slide-leave');
    document.querySelector('.myWorks__slider-current-pic-wrap').classList.add('slide-enter');
    if(this.currentIndex!=this.works.length-1)
      document.querySelector('.myWorks__slider-next').classList.remove('disabledBtn')
    else {
      document.querySelector('.myWorks__slider-next').classList.add('disabledBtn')
    }


    if(this.currentIndex == 0){
      document.querySelector('.myWorks__slider-prev').classList.add('disabledBtn')
    } else {
      document.querySelector('.myWorks__slider-prev').classList.remove('disabledBtn')
    }
  },

  sliderPreviewClick(currentId){
    if(this.newSplicePos != 0 ){
      // console.log('timout2s');
      // setTimeout(this.currentIndex = currentId + this.newSplicePos,2000); 
      document.querySelector('.myWorks__slider-current-pic-wrap').classList.remove('slide-enter');
      document.querySelector('.myWorks__slider-current-pic-wrap').classList.add('slide-leave');
      setTimeout(this.changeCurrentItemPreview,this.interval,currentId + this.newSplicePos);
    }
    else{
      document.querySelector('.myWorks__slider-current-pic-wrap').classList.remove('slide-enter');
      document.querySelector('.myWorks__slider-current-pic-wrap').classList.add('slide-leave');
      setTimeout(this.changeCurrentItemPreview,this.interval,currentId);
    }
  }
},
async created(){
  const responseWorks = await axios.get('/works/154');
  // console.log(responseWorks.data)
  this.works = this.makeArrayWithRequiredImages(responseWorks.data);
  this.isCreate = true;
},


});