/**
 * @file 首页store
 * @author ym3
 */
import Vue from 'vue'
import Vuex from 'vuex'
import createTabelModule from '@/components/TabelModule'
Vue.use(Vuex)

const state = {
  topBar: {
    type: 'home'
  },
  leftMenu: {
    type: 'partner'
  },
  // AppScenarios组件参数
  Tabel: {
    data: []
  }
}

const modules = {
  tabelModule: createTabelModule({
    type: 'my'
  })
}

const mutations = {
  SET_DATA (state, res) {
    state.Tabel.data = res.data.data
  }
}

const getters = {
  TabelData: state => state.Recognition.data
}

const actions = {
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules
})
