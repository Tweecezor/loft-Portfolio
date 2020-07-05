export default [
  {
    path: "/",
    component: () => import("../components/pages/about")
  },
  {
    path: "/works",
    component: () => import("../components/pages/works")
  },
  {
    path: "/reviews",
    component: () => import("../components/pages/reviews")
  },
  {
    path: "/login",
    component: () => import("./../components/pages/login.vue"),
    meta: {
      public: true
    }
  }
];
