<template>
  <span class="vue-contextmenu-listWrapper" :class="'vue-contextmenuName-' + contextMenuData.menuName">
    <div class="head">
      <div class="headItem"><i class="el-icon-setting menu-icon"></i></div>
    </div>
    <li v-for="(item,index) in contextMenuData.menulists" :key="index" class="context-menu-list" @click.stop="fnHandler(item)">
        <div>
          <i :class="item.icoName"></i><span>{{item.btnName}}</span>
        </div>
        <div>
          <span>{{item.shortcut}}</span>
        </div>
    </li>
  </span>
</template>
<script>
export default {
  props: {
    contextMenuData: {
      type: Object,
      requred: false,
      default() {
        return {
          menuName: null,
          axios: {
            x: null,
            y: null
          },
          menulists: []
        };
      }
    },
    transferIndex: {
      type: Number,
      default: 0
    }
  },
  watch: {
    "contextMenuData.axios"(val) {
      var x = val.x;
      var y = val.y;
      var _this = this;
      var index = _this.transferIndex;
      var menuName = "vue-contextmenuName-" + _this.contextMenuData.menuName;
      var menu = document.getElementsByClassName(menuName)[index];
      menu.style.display = "block";
      menu.style.left = x + "px";
      menu.style.top = y + "px";
      var height = document.body.clientHeight
      var width = document.body.clientWidth
      if(height -y < 200) {
        menu.style.top = height - 200 +"px";
      }
      if(width -x < 250) {
        menu.style.left = width - 400 +"px";
      }
      document.addEventListener(
        "mouseup",
        function() {
          menu.style.display = "none";
        },
        false
      );
    }
  },
  methods: {
    fnHandler(item) {
      this.$emit(item.fnHandler);
    }
  }
};
</script>
<style scoped lang="scss">
.head {
  border-bottom: 3px #f0f5f7 solid;
  padding: 0px 6px;
  margin-bottom: 5px;
}
.headItem {
  display: inline-block;
  vertical-align: top;
  width: 35px;
  height: 35px;
  position: relative;
  margin: 0px 2px 2px 2px;
}
.menu-icon {
  font-size: 24px;
  color: #2eb5e5;
  transition: all 80ms ease-in-out;
  cursor: pointer;
  position: absolute;
  top: 5px;
  left: 6px;
}
.headItem::before {
  position: absolute;
  width: 100%;
  height: 3px;
  background: #2eb5e5;
  left: 0px;
  bottom: -6px;
  content: "";
}
.vue-contextmenu-listWrapper {
  background: rgba($color: #fff, $alpha: 0.95);
  box-shadow: 2px 2px 2px #cccccc;
  display: none;
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
}
li {
  width: 230px;
  height: 35px;
  line-height: 35px;
  text-decoration: none;
  list-style: none;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding:0 10px;
  font-size: 12px;
  div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  i{
    padding-right: 5px;
  }
}
li:hover {
  background: #f0f5f7;
}
</style>
