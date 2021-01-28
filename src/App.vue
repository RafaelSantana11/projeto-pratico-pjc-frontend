<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <Menu v-if="userData" />
    </v-navigation-drawer>

    <v-app-bar v-if="userData" app>
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
import { mapState, mapActions } from "vuex";
import { userKey } from "@/global";

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
      drawer: this.userData ? true : false,
    };
  },
  methods: {
    ...mapActions("user", ["setUserData"]),
    verifyUserLogged() {
      if (!this.userData) {
        const userDataInLocalStorage = JSON.parse(
          localStorage.getItem(userKey)
        );

        if (userDataInLocalStorage) {
          this.setUserData(userDataInLocalStorage);
        } else {
          this.$router.push({ name: "Auth" });
        }
      }
    },
  },
  computed: {
    ...mapState("user", {
      userData: (state) => state.data,
    })
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