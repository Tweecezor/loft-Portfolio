<template lang="pug">
  div.answer__add
    h3.answer__add-title Добавить новый ответ
    input(type="text" v-model="newAnswer").answer__add-input
    button(@click="newAnswerAdd").btn Добавить
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  props: {
    // answer: Object,
    test_id: Number,
    level_id: Number,
    question_id: Number,
    answerLength: Number
  },
  data() {
    return {
      newAnswer: "",
      newAnswerImgURL: ""
    };
  },
  methods: {
    ...mapActions("questions", [
      "changeAnswerStatus",
      "updateAnswer",
      "addNewAnswer"
    ]),
    newAnswerAdd() {
      let newAnswer = {
        answer: {
          text: this.newAnswer,
          correct: false,
          imgURL: this.newAnswerImgURL,
          answer_id: this.answerLength + 1
        },
        test_id: this.test_id,
        level_id: this.level_id,
        question_id: this.question_id
      };
      console.log(newAnswer);
      this.newAnswer = "";
      this.addNewAnswer(newAnswer);
    }
    // loadImg(e) {
    //   // console.log(isNewImg);
    //   // this.newImg = isNewImg;
    //   const file = e.target.files[0];
    //   console.log(file);
    //   const reader = new FileReader();
    //   try {
    //     reader.readAsDataURL(file);
    //     reader.onload = () => {
    //       this.currentAnswer.imgURL = reader.result;
    //     };
    //   } catch (error) {
    //     alert(error.message);
    //     console.log(error.message.errors.photo);
    //     console.log(this.currentAnswer.imgURL);
    //   }
    // },
    // deleteImg() {
    //   this.currentAnswer.imgURL = "";
    // },
  }
};
</script>
<style lang="postcss" scoped>
</style>