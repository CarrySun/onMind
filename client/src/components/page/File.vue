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
          <a class="logo" @click="goOwner">
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
            <span>{{fileData.editingUser.user_name}}</span>
            正在编辑
          </el-tag>
        </div>
        <div class="operation">
          <el-button type="text" @click="show_data">
            数据展示
          </el-button>
          <el-button type="text" @click="saveDetails">
            保存
          </el-button>
          <el-button type="text" @click="handleExport">
            <!-- <i class="el-icon-download"></i>&nbsp;导出 -->
            导出
          </el-button>
          <!-- &nbsp;&nbsp;&nbsp;| -->
          <!-- <el-button type="text">
            <i class="el-icon-document"></i>&nbsp;历史版本</el-button> -->
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              <!-- <div class="user-logo">{{user_name.charAt(0)}}</div> -->
              {{user_name}}
              <i class="el-icon-caret-bottom"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <div class="todo">
        <div>
          <el-button size="mini" @click="addChild">
            <i class="el-icon-plus"></i>插入子节点</el-button>
          <el-button size="mini" @click="addBrother">
            <i class="el-icon-plus"></i>插入同级节点</el-button>
          <el-button size="mini" @click="delNode">
            <i class="el-icon-delete"></i>删除</el-button>
          <el-button size="mini" @click="editNode">
            <i class="el-icon-edit"></i>编辑</el-button>
        <!-- </div> -->
        <!-- <div> -->
          <el-dropdown @command="set_direction">
            <el-button size="mini">
              布局
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="center">左右</el-dropdown-item>
              <el-dropdown-item command="left">左</el-dropdown-item>
              <el-dropdown-item command="right">右</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-popover placement="bottom" width="220" trigger="hover">
            <!-- <el-button style="background:#fff;color:#000" class="theme" @click="set_the  me('default')">default</el-button> -->
            <el-button style="background:#428bca" class="theme" @click="set_theme('primary')">primary</el-button>
            <el-button style="background:#f0ad4e" class="theme" @click="set_theme('warning')">warning</el-button>
            <el-button style="background:#d9534f" class="theme" @click="set_theme('danger')">danger</el-button>
            <el-button style="background:#5cb85c" class="theme" @click="set_theme('success')">success</el-button>
            <el-button style="background:#5dc0de" class="theme" @click="set_theme('info')">info</el-button>
            <!-- <el-button style="background:#1abc9c" class="theme" @click="set_theme('greensea')">greensea</el-button>
          <el-button style="background:#2ecc71" class="theme" @click="set_theme('nephrite')">nephrite</el-button>
          <el-button style="background:#3498db" class="theme" @click="set_theme('belizehole')">belizehole</el-button>
          <el-button style="background:#9b59b6" class="theme" @click="set_theme('wisteria')">wisteria</el-button> -->
            <el-button style="background:#34495e" class="theme" @click="set_theme('asphalt')">asphalt</el-button>
            <!-- <el-button style="background:#f1c40f" class="theme" @click="set_theme('orange')">orange</el-button> -->
            <!-- <el-button style="background:#e67e22" class="theme" @click="set_theme('pumpkin')">pumpkin</el-button> -->
            <!-- <el-button style="background:#e74c3c" class="theme" @click="set_theme('pomegranate')">pomegranate</el-button> -->
            <el-button style="background:#ecf0f1;color:#000" class="theme" @click="set_theme('clouds')">clouds</el-button>
            <!-- <el-button style="background:#95a5a6" class="theme" @click="set_theme('asbestos')">asbestos</el-button> -->
            <el-button size="mini" slot="reference">主题
              <i class="el-icon-arrow-down"></i>
            </el-button>
          </el-popover>
          <el-dropdown @command="toggleDropdown">
            <el-button size="mini">
              展开
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="toggle">伸缩</el-dropdown-item>
              <!-- <el-dropdown-item command="expand">展开</el-dropdown-item> -->
              <!-- <el-dropdown-item command="collapse">收缩</el-dropdown-item> -->
              <el-dropdown-item command="expandAll">全部展开</el-dropdown-item>
              <el-dropdown-item command="collapseAll">全部收缩</el-dropdown-item>
              <!-- <el-dropdown-item command="expand_to_level2">展开到二级节点</el-dropdown-item>
              <el-dropdown-item command="expand_to_level3">展开到三级节点</el-dropdown-item> -->
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <!-- <div>
          <el-button size="mini" @click="show_data">数据信息</el-button>
          <el-button size="mini" @click="saveDetails()">保存</el-button>
        </div> -->
      </div>
      <el-main id="editor">
        <div id="jsmind_container" @contextmenu="showMenu($event)">
          <VueContextMenu :contextMenuData="menuData" @addChild="addChild" @addBrother="addBrother" @editNode="editNode" @delNode="delNode"
            @toggleNode="toggleNode">
          </VueContextMenu>
        </div>
      </el-main>
      <!-- <div class="footer">
        <div v-if="fileData.lookingUser && fileData.lookingUser.length>0">当前在线:
          <el-tag size="mini" v-for="(item,index) in fileData.lookingUser" :key="index">{{item.user_name}}</el-tag>
        </div>
        <el-button @click="resize_jsmind">居中</el-button>
      </div> -->
      <div class="setup">
        <div class="zoom">
          <el-input-number v-model="zoom" @change="handleChange" size="small" :min="50" :max="200"></el-input-number>
        </div>
        <el-popover style="margin-left:5px;" v-if="fileData.lookingUser && fileData.lookingUser.length>0" placement="right" trigger="hover"
          width="160">
          <p style="margin-bottom:10px">{{fileData.lookingUser.length}}人正在浏览：</p>
          <el-tag size="mini" v-for="(item,index) in fileData.lookingUser" :key="index">{{item.user_name}}</el-tag>
          <i slot="reference" class="el-icon-partner" style="cursor:pointer;font-size:20px;margin-top:15px;">
            <span style="font-size:14px">{{fileData.lookingUser.length}}</span>
          </i>
        </el-popover>
      </div>
    </el-container>
    <el-dialog :visible.sync="dialogVisible">
      <!-- :before-close="handleClose" -->
      <!-- title="信息" -->
      <!-- width="30%" -->
      <pre>{{mind_string}}</pre>
    </el-dialog>
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
var _id = JSON.parse(localStorage.getItem("user"))._id;
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
      zoom: 100,
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
          }
          // {
          //   fnHandler: "toggleNode",
          //   icoName: "el-icon-menu",
          //   btnName: "伸展"
          //   // shortcut: "Space"
          // }
        ]
      },
      autofocus: false,
      edited: true,
      user_name: JSON.parse(localStorage.getItem("user")).user_name,
      loading: true,
      saveState: "所有更改已保存到云端",
      fileData: {},
      // file_direction:'center',
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
      editable: true,
      dialogVisible: false,
      mind_string: ""
    };
  },
  computed: {
    file_direction() {
      return this.fileData.file_direction;
    },
    file_title() {
      this.reForm.file_title = this.fileData.file_title;
      return this.fileData.file_title;
    }
  },
  methods: {
    handleClose() {},
    show_data() {
      var mind_data = jm.get_data();
      // var mind_string = jsMind.util.json.json2string(mind_data);
      var mind_string = JSON.stringify(mind_data, null, 4);
      this.mind_string = mind_string;
      // $('#detail').val(result);
      this.dialogVisible = true;
      // this.$message({
      // showClose: true,
      // message: mind_string
      // });
    },
    // set_node_font_style: function(nodeid, size, weight, style) {
    change_text_font() {
      var selected_id = this.get_selected_nodeid();
      if (!selected_id) {
        this.$message("请选择一个子节点");
        return;
      }

      jm.set_node_font_style(selected_id, 28);
    },

    change_text_color() {
      var selected_id = this.get_selected_nodeid();
      if (!selected_id) {
        this.$message("请选择一个子节点");
        return;
      }

      jm.set_node_color(selected_id, null, "#000");
    },
    set_theme(theme_name) {
      if (this.isEditable()) {
        this.addEditingUser();
        this.fileData.file_theme = theme_name;
        jm.set_theme(theme_name);
      }
    },
    set_direction(direction) {
      if (this.isEditable()) {
        this.addEditingUser();
        var fileData = jm.get_data().data.children;
        if (direction != "center") {
          for (var i in fileData) {
            fileData[i].direction = direction;
          }
        } else {
          for (var i in fileData) {
            if (i < 2) {
              fileData[i].direction = "right";
            } else if (i < 4) {
              fileData[i].direction = "left";
            } else {
              if (i % 2 == 0) {
                fileData[i].direction = "right";
              } else {
                fileData[i].direction = "left";
              }
            }
          }
        }
        fileData = JSON.stringify(fileData);
        this.fileData.file_details = [fileData];
        this.fileData.file_direction = direction;
        this.load_jsmind();
      }
    },
    //伸缩
    toggleDropdown(type) {
      switch (type) {
        case "toggle":
          this.toggle();
          break;
        case "expand":
          this.expand();
          break;
        case "collapse":
          this.collapse();
          break;
        case "expandAll":
          jm.expand_all();
          break;
        case "collapseAll":
          jm.collapse_all();
          break;
        case "expand_to_level2":
          jm.expand_to_depth(2);
        case "expand_to_level3":
          jm.expand_to_depth(3);
          break;
        default:
          break;
      }
    },
    expand() {
      var selected_id = this.get_selected_nodeid();
      if (!selected_id) {
        this.$message("请先选择一个节点");
        return;
      }

      jm.expand_node(selected_id);
    },

    collapse() {
      var selected_id = this.get_selected_nodeid();
      if (!selected_id) {
        this.$message("请先选择一个节点");
        return;
      }

      jm.collapse_node(selected_id);
    },

    toggle() {
      var selected_id = this.get_selected_nodeid();
      if (!selected_id) {
        this.$message("请先选择一个节点");
        return;
      }

      jm.toggle_node(selected_id);
    },
    handleChange(value) {
      jm.view.setZoom(value / 100);
    },
    goOwner() {
      this.$router.push({
        path: "/owner"
      });
    },
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
            // console.log(value);
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
    loadData(flag) {
      var self = this;
      var id = common.getUrlParam(
        decodeURI(document.location.toString()),
        "id"
      );
      return this.$store.dispatch("getFileData", {
        _id: id,
        flag: flag
      });
    },
    handleCommand(command) {
      if (command == "logout") {
        this.$router.push("/login");
        localStorage.removeItem("accessToken");
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
        theme: this.fileData.file_theme ? this.fileData.file_theme : "primary"
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
      // jm.expand_all();
      jm.screenshot.shootDownload();
    },
    isEditable() {
      var self = this;
      //可编辑
      if (this.editable) {
        //可编辑 我正在编辑
        if (!this.fileData.editingUser) {
          return true;
        } else if (
          this.fileData.editingUser &&
          this.fileData.editingUser._id == _id
        ) {
          return true;
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
          return false;
        }
      } else {
        this.$message({
          type: "error",
          message: self.fileData.editingUser.user_name + "正在编辑"
        });
        return false;
      }
    },
    //右键菜单
    showMenu: function(event) {
      event.preventDefault();
      var self = this;
      var flag = this.isEditable();
      if (flag) {
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
    },
    //保存更改
    saveDetails() {
      var jmdata = jm.get_data();
      var self = this;
      if (this.editable) {
        this.save = "更改正在保存";
        this.$store
          .dispatch("updateDetails", {
            _id: self.id,
            file_details: JSON.stringify(jmdata.data.children),
            file_theme: jm.get_theme(),
            file_direction: self.fileData.file_direction
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
            self.fileData.editingUser = res.data.data.editingUser;
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
    removeEditingUser(flag) {
      var self = this;
      this.$store
        .dispatch("removeEditingUser", {
          file_id: self.id,
          flag: flag
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
            if (flag) {
              var lookTos = [];
              var lookingUser = self.fileData.lookingUser
                ? self.fileData.lookingUser
                : [];
              for (var i in lookingUser) {
                if (lookingUser[i]._id != _id) {
                  lookTos.push(lookingUser[i]._id);
                }
              }
              self.$socket.emit("removeLookingUser", {
                lookTos: lookTos,
                lookingUser: self.fileData.lookingUser
              });
            }
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
      if (this.isEditable()) {
        var selected_node = jm.get_selected_node(); // as parent of new node
        if (!selected_node) {
          this.$message("请先选择一个节点");
          return;
        }

        var nodeid = jsMind.util.uuid.newid();
        var direction = 0;
        if (this.fileData.file_direction == "left") {
          direction = -1;
        } else if (this.fileData.file_direction == "right") {
          direction = 1;
        }
        if (direction) {
          var node = jm.add_node(
            selected_node,
            nodeid,
            "新增主题",
            null,
            null,
            direction
          );
        } else {
          var node = jm.add_node(selected_node, nodeid, "新增主题");
        }
        // this.saveDetails(jm.get_data());
        jm.select_node(nodeid);
        jm.begin_edit(nodeid);
        this.addEditingUser();
      }
    },
    //添加兄弟节点
    addBrother() {
      if (this.isEditable()) {
        var selected_node = jm.get_selected_node();
        if (!selected_node) {
          this.$message("请先选择一个节点");
          return;
        }
        if (!!selected_node && !selected_node.isroot) {
          var nodeid = jsMind.util.uuid.newid();
          var node = jm.insert_node_after(selected_node, nodeid, "新增主题");
          // this.saveDetails(jm.get_data());
          jm.select_node(nodeid);
          jm.begin_edit(nodeid);
          this.addEditingUser();
        }
      }
    },
    //编辑节点
    editNode() {
      if (this.isEditable()) {
        var selected_node = jm.get_selected_node();
        if (!selected_node) {
          this.$message("请先选择一个节点");
          return;
        } else if(selected_node.id == 'root') {
          this.$message("无法编辑根节点");
          return;
        }

        jm.begin_edit(selected_node);
        this.addEditingUser();
      }
    },
    //删除节点
    delNode() {
      if (this.isEditable()) {
        var selected_id = this.get_selected_nodeid();
        console.log(selected_id)
        if (!selected_id) {
          this.$message("请先选择一个节点");
          return;
        }
        else if(selected_id == 'root') {
          this.$message("无法删除根节点");
          return;
        }

        jm.remove_node(selected_id);
        this.addEditingUser();
        // this.saveDetails(jm.get_data());
      }
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
      // this.removeEditingUser(true);
      var self = this;
      this.$socket.emit("quit", {
        file_id: self.id,
        _id: JSON.parse(localStorage.getItem("user"))._id
      });
    },
    resize_jsmind() {
      var editor = document.getElementById("editor");
      editor.scrollTop = (editor.scrollHeight - editor.clientHeight) / 2;
      editor.scrollLeft = (editor.scrollWidth - editor.clientWidth) / 2;
    }
  },
  created: function() {
    var self = this;
    this.loadData(true)
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
            var tos = [];
            var _id = JSON.parse(localStorage.getItem("user"))._id;
            for (var i = 0; i < self.fileData.lookingUser.length; i++) {
              if (self.fileData.lookingUser[i]._id != _id) {
                tos.push(self.fileData.lookingUser[i]._id);
              }
            }
            self.$socket.emit("addLookingUser", {
              tos: tos,
              lookingUser: self.fileData.lookingUser
            });
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
  beforeRouteLeave(to, from, next) {
    var flag = true;
    var self = this;
    this.$store
      .dispatch("removeEditingUser", {
        file_id: self.id,
        flag: flag
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
          if (flag) {
            var lookTos = [];
            var lookingUser = self.fileData.lookingUser
              ? self.fileData.lookingUser
              : [];
            for (var i in lookingUser) {
              if (lookingUser[i]._id != _id) {
                lookTos.push(lookingUser[i]._id);
              }
            }
            self.$socket.emit("removeLookingUser", {
              lookTos: lookTos,
              lookingUser: self.fileData.lookingUser
            });
          }
          next();
        } else {
          self.$message({
            type: "error",
            message: res.data.err
          });

          next(false);
        }
      })
      .catch(err => {
        self.$message({
          type: "error",
          message: "出现了未知的谜团，请重试"
        });
        console.log(err);
        next(false);
      });
  },
  mounted() {
    // var accessToken = localStorage.getItem("accessToken");
    // if (accessToken) {
    //   this.$socket.emit("log", JSON.parse(localStorage.getItem("user"))._id);
    // }
    const self = this;
    this.addEventListeners();
    window.addEventListener("beforeunload", e => self.beforeunloadHandler(e));
    this.$socket.on("addLookingUser", res => {
      // console.log("addLookingUser");
      self.fileData.lookingUser = res.lookingUser;
    });
    this.$socket.on("removeLookingUser", res => {
      // console.log("removeLookingUser");
      self.fileData.lookingUser = res.lookingUser;
    });
    this.$socket.on("addEditingUser", res => {
      // console.log("addEditingUser");
      self.editable = false;
      self.fileData.editingUser = res.editingUser;
      self.fileData.isEdit = true;
    });
    this.$socket.on("removeEditingUser", res => {
      // console.log("removeEditingUser");
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
.footer {
  width: 100%;
  min-width: 1200px;
  position: absolute;
  height: 40px;
  bottom: 0;
  padding: 0;
  display: flex;
  align-items: center;
}

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
    width: 300px;
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
      margin-right: 10px;
    }
  }
  .operation p {
    margin-right: 10px;
    font-size: 16px;
  }
  .operation .el-dropdown-link {
    position: relative;
    display: inline-block;
    padding-left: 20px;
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
  top: 90px;
  left: 0;
  right: 0;
  bottom: 0px; // bottom: 40px;
  padding: 0;
  #jsmind_container {
    width: 100%;
    height: 100%;
    cursor: default;
  } // #jsmind {
  //   width: 600px;
  //   height: 600px;
  //   cursor: default;
  // }
}

// .loading {
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   width: 100%;
//   height: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-size: 40px;
// }
// #online {
//   position: absolute;
//   top: 50px;
//   border: 1px solid red;
//   z-index: 100;
//   right: 0;
// }
//操作栏
.setup {
  position: absolute;
  z-index: 1000;
  bottom: 30px;
  left: 10px;
}

.zoom {
  padding: 0;
  margin-top: 10px;
  display: flex;
  align-items: center;
  .el-input-number {
    display: flex;
    flex-direction: column;
    position: relative;
    height: 110px;
    width: 33px;
    border: 1px solid #dcdfe6;
    background: #f5f7fa;
  }
}

.theme {
  width: 100px;
  padding: 10px 0;
  text-align: center;
  margin-left: 0;
  margin-bottom: 5px;
  color: #fff;
}

.todo {
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fbfbfb;
  padding-left: 5px;
  button {
    margin-left: 0px;
    margin-right: 10px;
  }
}
</style>
