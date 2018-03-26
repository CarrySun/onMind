/**
 * @file 水印识别入口js
 * @author CarrySun
 */
import Vue from 'vue'
import partner from './partner.vue'
import store from './partnerStore'
// import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  // router,
  template: '<partner/>',
  components: {partner}
})
