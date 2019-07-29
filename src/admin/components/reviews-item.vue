<template lang="pug">
div
  .reviews__preview
    .reviews__avatar
      img(src="../../images/content/user2.jpg").user__img
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
  props:{
    review:Object
  }
}
</script>


<style lang="postcss" scoped>
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

