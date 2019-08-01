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
    isCreate:false
  }
},
computed:{
  currentWork(){
    return this.works[this.currentIndex];
  }
},
watch:{
  currentIndex(value){
    const lenghtOfElem = this.works.length-1;
    if(value<0) 
      this.currentIndex = lenghtOfElem;
    if(value>lenghtOfElem)
      this.currentIndex = 0;
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
      this.currentIndex++;
      break;
     case 'prev':
      this.currentIndex--;       
      break;    
   }
  },
  sliderPreviewClick(currentId){
    this.currentIndex = currentId-1;
  }
},
async created(){
  // const data = require('./myWorks.json');
  
  const responseWorks = await axios.get('/works/154');
  console.log(responseWorks.data)
  this.works = this.makeArrayWithRequiredImages(responseWorks.data);
  this.isCreate = true;
}

});