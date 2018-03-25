<template>
  <div>
    <toast namespace="toastModule"></toast>
    <top-bar namespace="topBar"></top-bar>
    <div class="main">
        <left-menu namespace = "leftMenu"></left-menu>
        <file-list></file-list> 
    </div>
  </div>
</template>

<script>
import {} from "@/assets/js/common.js";
import TopBar from "@/components/TopBar";
import LeftMenu from "@/components/LeftMenu";
import FileList from "@/components/FileList";
import Toast from '@/components/Toast'
import { mapState, mapGetters } from "vuex";
export default {
  components: {
    TopBar,
    LeftMenu,
    FileList,
    Toast
  },
  methods: {
    loadData(){
      this.$store.dispatch("getData");
    }
  },
  mounted:function(){
    this.loadData();
  }
};
</script>
