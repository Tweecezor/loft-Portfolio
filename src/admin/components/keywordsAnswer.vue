<template lang="pug">
  div
    pre {{typeOfQuestion }}
    pre {{keyword}}
    .addWorks__label-wrap
      label(for="input-tag").addWorks__label Ключевое слово
      input(type="text" name="tag" id="input-tag" v-model='keyword').keywords__input
      button(type="button" @click="addKeyword").addKeyword Добавить
      div.error-input()
    .addWorks__tags-list-wrap
      //- pre {{keywords}}
      ul.addWorks__tags-list
        li(v-for="(item,index) in keywords" v-if="keywords.length!=0 && item!=''" ).addWorks__tags-item {{item}}
          .deleteTag(@click="removeKeyword(index)") x
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: {
    keywords: Array,
    typeOfQuestion: String
  },
  data() {
    return {
      keyword: ""
    };
  },
  methods: {
    ...mapActions("questions", ["changeKeywords"]),
    removeKeyword(currentKeyword) {
      // console.log(currentKeyword);
      this.keywords.splice(currentKeyword, 1);
      // console.log(this.keywords);
    },
    addKeyword() {
      this.keywords.push(this.keyword);
      // console.log(this.keywords);
      this.changeKeywords(this.keywords);
    }
  }
};
</script>

<style lang="postcss" scoped>
.addWorks__tags-list {
  display: flex;
}
.addWorks__tags-item {
  padding: 5px 15px;
  background-color: #f4f4f4;
  border-radius: 15px;
  margin-right: 10px;
  padding-right: 30px;
  position: relative;
  display: flex;
  &:last-child {
    margin-right: 0px;
  }
}
.deleteTag {
  position: absolute;
  right: 10%;
  cursor: pointer;
  font-weight: 700;
  top: 4px;
}
.addWorks__tags-list-wrap {
  margin-bottom: 30px;
}
.addWorks__label-wrap {
  display: flex;
  flex-direction: column;
}
</style>