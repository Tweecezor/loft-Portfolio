<template lang="pug">
  header.header
    .header-container.container
      .header__info
        .user
          .user__avatar
            img(src="../../images/content/user2.jpg").user__img
          .user__name
            span Никита Еремеев
        .header__title-wrap
          h1.header__title Панель Администрирования
      .header__logout
        a(
          @click="logout"
        ).header__logout-link Выйти
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  methods:{
    ...mapActions('user',['userLogout']),
    ...mapActions('tooltips',['showTooltip']),
    async logout(){
      try{
        await this.userLogout();
        this.showTooltip({
          type:'success',
          text:'Скоро увидимся'
        })
        this.$router.push('/login');
      } catch(error){
        this.showTooltip({
          type:'error',
          text:error.message
        })
      }
      
    }
  }
}
</script>

<style lang="postcss" scoped>
@import url("../../styles/mixins.pcss");

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
 cursor: pointer;
  opacity: .5;
  &:hover{
    opacity: 1;
     text-decoration: underline;
  }
}
</style>

