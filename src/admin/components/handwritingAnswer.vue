<template lang="pug">
  .wrapper
    //- pre {{keywordsArray}}
    div Рукописный ввод 
    form(@submit.prevent="subitQuestion").question
      .question__wrapper
        .question__title-wrapper()
          label(for="question__title"  v-model="question_title").question__label Введите вопрос
          input(type="text" :disabled="editQuestion" v-model="currentQuestion").question__titile
          div(v-if="editQuestionMode")
            button(type="button" @click="editQuestion = false") Редактировать
            button(@click.prevent="editQuestion = true") Сохранить
          label(for="addQuestionImg") Добавить изображение?
            input(type="checkbox" id="addQuestionImg" v-model="questionWithPhoto" )
          input(type="file" @change="loadPhoto" accept="image/*" id="question_img").input_question_img 
          label(for="question_img" v-if="questionWithPhoto" ).question_img
            .question_avatar(:style="{'background-image':`url(${this.questionPhotoURl})`}")
              label(for="question_img").question__change_img(v-if="questionPhotoURl && !editQuestion") Заменить
        button( v-if="!showInputAnswer" type="button" @click="addQuestion").addQuestion Добавить вопрос
        hr
        .addWorks__label-wrap
          label(for="input-tag").addWorks__label Ключевое слово
          input(type="text" name="tag" id="input-tag" v-model='keyword').keywords__input
          button(type="button" @click="addKeyword").addKeyword Добавить
          div.error-input()
        .addWorks__tags-list-wrap
          ul.addWorks__tags-list
            li(v-for="(item,index) in keywordsArray" v-if="keywordsArray.length!=0 && item!=''" ).addWorks__tags-item {{item}}
              .deleteTag(@click="removeKeyword(index)") x
      button(type="submit").save Сохранить ответ
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  props: {
    currentLevel: Object
  },
  data() {
    return {
      // correct: false,

      questionPhotoURl: "",
      questionWithPhoto: false,
      question: {},
      currentQuestion: "",
      question_title: "",
      typeOfQuestion: "",
      currentQuestion_id: "",
      editQuestion: false,
      editQuestionMode: false,
      keyword: "",
      showInputAnswer: false,
      keywordsArray: []
    };
  },
  methods: {
    addKeyword() {
      if (this.keyword) {
        this.keywordsArray.push(this.keyword);
        this.keyword = "";
      } else {
        alert("Введите что-то");
      }
    },
    removeKeyword(currentKeyword) {
      console.log(currentKeyword);
      this.keywordsArray.splice(currentKeyword, 1);
      console.log(this.keywordsArray);
    },
    // saveChangedAnswer(id, newAnswerText) {
    //   // console.log(newAnswerText);
    //   // console.log(id);
    //   // console.log(this.answers);
    //   console.log(this.editAnswer);
    //   this.editAnswer = !this.editAnswer;
    //   console.log(this.editAnswer);
    //   this.answers.filter(item => {
    //     if (item.answer_id === id) {
    //       item.text = newAnswerText;
    //       return item;
    //     } else {
    //       return item;
    //     }
    //   });
    // },
    editCurrentQuestion() {
      this.editQuestion = false;
    },
    saveEditedQuestion() {
      this.editQuestion = true;
    },
    // loadAnswerPhoto(e) {
    //   const file = e.target.files[0];
    //   const reader = new FileReader();
    //   try {
    //     reader.readAsDataURL(file);
    //     reader.onload = () => {
    //       this.answerPhotoURl = reader.result;
    //     };
    //   } catch (error) {
    //     alert(error.message);
    //     console.log(error.message.errors.photo);
    //   }
    // },
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
    // setCorrectAnswer(e) {
    //   // console.log(this.answers);
    //   let updatedAnswers = this.answers.map(function(item) {
    //     // console.log(item);
    //     if (item.text === e.target.value) {
    //       item.correct = e.target.checked;
    //       return item;
    //     } else {
    //       // item.correct = false;
    //       return item;
    //     }
    //   });
    //   // console.log(updatedAnswers);
    //   this.answers = updatedAnswers;
    //   this.isCorrectAnswerSet = true;
    //   console.log(e.target.value);
    //   console.log(e.target.checked);
    // },
    resetData() {
      this.questionPhotoURl = "";
      this.questionWithPhoto = false;
      this.question = {};
      this.currentQuestion = "";
      this.question_title = "";
      this.typeOfQuestion = "";
      this.currentQuestion_id = "";
      this.editQuestion = false;
      this.editQuestionMode = false;
      this.keyword = "";
      this.showInputAnswer = false;
      this.keywordsArray = [];
    },
    subitQuestion() {
      console.log(this.keywordsArray);
      // if (this.isCorrectAnswerSet) {
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

      const questionWithKeywords = {
        type: "handwritingAnswer",
        question: {
          text: this.currentQuestion,
          img: this.questionPhotoURl,
          question_id: this.currentQuestion_id
        },
        keywordsArray: this.keywordsArray,
        level_id: this.currentLevel.levelId,
        test_id: this.currentLevel.testid
      };

      console.log(questionWithKeywords);
      this.addNew(questionWithKeywords);
      this.resetData();

      //   this.changeCurrentLevelStatus(false);
      // } else {
      //   alert("Выберите верный вариант ответа");
      // }
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
    }
    // addAnswer() {
    //   // console.log(this.currentAnswer);
    //   if (!this.currentAnswer && !this.answerPhotoURl) {
    //     alert("Добавьте текст или изображение");
    //   } else {
    //     let answer = {
    //       text: this.currentAnswer,
    //       correct: false,
    //       imgURL: this.answerPhotoURl,
    //       answer_id: this.answers.length + 1
    //     };
    //     this.answers.push(answer);
    //     this.currentAnswer = "";
    //     this.answerWithPhoto = false;
    //     this.answerPhotoURl = "";
    //     this.editAnswer = true;
    //   }
    // }
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
.addKeyword {
  margin-bottom: 30px;
}
.keywords__input {
  margin-bottom: 20px;
}
</style>