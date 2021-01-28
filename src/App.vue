<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <Menu v-if="userLogged" />
    </v-navigation-drawer>

    <v-app-bar v-if="userLogged" app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>PJC-MT - Frontend</v-toolbar-title>
    </v-app-bar>
    <Content />
    <ConfirmDialog ref="confirmDialog"></ConfirmDialog>
    <ErrorDialog ref="errorDialog"></ErrorDialog>
  </v-app>
</template>

<script>
import Content from "@/components/template/Content";
import Menu from "@/components/template/Menu";
import { mapState } from "vuex";

import ConfirmDialog from "@/components/template/ConfirmDialog";
import ErrorDialog from "@/components/template/ErrorDialog";

export default {
  components: {
    Content,
    Menu,
    ConfirmDialog,
    ErrorDialog,
  },
  data() {
    return {
      drawer: this.userLogged ? true : false,
    };
  },
  methods: {
    verifyUserLogged() {
      if (!this.userLogged) this.$router.push("/login");
    },
  },
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
  mounted() {
    this.$root.$confirm = this.$refs.confirmDialog.open;
    this.$root.$errorDialog = this.$refs.errorDialog.open;
  },
  created() {
    this.verifyUserLogged();
  },
};
</script>


<style>
</style>