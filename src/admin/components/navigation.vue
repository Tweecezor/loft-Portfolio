<template lang="pug">
  nav.nav
    .container
      ul.nav__list
        li.nav__item(
          v-for="item in ['Обо мне','Работы','Отзывы']"
        )
          a(@click.prevent="clickLink(item)").nav__link {{item}}
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
