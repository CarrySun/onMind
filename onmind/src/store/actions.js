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
    if (
      formdata.user_email &&
      formdata.user_name &&
      formdata.user_password &&
      formdata.verifyCode
    ) {
      return await apis.regApi({
        user_email: formdata.user_email,
        user_name: formdata.user_name,
        user_password: formdata.user_password,
        verifyCode: formdata.verifyCode
      });
    }
  },
  //log
  async log({ dispatch, commit }, formdata) {
    if (formdata.user_email && formdata.user_password) {
      return await apis.logApi({
        user_email: formdata.user_email,
        user_password: formdata.user_password
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
  //updateUser
  async updateUser({ dispatch, commit }, formdata) {
    return await apis.updateUserApi({
      user_name: formdata.user_name,
      user_password: formdata.user_password,
      accessToken: localStorage.getItem("accessToken")
    });
  },
  async updatePwd({ dispatch, commit }, formdata) {
    return await apis.updatePwdApi({
      oldpwd: formdata.oldpwd,
      newpwd: formdata.newpwd,
      accessToken: localStorage.getItem("accessToken")
    });
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
    if (formdata.file_title && formdata.file_type) {
      return await apis.addFileApi({
        file_title: formdata.file_title,
        file_type: formdata.file_type,
        file_partner: formdata.file_partner,
        accessToken: localStorage.getItem("accessToken")
      });
    }
  },

  async fileList({ dispatch, commit }, formdata) {
    var self = formdata.self;
    if (formdata.listType) {
      return await apis.fileListApi({
        listType: formdata.listType,
        accessToken: localStorage.getItem("accessToken")
      });
      // .then(function(res) {
      //   self.loading = false;
      //   if (res.data) {
      //     var data = res.data;
      //     if (!data.success) {
      //       self.$message({
      //         message: data.err,
      //         type: "error"
      //       });
      //     } else if (data.success) {
      //       self.tableData = data.data;
      //     }
      //   }
      // })
      // .catch(err => {
      //   self.loading = false;
      //   console.log(err);
      //   self.$message({
      //     message: "文件列表获取失败，请重试",
      //     type: "error"
      //   });
      // });
    }
  },
  async quitPartner({ dispatch, commit }, formdata) {
    var self = formdata.self;
    if (formdata._id) {
      await apis
        .quitPartnerApi({
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
                message: "退出协作成功!"
              });
              // var data = self.tableData;
              // var old = data[formdata.index].file_partner;
              // var user = JSON.parse(localStorage.getItem("user"));
              // old = common.removeByValue(old, "user_name", user.user_name);
              // data[formdata.index].file_partner = old;
              // self.tableData = data.concat();
              self.tableData.splice(formdata.index, 1);
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

  async updateFilePartner({ dispatch, commit }, formdata) {
    if (formdata._id && formdata.file_partner) {
      return await apis.updateFileApi({
        _id: formdata._id,
        file_partner: formdata.file_partner,
        accessToken: localStorage.getItem("accessToken")
      });
    }
  },
  async updateFileTitle({ dispatch, commit }, formdata) {
    var self = formdata.self;
    // console.log(formdata);
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
                self.saveState = "所有更改已保存";
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
        flag: formdata.flag,
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

  async addEditingUser({ dispatch, commit }, formdata) {
    var data = {
      file_id: formdata.file_id,
      accessToken: localStorage.getItem("accessToken")
    };

    return await apis.addEditingUserApi(data);
  },
  async removeEditingUser({ dispatch, commit }, formdata) {
    var data = {
      file_id: formdata.file_id,
      flag: formdata.flag,
      accessToken: localStorage.getItem("accessToken")
    };

    return await apis.removeEditingUserApi(data);
  },

  // friend
  async friendList({ dispatch, commit }, formdata) {
    commit(types.NULL_FRIEND);
    var self = formdata.self;
    await apis
      .friendListApi({
        accessToken: localStorage.getItem("accessToken")
      })
      .then(res => {
        self.loading = false;
        if (res.data.success) {
          var data = res.data.data;
          for (var i in data) {
            commit(types.ADD_FRIEND, data[i]);
          }
        } else {
          self.$message({
            type: "error",
            message: "好友列表获取失败"
          });
        }
      })
      .catch(err => {
        console.log(err);
        self.loading = false;
        self.$message({
          type: "error",
          message: "好友列表获取失败"
        });
      });
  },

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
    return await apis.addFriendApi({
      type: formdata.type,
      friend: formdata.friend,
      accessToken: localStorage.getItem("accessToken")
    });
  },
  async delFriend({ dispatch, commit }, formdata) {
    var self = formdata.self;
    await apis
      .delFriendApi({
        _id: formdata._id,
        accessToken: localStorage.getItem("accessToken")
      })
      .then(function(res) {
        if (res.data) {
          var data = res.data;
          if (!data.success) {
            console.log(data.err);
            self.$message({
              message: "删除失败，请重试!",
              type: "error"
            });
          } else if (data.success) {
            self.$message({
              type: "success",
              message: "删除成功!"
            });
            commit(types.DEL_FRIEND, formdata.index);
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
  },
  async addPartner({ dispatch, commit }, formdata) {
    return await apis.addPartnerApi({
      _id: formdata._id,
      checked: formdata.checked,
      uncheck: formdata.uncheck,
      file_partner: formdata.file_partner,
      accessToken: localStorage.getItem("accessToken")
    });
  },
  //notice
  async newReplayNotice({ dispatch, commit }, formdata) {
    commit(types.ADD_NOTICE, formdata.notice);
    commit(types.ADD_FRIEND, formdata.friend);
    var self = formdata.self;
    self.$message({
      type: "warning",
      message: "您有一条新通知，记得查看哦"
    });
  },
  async newNotice({ dispatch, commit }, formdata) {
    commit(types.ADD_NOTICE, formdata.notice);
    var self = formdata.self;
    self.$message({
      type: "warning",
      message: "您有一条新通知，记得查看哦"
    });
  },
  async noticeList({ dispatch, commit }, formdata) {
    var self = formdata.self;
    await apis
      .noticeListApi({
        flag: formdata.flag,
        accessToken: localStorage.getItem("accessToken")
      })
      .then(res => {
        self.loading = false;
        if (res.data.success) {
          commit(types.SET_NOTICE, res.data.data);
        } else {
          console.log(res.data.error);
          self.$message({
            message: "操作失败，请重试",
            type: "error"
          });
        }
      })
      .catch(err => {
        self.loading = false;
        console.log(err);
        self.$message({
          message: "操作失败，请重试",
          type: "error"
        });
      });
  },
  async updateNotice({ dispatch, commit }, formdata) {
    var self = formdata.self;
    var data = {
      from_id: formdata.from_id,
      type: formdata.type,
      _id: formdata._id,
      agreed: formdata.agreed,
      accessToken: localStorage.getItem("accessToken")
    };

    await apis.updateNoticeApi(data).then(res => {
      if (res.data.success) {
        self.$socket.emit("newReplayNotice", {
          to: res.data.data.to,
          notice: res.data.data.notice,
          friend: res.data.data.friend
        });
        commit(types.ADD_FRIEND, res.data.data.friend);
        var item = common.cloneObj(formdata.item);
        item.agreed = formdata.agreed;
        item.readed = true;
        var res = {
          index: formdata.index,
          notice: item
        };
        commit(types.UPDATE_NOTICE, res);
      }
    });
  },

  async reciveNotice({ dispatch, commit }, formdata) {
    var self = formdata.self;
    await apis
      .reciveNoticeApi({
        _id: formdata._id,
        accessToken: localStorage.getItem("accessToken")
      })
      .then(res => {
        if (res.data.success) {
          var item = common.cloneObj(formdata.item);
          item.readed = true;
          var res = {
            index: formdata.index,
            notice: item
          };
          commit(types.UPDATE_NOTICE, res);
          // self.$router.push({
          //   path: "/file",
          //   query: {
          //     id: item.content._id
          //   }
          // });
          let { href } = self.$router.resolve({
            name: "file",
            query: {
              id: item.content._id
            }
          });
        } else {
          self.$message({
            type: "error",
            message: res.data.err
          });
        }
      })
      .catch(err => {
        self.$message({
          type: "error",
          message: err
        });
      });
  }
};
