<template>
  <div class="wrapper">
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <div class="content">
      <transition name="move" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import vHead from "./Header.vue";
import vSidebar from "./Sidebar.vue";
export default {
  components: {
    vHead,
    vSidebar
  },
  mounted() {
    this.socketConnect();
  },
  sockets: {
    login(value) {
      console.log(value);
    }
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
