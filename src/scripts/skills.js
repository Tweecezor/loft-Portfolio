// console.log('this is skills module');

import Vue from 'vue';
const axios = require('axios');
axios.defaults.baseURL = 'https://webdev-api.loftschool.com';

const skill = {
  template:"#skill",
  props:{
    // skillPercent:Number,
    // skillName:String
    currentSkill:Object
  },
  mounted(){
    const circle = this.$refs['circle'];
    circle.style.animationDelay = -this.currentSkill.percent +"s";
  }
}


const skills__block_item = {
  template:"#skills__block-item",
  props:{
    skill:Array,
    category:Object
  },
  components:{
    skill
  },
  created(){
    // console.log("skill")
    // console.log(this.skill)
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
      // skills : [],
      // newSkills:{
      //   category:'',
      //   skills:{

      //   }
      // },
      responseSkills:[],
      responseCategory:[]
    }
  },
  async created(){
    // const data = require('./skills.json');
    // this.skills = data;
    const responseSkill = await axios.get('/skills/154');
    // console.log(response.data)
    this.responseSkills = responseSkill.data
    const responseCategory = await axios.get('/categories/154');
    // console.log(responseCategory.data);
    this.responseCategory = responseCategory.data;
    // console.log(responseCategory.category)
    // this.newSkills.category = this.responseCategory.category
    // console.log("skillS")
    // console.log(this.skills)
  },
  methods:{
    filterSkillsByCategoryId(categoryId){
      return this.responseSkills.filter(skill=>skill.category == categoryId)
    }
  }
});
