// 分发actions，页面的action同意dispatch到此进行逻辑处理

import * as types from "./mutation-types.js";
import * as apis from "@/assets/js/api.js";
import common from "@/assets/js/common.js";
export default {
  async isNameRepeat({ dispatch, commit }, formdata) {
    var data = {};
    await apis
      .isNameRepeatApi(formdata)
      .then(function(res) {
        if (res.data) {
          data = res.data;
        }
      })
      .catch(err => {
        throw new Error(err);
      });
    return data;
  },
  //verify
  async verify({ dispatch, commit }, formdata) {
    var self = formdata.self;
    if (formdata.user_email) {
      await apis
        .verifyApi({
          user_email: formdata.user_email
        })
        .then(function(res) {
          if (res.data) {
            var data = res.data;
            if (!data.success) {
              self.$message({
                message: data.err,
                type: "error"
              });
              self.time = 0;
            } else if (data.success) {
              self.$message({
                message: "邮件发送成功，请注意查收",
                type: "success"
              });
            }
          }
        })
        .catch(err => {
          console.log(err);
          self.$message({
            message: "邮件发送失败，请重试",
            type: "error"
          });
          self.time = 0;
        });
    }
  },
  //reg
  async reg({ dispatch, commit }, formdata) {
    var self = formdata.self;
    if (
      formdata.user_email &&
      formdata.user_name &&
      formdata.user_password &&
      formdata.verifyCode
    ) {
      await apis
        .regApi({
          user_email: formdata.user_email,
          user_name: formdata.user_name,
          user_password: formdata.user_password,
          verifyCode: formdata.verifyCode
        })
        .then(function(res) {
          self.reging = false;
          if (res.data) {
            var data = res.data;
            if (!data.success) {
              self.$message({
                message: data.err,
                type: "error"
              });
            } else if (data.success) {
              self.$message({
                message: "恭喜你!注册成功",
                type: "success"
              });
              localStorage.setItem("user", JSON.stringify(data.user));
              localStorage.setItem("accessToken", data.user.accessToken);
              self.$router.push("/owner");
            }
          }
        })
        .catch(err => {
          console.log(err);
          self.$message({
            message: "注册失败，请重试",
            type: "error"
          });
          self.reging = false;
        });
    }
  },
  //log
  async log({ dispatch, commit }, formdata) {
    var self = formdata.self;
    if (formdata.user_email && formdata.user_password) {
      await apis
        .logApi({
          user_email: formdata.user_email,
          user_password: formdata.user_password
        })
        .then(function(res) {
          self.loging = false;
          if (res.data) {
            var data = res.data;
            if (!data.success) {
              self.$message({
                message: data.err,
                type: "error"
              });
            } else if (data.success) {
              localStorage.setItem("user", JSON.stringify(data.user));
              localStorage.setItem("accessToken", data.user.accessToken);
              self.$router.push("/owner");
            }
          }
        })
        .catch(err => {
          console.log(err);
          self.$message({
            message: "登陆失败，请重试",
            type: "error"
          });
          self.loging = false;
        });
    }
  },
  //verifyForget
  async verifyForget({ dispatch, commit }, formdata) {
    var self = formdata.self;
    if (formdata.user_email) {
      await apis
        .verifyForgetApi({
          user_email: formdata.user_email
        })
        .then(function(res) {
          if (res.data) {
            var data = res.data;
            if (!data.success) {
              self.$message({
                message: data.err,
                type: "error"
              });
              self.time = 0;
            } else if (data.success) {
              self.$message({
                message: "邮件发送成功，请注意查收",
                type: "success"
              });
            }
          }
        })
        .catch(err => {
          console.log(err);
          self.$message({
            message: "邮件发送失败，请重试",
            type: "error"
          });
          self.time = 0;
        });
    }
  },
  //forget
  async forget({ dispatch, commit }, formdata) {
    var self = formdata.self;
    if (formdata.user_email && formdata.user_password && formdata.verifyCode) {
      await apis
        .forgetApi({
          user_email: formdata.user_email,
          user_password: formdata.user_password,
          verifyCode: formdata.verifyCode
        })
        .then(function(res) {
          self.forgeting = false;
          if (res.data) {
            var data = res.data;
            if (!data.success) {
              self.$message({
                message: data.err,
                type: "error"
              });
            } else if (data.success) {
              self.$message({
                message: "密码修改成功，请重新登录",
                type: "success"
              });
              self.forgetForm = {
                user_password: "",
                user_email: "",
                verifyCode: ""
              };
              self.dialogFormVisible = false;
            }
          }
        })
        .catch(err => {
          console.log(err);
          self.$message({
            message: "密码修改失败，请重试",
            type: "error"
          });
        });
    }
  },

  //fileList
  async isTitleRepeat({ dispatch, commit }, formdata) {
    var data = {};
    await apis
      .isTitleRepeatApi({
        file_title: formdata.file_title,
        accessToken: localStorage.getItem("accessToken")
      })
      .then(function(res) {
        if (res.data) {
          data = res.data;
        }
      })
      .catch(err => {
        throw new Error(err);
      });
    return data;
  },
  async addFile({ dispatch, commit }, formdata) {
    var self = formdata.self;
    if (formdata.file_title && formdata.file_type) {
      await apis
        .addFileApi({
          file_title: formdata.file_title,
          file_type: formdata.file_type,
          file_partner: formdata.file_partner,
          accessToken: localStorage.getItem("accessToken")
        })
        .then(function(res) {
          self.adding = false;
          if (res.data) {
            var data = res.data;
            if (!data.success) {
              self.$message({
                message: data.err,
                type: "error"
              });
            } else if (data.success) {
              self.$message({
                message: "文件新建成功",
                type: "success"
              });
              self.tableData.unshift(data.file);
              self.dialogFormVisible = false;
              let { href } = self.$router.resolve({
                name: "file",
                query: {
                  id: data._id
                }
              });
              window.open(href, "_blank");
            }
          }
        })
        .catch(err => {
          console.log(err);
          self.$message({
            message: "文件新建失败，请重试",
            type: "error"
          });
        });
    }
  },

  async fileList({ dispatch, commit }, formdata) {
    var self = formdata.self;
    if (formdata.listType) {
      await apis
        .fileListApi({
          listType: formdata.listType,
          accessToken: localStorage.getItem("accessToken")
        })
        .then(function(res) {
          self.loading = false;
          if (res.data) {
            var data = res.data;
            if (!data.success) {
              self.$message({
                message: data.err,
                type: "error"
              });
            } else if (data.success) {
              self.tableData = data.data;
            }
          }
        })
        .catch(err => {
          self.loading = false;
          console.log(err);
          self.$message({
            message: "文件列表获取失败，请重试",
            type: "error"
          });
        });
    }
  },
  async delFile({ dispatch, commit }, formdata) {
    var self = formdata.self;
    if (formdata._id) {
      await apis
        .delFileApi({
          _id: formdata._id,
          accessToken: localStorage.getItem("accessToken")
        })
        .then(function(res) {
          if (res.data) {
            var data = res.data;
            if (!data.success) {
              self.$message({
                message: data.err,
                type: "error"
              });
            } else if (data.success) {
              self.$message({
                type: "success",
                message: "删除成功!"
              });
              self.tableData = common.removeByValue(
                self.tableData,
                "_id",
                formdata._id
              );
            }
          }
        })
        .catch(err => {
          console.log(err);
          self.$message({
            type: "error",
            message: "删除失败，请重试!"
          });
        });
    }
  },
  async updateFileTitle({ dispatch, commit }, formdata) {
    var self = formdata.self;
    console.log(formdata);
    if (formdata._id && formdata.file_title) {
      await apis
        .updateFileApi({
          _id: formdata._id,
          file_title: formdata.file_title,
          accessToken: localStorage.getItem("accessToken")
        })
        .then(function(res) {
          if (res.data) {
            var data = res.data;
            if (!data.success) {
              self.$message({
                message: data.err,
                type: "error"
              });
            } else if (data.success) {
              self.$message({
                type: "success",
                message: "重命名成功!"
              });
              if (formdata.row) {
                formdata.row.file_title = formdata.file_title;
              } else {
                self.fileData.file_title = formdata.file_title;
                self.edited = true;
                self.saveInfo = "所有更改已保存";
              }
            }
          }
        })
        .catch(err => {
          console.log(err);
          self.$message({
            type: "error",
            message: "重命名失败，请重试!"
          });
        });
    }
  },
  //file
  async getFileData({ dispatch, commit }, formdata) {
    if (formdata._id) {
      return await apis.getFileDataApi({
        _id: formdata._id,
        accessToken: localStorage.getItem("accessToken")
      });
    }
  },
  async updateDetails({ dispatch, commit }, formdata) {
    return await apis.updateFileApi({
      _id: formdata._id,
      file_details: formdata.file_details,
      accessToken: localStorage.getItem("accessToken")
    });
  },
  // friend
  async searchFriend({ dispatch, commit }, formdata) {
    var self = formdata.self;
    await apis
      .searchFriendApi({
        type: formdata.type,
        friend: formdata.friend,
        accessToken: localStorage.getItem("accessToken")
      })
      .then(function(res) {
        self.searching = false;
        if (res.data) {
          var data = res.data;
          if (!data.success) {
            self.$message({
              message: "操作失败，请重试",
              type: "error"
            });
          } else if (data.success) {
            self.searchData = data.data;
          }
        }
      })
      .catch(err => {
        self.searching = false;
        console.log(err);
        self.$message({
          message: "操作失败，请重试",
          type: "error"
        });
      });
  },
  async addFriend({ dispatch, commit }, formdata) {
    var self = formdata.self;
    await apis
      .addFriendApi({
        type: formdata.type,
        friend: formdata.friend,
        accessToken: localStorage.getItem("accessToken")
      })
      .then(function(res) {
        self.sending = false;
        if (res.data) {
          var data = res.data;
          if (!data.success) {
            self.$message({
              message: "操作失败，请重试",
              type: "error"
            });
          } else if (data.success) {
            self.$message({
              message: "已成功发送加好友请求",
              type: "success"
            });
          }
        }
      })
      .catch(err => {
        self.sending = false;
        console.log(err);
        self.$message({
          message: "操作失败，请重试",
          type: "error"
        });
      });
  }
};
