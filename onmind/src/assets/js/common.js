/**
 * @file 页面公共模块，包含基础公共依赖
 * @author ym3
 */
require("../css/common.scss");

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
  }
};
