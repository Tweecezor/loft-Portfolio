<template lang="pug">
  .skills__form
    .skills__new-group-wrap
      div.error-input {{validation.firstError('currentCategory.category')}}
      input.skills__new-group(type='text' name="groupName" :disabled="!editMode" v-model="currentCategory.category"  :class="{validError:validation.hasError('currentCategory.category')}")
      //- pre {{currentCategory.category}}
      //- pre {{currentCategory}}
      .skills__new-group-actions(v-if="!editMode")
        .skills__correct(
         @click="editMode = true"
        )
        .skills__trash(
          @click="removeCurrentCategory"
        )
      .skills__new-group-actions(v-else-if="editMode")
        .skills__accept(
           @click="changeCurrentCategory"
        )
        .skills__decline(
          @click = "cancelEditing"
        )
    skillsItem(
      v-for="skill in skills"
      :key="skill.id"
      :skill="skill"
    )
    .skills__group-new-skill
      input(
        type="text" name="newSkillInput" placeholder="Новый навык"
        v-model="skill.title"
        :class="{validError:validation.hasError('skill.title')}"
      ).skills__group-new-skill-input
      div.error-input.error-input-skill {{validation.firstError('skill.title')}}
      .skills__group-new-skill-percent-wrap
        input(
          type="number" min="0" max="100" name="newSkillPercent"
           v-model="skill.percent"
           :class="{validError:validation.hasError('skill.percent')}"
        ).skills__group-new-skill-percent
      button(type="button" @click="addNewSkill").skills__group-new-btn
      //- pre {{validation.firstError('currentCategory.category')}}
      //- pre {{validation.allErrors('currentCategory.category')}}
    //- pre {{currentCategory}}
    //- pre {{skill}}
    //- pre {{skills}}
    
   
</template>

<script>
// import skillsItem from './skills-item.vue';
import { mapActions } from 'vuex';
import {Validator} from 'simple-vue-validator';
export default {
  mixins:[require('simple-vue-validator').mixin],
  validators:{
    'skill.title'(value){
      return Validator.value(value).required('Заполните поле навык')
    },
    "skill.percent": value => {
      return Validator.value(value)
        .integer("Должно быть числом")
        .between(0, 100, "Вне диапазона")
        .required("Поле нобязательно для заполнения");
    },
    'currentCategory.category'(value){
      console.log(this.currentCategory.category);
      return Validator.value(value).required('Поле категория обязательно для заполнения')
    }
   
  },
  props:{
    category:Object,
    skills:Array,
  },
  components:{
    skillsItem:() => import("./skills-item.vue")
  },
  data(){
    return{
      skill:{
        title:'',
        percent:'',
        category:this.category.id
      },
      editMode:false,
      currentCategory:{...this.category}
    }
  },
  methods:{
    ...mapActions('skills',['addSkill']),
    ...mapActions('categories',['removeCategory','changeCategory']),
    ...mapActions('tooltips',['showTooltip','hideTooltip']),
    async addNewSkill(){ 
      if ((await this.$validate()) === false){
        this.showTooltip({
          type:'error',
          text:'Не все поля заполнены'
        });
        // setTimeout(this.func, 3000);
        return;
      }
      try{
         await this.addSkill(this.skill);
         this.showTooltip({
          type:'success',
          text:'Скилл успешно добавлен'
        });
        //  setTimeout(this.func, 3000);
         this.skill.title ='';
         this.skill.percent='';
        this.validation.reset();
      } catch(error){
        this.showTooltip({
          type:'error',
          text:error.message
        });
      }
    },
    async removeCurrentCategory(){
      try{
        await this.removeCategory(this.category);
        this.showTooltip({
          type:'success',
          text:'Категория успешно удалена'
        })
        // setTimeout(this.func, 3000);
      } catch(error){
        this.showTooltip({
          type:'error',
          text:error.message
        });
      }
    },
    func() {
      this.hideTooltip(false)
    },
    async changeCurrentCategory(){
      console.log(this.$validate('currentCategory.category'));
      // console.log(this.currentCategory);
      if(await this.$validate('currentCategory.category') === false){
        // console.log(this.validation.firstError('currentCategory.category')) 
        this.showTooltip({
          type:'error',
          text:'Ошибка валидации'
        });
        this.currentCategory = {...this.category};
        this.editMode = false;
        return;
      }
      try{
        await this.changeCategory(this.currentCategory);
        this.showTooltip({
          type:'success',
          text:'Категория успешно обновлена'
        })
      } catch(error){
        alert(error.message)
      }
      this.editMode = false;
    },
    cancelEditing(){
      this.editMode = false;
      this.currentCategory = {...this.category};
    }
  },
  watch:{
    category:function(){
       this.currentCategory = {...this.category},
       this.skill.category = this.category.id
    },
    'skill.percent'(){
      if(this.skill.percent>100){
        this.skill.percent = 100;
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
@import url("../../styles/mixins.pcss");
input[disabled]{
  &:hover{
    border-bottom: 2px solid #414c63;
  }
}
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
  position: relative;
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

.skills__accept{
  background: svg-load("tick.svg", fill="#414c63") center center no-repeat / contain;
  width:15px;
  height: 15px;
  cursor:pointer;
  &:hover{
    background: svg-load("tick.svg", fill="#00d70a") center center no-repeat / contain;
  }
}
.skills__decline{
  background: svg-load("remove.svg", fill="#414c63") center center no-repeat / contain;
  width:15px;
  height: 15px;
  cursor:pointer;
   &:hover{
    background: svg-load("remove.svg", fill="#bf2929") center center no-repeat / contain;
  }
}

.skills__correct{
  background: svg-load("pencil.svg", fill="#414c63") center center no-repeat / contain;
  width:15px;
  height:15px;
  cursor: pointer;
  &:hover{
     background: svg-load("pencil.svg", fill="#383bcf") center center no-repeat / contain;
  }
}
.skills__trash{
  background: svg-load("trash.svg", fill="#414c63") center center no-repeat / contain;
  width:15px;
  height:15px;
  cursor: pointer;
   &:hover{
     background: svg-load("trash.svg", fill="#bf2929") center center no-repeat / contain;
  }
}
.validError{
  border-bottom:2px solid red;
  &:hover{
     border-bottom:2px solid red;
  }
}
.error-input{
    color: red;
    font-size: 0.75rem;
    position: absolute;
    top: -11px;
    left: 5px;
    &-skill{
      bottom: 5px;
      left: 20%;
      top:inherit;
    }
}
</style>


