<template>
  <div class="sidebar">
    <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router>
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :key="item.index" :index="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
              <span>{{ subItem.title }}</span>
            </el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :key="item.index" :index="item.index">
            <i :class="item.icon"></i>
            <span>{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      smallFormLabelWidth: "50px",
      formLabelWidth: "120px",
      newFile: {
        name: "",
        partner: "",
        type: ""
      },
      items: [
        {
          icon: "el-icon-file",
          index: "owner",
          title: "我的文件"
        },
        {
          icon: "el-icon-partner",
          index: "partner",
          title: "与我协作"
        },
        {
          icon: "el-icon-friend",
          index: "friend",
          title: "我的好友"
        }
      ]
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  },
  methods: {
    release() {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  width: 200px;
  /* width: 250px; */
  left: 0;
  top: 50px;
  /* padding-top: 30px; */
  bottom: 0;
  background: #fff;
}

.sidebar > ul {
  text-align: center;
  height: 100%;
}
</style>
