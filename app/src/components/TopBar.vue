<template>
  <div class="top-bar">
    <div class="primary-bar" :class="primaryType">
      <div class="primary-bar-content">
        <div class="onMind left">onMind</div>
        <!-- <ul class="nav-bar center">
          <li :class="{active: primaryType === 'home'}">
            <a href="homePage.html">首页</a>
          </li>
          <li :class="{active: primaryType === 'write'}">
            <a href="#">文字识别</a>
          </li>
          <li :class="{active: primaryType === 'people'}">
            <a href="#">人物属性</a>
          </li>
          <li :class="{active: primaryType === 'content'}">
            <a href="#">内容分析</a>
          </li>
        </ul> -->
        <img class="avatar" src="../assets/images/avatar/A.jpg">
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["namespace"],
  computed: {
    ...mapState({
      type(state) {
        return state[this.namespace].type;
      },
    }),
    primaryType() {
      return "home";
    },
    showSecondaryBar() {
      return this.type !== "people";
    }
  }
};
</script>

<style scoped lang="less">
.top-bar {
  min-width: 1200px;

  .primary-bar {
    &.home {
      background-image: linear-gradient(104deg, #68cbff, #6696ff 72%, #6680ff);
    }
    &.write {
      background-image: linear-gradient(104deg, #68cbff, #6696ff 72%, #6680ff);
    }
    &.content {
      background-image: linear-gradient(103deg, #37e4c1, #50c1f3);
    }
    &.people {
      background-image: linear-gradient(284deg, #7973ff, #e781f7);
    }
    .primary-bar-content {
      overflow: hidden;
      margin: 0 auto;
      position: relative;
      width: 1200px;
      height: 80px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .onMind {
        width: 122px;
        height: 33px;
        line-height: 33px;
        font-size: 30px;
        font-weight: 500;
        font-style: italic;
        color: #ffffff;
      }
      .nav-bar {
        height: 30px;
        font-size: 14px;
        color: #ffffff;
        overflow: hidden;
        list-style: none;
        li:last-child {
          margin-right: 96px;
        }
        li {
          font-weight: 300;
          height: 30px;
          float: left;
          margin-left: 96px;
          opacity: 0.7;
          a {
            font-weight: 300;
            height: 30px;
            opacity: 0.7;
            color: #fff;
          }
          &.active {
            opacity: 1;
            border-bottom: 2px solid #fff;
            a {
              opacity: 1;
            }
          }
          &:hover {
            cursor: pointer;
            opacity: 1;
            border-bottom: 2px solid #fff;
          }
        }
      }
      .avatar{
        width: 60px;
        border:5px solid transparent;
        border-radius: 30px;
        object-fit: contain;
      }
      .avatar:hover{
        border:5px solid #aaa;
        cursor: pointer;
      }
    }
  }
}
</style>
