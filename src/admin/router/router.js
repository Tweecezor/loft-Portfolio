import Vue from "vue";
import VueRouter from "vue-router";
import axios from "axios";
import store from "@/store";
import routes from "@/router/routes";

Vue.use(VueRouter);

// import about from './components/pages/about'
// import works from './components/pages/works'
// import reviews from './components/pages/reviews'
// import login from './components/pages/login'

const baseURL = "https://webdev-api.loftschool.com/";

const guard = axios.create({
  baseURL,
});

const router = new VueRouter({ routes });

// router.beforeEach(async (to, from, next) => {
//   const isPublicRoute = to.matched.some((record) => record.meta.public);
//   const isUserLogged = store.getters["user/userIsLogged"];

//   if (isPublicRoute === false && isUserLogged === false) {
//     const token = localStorage.getItem("token");
//     guard.defaults.headers["Authorization"] = `Bearer ${token}`;

//     try {
//       const response = await guard.get("/user");
//       store.commit("user/SET_USER", response.data.user);
//       next();
//     } catch (error) {
//       router.replace("/login");
//       localStorage.removeItem("token");
//     }
//   } else {
//     next();
//   }
//   // const isUserLogout = store.getters['user/userIsLogout'];
//   // if(isUserLogout){
//   //   router.replace('/login');
//   // }
// });

export default router;
