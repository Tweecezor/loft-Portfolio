import Vue from "vue";
const preview = {
  template:"#myWorks__preview",
  data(){
    return{
      itemsArr : []
    }
  },
  props:{
    works:Array,
    currentWork:Object
  }
}
const controls={
  template:"#myWorks__btn_controls"
}

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
      return this.currentWork.skills.split(', ');
    }
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
    currentWork:Object
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
    currentIndex : 0
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
      const requirePic = require(`../images/content/${item.photo}`);
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
created(){
  const data = require('./myWorks.json');
  this.works = this.makeArrayWithRequiredImages(data);
}

});