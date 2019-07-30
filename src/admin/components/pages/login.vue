<template lang="pug">
  section.login.fullscreen-section 
    .login__block
      .login__block-wrap
        .login__title-wrap
          h1.login__title Авторизация
        form(@submit.prevent="login").login__form
          .login__form-label-wrap
            label(for="").login__form-label Логин
            .login__form-input-wrap
              input(
                type="text" name="login" id="login"
                v-model="userData.name"
              ).login__form-input.login__form-input--login
              .login__form-input-icon-login.login__form-input-icon
          .login__form-label-wrap
            label(for="").login__form-label Пароль
            .login__form-input-wrap
              input(
                type="password" name="passowrd" id="password"
                v-model="userData.password"
              ).login__form-input.login__form-input--password
              .login__form-input-icon-password.login__form-input-icon
          input(type="submit" :disabled="disable" name="sumbit" value="Войти"  :class="{ activeForm : active }").login__form-submit
        a(href="index.html" ).login__close
    pre {{userData.name}}    
  
</template>

<script>
import $axios from "@/requests";
import {mapActions} from 'vuex';
import {Validator} from 'simple-vue-validator';
export default {
  mixins:[require('simple-vue-validator').mixin],
  validators:{
    'userData.name': value =>{
      return Validator.value(value).required('Обязательно для заполнения')
    },
    'userData.password': value =>{
      return Validator.value(value).required('Обязательно для заполнения')
    }
  },
  components:{

  },
  data(){
    return{
      userData:{
        name : "tweecz-0719",
        password : "TheNamelessTweecz"
      },
      active:false,
      disable:true
    }
  },
  methods:{
    ...mapActions('tooltips',['showTooltip']),
    async login(){
      if((await this.$validate())===false){
        this.showTooltip({
          type:'error',
          text:'Заполните все поля'
        });
        return;
      }
      try{
        const { data: {token} } = await $axios.post('/login',this.userData);
        localStorage.setItem('token',token)
        $axios.defaults.headers["Authorization"] = `Bearer ${token}`
        this.$router.replace('/');
        console.log(localStorage);
      } catch(error){
        console.log(error.response);
        this.showTooltip({
          type:'error',
          text:error.response.data.error
        })
        console.log('after SHOWTOOLTIP');
        // alert(error.response.data.error);
        }
      }
  },
  watch:{
    'userData.name'(){
      if((this.userData.password!='') && (this.userData.name!='')){
        console.log('test');
       this.active = true;
        this.disable = false;
      } else{
        this.active = false;
        this.disable = true;
      }
    },
    'userData.password'(){
      if((this.userData.password!='') && (this.userData.name!='')){
        console.log('test');
        this.active = true;
        this.disable = false;
      } else{
        this.active = false;
        this.disable = true;
      }
    }
  },
  created(){ 
       if((this.userData.password!='') && (this.userData.name!='')){
        console.log('test');
        this.active = true;
        this.disable = false;
      } else{
         this.active = false;
        this.disable = true;
      }
  }
  
}
</script>

<style lang="postcss" scoped>

@import url("../../../styles/mixins.pcss");
pre{
  color:white;
}

.login{
  background:url('../../../images/content/background-main.jpg') center center;
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
.login__block-wrap{
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    padding: 0% 15%;
}
.login__title{
color: #414c63;
font-size: 36px;
font-weight: 700;
line-height: 60px;
&-wrap{
  margin-bottom: 30px;
}
}
.login__block{
  /* padding:60px 80px; */
  width:560px;
  padding: 40px 0px;
  display: flex;
    flex-direction: column;
    align-items: center;
    @include phones{
    height: 100vh;
    justify-content: center;
    width:100%;
    }
}
.login__form-submit{
    background:grey;
    color: #fff;
    border: none;
    padding: 1.25rem 6.25rem;
    font-size: 1.125rem;
    font-weight: 700;
    line-height: 3rem;
    cursor: pointer;
    &:hover{
      border-bottom:none;
    }
   
}
.activeForm{
  background: linear-gradient(90deg,#ea7400 0,#f29400);
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
  padding-left: 55px;
  padding-right:5px;
    &:hover{
    border-bottom:2px solid $orange;
  }
  &:active{
      border-bottom:2px solid $orange;
  }
  
}
.login__form{
      display: flex;
    flex-direction: COLUMN;
    align-items: center;
        width: 100%;
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
  padding-left: 35px;
}
.login__close{
  background: svg-load("remove.svg", fill="$text-color") center center no-repeat / contain;
  width:20px;
  height: 20px;
  position: absolute;
      top: 20px;
    right: 15%;
    cursor: pointer;
}
.login__form-input-wrap{
  display: flex;
  position: relative;
}
.login__form-input-icon{
  width:40px;
  height: 40px;
  position: absolute;
  top:-5px;
  left:0;
  &-login{
    background: svg-load("user.svg", fill="#414c63") center center no-repeat / contain;
    opacity: .3;
  }
  &-password{
    background: svg-load("key.svg", fill="$text-color") center center no-repeat / contain;
     width:50px;
  }
}


</style>
