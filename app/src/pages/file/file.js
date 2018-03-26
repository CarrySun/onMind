/**
 * @file 水印识别入口js
 * @author CarrySun
 */
import Vue from 'vue'
import file from './file.vue'
import store from './fileStore'
// import router from './router'

Vue.config.productionTip = false

new Vue({
  store,
  el: '#app',
  // router,
  template: '<file/>',
  components: {file}
})
