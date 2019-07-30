<template lang="pug">
  .addWorks__content
    .addWorks__content-caption-wrap
      h2(v-if="mode=='add'").addWorks__content-caption Добавление работы
      h2(v-else-if="mode=='edit'").addWorks__content-caption Редактирование работы
      .addWorks__form()
        .addWorks__file(
          :style="{'background-image':`url(${this.photoURl})`}"
        )
          .addWorks__file-upload
            //- input(type="file")
            //- .addWorks__load-text(v-if="!hasImage")
            .addWorks__load-text()
              p Перетащите или загрузите для загрузки изображения
              input(type="file" id="photoFile" @change="loadPhoto" accept="image/*").addWorks__file-input
              label(for="photoFile").addWorks__file-btn.btn Загрузить
        .addWorks__info
          .addWorks__label-wrap
            label(for="input-title").addWorks__label Название
            input(type="text" name="title" id="input-title" v-model="workData.title").addWorks__input.addWorks__input--title
          .addWorks__label-wrap
            label(for="input-link").addWorks__label Ссылка
            input(type="text" name="link" id="input-link" v-model="workData.link").addWorks__input.addWorks__input--link
          .addWorks__label-wrap  
            label(for="input-desc").addWorks__label Описание
            textarea(name="desc" id="input-desc" v-model='workData.description').addWorks__input.addWorks__input--desc
          .addWorks__label-wrap
            label(for="input-tag").addWorks__label Добавление тега
            input(type="text" name="tag" id="input-tag" v-model='workData.techs').addWorks__input.addWorks__input--tags
          .addWorks__tags-list-wrap
            ul.addWorks__tags-list
              li(v-for="item in tagsArray" v-if="tagsArray!=0 && item!=''" ).addWorks__tags-item {{item}}
          .addWorks__buttons
            button(type="reset" name="cancel" value="Отменить" @click="toogleAddingForm").addWorks__reset Отменить
            button(type="submit" name="submit" value="Сохранить" @click='addNewWorks' v-if="mode=='add'").btn.addWorks__submit Сохранить
            button(type="submit" name="submit" value="Сохранить" @click='updateCurrentWork' v-if="mode=='edit'").btn.addWorks__submit Сохранить
      pre {{photoURl}}
      //- span WORKDATA
      pre {{workData.photo}}
      //- span currentWork
      //- pre {{currentWork}}
      //- pre {{mode}}

</template>

<script>
import { mapActions, mapState } from 'vuex';
import { getAbsoluteImgPath } from "@/helpers/photos";
import {Validator} from 'simple-vue-validator';

export default {
  mixins:[require('simple-vue-validator').mixin],
  validators:{
     'workData.title'(value){
      return Validator.value(value).required('Поле навык обязательно для заполнения')
    },
    'workData.link'(value){
      return Validator.value(value).required('Поле навык обязательно для заполнения')
    },
    'workData.description'(value){
      return Validator.value(value).required('Поле навык обязательно для заполнения')
    },
    'workData.title'(value){
      return Validator.value(value).required('Поле навык обязательно для заполнения')
    },
    'workData.techs'(value){
      return Validator.value(value).required('Поле навык обязательно для заполнения')
    },
    "workData.photo": value => {
      return Validator.value(value).required("Вставьте файл");
    }
  },
  props:{
    mode:String
  },
  data(){
    return{
      workData:{
        title:'',
        link:'',
        description:'',
        techs:'',
        photo:''
      },
      photoURl:'',
      hasImage : false,
      tagsArray:[]
    }
  },
  methods:{
    ...mapActions('works',['addWork','updateWork']),
    ...mapActions('tooltips',['showTooltip','hideTooltip']),
    toogleAddingForm(){
      this.$emit('toogleAddingForm');
    },
    loadPhoto(e){
      const file = e.target.files[0];
      this.workData.photo = file;
      this.hasImage = true;
      // console.log(file);
      // console.log(this.workData.photo);
      const reader = new FileReader();
      try{
        reader.readAsDataURL(file);
        reader.onload = () =>{
          this.photoURl = reader.result;
          console.log(this.photoURl);
        }
      } catch(error){
        alert(error.message);
        console.log(error.message);
      }
    },
    async addNewWorks(){
      // console.log('test')
       if((await this.$validate())===false){
         this.showTooltip({
          type:'error',
          text:'Не все поля заполнены'
        });
        return;
      }
      try{
        await this.addWork(this.workData);
        this.showTooltip({
          type:'success',
          text:'Работа успешно добавлена'
        });
        this.$emit('toogleAddingForm');
      } catch(error){
         this.showTooltip({
          type:'error',
          text:'Размер картинки больше 1,5 МБ'
        });
      }
    },
    async updateCurrentWork(){
      if((await this.$validate())===false){
         this.showTooltip({
          type:'error',
          text:'Не все поля заполнены'
        });
        this.workData = {...this.currentWork}
        return;
      }
      try{
        await this.updateWork(this.workData);
        this.showTooltip({
          type:'success',
          text:'Работа успешно обновлена'
        });
        this.$emit('toogleAddingForm');
      } catch(error){
         this.showTooltip({
          type:'error',
          text:'Размер картинки больше 1,5 МБ'
        });
      }
    },
    addingMode(){
      this.workData = {
        title:'',
        link:'',
        description:'',
        techs:'',
        photo:''
      };
      this.photoURl = '';
    },
    editingMode(){
      this.workData = {...this.currentWork};
      this.photoURl = getAbsoluteImgPath(this.workData.photo);
    }
  },
  watch:{
    'workData.techs'(){
      this.tagsArray = this.workData.techs.split(',');
    },
    mode(){
      if(this.mode == 'add'){
        // alert('вотчер добавления')
        console.log('Режим добавления')
        this.addingMode();
      } else if(this.mode == 'edit'){
        //  alert('вотчер редактирования')
        console.log('Режим редактирования')
        this.editingMode();
    }
    },
    currentWork(){
      this.workData = {...this.currentWork};
      this.photoURl = getAbsoluteImgPath(this.workData.photo);
    }
  },
  computed:{
    ...mapState('works',{
      currentWork:state=>{return state.currentWork}
    }),
    
    
  },
  created(){
    if(this.mode == 'add'){
      console.log('Режим добавления')
      this.addingMode();
      console.log(this.workData);

    } else if(this.mode == 'edit'){
      console.log('Режим редактирования')
      this.editingMode();
      console.log(this.workData);
    }
  }
  
}
</script>

