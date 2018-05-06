import * as types from './mutation-types.js'
import VueRouter from '../router/index.js'

export default {
  //login
  [types.LOGIN](state, data) {
    state.user = data
  },
  //toast
  [types.SHOW_SUCCESS](state, data) {
    state.toast.isShow = true;
    state.toast.type = 'success';
    state.toast.text = data.text;
  },
  [types.SHOW_ERROR](state, data) {
    state.toast.isShow = true;
    state.toast.type = 'error';
    state.toast.text = data.text;
    state.toast.detail = data.detail;
  },
  [types.SHOW_LOADING](state, data) {
    state.toast.isShow = true;
    state.toast.type = 'loading';
    state.toast.text = data.text;
  },
  [types.HIDE](state, data) {
    state.toast.isShow = false;
  },
  //fileList
  [types.INIT_FILELIST](state, data) {
    state.fileList.pageName = data.pageName
    state.fileList.type = data.type
    state.fileList.data = data.data
  },
  [types.SET_FILELIST_DATA](state, data) {
    state.fileList.data = data
  },
  [types.UPDATA_FILE_TITLE](state,data) {
    var files = state.fileList.data
    files[data.index].file_title = data.fileTitle
    state.fileList.data = files
  }
}
