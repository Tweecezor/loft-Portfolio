<template lang="pug">
  div.current_level-wrapper
    //- pre {{answerPhotoURl}}
    .current_level__topic-wrap
      h1.current_level__topic Добавление вопроса
    .current_level__content
      .current_level__content-top
        .current_level__files(:style="{'background-image':`url(${this.questionPhotoURl})`}")
          .current_level__file-upload
            label(for="photoFile").current_level__load-text
              p Изображение для вопроса
              .dropzone(id="drop1")
              input(type="file" id="photoFile" @change="loadPhoto" accept="image/*").current_level__file-input
              .current_level__file-btn.btn Загрузить
        .current_level-data
          .question__title-wrapper
            label(for="question__title").question__label.question__title Введите вопрос
          .question__input-wrapper
            input(type="text"  v-model="currentQuestion").question__input
          .current_level__question-wrap
            label.current_level__question-label(for="question__type") Выберите тип вопроса
          .current_level__question-wrap
            select(v-model="typeOfQuestion").current_level__question-select
              option(value="oneAnswer").current_level__question-option Однозначный ответ
              option(value="multipleAnswer").current_level__question-option Множественный ответ
              option(value="handwritingAnswer").current_level__question-option Свободный ответ
      .current_level__topic-wrap
        h1.current_level__topic Добавление ответов
      .current_level__content-bottom
        .current_level__files.current_level__files--answer(v-if="typeOfQuestion!='handwritingAnswer'" :style="{'background-image':`url(${this.answerPhotoURl})`}")
          .current_level__file-upload
            label(for="photoAnswerFile").current_level__load-text
              p Изображение для ответа
              .dropzone(id="drop1" v-if="answerPhotoURl===''")
                input( type="file" id="photoAnswerFile" @change="loadAnwerPhoto" accept="image/*").current_level__file-input
                .current_level__file-btn.btn Загрузить
              .dropzone(v-else)
                input(type="file" id="photoAnswerFile" @change="changeAnswerPhoto" accept="image/*").current_level__file-input
                .current_level__file-btn.btn Изменить
        .current_level-data
          ONE_ANSWER(
            :prevAnswerPhotoURl="prevAnswerPhotoURl" :answerPhotoURl="answerPhotoURl" :questionPhotoURl="questionPhotoURl" :currentQuestion="currentQuestion" :currentLevel="currentLevel" 
            v-if="typeOfQuestion === 'oneAnswer'"
            v-on:resetAnswerUrl="dropAnswerURL"
            v-on:showCurrentAnswerIMG="setAnswerURL"
            v-on:emitResetData="resetData"
            )
          MULTIPLE_ANSWER(
            :prevAnswerPhotoURl="prevAnswerPhotoURl" :answerPhotoURl="answerPhotoURl" :questionPhotoURl="questionPhotoURl" :currentQuestion="currentQuestion" :currentLevel="currentLevel"
            v-if="typeOfQuestion === 'multipleAnswer'"
            v-on:resetAnswerUrl="dropAnswerURL"
            v-on:showCurrentAnswerIMG="setAnswerURL"
            v-on:emitResetData="resetData"
            )
          HANDWRITING_ANSWER(:currentLevel="currentLevel" v-if="typeOfQuestion === 'handwritingAnswer'")
          .current_level__btn-wrap
            button(@click="subitQuestion").save.btn Завершить
</template>
<script>
import { mapActions } from "vuex";
import ONE_ANSWER from "./oneAnswer";
import MULTIPLE_ANSWER from "./multipleAnswer";
import HANDWRITING_ANSWER from "./handwritingAnswer";

