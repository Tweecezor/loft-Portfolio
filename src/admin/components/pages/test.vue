<template lang="pug">
  .container
    .wrapper-test
      //- pre {{tests}}
      //- pre.QUESTIONS {{questions}}
      //- pre {{groups}}
      //- pre {{currentLevelInTestGroup}}
      //- pre {{currentTestGroup}}
      //- div(@click="OpenNew") КЛИК СЮДА
      //- a(href="../drag.vue") GRAG
      //- .sidebar(v-if="!showAllTests")
        ul.sidebar-list
          li.sidebar-item(v-if="tests" v-for="item in tests")
            .test__header
              .test__name-wrap
                label.test__label Название теста
              .test__name-wrap
                input(type="text" v-model="item.name" disabled).test__name-input.test__input
            .test__levels
              .test__levels-wrap
                label.test__levels-label.test__label Количество уровней
              .test__levels-wrap 
                input(type="text" v-model="item.level" disabled).test__levels-input.test__input
            .test__group
              .test__group-wrap
                label.test__group-label.test__label Для группы
              .test__group-wrap
                input(type="text" v-model="item.group" disabled).test__group-input.test__input
            button(@click="openTest(item)").btn Открыть  
          hr
      CURRENT_LEVEL_IN_TEST_GROUP(:currentLevel="this.currentLevelInTestGroup" v-if="isCurrentLevelOpen")
      CURRENT_TEST_GROUP(@showAllQuestionsInGroup="showAllQuestionsInGroup" v-if="isTestOpen" :currentTestGroup="this.currentTestGroup" :levelsCount="+this.currentTestGroup.level" @addNewQuestion="addQuestion")
      ALL_QUESTIONS_IN_GROUP(v-if="showQuestions" :questions="filteredQuestions")
      .addedWrapper(v-if="showAllTests")
        ul.created_test-list
          li().created_test-item.test.test--new
            .test__header
              .test__name-wrap
                label.test__name-label.test__label Введите название теста
              .test__name-wrap
                input(type="text" v-model="obj.name").test__name-input
            .test__levels
              .test__levels-wrap
                label.test__levels-label.test__label Выберите количество уровней
              .test__levels-wrap 
                select(name="level" required v-model="obj.level").test__levels-select
                  option(value="1").test__levels-option 1
                  option(value="2").test__levels-option 2
                  option(value="3").test__levels-option 3
            .test__group
              .test__group-wrap
                label.test__group-label.test__label Выберите группу
              .test__group-wrap
                select(name="groups" required v-model="obj.group").test__group-select
                  option(v-for="group in groups" :value="group.groupName").test__group-option {{group.groupName}}
            button(@click="addNewTest").btn Создать


          li.created_test-item.test(v-if="tests" v-for="item in tests")
            //- pre {{item.name}}
            .test__header
              .test__name-wrap
                label.test__label Название теста
              .test__name-wrap
                input(type="text" v-model="item.name" disabled).test__name-input.test__input
            //- .created-test__name {{item.name}}
            .test__levels
              .test__levels-wrap
                label.test__levels-label.test__label Количество уровней
              .test__levels-wrap 
                input(type="text" v-model="item.level" disabled).test__levels-input.test__input
            .test__group
              .test__group-wrap
                label.test__group-label.test__label Для группы
              .test__group-wrap
                input(type="text" v-model="item.group" disabled).test__group-input.test__input
              //- .created-test__group {{item.group}}
            button(@click="openTest(item)").btn Открыть
</template>

<script>
import { mapActions, mapState } from "vuex";
import CURRENT_TEST_GROUP from "../currentTestGroup";
import CURRENT_LEVEL_IN_TEST_GROUP from "../currentLevelInTestGroup";
import ALL_QUESTIONS_IN_GROUP from "../allQuestionsForTest";

