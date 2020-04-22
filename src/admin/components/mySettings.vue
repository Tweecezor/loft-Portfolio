<template lang="pug">
  .container
    .wrapper
      h1 Мои Настройки
      div.settings
        //- nav.settings__nav
        //-   ul.settings__list
        //-     li.settings__item( @click="setCurrentNav(item)" v-for="item in ['Личные данные','Группы','Помощь']") {{item}}
        //- .settings__content
        //-   GROUPS(v-if="currentNav==='Группы'")



</template>

<script>
import GROUPS from "./settings_groups";
export default {
  components: {
    GROUPS
  },
  data() {
    return {
      currentNav: "Личные данные"
    };
  },
  methods: {
    setCurrentNav(item) {
      // console.log(item);
      this.currentNav = item;
    }
  }
};
</script>

<style lang="postcss" scoped>
.settings {
  width: 100%;
  /* height: 500px; */
  /* background-color: white; */
  /* border: 1px solid black; */
  display: flex;
  justify-content: space-between;
}
.settings__nav {
  width: 10%;
  background-color: white;
}
.settings__content {
  width: 85%;
  height: 500px;
  background-color: white;
  border: 1px solid black;
}
.settings__item {
  border-bottom: 1px solid black;
}
</style>