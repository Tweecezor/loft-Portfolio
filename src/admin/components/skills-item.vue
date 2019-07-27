<template lang="pug">
  .skills__group
    .skills__group-row-wrap 
      input(type="text" name="skill_title" v-model="currentSkill.title" :disabled="!editMode").skills__group-input
      .skills__group-percent-wrap
        input(type="number" name="skill_percent"  v-model="currentSkill.percent" :disabled="!editMode").skills__group-percent
      .skills__group-actions(v-if="!editMode")
        .skills__group-correct(
          @click="editMode = true"
        )
        .skills__group-trash(
          @click="removeCurrentSkill"
        )
      .skills__group-actions(v-else-if="editMode")
        .skills__group-save(
          @click="changeCurrentSkill"
        )
        .skills__group-cancel(
          @click="cancelEditing"
        )
    //- pre {{skill}}
    //- pre {{currentSkill}}
</template>

<script>
import { mapActions } from 'vuex';
import {Validator} from 'simple-vue-validator';

export default {
  mixins:[require('simple-vue-validator').mixin],
  validators:{
     'currentSkill.title'(value){
      return Validator.value(value).required('Поле навык обязательно для заполнения')
    },
    "currentSkill.percent": value => {
      return Validator.value(value)
        .integer("Должно быть числом")
        .between(0, 100, "Некорректное значение для процентов")
        .required("Поле не может быть пустым");
    }
  },
  props:{
    skill:Object
  },
  data(){
    return{
      editMode:false,
      currentSkill:{...this.skill},
      // editedSkill:{...this.skill}
    }
  },
  methods: {
    ...mapActions('skills',['removeSkill','editSkill']),
    ...mapActions('tooltips',['showTooltip','hideTooltip']),
    async removeCurrentSkill(){
      try{
        await this.removeSkill(this.skill.id);
        this.showTooltip({
          type:'success',
          text:'Скилл успешно удален'
        })
        // setTimeout(this.func, 3000);
      } catch(error){
        alert(error.message)
      }
    },
    async changeCurrentSkill(){
      if((await this.$validate())===false){
         this.showTooltip({
          type:'error',
          text:'Ошибка валидации'
        });
        this.currentSkill = {...this.skill};
        return;
      }
      try{
        await this.editSkill(this.currentSkill);
         this.showTooltip({
          type:'success',
          text:'Скилл успешно обновлен'
        });
        this.editMode = false;
      } catch(error){
         alert(error.message)
      }
    },
    cancelEditing(){
      this.editMode=false;
      this.currentSkill = {...this.skill};
    }, 
    func() {
      this.hideTooltip(false)
    },
  },
  watch:{
    skill:function(){
       this.currentSkill={...this.skill}
    }
  }
 
  
}
</script>


<style lang="postcss" scoped>
.skills__group{
  /* margin-bottom: 35px; */
}
.skills__group-row-wrap{
  display: flex;
  margin-bottom: 20px;
}
.skills__group-input{
  border:none;
  width:60%;
  margin-right: 5%;
  padding-bottom: 5px;
  font-weight: 700;
   border-bottom:2px solid transparent;
    &:hover{
    border-bottom:2px solid $orange;
  }
  &:active{
      border-bottom:2px solid $orange;
  }
   &:focus{
      border-bottom:2px solid $orange;
  }
}
.skills__group-percent-wrap{
  width:20%;
  margin-right: 5%;
  font-size: 16px;
  position: relative;
  &:before{
    content:'%';
    color:black;
    width:20px;
    height: 20px;
    position: absolute;
    right:0;
    top:3px;
  }

}
.skills__group-percent{
  text-align: right;
   border:none;
    padding: 0.3125rem 1.375rem 0.3125rem 0.625rem;
    width:100%;
     border-bottom: 2px solid transparent;

    &:hover{
      border-bottom: 2px solid $orange;
    }
    &:focus{
      border-bottom: 2px solid $orange;
    }
}

.skills__group-actions{
  display: flex;
  justify-content: space-between;
  width:10%;
}
.skills__group-correct{
  background: svg-load("pencil.svg", fill="#414c63") center center no-repeat / contain;
  width:15px;
  height:15px;
  cursor: pointer;
  &:hover{
     background: svg-load("pencil.svg", fill="#383bcf") center center no-repeat / contain;
  }
}
.skills__group-trash{
  background: svg-load("trash.svg", fill="#414c63") center center no-repeat / contain;
  width:15px;
  height:15px;
  cursor: pointer;
   &:hover{
     background: svg-load("trash.svg", fill="#bf2929") center center no-repeat / contain;
  }
}
.skills__group-save{
  background: svg-load("tick.svg", fill="#00d70a") center center no-repeat / contain;
  width:15px;
  height:15px;
  cursor: pointer;
}
.skills__group-cancel{
  background: svg-load("remove.svg", fill="#bf2929") center center no-repeat / contain;
  width:15px;
  height:15px;
  cursor: pointer;
}
</style>

