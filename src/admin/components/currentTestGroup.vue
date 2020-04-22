<template lang="pug">
  .currentTest
    //- pre {{currentTestGroup.level}}
    ul.currentTest__list
      li.currentTest__item.level(v-for="(item,levelId) in +currentTestGroup.level")
        .level__title-wrap
          h2.level__title Уровень {{levelId+1}}
        .level__actions
          button(@click="addQuestions(levelId+1)").level__actions_btn Добавить вопросы
          button(@click="downloadQuestions").level__actions_btn Загрузить вопрос
          button(@click="showQuestions(levelId+1)").level__actions_btn Показать вопросы
</template> 
<script>
import { mapActions, mapState } from "vuex";
export default {
  props: {
    currentTestGroup: Object,
    levelsCount: Number
  },
  data() {
    return {
      levelId: "",
      filteredQuestions: []

      // isTestOpen:false
    };
  },
  methods: {
    ...mapActions("helped", ["changeShowQuestionsStatus"]),
    filterQuestion(questions, levelId, groupId) {
      let filteredQuestions = questions.filter(function(question) {
        // console.log(question);
        if (question.level_id === levelId && question.test_id === groupId) {
          return question;
          console.log("yes");
        } else {
          console.log("nOOO");
        }
      });
      return filteredQuestions;
    },
    addQuestions(levelId) {
      this.levelId = levelId;
      const obj = {
        levelId,
        testid: this.currentTestGroup.id
      };
      this.$emit("addNewQuestion", obj);
    },
    downloadQuestions() {
      console.log(this.filteredQuestions);
      alert(
        "Загрузить вопросы из банка вопросов. Вывести страницу со списокм всех вопросов и поиском"
      );
    },
    showQuestions(levelId) {
      this.$emit("showAllQuestionsInGroup", levelId, this.currentTestGroup.id);
    }
  },
  computed: {
    ...mapState("questions", {
      questions: state => state.questions
    }),
    ...mapState("helped", {
      showQuestionsStatus: state => state.showQuestions
    })
  }
};
</script>

<style lang="postcss" scoped>
.currentTest {
  width: 100%;
  padding: 40px;
  margin-bottom: 20px;
  background: white;
  box-shadow: 0.25rem 0.1875rem 1.25rem rgba(0, 0, 0, 0.14);
  /* display: flex; */
}
.currentTest__list {
  display: flex;
}
.level {
  /* border: 1px solid black; */
  display: flex;
  flex-direction: column;
  padding: 5px;
  width: calc((100%-4%) / 3);
  background: white;

  position: relative;
  -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3),
    0 0 40px rgba(0, 0, 0, 0.1) inset;
  -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3),
    0 0 40px rgba(0, 0, 0, 0.1) inset;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  &:after,
  &:before {
    content: "";
    position: absolute;
    z-index: -1;
    -webkit-box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
    -moz-box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
    top: 10px;
    bottom: 10px;
    left: 0;
    right: 0;
    -moz-border-radius: 100px / 10px;
    border-radius: 100px / 10px;
  }
  &:after {
    right: 10px;
    left: auto;
    -webkit-transform: skew(8deg) rotate(3deg);
    -moz-transform: skew(8deg) rotate(3deg);
    -ms-transform: skew(8deg) rotate(3deg);
    -o-transform: skew(8deg) rotate(3deg);
    transform: skew(8deg) rotate(3deg);
  }
  margin-right: 2%;
  :&nth-child(3) {
    margin-right: 0px;
  }
}
.level__title {
  /* adding-bottom: 1.25rem; */
  /* border-bottom: 1px solid #414c63; */
  margin-bottom: 10px;
  font-size: 1.125rem;
  font-weight: 700;
}
.level__actions_btn {
  background: transparent;
  border-bottom: 1px solid #414c63;
  width: 71%;
  margin-bottom: 10px;
}
.level__actions {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
/* .currentTest__list {
  display: flex;
  justify-content: space-between;
  justify-content: center;
}

.currentTest__item {
  height: 200px;
  border-radius: 10px;
  background-color: white;
  border: 1px solid black;
  margin-right: 5%;
  width: calc(90% / 3);
}
.currentTest__button {
  padding: 5px;
  background: red;
  font-weight: bold;
  border-radius: 10px;
  margin-right: 10px;
}
.button-wrapper {
  display: flex;
  flex-direction: column;
  height: 85%;
  justify-content: space-between;
} */
</style>