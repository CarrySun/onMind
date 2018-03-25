/**
 * @file toast组件的module
 * @author ym3
 */
/**
 * [createModule 创建module方法]
 * @param  {[obj]} opt [初始化参数]
 * @return {[obj]}     [返回module]
 */
function createModule (opt) {
  const state = function () {
    return {
      type: '',
      isShow: '',
      text: '',
      detail: ''
    }
  }
  const toastModule = {
    namespaced: true,
    state: state,
    mutations: {
      SHOW_SUCCESS: (state, data) => {
        state.isShow = true
        state.type = 'success'
        state.text = data.text
      },
      SHOW_ERROR: (state, data) => {
        state.isShow = true
        state.type = 'error'
        state.text = data.text
        state.detail = data.detail
      },
      SHOW_LOADING: (state, data) => {
        state.isShow = true
        state.type = 'loading'
        state.text = data.text
      },
      HIDE: (state, data) => {
        state.isShow = false
      }
    },
    actions: {
      showSuccess: ({ dispatch, commit }, data) => {
        commit('SHOW_SUCCESS', data)
        setTimeout(function () {
          commit('HIDE')
        }, 1000)
      },
      showError: ({ commit }, data) => {
        commit('SHOW_ERROR', data)
      },
      showLoading: ({ commit }, data) => {
        commit('SHOW_LOADING', data)
      },
      hide: ({ commit }, data) => {
        commit('HIDE', data)
      }
    },
    getters: {

    }
  }
  return toastModule
}

export default createModule
