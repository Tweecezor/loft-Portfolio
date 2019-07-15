<template lang="pug">
  .wrapper
    .wrapper__container
      header.header
        .header-container.container
          .header__info
            .user
              .user__avatar
                img(src="../images/content/user2.jpg").user__img
              .user__name
                span Никита Еремеев
            .header__title-wrap
              h1.header__title Панель Администрирования
          .header__logout
            a.header__logout-link Выйти
      nav.nav
        .container
          ul.nav__list
            each item in ['Обо мне','Работы','Отзывы']
              li.nav__item
                a.nav__link=item
      section.about
        .container.container-about
          .about__content
            .about__title-wrap
              .about__title "Обо мне"
              .about__title-add-new Добавить группу
            .about__content
              .container
                ul.skills__list
                  li.skills__item
                    .skills_card
                      form.skills__form
                        .skills__new-group-wrap
                          input.skills__new-group(type='text' name="groupName" placeholder="Название новой группы")
                          .skills__new-group-actions
                            .skills__accept V
                            .skills__decline X
                        .skills__group
      section.addWorks    
        .container.containerAddWorks
          .addWorks__content
            .addWorks__content-caption-wrap
              h2.addWorks__content-caption Добавление работы
            form.addWorks__form(method="POST")
              .addWorks__file
                .addWorks__file-upload
                  .addWorks__load-text
                    p Перетащите или загрузите для загрузки изображения
                    button(type="button").addWorks__file-btn.btn Загрузить
              .addWorks__info
                .addWorks__label-wrap
                  label(for="input-title").addWorks__label Название
                  input(type="text" name="title" id="input-title").addWorks__input.addWorks__input--title
                .addWorks__label-wrap
                  label(for="input-link").addWorks__label Ссылка
                  input(type="text" name="link" id="input-link").addWorks__input.addWorks__input--link
                .addWorks__label-wrap  
                  label(for="input-desc").addWorks__label Описание
                  textarea(name="desc" id="input-desc").addWorks__input.addWorks__input--desc
                .addWorks__label-wrap
                  label(for="input-tag").addWorks__label Добавление тега
                  input(type="text" name="tag" id="input-tag").addWorks__input.addWorks__input--tags
                .addWorks__tags-list-wrap
                  ul.addWorks__tags-list
                    li.addWorks__tags-item HTML
                    li.addWorks__tags-item HTML
                    li.addWorks__tags-item HTML
                .addWorks__buttons
                  input(type="reset" name="cancel" value="Отменить").addWorks__reset
                  input(type="submit" name="submit" value="Сохранить").btn.addWorks__submit
            .addWorks__change
              ul.addWorks__change-list
                li.addWorks__current.addWorks__change-item
                  .addWorks__new
                    .addWorks__new-icon
                    .addWorks__new-text Добавить работу
                each item in ['1','2','3','4']
                  li.addWorks__change-item
                    .addWorks__preview
                      img(src="../images/content/slider-1.jpg")
                      ul.addWorks__tags-list.addWorks__tags-list--preview
                        li.addWorks__tags-item HTML
                        li.addWorks__tags-item HTML
                        li.addWorks__tags-item HTML
                    .addWorks__desc
                      .addWorks__desc-title-wrap
                        h2.addWorks__desc-title Сайт Школы Образования
                      .addWorks__desc-text
                        p Этот парень проходил обучение веб-разработке не где-то, а в LoftSchool! 4,5 месяца только самых тяжелых испытаний и бессонных ночей!
                      .addWorks__desc-link-wrap
                        a(href="#").addWorks__desc-link http://LoftSchool.ru
                      .addWorks__desc-controls
                        .addWorks__desc-correct Править
    
                        .addWorks__desc-remove Удалить
      section.reviews
        .container.container-reviews
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
            .reviews__change
              ul.reviews__change-list
                li.reviews__current.reviews__change-item
                  .reviews__new
                    .reviews__new-icon
                    .reviews__new-text Добавить работу
                each item in ['1','2','3','4']
                  li.reviews__change-item
                    .reviews__preview
                      .reviews__avatar
                        img(src="../images/content/user2.jpg").user__img
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

      section.login.fullscreen-section 
        .login__block
          .login__title-wrap
            h1.login__title Авторизация
          form.login__form
            .login__form-label-wrap
              label(for="").login__form-label Логин
              input(type="text" name="login" id="login").login__form-input.login__form-input--login
            .login__form-label-wrap
              label(for="").login__form-label Пароль
              input(type="password" name="passowrd" id="password").login__form-input.login__form-input--password
            input(type="submit" name="sumbit" value="Войти").login__form-submit

              

                       
