<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <Menu v-if="userLogged" />
    </v-navigation-drawer>

    <v-app-bar v-if="userLogged" app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Multimagem R.A</v-toolbar-title>
    </v-app-bar>
    <Content />
  </v-app>
</template>

<script>
import Content from "@/components/template/Content";
import Menu from "@/components/template/Menu";
import { mapState } from "vuex";

export default {
  components: {
    Content,
    Menu,
  },
  data() {
    return {
      drawer: true,
    };
  },
  methods: {},
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
  },
};
</script>


<style>
</style>