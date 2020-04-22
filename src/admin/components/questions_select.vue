<template lang="pug">
  div.select
    select(@change="setGroup").selectGroup
      option(value="") Выберите группу
      option(v-if="groups" v-for="(group,position) in groups" ref="selectedGroup"  :value="group.groupName").test__students-group {{group.groupName}}
    //- pre {{ filteredTests}}
    select( @change="setTest" v-if="filteredTests.length").selectTest
      option(value="") Выберите тест
      option( v-for="test in filteredTests" ref="selectedTest" :data-levels="test.level" :value="test.id").test__students-group   {{test.name}}
    select( v-else).selectTest
      option(value="") Тесты еще не созданы
    select(name="level" required v-model="level").test__levels
      option(value="") Выберите уровень
      option(v-for="level in levels" :value="level").test__level {{level}}
      //- option(value="1").test__level 1
      //- option(value="2").test__level 2
      //- option(value="3").test__level 3
    button.btn(@click="addQuestionTo(question)") Загрузить
  
</template>


<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  props: {
    question: Object
  },
  data() {
    return {
      level: "",
      filteredTests: [],
      selectedGroupName: "",
      test_id: "",
      filteredQuestions: "",
      levels: ""
    };
  },
  methods: {
    fn() {
      console.log("asfew");
    },
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
      // console.log(filter);
      this.filteredQuestions = filter;
    },
    ...mapActions("questions", ["addNew"]),
    setTest(e) {
      // console.log(typeof e.target.value);
      // console.log(this.$refs.selectedTest[0].dataset.levels);
      // this.levels = +this.$refs.selectedTest[0].dataset.levels;
      this.test_id = e.target.value;

      let level = this.filteredTests.filter(item => item.id === +this.test_id);
      // console.log(level);
      this.levels = +level[0].level;
      console.log(this.levels);
    },
    filterTestByGroup(groupName) {
      this.filteredTests = this.tests.filter(item => {
        // console.log(item);
        // console.log(groupName);
        return item.group === groupName;
      });
      // console.log(this.filteredTests);
    },
    setGroup(e) {
      // console.log(e.target.value);
      this.selectedGroupName = e.target.value;
      this.filterTestByGroup(this.selectedGroupName);
    },
    addQuestionTo(questionOld) {
      // console.log(this.test_id);
      console.log(questionOld);
      let filtered = this.filterQuestion(
        this.questions,
        +this.level,
        +this.test_id
      );
      // console.log(filtered);
      // console.log(this.$refs.selectedGroup);
      // console.log(questionOld.question);
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
          return question;
        } else {
        }
      });
      return filteredQuestions;
    }
  },
  computed: {
    ...mapState("questions", {
      questions: state => state.questions
    }),
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
.select {
  display: flex;
  flex-direction: column;
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