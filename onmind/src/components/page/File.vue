<template>
<div>
  <el-container v-if="loading">
    <el-main class="loading">
    onMind&nbsp;&nbsp;&nbsp;<i class="el-icon-loading"></i>
    </el-main>
  </el-container>
  <el-container v-else>
    <el-header>
      <div class="left">
        <a class="logo" href="/">
          <i class="el-icon-arrow-left">onMind</i>
        </a>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <span @click="click" v-if="edited">{{file_title}}</span>
        <el-form :inline-message="true" status-icon  :model="reForm" ref="reForm" :rules="rules" v-else>
          <el-form-item prop="file_title" placeholder="请输入文件名">
            <el-input style="width:auto" v-model="reForm.file_title" placeholder="请输入内容" @keyup.enter.native="reTitle('reForm')"></el-input>
          </el-form-item>
          <input type="text" name="test" style="display:none"/>
        </el-form>
      </div>
      <div class="saveInfo">
        {{saveInfo}}
      </div>
      <div class="user-info">
        <!-- <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            <div class="user-logo">{{user_name.charAt(0)}}</div>
            {{user_name}}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown> -->
      </div>
    </el-header>
    <el-main class="minder-editor">Main</el-main>
  </el-container>
</div>
</template>

<script>
import common from "@/assets/js/common.js";
import Toast from "@/components/common/Toast";
import { mapState, mapGetters } from "vuex";
export default {
  components: {
    Toast
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
      autofocus: false,
      edited: true,
      user_name: JSON.parse(localStorage.getItem("user")).user_name,
      loading: true,
      saveInfo: "所有更改已保存",
      fileData: {},
      reForm: {
        file_title: ''
      },
      id: common.getUrlParam(decodeURI(document.location.toString()), "id"),
      rules: {
        file_title: [
          { validator: validateTitleChange, trigger: ["change"] },
          { validator: validateTitleBlur, trigger: ["blur"] }
        ]
      }
    };
  },
  computed: {
    file_title() {
      this.reForm.file_title = this.fileData.file_title
      return this.fileData.file_title
    }
  },
  methods: {
    reTitle(formName) {
      var self = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          var value = self.reForm.file_title;
          if (value && value === self.file_title) {
          } else if (value) {
            console.log(value)
            self.saveInfo = '正在进行文件重命名'
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
      if (!this.edited) {
        this.autofocus = "autofocus";
      }
    },
    loadData() {
      var self = this;
      var id = common.getUrlParam(
        decodeURI(document.location.toString()),
        "id"
      );
      this.$store.dispatch("getFileData", {
        self: self,
        _id: id
      });
    },
    handleCommand(command) {
      if (command == "loginout") {
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        this.$router.push("/login");
      }
    }
  },
  created: function() {
    this.loadData();
  }
};
</script>
<style scoped lang="scss">
.el-header {
  min-width: 1200px;
  width: 100%;
  background-color: #393f4f;
  position: relative;
  color: #fff;
  text-align: left;
  line-height: 45px;
  height: 45px !important;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .left {
    display: flex;
    .el-input__inner {
      background: transparent;
      border: none;
      color: #fff;
    }
  }
  .saveInfo {
    position: absolute;
    width: 200px;
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
  .user-info {
    font-size: 16px;
    color: #fff;
  }

  .user-info .el-dropdown-link {
    position: relative;
    display: inline-block;
    padding-left: 50px;
    color: #fff;
    cursor: pointer;
    vertical-align: middle;
  }

  .user-info .user-logo {
    /* position: absolute;
  left: 0;
  top: 15px;
  width: 40px;
  height: 40px;
  border-radius: 50%; */
    position: absolute;
    background: #ccc;
    left: 10px;
    top: 8px;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    /* font-size: 16px; */
    /* border-radius: 50%; */
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
  text-align: center;
  line-height: 160px;
}

.loading{
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
.minder-editor {
  position: absolute;
  top: 45px;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
