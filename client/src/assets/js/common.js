/**
 * @file 页面公共模块，包含基础公共依赖
 * @author ym3
 */
require("../css/common.scss");
// require("../vendor/style/jsmind.scss");
// @import "../../assets/vendor/style/jsmind.scss";

// export default{

// };

export default {
  removeByValue(arr, attr, value) {
    //数组，属性，属性值
    for (var j = 0; j < arr.length; j++) {
      if (arr[j][attr] == value) {
        arr.splice(j, 1);
        break;
      }
    }
    return arr;
  },

  getUrlParam(url, paraName) {
    var arrObj = url.split("?");
    if (arrObj.length > 1) {
      var arrPara = arrObj[1].split("&");
      var arr;
      for (var i = 0; i < arrPara.length; i++) {
        arr = arrPara[i].split("=");
        if (arr != null && arr[0] == paraName) {
          return arr[1];
        }
      }
      return "";
    } else {
      return "";
    }
  },
  cloneObj(obj) {
    var str, newobj = obj.constructor === Array ? [] : {};
    if (typeof obj !== 'object') {
      return;
    } else if (window.JSON) {
      str = JSON.stringify(obj), //系列化对象
        newobj = JSON.parse(str); //还原
    } else {
      for (var i in obj) {
        newobj[i] = typeof obj[i] === 'object' ?
          cloneObj(obj[i]) : obj[i];
      }
    }
    return newobj;
  }

};