</template>

<style lang="postcss">
@import "normalize.css";
@import "../styles/mixins.pcss";
@import "../styles/layout/base.pcss";
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800");
.header{
  background-image: linear-gradient(to right, #3e3e59 0%, #454573 100%);
}
.header-container{
  display: flex;
  color:white;
  padding: 17px 0px;
  align-items: center;
  justify-content: space-between;
}
.header__info{
  display: flex;
}
.user{
  display: flex;
  align-items: center;
}
.user__avatar{
  overflow: hidden;
  margin-right:20px;
}
.user__img{
  border-radius: 50%;
  object-fit: cover;
  width:45px ;
  height: 45px;
  max-width:45px ;
  max-height: 45px;
}
.user__name{
  font-size: 18px;
  font-weight: 400;
  margin-right: 20px;

}
.header__title{
  font-size: 14px;
  font-weight: 400;
  opacity: 0.5;
  @include phones{
    display: none;
  }
  
}
.header__title-wrap{
    align-items: center;
    display: flex;
}
.header__logout-link{
 
  opacity: .5;
  &:hover{
    opacity: 1;
     text-decoration: underline;
  }
}
.nav{
  background: #fff;
  color:black;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 30px;
}
.nav__list{
  display: flex;

}
.nav__item{
  padding:20px 20px;
   border-bottom:2px solid white;
   &:hover{
    color:$orange;
    border-bottom:2px solid $orange;
  }
  &-active{
    border-bottom:2px solid $orange;
  }
}
.nav__link{
  display: block;
  /* padding:0 20px; */
}
.container-about{
  background: #fff;
  margin-bottom: 30px;
}
.wrapper{
  background-color: lightgrey;
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

 .btn{
   font-size: 16px;
  font-weight: 700; 
  padding: 10px 20px;
  background: linear-gradient(to right, #ea7400 0%, #f29400 100%);
  border-radius: 25px;
  color:white;
  cursor: pointer;
  &:hover{
     background: linear-gradient(to left, #ea7400 0%, #f29400 100%);
  }
 }
 .addWorks__content,
 .content{
   padding:30px 30px;
   box-shadow: 4px 3px 20px rgba(0, 0, 0, 0.07);
   margin-bottom: 50px;
 }
 .addWorks__content-caption{
    padding-bottom: 20px;
    border-bottom: 1px solid #414c63;
    margin-bottom: 74px;
    font-size: 18px;
font-weight: 700;
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

  &--desc{
    border:1px solid black;
    height: 145px;
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
 .containerAddWorks{
   background: #fff;
 }
 
.addWorks__change-list{
  display: flex;
  flex-wrap: wrap;
}
.addWorks__change-item{
  width:32%;
  margin-right: 2%;
  margin-bottom: 5%;
  padding-bottom: 20px;
  box-shadow: 4px 3px 20px rgba(0, 0, 0, 0.07);
  &:nth-child(3n){
    margin-right: 0px;
  }
  @include tablets{
        width:48%;
        margin-right: 4%;

        &:nth-child(3n){
        margin-right: 4%;
      }
      &:nth-child(2n){
        margin-right: 0px;
      }
  }

  @include phones{
     width:100%;
    margin-right: 0%;
     &:nth-child(3n){
        margin-right: 0%;
      }

  }
}
.addWorks__preview{
  position: relative;
  margin-bottom: 30px;
}
.addWorks__tags-list--preview{
    position: absolute;
    top: 100;
    right: 0;
    top: 100;
    transform: translate(0, -100%);
}
.addWorks__desc-title{
  color: #414c63;
  font-size: 18px;
  font-weight: 700;
  line-height: 30px;
  &-wrap{
    margin-bottom: 20px;
  }
}
.addWorks__desc{
  padding:0 5%;
}
.addWorks__desc-text{
  opacity: 0.7;
color: #414c63;
width: 85%;
font-size: 16px;
font-weight: 400;
line-height: 30px;
margin-bottom: 20px;
}
.addWorks__desc-link-wrap{
  margin-bottom: 20px;
}
.addWorks__desc-link{
  color:$orange;
  text-decoration:none;
}
.addWorks__desc-controls{
  display: flex;
  justify-content: space-between;
  opacity: 0.5;
  color: #414c63;
  font-size: 16px;
  font-weight: 400;
  line-height: 30px;
}
.addWorks__desc-correct{
  padding-right:50px;
  position: relative;
}
.addWorks__desc-correct-icon{
   width:20px;
    height: 20px;
    position: absolute;
    top:0;
    left:0;
}
.addWorks__current{
  background:linear-gradient(to left, #ea7400 0%, #f29400 100%);
  @include phones{
    padding-top:20px;
  }
}
.addWorks__new{
  height: 100%;
      display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @include phones{
      flex-direction: row;
    height: 100%;

    }
}
.addWorks__new-icon{
  display: flex;
  width: 150px;
  height: 150px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  @include phones{
    width: 4.375rem;
    height: 4.375rem;
    margin-bottom: 0;
  }
}
.addWorks__new-text{
font-size: 18px;
font-weight: 700;
line-height: 30px;
color:white;
width: 5.875rem;
text-align: center;
@include phones{
   font-size: 14px;
    font-weight: 700;
    line-height: 1.875rem;
    color: #fff;
    width: 9.875rem;
    text-align: center;
}
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
   padding:20px;
  width:32%;
  margin-right: 2%;
  margin-bottom: 5%;
  box-shadow: 4px 3px 20px rgba(0, 0, 0, 0.07);
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
}
.reviews__new{
  height: 100%;
      display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
}
.reviews__desc{
  display: flex;
    flex-direction: column;
}
.reviews__desc-controls{
      align-items: flex-end;
}
.reviews__desc-controls{
  display: flex;
  justify-content: space-between;
  opacity: 0.5;
  color: #414c63;
  font-size: 16px;
  font-weight: 400;
  line-height: 30px;
}
.reviews__desc-correct{
  padding-right:50px;
  position: relative;
}
.about__content{
  padding: 30px;
}
.about__title-wrap{
  display: flex;
}
.about__title{
  color: #414c63;
font-size: 21px;
font-weight: 700;
line-height: 34px;
margin-right: 20px;
}
.about__title-add-new{
  color: $orange;
font-family: "Open Sans - Semibold";
font-size: 16px;
font-weight: 400;
line-height: 33.89px;
}
.skills__new-group-wrap{
  display: flex;
}


.login{
  background:url('../images/content/background-main.jpg') center center;
  background-size:cover;
  position: relative;
  &:before{
    content:'';
    width:100%;
    height: 100%;
    position: absolute;
    background-color: #2d3c4e;
    opacity: 0.9;
  }
}
.login__block{
  position: absolute;
  background-color:white;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
}
.login__title{
color: #414c63;
font-size: 36px;
font-weight: 400;
line-height: 60px;
&-wrap{
  margin-bottom: 50px;
}
}
.login__block{
  padding:60px 80px;
  display: flex;
    flex-direction: column;
    align-items: center;
    @include phones{
          height: 100%;
    justify-content: center;
    }
}
.login__form-submit{
      background: linear-gradient(90deg,#ea7400 0,#f29400);
    color: #fff;
    border: none;
    padding: 1.25rem 6.25rem;
    font-size: 1.125rem;
    font-weight: 700;
    line-height: 3rem;
    cursor: pointer;
    &:hover{
      background: linear-gradient(180deg,#ea7400 0,#f29400);
    }
}
.login__form-input{
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
}
.login__form{
      display: flex;
    flex-direction: COLUMN;
    align-items: center;
}
.login__form-label-wrap{
  width:100%;
}
.login__form-label{
   margin-bottom: 20px;
   display: block;
   opacity: 0.5;
  color: #414c63;
  font-size: 16px;
  font-weight: 400;
  line-height: 30px;
}
</style>

