<template lang="pug">
  .wrapper-
    //- pre {{editQuestion}}
    //- div МНОЖЕСТВЕННЫЙ ОТВЕТ 
    //- form(@submit.prevent="subitQuestion").question
    .question__wrapper
      //- .question__title-wrapper()
      //-   label(for="question__title"  v-model="question_title").question__label Введите вопрос
      //-   input(type="text" :disabled="editQuestion" v-model="currentQuestion").question__titile
      //-   div(v-if="editQuestionMode")
      //-     button(type="button" @click="editQuestion = false") Редактировать
      //-     button(@click.prevent="editQuestion = true") Сохранить
      //-   label(for="addQuestionImg") Добавить изображение?
      //-     input(type="checkbox" id="addQuestionImg" v-model="questionWithPhoto" )
      //-   input(type="file" @change="loadPhoto" accept="image/*" id="question_img").input_question_img 
      //-   label(for="question_img" v-if="questionWithPhoto" ).question_img
      //-     .question_avatar(:style="{'background-image':`url(${this.questionPhotoURl})`}")
      //-       label(for="question_img").question__change_img(v-if="questionPhotoURl && !editQuestion") Заменить
      //- button( v-if="!showInputAnswer" type="button" @click="addQuestion") Добавить вопрос
      //- hr
      .answers__title-wrap
        h2.asnwers__title Список ответов
      .answers__wrapper()
        ul.answers__list( v-if="answers.length" v-for="(answer,id) in answers") 
          ANSWER_ITEM(
            :answer="answer" :answers="answers" 
            :answerPhotoURl="answerPhotoURl"
            :prevAnswerPhotoURl="prevAnswerPhotoURl"
            v-on:emitSetCorrectAnswer="setCorrectAnswer" 
            v-on:emitShowAnswerImg="showAnswerImg"
            v-on:emitDropAnswerURL="resetAnswerUrl"
          )
          //- li.answers__item 
          //-   //- pre {{editAnswer}}
          //-   .answer__text-wrap
          //-     input(type="text" v-model="answer.text"  ).answers__text
          //-   .answer__correct-wrap
          //-     input(type="checkbox" name="isCorrect" v-bind:value="answer.text" id="isCorrect" @change="setCorrectAnswer").answer__correct 
          //-   .answer__actions()
          //-     .answer__actions-edit(v-if="!editAnswer")
          //-     .answer__actions-save(v-if="editAnswer" @click="changeAnswer(answer)")
          //-     .answer__actions-photo( @click="showAnswerImg(answer)")
          //-     .answer__actions-delete 

            //- input(type="text" v-model="answer.text" ).answers__text
            //- button(type="button" @click="editAnswer=false") Редактировать
            //-   button(type="button" @click="saveChangedAnswer(id+1,answer.text)") Сохранить
            //- input(type="checkbox" name="isCorrect" v-bind:value="answer.text" id="isCorrect" @change="setCorrectAnswer")



          //-   div.answer__with_img(v-if="answer.imgURL")
          //-     label Изображение
          //-     input(type="file" @change="loadAnswerPhoto" accept="image/*" id="answer_img")
          //-     label(for="answer_img" v-if="answerPhotoURl") Заменить
          //-     br
          //-     //- .question_avatar(:style="{'background-image':`url(${answerPhotoURl})`}")
          //-     div(v-if="answer.imgURL").question_img 
          //-       .question_avatar(:style="{'background-image':`url(${answer.imgURL})`}")
          //- hr

      .answer_new
        .answer_new__data
          .answer_new__topic-wrap
            label.answer_new__topic Введите текст ответа
          .answer_new__input-wrap
            input(type="text" v-model="currentAnswer").answer_new__input
            .answer_new__actions
              button.answer_new__btn(@click="addAnswer").answer_new__btn Добавить ответ
      //- .answer()
      //-   label.answer__label Введите ответ
      //-   input(type="text" v-model="currentAnswer")
      //-   //- label(for="addAnswerImg") Добавить изображение?
      //-   //-   input(type="checkbox" id="addAnswerImg" v-model="answerWithPhoto" )
      //-   //- input(type="file" @change="loadAnswerPhoto" accept="image/*" id="answer_img").input_question_img 
      //-   //- label(for="answer_img" v-if="answerWithPhoto" ).question_img
      //-   //-   .question_avatar(:style="{'background-image':`url(${this.answerPhotoURl})`}")
      //-   button(type="button" @click="addAnswer").addAnswer__button Добавить ответ


    button( @click="subitQuestion").save Сохранить вопрос
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
import ANSWER_ITEM from "./answer_item-multy";
export default {
  components: {
    ANSWER_ITEM
  },
  props: {
    currentLevel: Object,
    currentQuestion: String,
    questionPhotoURl: String,
    answerPhotoURl: String,
    prevAnswerPhotoURl: String
  },
  data() {
    return {
      // correct: false,
      answerWithPhoto: false,
      // answerPhotoURl: "",
      // questionPhotoURl: "",
      questionWithPhoto: false,
      currentAnswer: "",
      question: {},
      // currentQuestion: "",
      question_title: "",
      showInputAnswer: false,
      answers: [],
      typeOfQuestion: "",
      isCorrectAnswerSet: false,
      currentQuestion_id: "",
      editQuestion: false,
      editQuestionMode: false,
      editAnswer: false
    };
  },
  methods: {
    resetAnswerUrl() {
      this.$emit("resetAnswerUrl");
    },
    changeAnswer(answer) {
      console.log(answer);
      this.answers.forEach(item => {
        if (item.answer_id === answer.answer_id) {
          item.imgURL = this.answerPhotoURl;
        }
      });
      this.editAnswer = false;
    },
    showAnswerImg(answer) {
      console.log(answer);
      let currentAnswer = answer.answer;
      // this.editAnswer = true;
      this.$emit("showCurrentAnswerIMG", { answer: currentAnswer });
    },
    saveChangedAnswer(id, newAnswerText) {
      console.log(this.editAnswer);
      this.editAnswer = !this.editAnswer;
      console.log(this.editAnswer);
      this.answers.filter(item => {
        if (item.answer_id === id) {
          item.text = newAnswerText;
          return item;
        } else {
          return item;
        }
      });
    },
    editCurrentQuestion() {
      this.editQuestion = false;
    },
    saveEditedQuestion() {
      this.editQuestion = true;
    },
    loadAnswerPhoto(e) {
      const file = e.target.files[0];
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
    ...mapActions("questions", ["addNew"]),

    setCorrectAnswer(updatedAnswers) {
      // console.log(this.answers);
      // let updatedAnswers = this.answers.map(function(item) {
      //   // console.log(item);
      //   if (item.text === e.target.value) {
      //     item.correct = e.target.checked;
      //     return item;
      //   } else {
      //     // item.correct = false;
      //     return item;
      //   }
      // });
      // console.log(updatedAnswers);
      this.answers = updatedAnswers.updatedAnswers;
      this.isCorrectAnswerSet = true;
      // console.log(e.target.value);
      // console.log(e.target.checked);
    },
    resetData() {
      this.answerWithPhoto = false;
      // this.answerPhotoURl = "";
      // this.questionPhotoURl = "";
      // this.questionWithPhoto = false;
      // this.currentAnswer = "";
      this.question = {};
      // this.currentQuestion = "";
      this.question_title = "";
      this.showInputAnswer = false;
      this.answers = [];
      this.typeOfQuestion = "";
    },
    subitQuestion() {
      console.log(this.answers);
      if (this.isCorrectAnswerSet) {
        // console.log("Нудная id для вопроса");
        let qId = this.question_id(
          this.currentLevel.levelId,
          this.currentLevel.testid
        );
        // console.log("qID = " + qId);
        if (qId === "empty") {
          // console.log("TRUE TRUE TRUE");
          this.currentQuestion_id = 1;
        } else {
          // console.log(qId);
          this.currentQuestion_id = qId + 1;
        }

        const questionWithAnswers = {
          type: "multipleAnswer",
          question: {
            text: this.currentQuestion,
            img: this.questionPhotoURl,
            question_id: this.currentQuestion_id
          },
          answers: this.answers,
          level_id: this.currentLevel.levelId,
          test_id: this.currentLevel.testid
        };

        console.log(questionWithAnswers);
        this.addNew(questionWithAnswers);
        this.resetData();
        this.$emit("emitResetData");

        //   this.changeCurrentLevelStatus(false);
      } else {
        alert("Выберите верный вариант ответа");
      }
    },
    addQuestion() {
      console.log(this.currentQuestion);
      if (this.currentQuestion === "") {
        alert("EMPTY");
      }
      if (this.currentQuestion === "" && this.questionPhotoURl === "") {
        alert("Добавьте текст или изображение");
      } else {
        this.showInputAnswer = !this.showInputAnswer;
        this.editQuestion = !this.editQuestion;
        this.editQuestionMode = !this.editQuestionMode;
      }
    },
    addAnswer() {
      // console.log(this.currentAnswer);
      if (!this.currentAnswer && !this.answerPhotoURl) {
        alert("Добавьте текст или изображение");
      } else {
        let answer = {
          text: this.currentAnswer,
          correct: false,
          imgURL: this.answerPhotoURl,
          answer_id: this.answers.length + 1
        };
        this.answers.push(answer);
        this.currentAnswer = "";
        // this.answerWithPhoto = false;
        // this.answerPhotoURl = "";
        // this.editAnswer = true;
      }
      console.log(this.answers);
      this.$emit("resetAnswerUrl");
    }
  },
  computed: {
    ...mapGetters("questions", ["question_id"])
  },
  watch: {
    questionWithPhoto: function(status) {
      // console.log(status);
      if (!status) {
        // console.log(this.photoURl);
        this.questionPhotoURl = "";
      }
    }
  }
};
</script>
<style lang="postcss" scoped>
.wrapper {
  width: 100%;
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
.question__change_img {
  color: red;
  text-align: center;
}
//-----------------
.asnwers__title {
  /* padding-bottom: 1.25rem; */
  border-bottom: 1px solid #414c63;
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 1.25rem;
  margin-top: -5px;
}
.asnwers__title {
  /* padding-bottom: 1.25rem; */
  border-bottom: 1px solid #414c63;
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 1.25rem;
  margin-top: -5px;
}
.answers__item {
  display: flex;
  flex-direction: row;
}
.answer_new__data {
  width: 100%;
}
.answer_new__topic {
  display: block;
  opacity: 0.5;
  color: #414c63;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.875rem;
}
.answer__text-wrap {
  width: 75%;
  margin-right: 2%;
}
.answer__correct-wrap {
  margin-right: 2%;
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
  margin-right: 25px;
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
  margin-right: 20px;
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
    width: 13px;
    height: 13px;
    opacity: initial;
    position: absolute;
    top: 15%;
    left: 63%;
  }
}
.answer_new__input {
  background-color: transparent;
  font-weight: 700;
  border: none;
  border-bottom: 2px solid #414c63;
  padding: 0 0.3125rem 0.625rem;
  width: 100%;
}
.answer_new {
  display: flex;
}
.answers__wrapper {
  min-height: 200px;
}
.answer_new__input-wrap {
  display: flex;
  width: 100%;
}
.answer__correct {
  height: 100%;
}
.answer__actions {
  width: 15%;
  display: flex;
  position: relative;
  margin-top: 10px;
}
</style>