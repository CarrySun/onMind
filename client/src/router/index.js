import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/owner",
      name: "owner",
      component: resolve => require(["../components/common/Home.vue"], resolve),
      children: [
        {
          path: "/",
          name: "owner",
          component: resolve =>
            require(["../components/page/Owner.vue"], resolve),
          meta: { auth: true }
        },
        // {
        //   path: "/owner",
        //   name: "owner",
        //   component: resolve =>
        //     require(["../components/page/Owner.vue"], resolve),
        //   meta: { auth: true }
        // },
        {
          path: "/partner",
          name: "partner",
          component: resolve =>
            require(["../components/page/Partner.vue"], resolve),
          meta: { auth: true }
        },
        {
          path: "/friend",
          name: "friend",
          component: resolve =>
            require(["../components/page/Friend.vue"], resolve),
          meta: { auth: true }
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: resolve => require(["../components/page/Login.vue"], resolve),
      meta: { auth: true }
    },
    {
      path: "/file",
      name: "file",
      component: resolve =>
        require(["../components/page/File.vue"], resolve),
      meta: { auth: true }
    }
  ]
});
