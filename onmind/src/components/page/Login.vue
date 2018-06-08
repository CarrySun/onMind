<template>
  <div class="login-wrap">
    <div class="ms-title">
      <i>On Mind</i>
    </div>
    <div class="ms-login">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="登录" name="log">
          <el-form :model="form" :rules="logRules" ref="logForm" label-width="0px" class="demo-form">
            <el-form-item prop="user_email">
              <el-input type="email" v-model="form.user_email" placeholder="邮箱"></el-input>
            </el-form-item>
            <el-form-item prop="user_password" style="position:relative">
              <el-input type="password" class="input" placeholder="密码" maxlength="16" v-model="form.user_password" @keyup.enter.native="log('logForm')"></el-input>
              <div class="forgetBtn" @click="goForget">忘记密码</div>
            </el-form-item>
            <div class="login-btn">
              <el-button type="primary" :disabled="loging" @click="log('logForm')">{{loging?'登录中':'登录'}}</el-button>
            </div>
          </el-form>

          <el-dialog title="忘记密码" :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="forgetForm" :rules="regRules"  ref="forgetForm" label-width="0px" class="demo-form">
              <el-form-item prop="user_email">
                <el-input type="email" placeholder="邮箱" v-model="forgetForm.user_email"></el-input>
              </el-form-item>
              <el-form-item prop="verifyCode">
                <el-input placeholder="邮箱验证码" v-model="forgetForm.verifyCode" class="input-with-select">
                  <el-button slot="append" @click="sendCodeByForget">{{btnText}}</el-button>
                </el-input>
              </el-form-item>
              <el-form-item prop="user_password">
                <el-input type="password" placeholder="密码" maxlength="16" v-model="forgetForm.user_password" @keyup.enter.native="forget('forgetForm')"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="cancel()">取 消</el-button>
              <el-button type="primary" :disabled="forgeting" @click="forget('forgetForm')">{{forgeting?'重置密码中':'重置密码'}}</el-button>
            </div>
          </el-dialog>

        </el-tab-pane>
        <el-tab-pane label="注册" name="reg">
          <el-form :model="form" :rules="regRules" ref="regForm" label-width="0px" class="demo-form">
            <el-form-item prop="user_email">
              <el-input type="email" placeholder="邮箱" v-model="form.user_email"></el-input>
            </el-form-item>
            <el-form-item prop="verifyCode">
              <el-input placeholder="邮箱验证码" v-model="form.verifyCode" class="input-with-select">
                <el-button slot="append" @click="sendCode">{{btnText}}</el-button>
              </el-input>
            </el-form-item>
            <el-form-item prop="user_name">
              <el-input v-model="form.user_name" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item prop="user_password">
              <el-input type="password" placeholder="密码" maxlength="16" v-model="form.user_password" @keyup.enter.native="reg('regForm')" ></el-input>
            </el-form-item>
            <div class="login-btn">
              <el-button type="primary" :disabled="reging" @click="reg('regForm')">{{reging?'注册中':'注册'}}</el-button>
            </div>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data: function() {
    var validatePwd = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入密码"));
      }
      var regex = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
      if (!regex.test(value)) {
        callback(
          new Error("密码必须同时只含有数字和字母，且长度要在8-16位之间")
        );
      } else {
        callback();
      }
    };
    var validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入用户名"));
      } else {
        this.$store
          .dispatch("isNameRepeat", {
            user_name: this.form.user_name
          })
          .then(data => {
            if (data.success) {
              callback();
            } else {
              callback(
                new Error("此用户名已存在")
              );
            }
          })
          .catch(err => {
            callback(
              new Error("网络错误"+err)
            );
          });
      }
    };
    return {
      loging: false,
      reging: false,
      forgeting: false,
      dialogFormVisible: false,
      disabled: false,
      btnText: "获取验证码",
      activeName: "log",
      form: {
        user_name: "",
        user_password: "",
        user_email: "",
        verifyCode: ""
      },
      forgetForm: {
        user_password: "",
        user_email: "",
        verifyCode: ""
      },
      formLabelWidth: "120px",
      forgetRules: {
        user_email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        user_password: [{ validator: validatePwd, trigger: "blur" }],
        verifyCode: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ]
      },
      logRules: {
        user_email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        user_password: [{ validator: validatePwd, trigger: "blur" }]
      },
      regRules: {
        user_name: [{ validator: validateName, trigger: ["blur", "change"] }],
        user_password: [{ validator: validatePwd, trigger: "blur" }],
        verifyCode: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ],
        user_email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  created() {},
  computed: {},
  methods: {
    goForget() {
      this.dialogFormVisible = true;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    timer() {
      if (this.time > 0) {
        this.time--;
        this.btnText = this.time + "s后重新获取";
        setTimeout(this.timer, 1000);
      } else {
        this.time = 0;
        this.btnText = "获取验证码";
        this.disabled = false;
      }
    },
    log(formName) {
      const self = this;
      this.loging = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch("log", {
            user_email: this.form.user_email,
            user_password: this.form.user_password,
            self: self
          });
        } else {
          this.loging = false;
          console.log("error submit!!");
          return false;
        }
      });
    },
    sendCodeByForget() {
      const self = this;
      if (this.disabled) {
      } else {
        var regEmail = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
        if (this.forgetForm.user_email == "") {
          alert("请输入邮箱");
        } else if (!regEmail.test(this.forgetForm.user_email)) {
          alert("邮箱格式不正确");
        } else {
          this.time = 60;
          this.disabled = true;
          this.timer();
          this.$store.dispatch("verifyForget", {
            user_email: this.forgetForm.user_email,
            self: self
          });
        }
      }
    },
    cancel() {
      this.forgetForm = {
        user_password: "",
        user_email: "",
        verifyCode: ""
      };
      this.dialogFormVisible = false;
    },
    forget(formName) {
      const self = this;
      this.forgeting = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch("forget", {
            user_email: this.forgetForm.user_email,
            user_password: this.forgetForm.user_password,
            verifyCode: this.forgetForm.verifyCode,
            self: self
          });
        } else {
          this.forgeting = false;
          console.log("error submit!!");
          return false;
        }
      });
    },
    sendCode() {
      const self = this;
      if (this.disabled) {
      } else {
        // [\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?
        var regEmail = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
        if (this.form.user_email == "") {
          alert("请输入邮箱");
        } else if (!regEmail.test(this.form.user_email)) {
          alert("邮箱格式不正确");
        } else {
          this.time = 60;
          this.disabled = true;
          this.timer();
          this.$store.dispatch("verify", {
            user_email: this.form.user_email,
            self: self
          });
        }
      }
    },
    reg(formName) {
      const self = this;
      this.reging = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch("reg", {
            user_email: this.form.user_email,
            user_name: this.form.user_name,
            user_password: this.form.user_password,
            verifyCode: this.form.verifyCode,
            self: self
          });
        } else {
          this.reging = false;
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
}

.ms-title {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -230px;
  text-align: center;
  font-size: 40px;
  color: #fff;
}

.ms-login {
  position: absolute;
  left: 50%;
  /* right: 50%; */
  top: 50%;
  width: 300px;
  margin: -150px 0 0 -170px;
  padding: 20px;
  padding-bottom: 40px;
  border-radius: 5px;
  background: #fff;
}

.login-btn {
  text-align: center;
}

.login-btn button {
  margin-top: 15px;
  width: 100%;
  height: 36px;
}
.forgetBtn {
  position: absolute;
  top: 0;
  right: 5px;
  color: #ccc;
  font-size: 14px;
  cursor: pointer;
  z-index: 100;
}
</style>
