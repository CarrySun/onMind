/**
 * @file 水印识别入口js
 * @author ym3
 */
import Vue from 'vue'
import owner from './owner.vue'
import store from './ownerStore'
// import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  // router,
  template: '<owner/>',
  components: {owner}
})