<style lang="postcss" scoped>
@import url("../../styles/mixins.pcss");
.addWorks__file{
  background-size:cover;
}
.addWorks__file-input{
  width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
}
.addWorks__file-input + label {
  cursor: pointer;
}
.addWorks__file-btn{
  padding: 0.425rem 2.25rem;
}

.addWorks__content,
 .content{
   padding:30px 30px;
   box-shadow: 4px 3px 20px rgba(0, 0, 0, 0.07);
   margin-bottom: 50px;
 }
 .addWorks__content{
   background: #fff;
 }
 .addWorks__content-caption{
    padding-bottom: 20px;
    border-bottom: 1px solid #414c63;
    margin-bottom: 74px;
    font-size: 18px;
font-weight: 700;
 }
.addWorks__form{
  display: flex;
  justify-content: space-between;
  background: #fff;
  @include tablets{
        flex-direction: column;
    align-items: center;
  }
}
.addWorks__file{
   width:48%;
   height: 275px;
   background-color: #dee4ed;
   border: 1px dashed #a1a1a1;
    position: relative;
    margin-right: 4%;
    &-upload{
      height: 100%;
    }
    @include tablets{
          width: 80%;
    margin: 0;
    margin-bottom: 100px;
    }
    @include phones{
      width: 100%;
    }
 }
  .addWorks__load-text{
    color: #414c63;
    font-size: 16px;
    font-weight: 400;
    line-height: 33.89px;
    text-align: center;
      height: 100%;
    display: flex;
    align-items: center;
    width: 45%;
    justify-content: center;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    p{
      margin-bottom: 20px;
    }
 }
 .addWorks__info{
   width:48%;
   @include tablets{
         width: 80%;
   }
   @include phones{
     width: 100%;
   }
 }
 .addWorks__label,
 .label{
   margin-bottom: 20px;
   display: block;
   opacity: 0.5;
  color: #414c63;
  font-size: 16px;
  font-weight: 400;
  line-height: 30px;
 }
 .addWorks__input,
 .input{
   width:100%;
   background-color:transparent;
  color: #414c63;
  font-size: 16px;
  font-weight: 700;
  line-height: 30px;
  border: none;
  border-bottom: 2px solid #414c63;
  padding:0px 5px 10px 5px;
  padding-bottom:10px;
  margin-bottom: 30px;

    &:hover{
    border-bottom:2px solid $orange;
  }
  &:active{
      border-bottom:2px solid $orange;
  }

  &--desc{
    border:1px solid black;
    height: 145px;
      &:hover{
    border:1px solid $orange;
  }
  &:active{
      border:1px solid $orange;
  }
  }
 }
 .addWorks__tags-list{
   display: flex;
 }
 .addWorks__tags-item{
   padding: 5px 15px;
   background-color: #f4f4f4;
   border-radius: 15px;
   margin-right: 10px;
   &:last-child{
     margin-right: 0px;
   }
   @include phones{
         padding: 5px 10px;
    font-size: 12px;
   }
 }
 .addWorks__tags-list-wrap{
   margin-bottom: 30px;
 }
 .addWorks__buttons{
   display: flex;
  justify-content: flex-end;
  @include tablets{
    justify-content: center;
  }
 }
 .addWorks__reset{
    background: transparent;
    border: none;
    color:$orange;
    margin-right: 30px;
    cursor: pointer;
 }
 /* .containerAddWorks{
   background: #fff;
 } */
</style>
