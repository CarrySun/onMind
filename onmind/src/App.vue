<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "app",
  mounted() {
    this.socketConnect();
  },
  methods: {
    socketConnect() {
      var accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        this.$socket.emit("log", JSON.parse(localStorage.getItem("user"))._id);
      }
    }
  }
};
</script>
<style>
@import "./assets/css/main.scss";
@import "./assets/css/color-blue.css";
</style>
