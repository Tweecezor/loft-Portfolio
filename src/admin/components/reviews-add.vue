<template lang="pug">
  .reviews__content.content
    .reviews__title-wrap
      h2.reviews__title.tittle Новый отзыв
    .reviews__form
      input(type='file' id="reviews-avatar" @change="loadPhoto" accept="image/*").reviews__user-file
      label(for="reviews-avatar").reviews__user
        .reviews__user-avatar(
          :style="{'background-image':`url(${this.photoURl})`}"
          :class="{imaged:hasImage}"
        )
        //-  icon
        .reviews__user-add
          h3.reviews__user-text {{textTitle}}
      .reviews__info
        .reviews__label-wrap.reviews__label-wrap--name
          label(for="name").reviews__label.label Имя автора
          input(type="text" name="name" id="name" v-model="reviewData.author").input.reviews__input.
        .reviews__label-wrap.reviews__label-wrap--status
          label(for="status").reviews__label.label Титул автора
          input(type="text" name="status" id="status" v-model="reviewData.occ").input.reviews__input
        .reviews__label-wrap.reviews__label-wrap--review
          label(for="review").reviews__label.label Отзыв
          textarea(name="review" id="review" v-model="reviewData.text").input.reviews__input.reviews__input--desc
        .reviews__buttons
            button(type="reset" name="cancel" value="Отменить" @click='toogleAddingForm').reviews__reset Отменить
            button(type="submit" name="submit" value="Сохранить" v-if="mode=='add'" @click='addNewReview').btn.reviews__submit Сохранить
            button(type="submit" name="submit" value="Сохранить" v-if="mode=='edit'" @click='updateCurrentWork').btn.reviews__submit Сохранить
    pre {{reviewData}}
    //- pre {{copyImgPath}}
    pre {{reviewData.photo}}
    pre {{photoURl}}
    pre {{currentReview}}
    //- pre {{mode}}

</template>

<script>
import { mapActions,mapState } from 'vuex';
import {getAbsoluteImgPath} from '@/helpers/photos.js'
import {Validator} from 'simple-vue-validator'
export default {
  mixins:[require('simple-vue-validator').mixin],
  validators:{
    'reviewData.text'(value){
      return Validator.value(value).required('Поле навык обязательно для заполнения')
    },
    'reviewData.occ'(value){
      return Validator.value(value).required('Поле навык обязательно для заполнения')
    },
    'reviewData.author'(value){
      return Validator.value(value).required('Поле навык обязательно для заполнения')
    },
    "reviewData.photo": value => {
      return Validator.value(value).required("Вставьте файл");
    }
  },
  props:{
    mode:String
  },
  data(){
    return{
      reviewData:{
        photo: '',
        author: '',
        occ: '',
        text: '',
      },
      photoURl:'',
      hasImage:false,
      textTitle:'Добавить фото ',
      copyImgPath:'',
    }
  },
  methods:{
    ...mapActions('reviews',['addReview','updateReveiw']),
    ...mapActions('tooltips',['showTooltip']),
     loadPhoto(e){
      const file = e.target.files[0];
      this.hasImage = true;
      this.reviewData.photo = file;
      this.hasImage = true;
      this.textTitle = 'Изменить фото'
      console.log(file);
      console.log(this.reviewData.photo);
      const reader = new FileReader();
      try{
        reader.readAsDataURL(file);
        reader.onload = () =>{
          this.photoURl = reader.result;
          console.log(this.photoURl);
        }
      } catch(error){
        alert(error.message);
        console.log(error.message.errors.photo);
      }
    },
    async addNewReview(){
      if((await this.$validate())===false){
         this.showTooltip({
          type:'error',
          text:'Не все поля заполнены'
        });
        return;
      }
      try{
        await this.addReview(this.reviewData);
        this.$emit('toogleAddingForm')
        this.showTooltip({
          type:'success',
          text:'Отзыв успешно добавлен'
        });
         
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
        return;
      }
      try{  
        await this.updateReveiw(this.reviewData)
        this.$emit('toogleAddingForm')
        this.showTooltip({
          type:'success',
          text:'Отзыв успешно обновлен'
        });
      } catch(error){
        console.log(error.message)
        this.showTooltip({
          type:'error',
          text:'Размер картинки больше 1,5 МБ'
        });
      }
    },
    toogleAddingForm(){
      this.$emit('toogleAddingForm');
    },
    addingMode(){
      this.reviewData = {
        photo: '',
        author: '',
        occ: '',
        text: '',
      };
      this.photoURl = '';
      this.hasImage = false;
      this.textTitle= 'Добавить фото'
    },
    editingMode(){
      this.photoURl='';
      this.reviewData = {...this.currentReview};
      this.hasImage = true;
      this.photoURl = getAbsoluteImgPath(this.reviewData.photo);
      this.textTitle= 'Изменить фото'
    }
  },
  computed:{
    ...mapState('reviews',{
      currentReview:state=>{
        return state.currentReview;
      }
    })
  },
  created(){
    if(this.mode == 'edit'){
      console.log('edit mode')
      this.editingMode();
    } else if(this.mode == 'add'){
        console.log('add mode')
      this.addingMode();
    }
  },
  watch:{
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
    currentReview(){
      this.reviewData = {...this.currentReview};
      this.photoURl='';
      this.photoURl = getAbsoluteImgPath(this.reviewData.photo);
    }
  }
}
</script>

