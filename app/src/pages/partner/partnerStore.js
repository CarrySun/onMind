/**
 * @file 首页store
 * @author CarrySun
 */
import Vue from 'vue'
import Vuex from 'vuex'
import createToastModule from '@/components/ToastModule';
Vue.use(Vuex)

const state = {
  topBar: {
    type: 'home'
  },
  leftMenu: {
    type: 'partner'
  },
  // FileList组件参数
  FileList: {
    pageName: '与我协作',
    type: 'partner',
    data: []
  }
}

const modules = {
  toastModule: createToastModule()
}

const mutations = {
  SET_DATA(state, data) {
    state.FileList.data = data
  }
}

const getters = {
  FileListData: state => state.FileList.data,
}

const actions = {
  getData({dispatch, commit}) {
    dispatch('toastModule/showLoading', {
      text: '数据加载中'
    })
    setTimeout(() => {
      var data = [{
        'file_title': 'xmind',
        'file_owner': 'CarrySun',
        'updateTime': Date.now()
      },
      {
        'file_title': 'xmind',
        'file_owner': 'CarrySun',
        'updateTime': Date.now()
      }]
      commit('SET_DATA', data)
      dispatch('toastModule/hide')
    }, 100);
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules
})
