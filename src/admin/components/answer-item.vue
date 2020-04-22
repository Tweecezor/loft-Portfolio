<template lang="pug">
  .answers__wrapper
    //- pre {{typeOfQuestion}}
    //- pre {{currentAnswer}}
    //- pre {{prevCorrectAnswer}}
    //- pre {{question_id}}
    //- pre {{newImg}}
    //- pre {{showAImg}}
    //- pre {{answer}}
    //- .answers__image
    //-   .current_level__files(:style="{'background-image':`url(${this.questionPhotoURl})`}")
    //-     .current_level__file-upload
    //-       label(for="photoFile").current_level__load-text
    //-         p Изображение для Ответа
    //-         .dropzone(id="drop1")
    //-         input(type="file" id="photoFile" @change="loadPhoto" accept="image/*").current_level__file-input
    //-         .current_level__file-btn.btn Загрузить
    .answers__data(v-if="typeOfQuestion==='oneAnswer' || typeOfQuestion==='multipleAnswer'")
      .answers__data_label-wrap
        label.answers__data_label Текст ответа
      .answers__data_content
        .answers__data_text-wrap
          input(type="text" v-model="currentAnswer.text" :disabled="!editMode").answers__data_text
        .answers__data_correct-wrap(v-if="typeOfQuestion === 'oneAnswer'")
          input( type="radio" :name="question_id" v-bind:value="currentAnswer.text" :disabled="!editMode" :checked="answer.correct"  @change="setCorrectAnswer").answers__data_status
        .answers__data_correct-wrap(v-if="typeOfQuestion === 'multipleAnswer'")
          input( type="checkbox" :name="question_id" v-bind:value="currentAnswer.text" :disabled="!editMode" :checked="answer.correct"  @change="setCorrectAnswer").answers__data_status
        .answers__actions(v-if="!editMode")
            .answers__actions_correct(@click="editMode = true") 
            .answers__actions_trash(@click="deleteQuestion") 
        .answers__actions(v-else)
          .answers__actions_update(@click="updateCurrentAnswer") 
          .answers__actions_cancel(@click="cancelUpdate") 
      div(v-if="currentAnswer.imgURL && !newImg").answer__image_actions
        button(@click.prevent="showAnswerImage" ).btn.answer__image_show-btn Показать изображение ответа
        div(v-if="currentAnswer.imgURL && showAImg")
          input( id='answer_img' type="file" accept="image/*" @change="loadImg").answer_img.answer__image_input 
          label(for="answer_img" v-if="editMode") Заменить изображение
          div.answer_avatar(:style="{'background-image':`url(${currentAnswer.imgURL})`}")
        button(@click="deleteImg" v-if='editMode').answer__image_delete-btn.btn Удалить изображение
      div(v-if="!currentAnswer.imgURL && editMode")
        input( id='answer_img' type="file" accept="image/*" @change="loadImg($event,true)").answer_img.answer__image_input 
        label(for="answer_img" v-if="editMode") Добавить изображение
      div.answer_avatar(v-if="currentAnswer.imgURL && newImg" :style="{'background-image':`url(${currentAnswer.imgURL})`}")
      hr

      

</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  props: {
    answer: Object,
    test_id: Number,
    level_id: Number,
    question_id: Number,
    answerLength: Number,
    typeOfQuestion: String
  },
  data() {
    return {
      editMode: false,
      newAnswer: "",
      newAnswerImgURL: "",
      showQImg: false,
      currentAnswer: { ...this.answer },
      showAImg: false,
      prevCorrectAnswer: {
        correct: this.answer.correct,
        text: this.answer.text
      },
      newImg: false
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
      this.addNewAnswer(newAnswer);
    },
    loadImg(e, isNewImg = false) {
      // console.log(isNewImg);
      this.newImg = isNewImg;
      const file = e.target.files[0];
      console.log(file);
      const reader = new FileReader();
      try {
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.currentAnswer.imgURL = reader.result;
        };
      } catch (error) {
        alert(error.message);
        console.log(error.message.errors.photo);
        console.log(this.currentAnswer.imgURL);
      }
    },
    deleteImg() {
      this.currentAnswer.imgURL = "";
    },
    deleteQuestion() {},
    updateCurrentAnswer() {
      this.updateAnswer({
        text: this.currentAnswer.text,
        imgURL: this.currentAnswer.imgURL,
        answer_id: this.currentAnswer.answer_id,
        level_id: this.level_id,
        test_id: this.test_id,
        question_id: this.question_id,
        imgURL: this.currentAnswer.imgURL
      });
      this.editMode = !this.editMode;
      this.newImg = false;
      this.showAImg = false;
    },
    cancelUpdate() {
      // this.currentAnswer = { ...this.answer };
      // this.answer = this.currentAnswer;
      this.changeAnswerStatus({
        text: this.prevCorrectAnswer.text,
        correct: this.prevCorrectAnswer.correct,
        test_id: this.test_id,
        level_id: this.level_id,
        question_id: this.question_id
      });
      this.currentAnswer = { ...this.answer };
      this.editMode = !this.editMode;
    },
    showAnswerImage() {
      this.showAImg = !this.showAImg;
    },
    setCorrectAnswer(e) {
      // console.log(cancel);
      console.log(e.target.checked);
      console.log(e.target.value);
      this.changeAnswerStatus({
        text: e.target.value,
        correct: e.target.checked,
        test_id: this.test_id,
        level_id: this.level_id,
        question_id: this.question_id,
        type: this.typeOfQuestion
      });
    }
  }
};
</script>
<style lang="postcss" scoped>
/* .answers__wrapper {
  display: flex;
}
.answers__image {
  width: 40%;
}
.answers__data {
  width: 60%;
} */

.answers__actions {
  display: flex;
}
.answer_img {
  /* width: 100%;
  height: 200px; */
  /* display: none; */
}
.answer_avatar {
  width: 200px;
  height: 200px;
  background-size: cover;
}
.answer__image_show-btn {
  margin-bottom: 10px;
}
.answer__image_input {
  display: none;
}
//--------

.answers__data_content {
  display: flex;
}
.answers__data_label {
  display: block;
  opacity: 0.5;
  color: #414c63;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.875rem;
}
.answers__data_text-wrap {
  width: 90%;
}
.answers__data_correct-wrap {
  heigth: 100%;
}
.answers__data_text {
  width: 100%;
  background-color: transparent;
  font-weight: 700;
  border: none;
  border-bottom: 2px solid #414c63;
  padding: 0 0.3125rem 0.625rem;
}
.answers__actions_correct {
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
.answers__actions_trash {
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
.answers__actions_update {
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
.answers__actions_cancel {
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
</style>