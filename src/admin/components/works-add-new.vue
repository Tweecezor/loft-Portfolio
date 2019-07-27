<template lang="pug">
  .addWorks__content
    .addWorks__content-caption-wrap
      h2.addWorks__content-caption Добавление работы
      form.addWorks__form(method="POST")
        .addWorks__file(
          :style="{'background-image':`url(${this.photoURl})`}"
        )
          .addWorks__file-upload
            //- input(type="file")
            .addWorks__load-text(v-if="!hasImage")
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
              li.addWorks__tags-item HTML
              li.addWorks__tags-item HTML
              li.addWorks__tags-item HTML
          .addWorks__buttons
            input(type="reset" name="cancel" value="Отменить" @click="cancelAddingWork").addWorks__reset
            input(type="submit" name="submit" value="Сохранить" @clicl="addNewWorks").btn.addWorks__submit
      pre {{workData}}
</template>

<script>
import { mapActions } from 'vuex';
export default {
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
      hasImage : false
    }
  },
  methods:{
    ...mapActions('works',['addWork']),
    cancelAddingWork(){
      this.$emit('cancelAdding');
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
    // async addNewWorks(){
    //   await this.addWork(this.workData);
    // } 
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
