export default {
  namespaced: true,
  state: {
    questions: [],
  },
  actions: {
    addNew(store, newQuestion) {
      // console.log(newQuestion);
      store.commit("ADD_NEW_QUESTIONS", newQuestion);
    },
    updateQuestion(store, updatedQuestion) {
      store.commit("UPDATE_QUESTION", updatedQuestion);
    },
    changeAnswerStatus(store, newCorrectAnswer) {
      console.log(newCorrectAnswer);
      store.commit("CHANGE_ANSWER_STATUS", newCorrectAnswer);
    },
    updateAnswer(store, updatedAnswer) {
      console.log(updatedAnswer);
      store.commit("UPDATE_ANSWER", updatedAnswer);
    },
    addNewAnswer(store, newAnswer) {
      console.log(newAnswer);
      store.commit("ADD_NEW_ANSWER", newAnswer);
    },
    changeKeywords(store, newKeywordsArray) {
      console.log(newKeywordsArray);
      store.commit("CHANGE_KEYWORDS");
    },
  },
  mutations: {
    CHANGE_KEYWORDS(state, newKeywordsArray) {
      state.questions.map((item) => {
        console.log(item);
      });
    },
    ADD_NEW_ANSWER(state, newAnswer) {
      console.log(newAnswer);
      state.questions.map((item) => {
        // console.log(item);
        if (
          item.test_id === newAnswer.test_id &&
          item.level_id === newAnswer.level_id &&
          item.question.question_id === newAnswer.question_id
        ) {
          let answers = item.answers;
          console.log(answers);
          answers.push(newAnswer.answer);
        }
        return item;
      });
      console.log(state.questions);
    },
    ADD_NEW_QUESTIONS(state, newQuestion) {
      console.log(newQuestion);
      state.questions.push(newQuestion);
      console.log(state.questions);
    },
    UPDATE_ANSWER(state, updatedAnswer) {
      state.questions.map((item) => {
        console.log(item);
        if (
          item.test_id === updatedAnswer.test_id &&
          item.level_id === updatedAnswer.level_id &&
          item.question.question_id === updatedAnswer.question_id
        ) {
          let answers = item.answers;
          answers.map((item) => {
            console.log(item);
            if (item.answer_id === updatedAnswer.answer_id) {
              item.text = updatedAnswer.text;
              item.imgURL = updatedAnswer.imgURL;
              return item;
            } else {
              return item;
            }
          });
        }
        return item;
      });
    },
    CHANGE_ANSWER_STATUS(state, newCorrectAnswer) {
      state.questions.map((item) => {
        console.log(newCorrectAnswer);
        if (
          item.test_id === newCorrectAnswer.test_id &&
          item.level_id === newCorrectAnswer.level_id &&
          item.question.question_id === newCorrectAnswer.question_id
        ) {
          let answers = item.answers;
          answers.map((item) => {
            // console.log(item);
            // console.log(newCorrectAnswer);
            switch (newCorrectAnswer.type) {
              case "oneAnswer":
                if (item.text === newCorrectAnswer.text) {
                  item.correct = newCorrectAnswer.correct;
                  return item;
                } else {
                  item.correct = !newCorrectAnswer.correct;
                  return item;
                }
              case "multipleAnswer":
                console.log("multy");
                console.log(newCorrectAnswer.text);
                console.log(newCorrectAnswer.correct);
                if (item.text === newCorrectAnswer.text) {
                  item.correct = newCorrectAnswer.correct;
                  return item;
                } else {
                  return item;
                }
              default:
            }

            // метранидазол и пренизалон
          });
        }
        return item;
      });
      console.log(state.questions);
    },
    UPDATE_QUESTION(state, updatedQuestion) {
      console.log(updatedQuestion);
      // console.log(state.questions);
      // setTimeout(() => {
      state.questions = state.questions.map((item) => {
        // console.log(item);
        if (
          item.test_id === updatedQuestion.test_id &&
          item.level_id === updatedQuestion.level_id &&
          item.question.question_id == updatedQuestion.question_id
        ) {
          // console.log("Условия при обновлении выполнились");
          item.question.text = updatedQuestion.newQuestionTitle;
          // console.log("updated QU");
          // console.log(item);
        } else {
          // console.log(item.question);
          // console.log("Условия при обновлении НЕ выполнились");
          // console.log(item.test_id + "=== " + updatedQuestion.test_id);
          // console.log(item.level_id + "=== " + updatedQuestion.level_id);
          // console.log(
          //   item.question.question_id + "=== " + updatedQuestion.question_id
          // );
        }

        return item;
      });

      // }, 20000);
    },
  },
  getters: {
    question_id: (state) => (level_id, test_id) => {
      let ID = "empty";
      state.questions.forEach((item) => {
        // console.log(item);
        // console.log(level_id);
        // console.log(test_id);
        if (item.level_id === level_id && item.test_id === test_id) {
          // console.log("ID = " + item.question.question_id);
          ID = item.question.question_id;
        }
      });
      // console.log(ID);
      return ID;
    },
    uniqueQuestions: (state) => {
      let filter = [];
      let arr = state.questions;
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
      return filter;
    },
  },
};
