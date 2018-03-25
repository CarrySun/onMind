/**
 * @file Tabel组件的module
 * @author CarrySun
 */
/**
 * [createModule 创建module方法]
 * @param  {[obj]} opt [初始化参数]
 * @return {[obj]}     [返回module]
 */
function createModule (opt) {
  const state = function () {
    return {
      type: opt.type || 'my'
    }
  }
  const uploadModule = {
    namespaced: true,
    state: state,
    mutations: {
      CHANGE_DATA: (state, data) => state.data = data
    },
    actions: {
      changeData: ({ commit }, data) => {
        commit('CHANGE_DATA', data)
      }
    },
    getters: {
    }
  }
  return uploadModule
}

export default createModule
