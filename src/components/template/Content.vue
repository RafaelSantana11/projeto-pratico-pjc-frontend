<template>
  <v-main id="app">
    <v-container :class="fillHeight">
      <router-view></router-view>
    </v-container>
  </v-main>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("user", {
      userData: (state) => state.data,
    }),
    userLogged() {
      let user = this.userData;
      if (user) return user;

      user = JSON.parse(localStorage.getItem("__user_logged"));

      return user;
    },
    fillHeight() {
      if (!this.userLogged) return "fill-height";
      return "";
    },
  },
};
</script>

<style scoped>
#app {
  background-color: #fafafa;
  height: 100vh;
}
</style>