export default {
  components: {
    ONE_ANSWER,
    MULTIPLE_ANSWER,
    HANDWRITING_ANSWER
  },
  props: {
    currentLevel: Object
  },
  data() {
    return {
      typeOfQuestion: "multipleAnswer",
      currentQuestion: "",
      questionPhotoURl: "",
      answerPhotoURl: "",
      prevAnswerPhotoURl: "",
      currentAnswer: ""
    };
  },
  methods: {
    ...mapActions("helped", [
      "changeCurrentTestStatus",
      "changeCurrentLevelStatus"
    ]),
    resetData() {
      this.currentQuestion = "";
      this.questionPhotoURl = "";
      this.answerPhotoURl = "";
    },
    setAnswerURL(answer) {
      // console.log(answer);
      this.currentAnswer = answer;
      console.log(this.currentAnswer);
      this.answerPhotoURl = answer.answer.imgURL;
      console.log(this.answerPhotoURl);
    },
    dropAnswerURL() {
      console.log("dropURL");
      this.answerPhotoURl = "";
    },
    loadPhoto(e) {
      const file = e.target.files[0];
      console.log(file);
      const reader = new FileReader();
      try {
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.questionPhotoURl = reader.result;
        };
      } catch (error) {
        alert(error.message);
        console.log(error.message.errors.photo);
      }
    },
    loadAnwerPhoto(e) {
      const file = e.target.files[0];
      console.log(file);
      const reader = new FileReader();
      try {
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.answerPhotoURl = reader.result;
        };
      } catch (error) {
        alert(error.message);
        console.log(error.message.errors.photo);
      }
    },
    changeAnswerPhoto(e) {
      this.prevAnswerPhotoURl = this.answerPhotoURl;
      const file = e.target.files[0];
      console.log(file);
      const reader = new FileReader();
      try {
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.answerPhotoURl = reader.result;
        };
      } catch (error) {
        alert(error.message);
        console.log(error.message.errors.photo);
      }
    },

    subitQuestion() {
      this.changeCurrentLevelStatus(false);
    }
  }
};
</script>
<style lang="postcss" scoped>
.current_level-wrapper {
  box-shadow: 0.25rem 0.1875rem 1.25rem rgba(0, 0, 0, 0.14);
  border-radius: 6px;
}
.current_level__content {
  display: flex;
  /* justify-content: space-between; */
  flex-direction: column;
}
.current_level__content-top,
.current_level__content-bottom {
  display: flex;
}
.current_level__content-top {
  margin-bottom: 20px;
}
.current_level__btn-wrap {
  width: 100%;
  text-align: right;
}
.current_level__files {
  width: 40%;
  margin-right: 5%;
  height: 11.1875rem;
  background-color: #dee4ed;
  border: 1px dashed #a1a1a1;
  position: relative;
  background-size: cover;
  background-position: 50%;
  &--answer {
    height: 15.3875rem;
  }
}
.current_level__file-upload {
  height: 100%;
}
.current_level-data {
  width: 65%;
}
.current_level__load-text {
  color: #414c63;
  font-size: 1rem;
  font-weight: 400;
  line-height: 2.11813rem;
  text-align: center;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin: 0 auto;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  cursor: pointer;
  position: relative;
}
.current_level__file-input {
  display: none;
}

.current_level-wrapper {
  width: 100%;
  padding: 20px;
  /* height: 300px; */
  background: white;
  margin-bottom: 20px;
}
.question {
  display: flex;
  flex-direction: column;
}
.question__title-wrapper {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}
.button-wrapper {
  display: flex;
  justify-self: flex-end;
}
.save {
  margin-top: 20px;
  margin-bottom: 20px;
}
.question__type {
  margin-bottom: 10px;
}
.question_img {
  width: 200px;
  height: 200px;
  background: red;
  border-radius: 50%;
}
.input_question_img {
  position: absolute;
  z-index: -1;
  opacity: 0;
}
.question_avatar {
  width: 100%;
  height: 100%;
  background-size: cover;
}
.answer {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.addAnswer__button {
  width: 100px;
  margin-top: 20px;
}
.current_level__question-label {
  color: #414c63;
  font-size: 1rem;
  line-height: 1.875rem;
  opacity: 0.5;
}
.current_level__topic {
  padding-bottom: 1.25rem;
  border-bottom: 1px solid #414c63;
  margin-bottom: 30px;
  font-size: 1.125rem;
  font-weight: 700;
}
.question__input {
  background-color: transparent;
  font-weight: 700;
  border: none;
  border-bottom: 2px solid #414c63;
  padding: 0 0.3125rem 0.625rem;
  width: 100%;
  margin-bottom: 1.875rem;
}
.question__label {
  /* margin-bottom: 1.25rem; */
  display: block;
  opacity: 0.5;
  color: #414c63;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.875rem;
}
</style>