<style lang="postcss" scoped>
@import url("../../styles/mixins.pcss");
.reviews__user-file{
  width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
}
.reviews__user-file + label {
  cursor: pointer;
}

.reviews__title{
  padding-bottom: 1.25rem;
    border-bottom: 1px solid #414c63;
    margin-bottom: 4.625rem;
    font-size: 1.125rem;
    font-weight: 700;
}
.reviews__user-avatar{
  width: 200px;
  height: 200px;
  background-color: #dee4ed;
  border-radius: 50%;
  margin-bottom: 20px;
  position: relative;
  background-size:cover;
  &:before{
    content:'';
     background: svg-load("user-admin.svg", fill="#fff") center center no-repeat / contain;
        width: 5.125rem;
    height: 5.125rem;
    position: absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);

  }
}
.imaged{
  &:before {
    display: none;
  }
}

.reviews__label{
   margin-bottom: 20px;
   display: block;
   opacity: 0.5;
  color: #414c63;
  font-size: 16px;
  font-weight: 400;
  line-height: 30px;
 }
 .reviews__input{
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
 }
 .reviews__content{
    background-color: white;
 }
 .reviews__form{
   display: flex;
   justify-content: space-between;
   flex-wrap: wrap;
   @include phones{
     flex-direction: column;
    align-items: center;
   }
 }
 .reviews__user{
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    @include tablets{
        width: 24%;
    }
    @include phones{
          width: 100%;
    margin-bottom: 50px;

    }
 }
 .reviews__info{
    width: 75%;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding-right: 15%;
    @include tablets{
      padding: 0;
      width: 71%;
    }

    @include phones{
      width: 100%;
    }
 }
 .reviews__label-wrap{
   &--name{
     width: 47%;
     margin-right: 6%;
     @include tablets{
       width: 75%;
     }
   }
   &--status{
     width:47%;
      @include tablets{
       width: 75%;
     }
   }
   &--review{
     width:100%;
   }
   @include phones{
         width: 100%;
   }
 }
 .reviews__input--desc{
  border: 1px solid #414c63;
height: 180px;
  &:hover{
    border:1px solid $orange;
  }
  &:active{
      border:1px solid $orange;
  }
 }
 .reviews__buttons{
   display: flex;
  justify-content: flex-end;
      width: 100%;
 }
 .reviews__reset{
    background: transparent;
    border: none;
    color:$orange;
    margin-right: 30px;
    cursor: pointer;
 }
 .reviews__user-text{
    text-align: center;  
      color:$orange;
   font-weight: 600;
 }
</style>
