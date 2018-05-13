import axios from "axios";

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
window.axios = axios;

let HOST = null;

if (process.env.NODE_ENV === "development") {
  HOST = "/api";
} else {
}
const IS_NAME_REPEAT = HOST + "/user/isNameRepeat";
const REG = HOST + "/user/reg";
const VERIFY = HOST + "/user/verify";
const LOG = HOST + "/user/log";
const FORGET = HOST + "/user/forget";
const VERIFYFORGET = HOST + "/user/verifyForget";

const IS_Title_REPEAT = HOST + "/file/isTitleRepeat";
const ADD_FILE = HOST + "/file/add";
const FILE_LIST = HOST + "/file/list";
const DEL_FILE = HOST + "/file/delete";
const UPDATE_FILE = HOST + "/file/update";
const GET_FILEDATA = HOST + "/file/getData";
const ADD_FRIEND = HOST + "/friend/addFriend";
const SEARCH_FRIEND = HOST + "/friend/searchFriend";

export function isNameRepeatApi(formData) {
  return axios.post(IS_NAME_REPEAT, formData);
}

export function regApi(formData) {
  return axios.post(REG, formData);
}

export function verifyApi(formData) {
  return axios.post(VERIFY, formData);
}

export function logApi(formData) {
  return axios.post(LOG, formData);
}

export function forgetApi(formData) {
  return axios.post(FORGET, formData);
}

export function verifyForgetApi(formData) {
  return axios.post(VERIFYFORGET, formData);
}

export function isTitleRepeatApi(formData) {
  return axios.post(IS_Title_REPEAT, formData);
}

export function addFileApi(formData) {
  return axios.post(ADD_FILE, formData);
}

export function fileListApi(formData) {
  return axios.post(FILE_LIST, formData);
}

export function delFileApi(formData) {
  return axios.post(DEL_FILE, formData);
}

export function updateFileApi(formData) {
  return axios.post(UPDATE_FILE, formData);
}

// friends
export function getFileDataApi(formData) {
  return axios.post(GET_FILEDATA, formData);
}

export function addFriendApi(formData) {
  return axios.post(ADD_FRIEND, formData);
}
export function searchFriendApi(formData) {
  return axios.post(SEARCH_FRIEND, formData);
}
