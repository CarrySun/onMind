import * as types from "./mutation-types.js";
import VueRouter from "../router/index.js";

export default {
  //login
  [types.LOGIN](state, data) {
    state.user = data;
  },
  //toast
  [types.SHOW_SUCCESS](state, data) {
    state.toast.isShow = true;
    state.toast.type = "success";
    state.toast.text = data.text;
  },
  [types.SHOW_ERROR](state, data) {
    state.toast.isShow = true;
    state.toast.type = "error";
    state.toast.text = data.text;
    state.toast.detail = data.detail;
  },
  [types.SHOW_LOADING](state, data) {
    state.toast.isShow = true;
    state.toast.type = "loading";
    state.toast.text = data.text;
  },
  [types.HIDE](state, data) {
    state.toast.isShow = false;
  },
  //fileList
  [types.INIT_FILELIST](state, data) {
    state.fileList.pageName = data.pageName;
    state.fileList.type = data.type;
    state.fileList.data = data.data;
  },
  [types.SET_FILELIST_DATA](state, data) {
    state.fileList.data = data;
  },
  [types.UPDATA_FILE_TITLE](state, data) {
    var files = state.fileList.data;
    files[data.index].file_title = data.fileTitle;
    state.fileList.data = files;
  },
  //notice
  [types.SET_NOTICE](state, data) {
    state.notice = data.concat();
  },
  [types.UPDATE_NOTICE](state, data) {
    var newNotice = state.notice.concat();
    newNotice.splice(data.index, 1, data.notice);
    state.notice = newNotice.concat();
  },
  [types.ADD_NOTICE](state, data) {
    state.notice.push(data)
  },
  //friend
  [types.SET_FRIEND](state, data) {
    state.friend = data.concat();
  },
  [types.ADD_FRIEND](state, data) {
    var user = JSON.parse(localStorage.getItem("user"));
    var friend;
    if (data) {
      if (data.ask_id._id == user._id) {
        friend = {
          _id: data._id,
          user_id: data.answer_id._id,
          user_name: data.answer_id.user_name,
          user_email: data.answer_id.user_email
        };
      } else if (data.answer_id._id == user._id) {
        friend = {
          _id: data._id,
          user_id: data.ask_id._id,
          user_name: data.ask_id.user_name,
          user_email: data.ask_id.user_email
        };
      }
      state.friend.push(friend);
    }
  },
  [types.NULL_FRIEND](state, data) {
    state.friend = [];
  },
  [types.DEL_FRIEND](state, data) {
    var friend = state.friend.concat();
    friend.splice(data, 1);
    state.friend = friend.concat();
  }
};
