export default [
  {
    path: "/drag",
    component: () => import("../components/drag"),
  },
  {
    path: "/",
    component: () => import("../components/pages/about"),
  },
  {
    path: "/works",
    component: () => import("../components/pages/works"),
  },
  {
    path: "/reviews",
    component: () => import("../components/pages/reviews"),
  },
  {
    path: "/login",
    component: () => import("./../components/pages/login.vue"),
    meta: {
      public: true,
    },
  },
  {
    path: "/tests",
    component: () => import("./../components/pages/test.vue"),
  },
  {
    path: "/mySettings",
    component: () => import("./../components/mySettings"),
  },
  {
    path: "/adminSettings",
    component: () => import("./../components/pages/adminSettings.vue"),
  },
  {
    path: "/groups",
    component: () => import("./../components/settings_groups"),
  },
  {
    path: "/questions",
    component: () => import("./../components/pages/questions"),
  },
];
