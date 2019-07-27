<template lang="pug">
  .skills__form
    .skills__new-group-wrap
      input.skills__new-group(
        type='text' name="groupName" placeholder="Название новой группы"
        v-model="skillTitle"
        )
      .skills__new-group-actions
        .skills__accept(@click="addNewCategory")
        .skills__decline(@click = "closeNewCategory")
    //- .skills__group.skills__group-hide
    //-   .skills__group-row-wrap 
    //-     input(type="text" name="skill_title" placeholder="HTML").skills__group-input
    //-     .skills__group-percent-wrap
    //-       input(type="number" name="skill_percent").skills__group-percent
    //-     .skills__group-actions
    //-       .skills__group-correct
    //-       .skills__group-trash
    //-   .skills__group-row-wrap 
    //-     input(type="text" name="skill_title" placeholder="HTML").skills__group-input
    //-     .skills__group-percent-wrap
    //-       input(type="number" name="skill_percent").skills__group-percent
    //-     .skills__group-actions
    //-       .skills__group-correct
    //-       .skills__group-trash
    //-   .skills__group-row-wrap 
    //-     input(type="text" name="skill_title" placeholder="HTML").skills__group-input
    //-     .skills__group-percent-wrap
    //-       input(type="number" name="skill_percent").skills__group-percent
    //-     .skills__group-actions
    //-       .skills__group-correct
    //-       .skills__group-trash
    .skills__group-new-skill
      input(type="text" name="newSkillInput"  disabled="disable").skills__group-new-skill-input
      .skills__group-new-skill-percent-wrap
        input(type="number" min="0" max="100" name="newSkillPercent" disabled="disable").skills__group-new-skill-percent
      button(type="button" disabled="disable").skills__group-new-btn
</template>

<script>
import { mapActions } from 'vuex';
import {Validator} from 'simple-vue-validator';
export default {
  mixins:[require('simple-vue-validator').mixin],
  validators:{
    'skillTitle'(value){
      return Validator.value(value).required('Обязательное поле для заполнения')
    }
  },
  data(){
    return{
      skillTitle:'',
    }
  },
  methods:{
    ...mapActions('categories',['addCategory']),
    ...mapActions('tooltips',['showTooltip','hideTooltip']),
    async addNewCategory(){
      this.$emit('toogleAddingForm');
      if ((await this.$validate()) === false){
      this.showTooltip({
        type:'error',
        text:'Ошибка валидации'
      });
      // setTimeout(this.func, 3000);
      return;
      }
      try{
        await this.addCategory(this.skillTitle);
        this.showTooltip({
          type:'success',
          text:'Категория успешно добавлена'
        })    
        // setTimeout(this.func, 3000);
      } catch(error){
        alert(error.message)
        alert('ОШИБКА!!')
      }
      },
      func() {
        this.hideTooltip(false)
      },
      closeNewCategory(){
        this.$emit('toogleAddingForm');
      }
  }
}
</script>

<style lang="postcss" scoped>
@import url("../../styles/mixins.pcss");
.skills__form{
  padding:20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
.skills__new-group-wrap{
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  position: relative;
  &:after{
       content: "";
    width: 103%;
    height: 1px;
   background-color: #1f232d;
    position: absolute;
    bottom: 18px;
    left: -10px;
  }
}
.skills__group-hide{
  display: none;
}
.skills__new-group{
  border: none;
  border-bottom:2px solid transparent; 
  padding-bottom:10px;
  border-bottom: 2px solid $text-color;
  width: 70%;
  background-color: transparent;
  color: #414c63;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.875rem;
  border: none;
  border-bottom: 2px solid #414c63;
  padding: 0 0.3125rem 0.625rem;
  margin-bottom: 1.875rem;
  &:hover{
    border-bottom:2px solid $orange;
  }
  &:active{
      border-bottom:2px solid $orange;
  }
}
.skills__new-group-actions{
    display: flex;
    align-items: center;
    transform: translate(-0px,-20px);
    width: 10%;
    justify-content: space-around;

}
.skills__accept{
  background: svg-load("tick.svg", fill="#00d70a") center center no-repeat / contain;
  width:15px;
  height: 15px;
  cursor:pointer;
}
.skills__decline{
  background: svg-load("remove.svg", fill="#bf2929") center center no-repeat / contain;
  width:15px;
  height: 15px;
  cursor:pointer;
}
.skills__group-new-skill{
  opacity: .6;
}
.skills__group-new-skill-input{
    width: 50%;
    /* margin-right: 10%; */
    background-color: transparent;
    color: #414c63;
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.875rem;
    border: none;
    border-bottom: 2px solid #414c63;
   padding: 0.3125rem 1.875rem 0.3125rem 0.625rem;
    margin-bottom: 1.875rem;
      &:hover{
    border-bottom:2px solid $orange;
  }
  &:active{
      border-bottom:2px solid $orange;
  }
}
.skills__group-new-skill-percent-wrap{
    width: 20%;
    margin-right: 5%;
    font-size: 1rem;
    position: relative;
  &:before{
    content:'%';
    color:black;
    width:20px;
    height: 20px;
    position: absolute;
    right:0;
    top:10px;
  }
  @include phones{
    width: 21%;
     &:before{
       top:8px;
     }
  }
}
.skills__group-new-skill-percent{
  text-align:center;
  width:100%;
  background-color: transparent;
    color: #414c63;
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.875rem;
    border: none;
    border-bottom: 2px solid #414c63;
   padding: 0.3125rem 1.375rem 0.3125rem 0.625rem;
    margin-bottom: 1.875rem;
    &:hover{
      border-bottom: 2px solid $orange;
    }
    &:focus{
      border-bottom: 2px solid $orange;
    }
   
}
.skills__group-new-skill{
  display: flex;
  padding-left:20%;
  justify-content: space-between;
  @include tablets{
    padding-left: 0;
  }
}
.skills__group-new-btn{
  width: 40px;
height: 40px;
border-radius: 50%;
position: relative;
 background: linear-gradient(180deg,#ea7400 0,#f29400);
 &:after{
  content:'';
  width:10px;
  height: 10px;
  position: absolute;
  top:50%;
  left:50%;
  background: svg-load("remove.svg", fill="white") center center no-repeat / contain;
  transform:rotate(45deg) translate(-70%,0%);
}
}
</style>

