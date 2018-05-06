<template>
  <div class="header">
    <div class="logo"><i>onMind</i></div>
    <div class="user-info">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          <div class="user-logo" >{{user_name.charAt(0)}}</div>
          {{user_name}}
          <i class="el-icon-caret-bottom"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user_name:JSON.parse(localStorage.getItem("user")).user_name
    };
  },
  created() {
  },
  computed: {
  },
  methods: {
    handleCommand(command) {
      if (command == "loginout") {
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        this.$router.push("/login");
      }
    }
  }
};
</script>
<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  font-size: 22px;
  line-height: 50px;
  color: #fff;
}

.header .logo {
  float: left;
  width: 258px;
  text-align: center;
}

.user-info {
  float: right;
  padding-right: 50px;
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
  background: #CCC;
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
</style>
