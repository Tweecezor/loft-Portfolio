import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import skills from "./modules/skills";
import categories from "./modules/categories";
import user from "./modules/user";
import tooltips from "./modules/tooltips";
import works from "./modules/works";
import reviews from "./modules/reviews";
import tests from "./modules/tests";
import questions from "./modules/questions";
import helped from "./modules/helped";
import groups from "./modules/groups";

export default new Vuex.Store({
  modules: {
    skills,
    categories,
    user,
    tooltips,
    works,
    reviews,
    tests,
    questions,
    helped,
    groups,
  },
});
