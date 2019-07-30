// console.log('this is skills module');

import Vue from 'vue';
const axios = require('axios');
axios.defaults.baseURL = 'https://webdev-api.loftschool.com';

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
  },
  created(){
    console.log("skill")
    console.log(this.skill)
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
      skills : []
    }
  },
  async created(){
    const data = require('./skills.json');
    this.skills = data;
    // const response = await axios.get('/skills/154');
    // console.log(response.data)
    // this.skills = response.data
    // console.log("skillS")
    // console.log(this.skills)
  }
});
