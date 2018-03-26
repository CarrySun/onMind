<template>
  <div>
    <top-bar namespace="topBar"></top-bar>
    <div class="main">
        <left-menu namespace="leftMenu"></left-menu>
        <div class="right">
            <span class="title">{{pageName}}</span>
            <my-tabel></my-tabel>
        </div>
    </div>
  </div>
</template>

<script>
import {} from "@/assets/js/common.js";
import TopBar from "@/components/TopBar";
import LeftMenu from "@/components/LeftMenu";
import MtFooter from "@/components/Footer";
import MyTabel from "@/components/Tabel";
import { mapState, mapGetters } from "vuex";
export default {
  components: {
    TopBar,
    MtFooter,
    LeftMenu,
    MyTabel
  },
  data() {
    return {
      pageName: '我的好友',
    };
  },
  computed: {
  }
};
</script>

<style scoped>
  
</style>
