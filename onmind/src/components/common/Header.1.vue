<template>
  <div class="header">
    <div class="logo">
      <i>onMind</i>
    </div>
    <div class="user-info">
      <el-popover placement="bottom" width="350" trigger="click">
        <ul v-if="total" class="hasData">
          <li v-for="(item,index) in notice" :key="index">
            <template v-if="item.type == 'addFriend'">
              <span class="noticeContent"> {{item.fromUser.user_name}} 请求加您为好友</span>
              <div class="listInfo">
                <div class="time">
                  {{item.updateTime | moment("YYYY-MM-DD HH:mm:ss")}}
                </div>
                <div v-if="item.agreed == 1">
                  <el-button size="mini" type="success" plain @click="agreeFriend(item,index, 2)">同意</el-button>
                  <el-button size="mini" type="danger" plain @click="agreeFriend(item,index, 3)">拒绝</el-button>
                </div>
                <div v-else-if="item.agreed == 2">
                  <el-button size="mini" type="success" plain disabled>已同意</el-button>
                </div>
                <div v-if="item.agreed == 3">
                  <el-button size="mini" type="danger" plain disabled>已拒绝</el-button>
                </div>
              </div>
            </template>
            <template v-if="item.type == 'agreeFriend'">
              <span class="noticeContent" v-if="item.agreed == 2"> {{item.fromUser.user_name}} 同意了您的好友请求</span>
              <div class="listInfo">
                <div class="time">
                  {{item.updateTime | moment("YYYY-MM-DD HH:mm:ss")}}
                </div>
              </div>
            </template>
          </li>
        </ul>
        <div v-else class="noData">
          <p>暂无通知</p>
        </div>
        <el-badge :value="total" slot="reference" class="badge">
          <!-- <el-button size="small"><i class="icon el-icon-bell"></i></el-button> -->
          <i class="icon el-icon-bell"></i>
        </el-badge>
      </el-popover>
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          <div class="user-logo">{{user_name.charAt(0)}}</div>
          {{user_name}}
          <i class="el-icon-caret-bottom"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      user_name: JSON.parse(localStorage.getItem("user")).user_name,
      loading: true
    };
  },
  computed: {
    ...mapState(["notice"]),
    total() {
      return this.notice.length;
    }
  },
  created() {
    this.getNotice();
  },
  mounted() {},
  methods: {
    agreeFriend(item, index,agreed) {
      this.$store.dispatch("updateNotice", {
        item: item,
        index: index,
        from_id: item.fromUser._id,
        type: item.type,
        _id: item._id,
        agreed: agreed,
      });
    },
    handleClick(type, event) {
      // console.log(type, event)
    },
    getNotice() {
      var self = this;
      this.$store.dispatch("noticeList", {
        self: self
      });
    },
    handleCommand(command) {
      if (command == "logout") {
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        this.$router.push("/login");
      }
    }
  }
};
</script>
<style scoped lang="scss">
.listInfo {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  .time {
    color: #ddd;
  }
}

.hasData {
  height: 400px;
  li {
    list-style: none;
    padding: 10px;
    border-bottom: 1px solid #f4f4f4;
    &:hover {
      background: #f4f4f4;
    }
  }
  .noticeContent {
    font-size: 16px;
  }
}

.noData {
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

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

.icon {
  font-size: 30px;
  font-weight: bolder;
  cursor: pointer;
}

.badge {
  position: absolute;
  right: 160px;
  top: 5px;
}
</style>