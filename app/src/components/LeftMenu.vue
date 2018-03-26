<template>
  <div class="left-menu">
    <div class="primary-menu">
      <div class="primary-menu-content">
        <ul class="nav-menu">
          <li>
            <button class="new" @click = "choice">新建</button>
            <div class="menu">
              <ul>
                <li @click="newFile('xmind')"><span>思维导图</span></li>
                <li @click="newFile('tree')"><span>流程图</span></li>
              </ul>
            </div>
          </li>
          <li :class="{active: primaryType === 'owner'}">
            <a href="owner.html">
              <img class="logo" src="../assets/images/owner/file.svg">
              我的文件</a>
          </li>
          <li :class="{active: primaryType === 'partner'}">
            <a href="partner.html">
              <img class="logo" src="../assets/images/owner/partner.svg">
              与我协作
              </a>
          </li>
          <li :class="{active: primaryType === 'friend'}">
            <a href="friend.html">
              <img class="logo" src="../assets/images/owner/friend.svg">
              我的好友
              </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["namespace"],
  computed: {
    // ...mapState(['type','src']),
    ...mapState({
      type(state) {
        return state[this.namespace].type;
      }
    }),
    primaryType() {
      switch (this.type){
        case "owner": return "owner"
        case "partner": return "partner"
        case "friend": return "friend"
      }
    }
  },
  methods: {
    choice(e){
      if (e.target.nextElementSibling.style.display == "block") {
        e.target.nextElementSibling.style.display = "none";
      } else {
        e.target.nextElementSibling.style.display = "block";
      }
    },
    newFile(type) {
      console.log(type)
      var div = document.getElementsByClassName('menu')[0]
      div.style.display = "none"
      window.open("file.html")
    }
  }
};
</script>

<style scoped lang="less">
.left-menu {
  position: absolute;
  left: 0;
  top: 80px;
  height: calc(100% - 80px);
  .primary-menu {
    .primary-menu-content {
      overflow: hidden;
      width: 250px;
      display: flex;
      justify-content: center;
      .nav-menu {
        overflow: hidden;
        list-style: none;
        .logo {
          width: 20px;
          margin-right: 5px;
        }
        li {
          text-align: center;
          font-weight: 300;
          margin-top: 20px;
          button {
            background: #4386f5;
            color: #fff;
            font-size: 16px;
            padding: 5px 40px;
            border-radius: 5px;
            opacity: 0.8;
          }
          button:hover {
            opacity: 1;
            cursor: pointer;
          }
          button:active,
          button:focus {
            outline: none;
          }
          a {
            opacity: 0.7;
            font-weight: 300;
            height: 30px;
            opacity: 0.6;
            color: #000;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          &.active {
            opacity: 1;
            a {
              font-weight: 600;
              opacity: 1;
            }
          }
          &:hover {
            cursor: pointer;
            opacity: 1;
            a {
              opacity: 1;
            }
          }
        }
      }
    }
  }
}

.menu {
  // visibility: hidden;
  display: none;
  position: absolute;
  left: 70px;
  width: 110px;
  z-index: 5;
  background: #fff;
  border-radius: 5px;
}
.menu li:hover {
  cursor: pointer;
  background: #ccc;
}
.menu li {
  margin-top: 5px !important;
  padding: 7px 10px;
  cursor: default;
  color: #444;
  line-height: 20px;
}
.menu li.sep {
  margin: 3px 0;
  padding: 0;
  height: 1px;
  background: #e7e7e7;
}
</style>
