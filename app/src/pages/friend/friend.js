/**
 * @file 水印识别入口js
 * @author ym3
 */
import Vue from 'vue'
import friend from './friend.vue'
import store from './friendStore'
// import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  // router,
  template: '<friend/>',
  components: {friend}
})
