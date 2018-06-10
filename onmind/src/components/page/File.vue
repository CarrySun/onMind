<template>
  <div>
    <!-- <el-container v-if="loading">
    <el-main class="loading">
    onMind&nbsp;&nbsp;&nbsp;<i class="el-icon-loading"></i>
    </el-main>
  </el-container> -->
    <!-- v-else -->
    <el-container>
      <el-header>
        <div class="left">
          <a class="logo" href="/">
            <i class="el-icon-arrow-left">onMind</i>
          </a>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <span>{{file_title}}</span>
          <!-- <span @click="click" v-if="edited">{{file_title}}</span> -->
          <!-- <el-form :inline-message="true" status-icon :model="reForm" ref="reForm" :rules="rules" v-else>
            <el-form-item prop="file_title" placeholder="请输入文件名">
              <el-input style="width:auto" v-model="reForm.file_title" placeholder="请输入内容" @keyup.enter.native="reTitle('reForm')"></el-input>
            </el-form-item>
            <input type="text" name="test" style="display:none" />
          </el-form> -->
        </div>
        <div class="save">
          <!-- {{saveState}} -->
           <el-tag v-if="fileData.editingUser">
          <!-- <p > -->
            <span>{{fileData.editingUser.user_name}}</span>
            正在编辑
          </el-tag>
          <!-- </p> -->
        </div>
        <div class="operation">
          <el-button type="text" @click="handleExport">
            <i class="el-icon-download"></i>&nbsp;导出
          </el-button>
          <!-- &nbsp;&nbsp;&nbsp;| -->
          <!-- <el-button type="text">
            <i class="el-icon-document"></i>&nbsp;历史版本</el-button> -->
          <!-- <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            <div class="user-logo">{{user_name.charAt(0)}}</div>
            {{user_name}}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown> -->
        </div>
      </el-header>
      <el-main id="editor">
        <div id="jsmind_container" @contextmenu="showMenu($event)">
          <VueContextMenu :contextMenuData="menuData" @addChild="addChild" @addBrother="addBrother" @editNode="editNode" @delNode="delNode"
            @toggleNode="toggleNode">
          </VueContextMenu>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import VueContextMenu from "../common/VueContextMenu.vue";
import key from "@/assets/vendor/js/keymaster.js";

