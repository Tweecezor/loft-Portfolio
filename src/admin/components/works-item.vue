<template lang="pug">
  div
    .addWorks__preview
      img(src="../../images/content/slider-1.jpg")
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
</template>

<script>
export default {
  
}
</script>
<style lang="postcss" scoped>
@import url("../../styles/mixins.pcss");
.addWorks__preview{
  position: relative;
  margin-bottom: 30px;
}
.addWorks__tags-list--preview{
    position: absolute;
    right: 5px;
    bottom: -20px;
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
  /* opacity: 0.5; */
  color: #414c63;
  font-size: 16px;
  font-weight: 400;
  line-height: 30px;
}
.addWorks__desc-correct{
  padding-right:50px;
  position: relative;
  cursor: pointer;
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
.addWorks__desc-remove{
    padding-right:50px;
    cursor: pointer;
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
.addWorks__desc-correct-icon{
   width:20px;
    height: 20px;
    position: absolute;
    top:0;
    left:0;
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
</style>
