<template lang="pug">
  .question 
    //- pre {{item}}
    //- pre {{currentQuestion}}
    //- pre {{test_id}}
    //- pre {{level_id}}
    .question__title-wrap
      h1.question__title Просмотр вопроса
    .question__content
      .question__data
        .question__data_label-wrap
          label.question__data_label Текст вопроса
        .questions__data_content
          .question__data_text-wrap
            input(type="text" v-model="currentQuestion.text" :disabled="!editMode").question__input.question__text
          .question__actions(v-if="!editMode")
            .question__actions_correct(@click="editMode = true") 
            .question__actions_trash(@click="deleteQuestion") 
          .question__actions(v-else)
            .question__actions_save(@click="updateCurrentQuestion") 
            .question__actions_cancel(@click="cancelUpdate") 
      .question__image(@click="showQuestionImage" v-if="currentQuestion.img") 
        .question__image_label-wrap 
          .question__image_label Показать изображение вопроса
        .question_image_img-wrap(v-if="currentQuestion.img && showQImg")
          .question_image_img(:style="{'background-image':`url(${currentQuestion.img})`}")
      //- ANSWER_ITEM(:answers="curr")
    //- hr
    //- .answers
    //-   div.answers__title Ответы
    //-   ul(v-for="answer in item.answers").answers__list
    //-     li.answers__item.answer
    //-       span.answer__text {{answer.text}}
    //-       input(type="radio" name="isCorrect" :disabled="!editMode" :checked="answer.correct").answer__status
    //-       div(@click="showAnswerImage" v-if="answer.imgURL") Показать изображение ответа
    //-         div(v-if="answer.imgURL && showAImg").answer_img 
    //-           .answer_avatar(:style="{'background-image':`url(${answer.imgURL})`}")
</template>

<script>
import { mapActions, mapState } from "vuex";
import ANSWER_ITEM from "./answer-item";
export default {
  components: {
    ANSWER_ITEM
  },
  props: {
    item: Object,
    test_id: Number,
    level_id: Number
  },
  data() {
    return {
      showQImg: false,
      // showAImg: false,
      editMode: false,
      currentQuestion: { ...this.item }

      // isTestOpen:false
    };
  },
  methods: {
    ...mapActions("helped", [
      "changeCurrentTestStatus",
      "changeCurrentLevelStatus",
      "changeShowQuestionsStatus"
    ]),
    ...mapActions("questions", ["updateQuestion"]),
    showQuestionImage() {
      // console.log(this.showingImg);
      this.showQImg = !this.showQImg;
    },
    showAnswerImage() {
      this.showAImg = !this.showAImg;
    },
    // closeSection() {
    //   this.changeShowQuestionsStatus(false);
    // },
    deleteQuestion() {},
    updateCurrentQuestion() {
      let updatedQuestion = {
        level_id: this.level_id,
        test_id: this.test_id,
        newQuestionTitle: this.currentQuestion.text,
        question_id: this.currentQuestion.question_id
      };
      this.updateQuestion(updatedQuestion);
      this.editMode = !this.editMode;
    },
    cancelUpdate() {
      this.currentQuestion = { ...this.item };
      this.editMode = !this.editMode;
    }
  },
  computed: {
    ...mapState("helped", {
      showQuestions: state => state.showQuestions
    })
  }
};
</script>

<style lang="postcss" scoped>
.question {
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
}
.question__content {
  display: flex;
  flex-direction: column;
}
.question__data {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.question__actions {
  display: flex;
  justify-content: space-between;
}
.questions__data_content {
  display: flex;
}
.question__data_text-wrap {
  width: 100%;
}
.question__image_label-wrap {
  margin-bottom: 10px;
}
.question_image_img-wrap {
  width: 80%;
  margin: 0 auto;
  height: 300px;
  border: 1px dashed;
}
.question_image_img {
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;

  background-position: 50% 50%;
}

.questions {
  position: relative;
  width: 100%;
  /* padding: 40px; */
  margin-bottom: 20px;
  background: transparent;
  display: flex;
  flex-direction: column-reverse;
  /* display: flex; */
}
.questions__list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.questions__item {
  width: 400px;
  background-color: white;
  min-height: 300px;
  border: 1px solid black;
}
.question_img {
  width: 100%;
  height: 200px;
}
.question_avatar {
  width: 100%;
  height: 100%;
  background-size: cover;
}

.questions__empty {
  width: 100%;
  padding: 30px;
  background-color: white;
  height: 100px;
}
.questions__close {
  /* position: absolute;
  top: -10%;
  right: -5%; */
  text-align: right;
  color: black;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
.question__input {
  padding: 20px;
}
.question__title {
  padding-bottom: 1.25rem;
  border-bottom: 1px solid #414c63;
  margin-bottom: 1.875rem;
  font-size: 1.125rem;
  font-weight: 700;
}
.question__text {
  width: 100%;
  background-color: transparent;
  font-weight: 700;
  border: none;
  border-bottom: 2px solid #414c63;
  padding: 0 0.3125rem 0.625rem;
  /* margin-bottom: 1.875rem;s */
}
.question__data {
  width: 100%;
}
.question__data_label-wrap {
  margin-bottom: 0.625rem;
}
.question__data_label {
  display: block;
  opacity: 0.5;
  color: #414c63;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.875rem;
}
.question_aсtions {
  display: flex;
}
.question__actions_correct {
  position: relative;
  margin-right: 20px;
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
.question__actions_trash {
  position: relative;
  margin-right: 20px;
  cursor: pointer;
  width: 20px;
  height: 20px;
  &:before {
    content: "";
    background: svg-load("trash.svg", fill= "red") center center no-repeat /
      contain;
    width: 20px;
    height: 20px;
    opacity: initial;
    position: absolute;
    top: 15%;
    left: 63%;
  }
}
.question__actions_save {
  position: relative;
  margin-right: 20px;
  cursor: pointer;
  width: 20px;
  height: 20px;
  &:before {
    content: "";
    background: svg-load("tick.svg", fill= "green") center center no-repeat /
      contain;
    width: 20px;
    height: 20px;
    opacity: initial;
    position: absolute;
    top: 15%;
    left: 63%;
  }
}
.question__actions_cancel {
  position: relative;
  margin-right: 20px;
  cursor: pointer;
  width: 20px;
  height: 20px;
  &:before {
    content: "";
    background: svg-load("remove.svg", fill= "red") center center no-repeat /
      contain;
    width: 20px;
    height: 20px;
    opacity: initial;
    position: absolute;
    top: 15%;
    left: 63%;
  }
}
</style>