import "@/assets/vendor/js/jsmind.js";
import "@/assets/vendor/js/jsmind.draggable.js";
import "@/assets/vendor/js/jsmind.screenshot.js";
import "@/assets/vendor/style/jsmind.scss";
import common from "@/assets/js/common.js";
import { mapState, mapGetters } from "vuex";
var jm = null;
// document.onkeydown = function(event) {
//   console.log(event.keyCode);
// };
export default {
  components: {
    VueContextMenu: VueContextMenu
  },
  data() {
    var validateTitleBlur = (rule, value, callback) => {
      if (!value) {
        this.edited = true;
      } else if (value.length > 15) {
        return callback(new Error("文件名长度在 15 个字符之内"));
      } else if (value == this.file_title) {
        this.edited = true;
      } else {
        this.$store
          .dispatch("isTitleRepeat", {
            file_title: value
          })
          .then(data => {
            if (data.success) {
              callback();
            } else {
              callback(new Error("文件名重复"));
            }
          })
          .catch(err => {
            callback(new Error("网络错误" + err));
          });
      }
    };
    var validateTitleChange = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入文件名"));
      } else if (value.length > 15) {
        return callback(new Error("文件名长度在 15 个字符之内"));
      } else if (value == this.file_title) {
      } else {
        this.$store
          .dispatch("isTitleRepeat", {
            file_title: value
          })
          .then(data => {
            if (data.success) {
              callback();
            } else {
              callback(new Error("文件名重复"));
            }
          })
          .catch(err => {
            callback(new Error("网络错误" + err));
          });
      }
    };
    return {
      menuData: {
        menuName: "name1",
        axios: { x: null, y: null },
        menulists: [
          {
            fnHandler: "addChild",
            icoName: "el-icon-plus",
            btnName: "插入子主题"
            // shortcut: "Insert"
          },
          {
            fnHandler: "addBrother",
            icoName: "el-icon-plus",
            btnName: "插入同级主题"
            // shortcut: "Enter"
          },
          {
            fnHandler: "editNode",
            icoName: "el-icon-edit",
            btnName: "编辑"
            // shortcut: "double-kill"
          },
          {
            fnHandler: "delNode",
            icoName: "el-icon-delete",
            btnName: "删除"
            // shortcut: "Delete"
          },
          {
            fnHandler: "toggleNode",
            icoName: "el-icon-menu",
            btnName: "伸展"
            // shortcut: "Space"
          }
        ]
      },
      autofocus: false,
      edited: true,
      user_name: JSON.parse(localStorage.getItem("user")).user_name,
      loading: true,
      saveState: "所有更改已保存到云端",
      fileData: {},
      reForm: {
        file_title: ""
      },
      id: common.getUrlParam(decodeURI(document.location.toString()), "id"),
      rules: {
        file_title: [
          { validator: validateTitleChange, trigger: ["change"] },
          { validator: validateTitleBlur, trigger: ["blur"] }
        ]
      },
      editable: true
    };
  },
  computed: {
    file_title() {
      this.reForm.file_title = this.fileData.file_title;
      return this.fileData.file_title;
    }
  },
  methods: {
    toggle_editable(event) {
      var btn = event.target;
      var editable = jm.get_editable();
      if (editable) {
        jm.disable_edit();
        this.editable = true;
      } else {
        jm.enable_edit();
        this.editable = false;
      }
    },
    reTitle(formName) {
      var self = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          var value = self.reForm.file_title;
          if (value && value === self.file_title) {
          } else if (value) {
            console.log(value);
            self.saveState = "正在进行文件重命名";
            self.$store.dispatch("updateFileTitle", {
              self: self,
              _id: self.id,
              file_title: value
            });
          } else {
          }
        } else {
          return false;
        }
      });
    },
    click() {
      this.edited = !this.edited;
      // if (!this.edited) {
      //   this.focus();
      // }
    },
    loadData() {
      var self = this;
      var id = common.getUrlParam(
        decodeURI(document.location.toString()),
        "id"
      );
      return this.$store.dispatch("getFileData", {
        _id: id
      });
    },
    handleCommand(command) {
      if (command == "logout") {
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        this.$router.push("/login");
      }
    },
    load_jsmind() {
      jm = "";
      var child = document.getElementsByClassName("jsmind-inner")[0];
      var parent = document.getElementById("jsmind_container");
      if (child) {
        parent.removeChild(child);
      }
      var editor = document.getElementById("editor");
      editor.scrollTop = (editor.scrollHeight - editor.clientHeight) / 2;
      editor.scrollLeft = (editor.scrollWidth - editor.clientWidth) / 2;
      var mind = {};
      if (this.fileData.file_details.length > 0) {
        mind = {
          meta: {
            name: this.fileData.file_title,
            author: JSON.parse(localStorage.getItem("user")).user_name
          },
          format: "node_tree",
          data: {
            id: "root",
            topic: this.fileData.file_title,
            children: JSON.parse(this.fileData.file_details)
          }
        };
      } else {
        mind = {
          meta: {
            name: this.fileData.file_title,
            author: JSON.parse(localStorage.getItem("user")).user_name
          },
          format: "node_tree",
          data: { id: "root", topic: this.fileData.file_title, children: [] }
        };
      }
      var options = {
        container: "jsmind_container",
        editable: this.editable,
        theme: "primary"
      };
      jm = jsMind.show(options, mind);
      var user = JSON.parse(localStorage.getItem("user"));
      var flag = true;
      if (this.fileData.editingUser && this.fileData.editingUser == user._id) {
        flag = false;
      }
      if (flag) {
        this.editable = true;
        jm.enable_edit();
      } else {
        this.editable = false;
        jm.disable_edit();
      }
      var mind_data = jm.get_data();
      // console.log(mind_data);
      // jm.set_readonly(true);
      // jm.add_node("sub2", "sub23", "new node", { "background-color": "red" });
      // jm.set_node_color("sub21", "green", "#ccc");
    },
    addEventListeners() {
      const self = this;
      key.setScope("issues");
      key("command+s, ctrl+s", "issues", function() {
        self.saveDetails(jm.get_data());
        return false;
      });
      key("delete", "issues", function() {
        self.delNode();
        // self.saveDetails(jm)
        return false;
      });
    },
    removeEventListeners() {
      const self = this;
      key.deleteScope("issues");
    },
    handleExport() {
      jm.screenshot.shootDownload();
    },
    //右键菜单
    showMenu: function(event) {
      event.preventDefault();
      var self = this;
      var _id = JSON.parse(localStorage.getItem("user"))._id;
      //可编辑
      if (this.editable) {
        //可编辑 我正在编辑
        if (this.fileData.editingUser && this.fileData.editingUser._id == _id) {
          // console.log(1);
          if (event.target.nodeName == "JMNODE") {
            var x = event.clientX;
            var y = event.clientY;
            self.menuData.axios = {
              x,
              y
            };
            event.cancelBubble = true;
          }
        } else if (
          this.fileData.editingUser &&
          this.fileData.editingUser._id != _id
        ) {
          // console.log(2);
          //可编辑 别人正在编辑
          this.$message({
            type: "error",
            message: self.fileData.editingUser.user_name + "正在编辑"
          });
        } else if (!this.fileData.editingUser) {
          //不确定
          this.loadData()
            .then(function(res) {
              self.loading = false;
              if (res && res.data) {
                var data = res.data;
                if (!data.success) {
                  self.$message({
                    message: data.err,
                    type: "error"
                  });
                } else if (data.success) {
                  self.fileData = data.data;
                  if (data.data.isEdit) {
                    //有人编辑
                    // console.log(3);
                    self.editable = false;

                    self.$message({
                      type: "error",
                      message: self.fileData.editingUser.user_name + "正在编辑"
                    });
                  } else {
                    //真的没人编辑
                    // console.log(4);
                    if (event.target.nodeName == "JMNODE") {
                      var x = event.clientX;
                      var y = event.clientY;
                      self.menuData.axios = {
                        x,
                        y
                      };
                      event.cancelBubble = true;
                    }
                  }
                }
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
        }
      } else {
        this.$message({
          type: "error",
          message: self.fileData.editingUser.user_name + "正在编辑"
        });
      }
    },
    //保存更改
    saveDetails(jm) {
      var self = this;
      if (this.editable) {
        this.save = "更改正在保存";
        this.$store
          .dispatch("updateDetails", {
            _id: self.id,
            file_details: JSON.stringify(jm.data.children)
          })
          .then(res => {
            self.saveState = "所有更改已保存到云端";
            self.removeEditingUser();
          });
      }
    },
    //获取选择的节点id
    get_selected_nodeid() {
      var selected_node = jm.get_selected_node();
      if (!!selected_node) {
        return selected_node.id;
      } else {
        return null;
      }
    },
    addEditingUser() {
      var self = this;
      this.$store
        .dispatch("addEditingUser", {
          file_id: self.id
        })
        .then(res => {
          if (res.data.success) {
            self.fileData = res.data.data;
            var partner = res.data.data.file_partner.concat();
            var owner = res.data.data.file_owner;
            var tos = [];
            var _id = JSON.parse(localStorage.getItem("user"))._id;
            if (_id == owner) {
              tos = partner.concat();
            } else {
              var index = partner.indexOf(_id);
              tos.push(owner);
              for (var i in partner) {
                if (i != index) {
                  tos.push(partner[i]);
                }
              }
            }
            self.$socket.emit("addEditingUser", {
              tos: tos,
              editingUser: res.data.data.editingUser
            });
          } else {
            self.$message({
              type: "error",
              message: res.data.err
            });
          }
        })
        .catch(err => {
          callback(new Error("网络错误" + err));
        });
    },
    removeEditingUser() {
      var self = this;
      this.$store
        .dispatch("removeEditingUser", {
          file_id: self.id
        })
        .then(res => {
          if (res.data.success) {
            self.fileData = res.data.data;
            var partner = res.data.data.file_partner.concat();
            var owner = res.data.data.file_owner;
            var tos = [];
            var _id = JSON.parse(localStorage.getItem("user"))._id;
            if (_id == owner) {
              tos = partner.concat();
            } else {
              var index = partner.indexOf(_id);
              tos.push(owner);
              for (var i in partner) {
                if (i != index) {
                  tos.push(partner[i]);
                }
              }
            }
            self.$socket.emit("removeEditingUser", {
              tos: tos
            });
          } else {
            self.$message({
              type: "error",
              message: res.data.err
            });
          }
        })
        .catch(err => {
          callback(new Error("网络错误" + err));
        });
    },
    //添加子节点
    addChild() {
      var selected_node = jm.get_selected_node(); // as parent of new node
      if (!selected_node) {
        this.$message("请先选择一个节点");
        return;
      }

      var nodeid = jsMind.util.uuid.newid();
      var node = jm.add_node(selected_node, nodeid, "新增主题");
      // this.saveDetails(jm.get_data());
      jm.select_node(nodeid);
      jm.begin_edit(nodeid);
      this.addEditingUser();
    },
    //添加兄弟节点
    addBrother() {
      var selected_node = jm.get_selected_node();
      if (!!selected_node && !selected_node.isroot) {
        var nodeid = jsMind.util.uuid.newid();
        var node = jm.insert_node_after(selected_node, nodeid, "新增主题");
        // this.saveDetails(jm.get_data());
        jm.select_node(nodeid);
        jm.begin_edit(nodeid);
        this.addEditingUser();
      }
    },
    //编辑节点
    editNode() {
      var selected_node = jm.get_selected_node();
      if (!!selected_node) {
        jm.begin_edit(selected_node);
        this.addEditingUser();
      }
    },
    //删除节点
    delNode() {
      var selected_id = this.get_selected_nodeid();
      if (!selected_id) {
        this.$message("请先选择一个节点");
        return;
      }

      jm.remove_node(selected_id);
      this.addEditingUser();
      // this.saveDetails(jm.get_data());
    },
    //伸缩节点
    toggleNode(e) {
      var evt = e || event;
      var selected_node = jm.get_selected_node();
      if (!!selected_node) {
        jm.toggle_node(selected_node.id);
        evt.stopPropagation();
        evt.preventDefault();
      }
    },
    beforeunloadHandler(e) {
      this.removeEditingUser();
    }
  },
  created: function() {
    var self = this;
    this.loadData()
      .then(function(res) {
        self.loading = false;
        if (res && res.data) {
          var data = res.data;
          if (!data.success) {
            self.$message({
              message: data.err,
              type: "error"
            });
          } else if (data.success) {
            self.fileData = data.data;
            self.load_jsmind();
          }
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
  mounted() {
    const self = this;
    this.addEventListeners();
    window.addEventListener("beforeunload", e => self.beforeunloadHandler(e));
    // window.addEventListener("unload", e => self.beforeunloadHandler(e));
    this.$socket.on("addEditingUser", res => {
      console.log("addEditingUser");
      self.editable = false;
      self.fileData.editingUser = res.editingUser;
      self.fileData.isEdit = true;
    });
    this.$socket.on("removeEditingUser", res => {
      console.log("removeEditingUser");
      self.editable = true;
      self.fileData.editingUser = null;
      self
        .loadData()
        .then(function(res) {
          self.loading = false;
          if (res && res.data) {
            var data = res.data;
            if (!data.success) {
              self.$message({
                message: data.err,
                type: "error"
              });
            } else if (data.success) {
              self.fileData = data.data;
              self.load_jsmind();
            }
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
    });
  }
};
</script>
<style scoped lang="scss">
.el-header {
  background-color: #393f4f;
  position: relative;
  color: #fff;
  line-height: 45px;
  height: 45px !important;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .left {
    display: flex;
    .el-input__inner {
      background: transparent;
      border: none;
      color: #fff;
    }
  }
  .save {
    position: absolute;
    width: 600px;
    text-align: center;
    height: 45px;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    font-size: 12px;
  }
  .logo {
    color: #409eff;
    cursor: pointer;
    i {
      color: #409eff;
    }
  }
  .operation {
    font-size: 14px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    .el-button--text {
      color: #fff;
    }
  }
  .operation p {
    margin-right: 10px;
    font-size: 16px;
  }
  .operation .el-dropdown-link {
    position: relative;
    display: inline-block;
    padding-left: 50px;
    color: #fff;
    cursor: pointer;
    vertical-align: middle;
  }

  .operation .user-logo {
    position: absolute;
    background: #ccc;
    left: 10px;
    top: 8px;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 10px;
  }

  .el-dropdown-menu__item {
    text-align: center;
  }
}

.el-main {
  min-width: 1200px;
  background: rgb(251, 251, 251);
  color: #333;
  position: absolute;
  top: 45px;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0;
  #jsmind_container {
    width: 5000px;
    height: 5000px;
    cursor: default;
  }
  #jsmind {
    width: 600px;
    height: 600px;
    cursor: default;
  }
}

.loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
}
</style>
