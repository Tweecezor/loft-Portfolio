<template lang="pug">
  nav.nav
    .container
      ul.nav__list
        li.nav__item(
          v-for="item in ['Тесты','Группы','Настройки','Вопросы']"
        )
          a(@click.prevent="clickLink(item)").nav__link {{item}}
          //- router-link(to="/works") {{item}}
</template>

<script>
export default {
  methods: {
    clickLink(item) {
      switch (item) {
        case "Обо мне":
          return this.$router.push("/");
        case "Отзывы":
          return this.$router.push("/reviews");
        case "Работы":
          return this.$router.push("/works");
        case "Тесты":
          return this.$router.push("/tests");
        case "Настройки":
          return this.$router.push("/mySettings");
        case "Группы":
          return this.$router.push("/groups");
        case "Вопросы":
          return this.$router.push("/questions");
      }
    }
  }
};
</script>

<style lang="postcss" scoped>
.nav {
  background: #fff;
  color: black;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 30px;
  border-bottom: 1px solid #efefef;
}
.nav__list {
  display: flex;
}
.nav__item {
  border-bottom: 2px solid white;
  &:hover {
    color: $orange;
    border-bottom: 2px solid $orange;
  }
  &-active {
    border-bottom: 2px solid $orange;
  }
}
.nav__link {
  display: block;
  padding: 20px 20px;
  /* padding:0 20px; */
}
</style>

