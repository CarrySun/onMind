import Vue from "vue";
import VueSocketio from "vue-socket.io";
import socketio from "socket.io-client";
if (process.env.NODE_ENV === "development") {
  Vue.use(VueSocketio, socketio("http://localhost:3000/"), Store)
} else {
  Vue.use(VueSocketio, socketio("http://123.207.1.238:3000/"), Store)
}
import App from "./App";
import router from "./router";
import Store from "./store/index.js";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/icon/iconfont.css";

Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
  // console.log(localStorage.getItem('accessToken'))
  if (to.meta.auth) {
    if (to.name == "login") {
      if (localStorage.getItem("accessToken")) {
        next({ path: "/owner" });
      } else {
        next();
      }
    } else if (localStorage.getItem("accessToken")) {
      next();
    } else {
      next({ path: "/login", query: { Rurl: to.name } });
    }
  } else {
    next();
  }
});

// , Store);

const moment = require("moment");
require("moment/locale/zh-cn");
Vue.use(require("vue-moment"), {
  moment
});

new Vue({
  router,
  store: Store,
  render: h => h(App)
}).$mount("#app");
