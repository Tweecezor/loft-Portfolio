<template lang="pug">
  div
    section.reviews
      .container.container-reviews
        .reviews-title-wrap.title-wrap
          .reviews-title.title Блок "Отзывы"
        .reviews__content.content
          .reviews__title-wrap
            h2.reviews__title.tittle Новый отзыв
          form.reviews__form
            .reviews__user
              .reviews__user-avatar
              //-  icon
              .reviews__user-add
                h3.reviews__user-text Добавить фото
            .reviews__info
              .reviews__label-wrap.reviews__label-wrap--name
                label(for="").reviews__label.label Имя автора
                input(type="text" name="name" id="name").input.reviews__input.
              .reviews__label-wrap.reviews__label-wrap--status
                label(for="").reviews__label.label Титул автора
                input(type="text" name="status" id="status").input.reviews__input
              .reviews__label-wrap.reviews__label-wrap--review
                label(for="").reviews__label.label Отзыв
                textarea(name="review" id="review").input.reviews__input.reviews__input--desc
              .reviews__buttons
                  input(type="reset" name="cancel" value="Отменить").reviews__reset
                  input(type="submit" name="submit" value="Сохранить").btn.reviews__submit
        section.reviews__change
          ul.reviews__change-list
            li.reviews__current.reviews__change-item
              .reviews__new
                .reviews__new-icon
                .reviews__new-text Добавить работу
            each item in ['1','2','3','4']
              li.reviews__change-item
                .reviews__preview
                  .reviews__avatar
                    img(src="../../../images/content/user2.jpg").user__img
                  .reviews__preview-info
                    .reviews__name-wrap 
                      .reviews__name Владимир Сабанцев
                    .reviews__status-wrap
                      .reviews__status Преподаватель
                .reviews__desc
                  .reviews__desc-text
                    p Этот парень проходил обучение веб-разработке не где-то, а в LoftSchool! 4,5 месяца только самых тяжелых испытаний и бессонных ночей!
                .reviews__desc-controls
                  .reviews__desc-correct Править
                  .reviews__desc-remove Удалить
</template>

<script>
export default {
  
}
</script>

<style lang="postcss" scoped>

@import url("../../../styles/mixins.pcss");


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
 .reviews__change-list{
   display: flex;
  flex-wrap: wrap;
 }
 .reviews__change-item{
   min-height:380px;
   padding:20px;
  width:32%;
  margin-right: 2%;
  margin-bottom: 5%;
  background:white;
  box-shadow: 4px 3px 20px rgba(0, 0, 0, 0.07);
      position: relative;
    padding-bottom: 50px;
  &:nth-child(3n){
    margin-right: 0px;
  }
  @include tablets{
        width:48%;
      margin-right: 4%;
      &:nth-child(2n){
        margin-right: 0px;
      }
      &:nth-child(3n){
        margin-right: 4%;
      }
      }
  @include phones{
    width:100%;
    margin-right: 0%;
    &:nth-child(2n){
        margin-right: 0px;
      }
      &:nth-child(3n){
        margin-right: 0%;
      }
    }
}
.reviews__current{
  background:linear-gradient(to left, #ea7400 0%, #f29400 100%);
  @include phones{
      padding-top: 1.25rem;
  }
  &:hover{
     background:linear-gradient(to right, #ea7400 0%, #f29400 100%);
  }
}
.reviews__new{
  height: 100%;
      display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    @include phones{
          flex-direction: row;
    height: 100%;
    }
}
.reviews__new-icon{
  display: flex;
  width: 150px;
  height: 150px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
  &:before{
    content:'';
    background: svg-load("remove.svg", fill="#fff") center center no-repeat / contain;
    width: 2.125rem;
    height: 2.125rem;
    position: absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%) rotate(45deg);

  }
  @include phones{
    width: 4.375rem;
    height: 4.375rem;
    margin-bottom: 0;
  }
}
.reviews__new-text{
font-size: 18px;
font-weight: 700;
line-height: 30px;
color:white;
width: 5.875rem;
text-align: center;
@include phones{
  font-size: 0.875rem;
    font-weight: 700;
    line-height: 1.875rem;
    color: #fff;
    width: 9.875rem;
    text-align: center;
}
}
.reviews__preview{
  display: flex;
      display: flex;
    padding-bottom: 20px;
    border-bottom: 1px solid #414c63;
    margin-bottom: 20px;
}
.reviews__avatar{
  margin-right: 20px;
}
.reviews__name{
  color: #414c63;
font-size: 18px;
font-weight: 700;
}
.reviews__status{
  opacity: 0.5;
color: #414c63;
font-size: 16px;
font-weight: 400;
}
.reviews__desc-text{
  width: 90%;
  opacity: 0.7;
color: #414c63;
font-size: 16px;
font-weight: 400;
line-height: 30px;
margin-bottom: 20px;
}
.reviews__desc-controls{
  display: flex;
    justify-content: space-between;
    min-width: 95%;
}
.reviews__desc{
  display: flex;
    flex-direction: column;
}
.reviews__desc-controls{
      align-items: flex-end;
      position: absolute;
      bottom:2%;
}
.reviews__desc-controls{
  display: flex;
  justify-content: space-between;
  /* opacity: 0.5; */
  color: #414c63;
  font-size: 16px;
  font-weight: 400;
  line-height: 30px;
}
.reviews__desc-correct{
  padding-right:50px;
  position: relative;
  margin-right: 40px;
  &:before{
    content:'';
    background: svg-load("pencil.svg", fill="#383bcf") center center no-repeat / contain;
    width:20px;
    height: 20px;
    opacity:initial;
    position: absolute;
   top: 15%;
    left: 63%;
  }
}
.reviews__desc-remove{
  padding-right: 3.125rem;
  position: relative;
   &:before{
    content:'';
    background: svg-load("remove.svg", fill="red") center center no-repeat / contain;
    width:20px;
    height: 20px;
    opacity:initial;
    position: absolute;
   top: 15%;
    left: 63%;
  }
}


</style>
