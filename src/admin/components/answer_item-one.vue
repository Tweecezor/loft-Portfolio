<template lang="pug">
  li.answers__item.answer
    //- pre {{answerPhotoURl}}
    .answer__text-wrap
      input(type="text" v-model="answer.text"  ).answers__text
    .answer__correct-wrap
      input(type="radio" name="isCorrect" v-bind:value="answer.text" id="isCorrect" @change="setCorrectAnswer").answer__correct 
    .answer__actions(v-if="!editAnswer")
      //- .answer__actions-edit(v-if="!editAnswer" @click="editAnswer = true")
      .answer__actions-photo( @click="showAnswerImg(answer)")
      .answer__actions-delete 
    .answer__actions(v-if="editAnswer")
      .answer__actions-save( @click="changeAnswer(answer)")
      .answer__actions-cancel(@click="cancelChangeAnswer(answer)")
</template>

<script>
export default {
  props: {
    answer: Object,
    answers: Array,
    answerPhotoURl: String,
    prevAnswerPhotoURl: String
  },
  data() {
    return {
      editAnswer: false
    };
  },
  methods: {
    cancelChangeAnswer(answer) {
      this.answers.forEach(item => {
        if (item.answer_id === answer.answer_id) {
          item.imgURL = this.prevAnswerPhotoURl;
        }
      });
      this.editAnswer = false;
      this.$emit("emitDropAnswerURL");
    },
    changeAnswer(answer) {
      console.log(answer);
      this.answers.forEach(item => {
        if (item.answer_id === answer.answer_id) {
          item.imgURL = this.answerPhotoURl;
        }
      });
      this.editAnswer = false;
      this.$emit("emitDropAnswerURL");
    },
    showAnswerImg(answer) {
      this.editAnswer = true;
      this.$emit("emitShowAnswerImg", { answer });
    },
    setCorrectAnswer(e) {
      console.log(this.answers);
      console.log(e.target.value);
      console.log(e.target.checked);
      let updatedAnswers = this.answers.map(function(item) {
        // console.log(item);
        if (item.text === e.target.value) {
          item.correct = e.target.checked;
          return item;
        } else {
          item.correct = false;
          return item;
        }
      });
      console.log(updatedAnswers);
      this.$emit("emitSetCorrectAnswer", { updatedAnswers: updatedAnswers });
      // this.answers = updatedAnswers;
      // this.isCorrectAnswerSet = true;
      // console.log(e.target.value);
      // console.log(e.target.checked);
    }
  }
};
</script>

<style lang="postcss" scoped>
.answer {
  display: flex;
  flex-direction: row;
  width: 100%;
}
.answer__text-wrap {
  width: 75%;
  margin-right: 2%;
}
.answer__correct-wrap {
  margin-right: 2%;
}
.answer__correct {
  height: 100%;
}
.answers__text {
  /* width: 100%; */
  background-color: transparent;
  font-weight: 700;
  border: none;
  border-bottom: 2px solid #414c63;
  padding: 0 0.3125rem 0.625rem;
  /* margin-bottom: 1.875rem; */
  margin-bottom: 15px;
  width: 100%;
}
.answer__actions-edit {
  /* padding-right: 50px; */
  position: relative;
  margin-right: 25px;
  cursor: pointer;
  width: 20px;
  height: 20px;
  &:before {
    content: "";
    background: svg-load("pencil.svg", fill= "#383bcf") center center no-repeat /
      contain;
    width: 20px;
    height: 20px;
    opacity: initial;
    position: absolute;
    top: 15%;
    left: 63%;
  }
}
.answer__actions-photo {
  /* padding-right: 50px; */
  position: relative;
  margin-right: 20px;
  cursor: pointer;
  width: 20px;
  height: 20px;
  &:before {
    content: "";
    background: svg-load("photo.svg", fill= "#383bcf") center center no-repeat /
      contain;
    width: 20px;
    height: 20px;
    opacity: initial;
    position: absolute;
    top: 15%;
    left: 63%;
  }
}
.answer__actions-delete {
  position: relative;
  cursor: pointer;
  width: 18px;
  height: 18px;
  &:before {
    content: "";
    background: svg-load("trash.svg", fill= "red") center center no-repeat /
      contain;
    width: 18px;
    height: 18px;
    opacity: initial;
    position: absolute;
    top: 15%;
    left: 63%;
  }
}
.answer__actions-save {
  position: relative;
  margin-right: 30px;
  width: 18px;
  height: 18px;
  cursor: pointer;
  &:before {
    content: "";
    background: svg-load("tick.svg", fill= "green") center center no-repeat /
      contain;
    width: 18px;
    height: 18px;
    opacity: initial;
    position: absolute;
    top: 15%;
    left: 63%;
  }
}
.answer__actions-cancel {
  position: relative;
  cursor: pointer;
  &:before {
    content: "";
    background: svg-load("remove.svg", fill= "red") center center no-repeat /
      contain;
    width: 16px;
    height: 16px;
    opacity: initial;
    position: absolute;
    top: 15%;
    left: 63%;
  }
}
.answer__actions {
  width: 15%;
  display: flex;
  position: relative;
  margin-top: 10px;
}
</style>