<template lang="pug">
  .answer__wrapper
    pre {{answers}}
    //- hr 
    pre {{currentAnswers}}
    //- hr
    ul(v-for="answer in currentAnswers").answers__list
      li.answers__item.answer()
        hr  
        pre {{answer}}
        .answers__data
          input(type="text" v-model="answer.text" :disabled="!editMode").question__input
          input(type="radio" id="isCorrect" name="isCorrect" v-bind:value="answer.text" :disabled="!editMode" :checked="answer.correct"  @change="setCorrectAnswer").answer__status
          .answers__actions(v-if="!editMode")
              .answers__correct(@click="editMode = true") Редактировать
              .answers__trash(@click="deleteQuestion") Удалить
          .answers__actions(v-else)
            .answers__update(@click="updateCurrentQuestion") Сохранить
            .answers__cancel(@click="cancelUpdate") Отменить
        //-   div(@click="showAnswerImage" v-if="currentAnswer.imgURL") Показать изображение ответа
        //-     div(v-if="answer.imgURL && showAImg").answer_img 
        //-       .answer_avatar(:style="{'background-image':`url(${answer.imgURL})`}")
</template>
<script>
export default {
  props: {
    answers: Array,
    test_id: Number,
    level_id: Number
  },
  data() {
    return {
      editMode: false,
      showQImg: false,
      currentAnswers: { ...this.answers }
    };
  },
  methods: {
    deleteQuestion() {},
    updateCurrentQuestion() {},
    cancelUpdate() {
      // this.currentAnswers = { ...this.answers };
      this.editMode = !this.editMode;
    },
    showAnswerImage() {
      this.showAImg = !this.showAImg;
    },
    setCorrectAnswer(e) {
      console.log(e.target.checked);
      console.log(e.target.value);
      console.log(typeof this.currentAnswers);
      for (let answer in this.currentAnswers) {
        // console.log(answer);
        // console.log(this.currentAnswers[answer]);
        let currentAnswer = this.currentAnswers[answer];
        console.log(currentAnswer);
        if (currentAnswer.text === e.target.value) {
          currentAnswer.correct = e.target.checked;
        } else {
          currentAnswer.correct = !e.target.checked;
        }
      }

      // this.currentAnswers.forEach(answer => {
      //   console.log(answer);
      //   if (answer.text === e.target.value) {
      //     answer.correct = e.target.checked;
      //   } else {
      //     answer.correct = !e.target.checked;
      //   }
      // });
      // if (this.currentAnswers.answer.text === e.target.value) {
      //   this.currentAnswers.answer.correct = e.target.checked;
      // } else {
      //   this.currentAnswers.answer.correct = !e.target.checked;
      // }
    }
  }
};
</script>
<style lang="postcss" scoped>
.answers__actions {
  display: flex;
}
.answer_img {
  width: 100%;
  height: 200px;
}
.answer_avatar {
  /* width: 100%; */
  height: 200px;
  background-size: cover;
}
</style>