export default {
  components: {
    CURRENT_TEST_GROUP,
    CURRENT_LEVEL_IN_TEST_GROUP,
    ALL_QUESTIONS_IN_GROUP
  },
  data() {
    return {
      showAllTests: true,
      currentLevelInTestGroup: {},
      currentTestGroup: {},
      filteredQuestions: [],
      obj: {
        level: "3",
        name: "Тут название теста",
        group: ""
      }
    };
  },
  methods: {
    showAllQuestionsInGroup(levelId, groupId) {
      if (this.questions.length) {
        console.log(levelId);
        console.log(groupId);
        // this.currecurrentLevelId = levelId;
        // this.currentGroupId = groupId;
        this.changeShowQuestionsStatus(true);
        this.changeCurrentTestStatus(false);
        let filtered = this.filterQuestion(this.questions, levelId, groupId);
        // console.log(filtered);

        // this.changeQuestionsId(filtered);
        this.filteredQuestions = filtered;
        console.log(this.filteredQuestions);
      }
    },
    // changeQuestionsId(questions) {
    //   for (var i = 0; i < questions.length; i++) {
    //     console.log(questions[i].question.question_id);
    //     questions[i].question.question_id = i + 1;
    //   }
    //   console.log(questions);
    // },
    filterQuestion(questions, levelId, groupId) {
      let filteredQuestions = questions.filter(function(question) {
        console.log(question);
        if (question.level_id === levelId && question.test_id === groupId) {
          console.log("correct == equal ");
          console.log(question);
          return question;
        } else {
          console.log("incorrect == equal");
          console.log(question);
        }
      });
      return filteredQuestions;
    },
    OpenNew() {
      this.$router.push("/drag");
    },
    ...mapActions("tests", ["addNew"]),
    ...mapActions("helped", [
      "changeCurrentTestStatus",
      "changeCurrentLevelStatus",
      "changeShowQuestionsStatus"
    ]),
    addNewTest() {
      const newTetsGroup = {
        id: this.tests.length + 1,
        ...this.obj
      };
      this.addNew(newTetsGroup);
    },
    CLICK() {
      console.log(this.tests);
    },
    openTest(item) {
      this.currentTestGroup = item;
      console.log(this.currentTestGroup);
      this.changeShowQuestionsStatus(false);
      this.changeCurrentTestStatus(true);
      this.showAllTests = false;
    },
    addQuestion(obj) {
      this.currentLevelInTestGroup = {
        ...obj
      };
      console.log("my event !!");
      // this.isTestOpen = !this.isTestOpen;
      this.changeCurrentTestStatus(!this.isTestOpen);
      this.changeCurrentLevelStatus(!this.isCurrentLevelOpen);
      // this.isCurrentLevelOpen = !this.isCurrentLevelOpen;
    }
  },
  mounted() {
    this.changeCurrentLevelStatus(false);
  },
  computed: {
    ...mapState("groups", {
      groups: state => state.groups
    }),
    ...mapState("tests", {
      tests: state => state.tests
    }),
    ...mapState("helped", {
      isCurrentLevelOpen: state => state.isCurrentLevelOpen
    }),
    ...mapState("helped", {
      isTestOpen: state => state.isTestOpen
    }),
    ...mapState("helped", {
      showQuestions: state => state.showQuestions
    }),
    ...mapState("questions", {
      questions: state => state.questions
    })
  }
};
</script>

<style lang="postcss" scoped>
.wrapper-test {
  display: flex;
  /* flex-direction: column; */
  /* flex-wrap: wrap; */
  justify-content: space-between;
}
.created_test-list {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.created_test-item {
  width: calc((100%-4%) / 3);
  margin-right: 2%;
  padding: 50px 20px;
  background-color: white;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 2%;
  &:nth-child(3n) {
    margin-right: 0px;
  }
}
input {
  margin-bottom: 10px;
}
select {
  margin-bottom: 10px;
}
.test__send {
  padding: 20px;
  background: red;
  color: white;
  border-radius: 10px;
  &:hover {
    background: green;
  }
  .click {
    color: red;
  }
}
.created-test {
  &__name,
  &__level,
  &__group {
    border: 1px solid black;
    border-radius: 10px;
    padding-left: 10px;
  }
}
.addedWrapper {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.test__label {
  color: #414c63;
  font-size: 1rem;
  line-height: 1.875rem;
  opacity: 0.5;
}
.test__name-input,
.test__input {
  width: 100%;
  background-color: transparent;
  font-weight: 700;
  border: none;
  border-bottom: 2px solid #414c63;
  padding: 0 0.3125rem 0.625rem;
  margin-bottom: 1.875rem;
}
.test--new {
  background: #ccc;
}
/* .created-test {
  padding: 20px;
  background: white;
  color: red;
  margin-right: 10px;
} */
.sidebar {
  width: 32%;
  height: 300px;
  /* background: white; */
}
.sidebar-list {
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.sidebar-item {
  width: 100%;
  background: #ccc;
  padding: 10px;
  margin-bottom: 10px;
}
.test {
  border: 1px solid #efefef;
  border-radious: 2px;
  border-radius: 6px;
  box-shadow: 0.25rem 0.1875rem 1.25rem rgba(0, 0, 0, 0.14);
}
</style>