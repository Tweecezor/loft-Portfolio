<template lang="pug">
  .container
    .wrapper.questions
      ul.questions__list
        li.questions__item(v-for="question in uniqueQuestions")
          div Тип вопроса
            input(type="text" v-model="question.type")
          //- pre {{question}}
          div Текст вопроса
            input(type="text" v-model="question.question.text")
          hr
          .answer__list-wrapper(v-if="question.type!='handwritingAnswer'")
            ul().answers__list Список ответов
              li.answers__item(v-for="answer in question.answers")
                //- pre {{answer}}
                input(type="text" v-model="answer.text" disabled)
                input(v-if="question.type=='multipleAnswer'" type="checkbox" v-model="answer.correct" disabled)
                input(v-if="question.type=='oneAnswer'" type="radio" :name="answer.answer_id" :checked="answer.correct" v-model="answer.correct" )
          .answer__list-wrapper(v-else)
            ul.answers__list Список ключевых слов
              li.answers__item(v-for="keyword in question.keywordsArray")
                pre {{keyword}}
          QUESTION_SELECT(:question="question")
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import QUESTION_SELECT from "../questions_select";
export default {
  components: {
    QUESTION_SELECT
  },
  props: {},
  data() {
    return {
      level: "",
      filteredTests: [],
      selectedGroupName: "",
      test_id: "",
      filteredQuestions: ""
    };
  },
  methods: {
    filterQ() {
      let filter = [];
      let arr = this.questions;
      console.log(arr.length);
      var uniq;
      for (var i = 0; i < arr.length; i++) {
        uniq = true;
        for (var j = i + 1; j < arr.length; j++) {
          if (
            arr[i].question.text === arr[j].question.text &&
            arr[i].type === arr[j].type
          ) {
            uniq = false;
          }
        }
        if (uniq) {
          filter.push(arr[i]);
        }
      }
      console.log(filter);
      this.filteredQuestions = filter;
    },
    ...mapActions("questions", ["addNew"]),
    setTest(e) {
      console.log(e.target.value);
      this.test_id = e.target.value;
    },
    filterTestByGroup(groupName) {
      this.filteredTests = this.tests.filter(item => {
        console.log(item);
        console.log(groupName);
        return item.group === groupName;
      });
      console.log(this.filteredTests);
    },
    setGroup(e) {
      console.log(e.target.value);
      this.selectedGroupName = e.target.value;
      this.filterTestByGroup(this.selectedGroupName);
    },
    addQuestionTo(questionOld) {
      // let test_id;
      // for (var i = 0; i < this.groups.length; i++) {
      //   if (this.groups[i].groupName === this.selectedGroupName) {
      //     // console.log("correct");
      //     // console.log(this.groups[i].group_id);
      //     test_id = this.groups[i].group_id;
      //   }
      // }
      console.log(this.test_id);
      console.log(questionOld);
      let filtered = this.filterQuestion(
        this.questions,
        +this.level,
        +this.test_id
      );
      console.log(filtered);
      // console.log(this.$refs.selectedGroup);
      console.log(questionOld.question);
      let newQuestion = {
        ...questionOld,
        question: {
          text: questionOld.question.text,
          img: questionOld.question.img,
          question_id: filtered.length + 1
        },
        level_id: +this.level,
        test_id: +this.test_id
      };

      console.log(newQuestion);
      this.addNew(newQuestion);
    },
    filterQuestion(questions, levelId, groupId) {
      let filteredQuestions = questions.filter(function(question) {
        console.log(question);
        if (question.level_id === levelId && question.test_id === groupId) {
          // console.log("correct == equal ");
          // console.log(question);
          return question;
        } else {
          // console.log("incorrect == equal");
          // console.log(question);
        }
      });
      return filteredQuestions;
    }
  },
  computed: {
    ...mapState("questions", {
      questions: state => state.questions
    }),
    // ...mapGetters("tests", ["getTests"]),
    ...mapState("tests", {
      tests: state => state.tests
    }),
    ...mapState("groups", {
      groups: state => state.groups
    }),
    ...mapGetters("questions", ["uniqueQuestions"])
  }
};
</script>
<style lang="postcss" scoped>
.answer__list-wrapper {
  height: 100px;
  overflow: auto;
}
.questions {
  display: flex;
  flex-wrap: wrap;
}
.questions__list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.questions__item {
  width: calc((100%-4%) / 3);
  margin-right: 2%;
  background: white;
  border: 1px solid black;
  margin-bottom: 10px;
  &:nth-child(3n) {
    margin-right: 0;
  }
  /* display: flex; */
}
</style>

// questions: {
      //   0: {
      //     type: "handwritingAnswer",
      //     question: {
      //       text: "fweq",
      //       img: "",
      //       question_id: 1
      //     },
      //     keywordsArray: ["efwq", "efwqgr", "wefqgr"],
      //     level_id: 1,
      //     test_id: 1
      //   },
      //   1: {
      //     type: "oneAnswer",
      //     question: {
      //       text: "fewqgr",
      //       img: "",
      //       question_id: 2
      //     },
      //     answers: [
      //       {
      //         text: "fewqgr",
      //         correct: false,
      //         imgURL: "",
      //         answer_id: 1
      //       },
      //       {
      //         text: "qfwegr",
      //         correct: true,
      //         imgURL: "",
      //         answer_id: 2
      //       },
      //       {
      //         text: "qwrge",
      //         correct: false,
      //         imgURL: "",
      //         answer_id: 3
      //       }
      //     ],
      //     level_id: 1,
      //     test_id: 1
      //   },
      //   2: {
      //     type: "multipleAnswer",
      //     question: {
      //       text: "sadvfw",
      //       img: "",
      //       question_id: 3
      //     },
      //     answers: [
      //       {
      //         text: "asdvefw",
      //         correct: false,
      //         imgURL: "",
      //         answer_id: 1
      //       },
      //       {
      //         text: "we43",
      //         correct: true,
      //         imgURL: "",
      //         answer_id: 2
      //       },
      //       {
      //         text: "asdfwer",
      //         correct: true,
      //         imgURL: "",
      //         answer_id: 3
      //       }
      //     ],
      //     level_id: 1,
      //     test_id: 1
      //   }
      // }