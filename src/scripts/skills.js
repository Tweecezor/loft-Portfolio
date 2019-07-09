console.log('this is skills module');

import Vue from 'vue';

const skill = {
  template:"#skill",
  props:{
    skillPercent:Number,
    skillName:String
  },
  mounted(){
    const circle = this.$refs['circle'];
    circle.style.animationDelay = -this.skillPercent +"s";
  }
}


const skills__block_item = {
  template:"#skills__block-item",
  props:{
    skill:Object
  },
  components:{
    skill
  }
}
new Vue({

  el:'#skills__container',
  template:'#skills__list',
  components:{
    skills__block_item
  },
  data(){
    return {
      skills : [],
    }
  },
  created(){
    const data = require('./skills.json');
    this.skills = data;
  }
});
