<template lang="pug">
  section.questions
    //- pre {{questions}}
    ul.breadcrumbs_list
      li.breadcrumbs_item.breadcrumb(v-for="(item,id) in questions")
        .breadcrumb_item(:class="{}") {{id+1}}
    .questions__close(@click="closeSection") X
    ul.questions__list(v-if="questions.length")
      li.questions__item.question(v-for="item in questions")
        //- pre {{item.type}}
        QUESTION_ITEM(:item="item.question" :test_id="item.test_id" :level_id="item.level_id")
        div(v-if="item.type!=='handwritingAnswer'").answer__content
          .answers__title Просмотр ответов
          .answers__data
            .answers__data_img
              .current_level__files(:style="")
                .current_level__file-upload
                  label(for="photoFile").current_level__load-text
                    p Изображение для вопроса
                    .dropzone(id="drop1")
                    input(type="file" id="photoFile" @change="" accept="image/*").current_level__file-input
                    .current_level__file-btn.btn Загрузить
            .answers__data_content
              ul(v-for="answer in item.answers").answers__list
                li.answers__item.answer()
                  ANSWER_ITEM(:typeOfQuestion="item.type" :answerLength="item.answers.length" :question_id="item.question.question_id" :answer="answer" :test_id="item.test_id" :level_id="item.level_id")
              ADD_NEW_ANSWER(:answerLength="item.answers.length" :question_id="item.question.question_id" :test_id="item.test_id" :level_id="item.level_id")
        div(v-else)
          KEYWORDS_ANSWER(:keywords="item.keywordsArray" :typeOfQuestion="item.type")
          //- div.answers__title Ответы
          //-   ul(v-for="keyword in item.keywordsArray").answers__list
          //-     li.answers__item.answer()
          //-       pre {{keyword}}
    div(v-else).questions__empty Вопросы для этого уровня еще не созданы
    
</template>

<script>
import { mapActions, mapState } from "vuex";
import QUESTION_ITEM from "./question-item";
import ANSWER_ITEM from "./answer-item";
import ADD_NEW_ANSWER from "./answerAddNew";
import KEYWORDS_ANSWER from "./keywordsAnswer";
export default {
  components: {
    QUESTION_ITEM,
    ANSWER_ITEM,
    ADD_NEW_ANSWER,
    KEYWORDS_ANSWER
  },
  props: {
    questions: Array
  },
  data() {
    return {
      showQImg: false,
      showAImg: false,
      isTestOpen: false,
      currentQuestionID: 1
    };
  },
  methods: {
    ...mapActions("helped", [
      "changeCurrentTestStatus",
      "changeCurrentLevelStatus",
      "changeShowQuestionsStatus"
    ]),

    // showQuestionImage() {
    //   // console.log(this.showingImg);
    //   this.showQImg = !this.showQImg;
    // },
    // showAnswerImage() {
    //   this.showAImg = !this.showAImg;
    // },
    closeSection() {
      this.changeShowQuestionsStatus(false);
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
.answers__data {
  display: flex;
}
.answers__data_img {
  width: 40%;
}
.answers__data_content {
  width: 60%;
}
.answer__content {
  padding: 10px;
}
.breadcrumbs_list {
  display: flex;
}
.breadcrumb {
  width: 20px;
  line-height: 20px;
  background: #fff;
  border: 1px solid #414c63;
  border-radius: 2px;
  text-align: center;
  margin-right: 5px;
  color: #414c63;
  &:hover {
    border: 1px solid orange;
    cursor: pointer;
    color: orange;
  }
}
.questions {
  position: relative;
  width: 100%;
  /* padding: 40px; */
  margin-bottom: 20px;
  background: transparent;
  display: flex;
  flex-direction: column;
  /* display: flex; */
}
.question {
  width: 100%;
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
.answer_img {
  width: 100%;
  height: 200px;
}
.answer_avatar {
  /* width: 100%; */
  height: 200px;
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
.question {
  margin-bottom: 10px;
  width: 100%;
  padding: 10px;
}

//------
.answers__title {
  padding-bottom: 1.25rem;
  border-bottom: 1px solid #414c63;
  margin-bottom: 1.875rem;
  font-size: 1.125rem;
  font-weight: 700;
}

.current_level__files {
  width: 90%;
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