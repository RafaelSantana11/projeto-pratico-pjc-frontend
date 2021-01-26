<template>
  <v-row align="center" justify="center">
    <v-card min-width="350">
      <v-toolbar dark flat>
        <v-toolbar-title>Login</v-toolbar-title>
      </v-toolbar>

      <v-card-text>
        <v-text-field
          v-model="form.email"
          label="E-mail"
          name="email"
          type="email"
          prepend-icon="mdi-email"
        ></v-text-field>

        <v-text-field
          v-model="form.password"
          label="Senha"
          name="password"
          type="password"
          prepend-icon="mdi-lock"
        ></v-text-field>
        <v-btn color="primary" @click="login()" block dark>Entrar</v-btn>
      </v-card-text>
    </v-card>
  </v-row>

</template>

<script>
import { baseApiUrl, userKey } from "@/global";
import axios from "axios";
import { mapActions } from "vuex";

export default {
  components: {},
  name: "Auth",
  data: function () {
    return {
      loading: false,
      showSignup: false,
      form: {},
    };
  },
  methods: {
    ...mapActions("user", ["setUserData"]),

    validateForm() {
      if (!this.form.email || this.form.email === "")
        return "Informe o e-mail de acesso";

      if (!this.form.password || this.form.password === "")
        return "Informe a senha de acesso";

      return null;
    },
    async login() {
      try {
        const error = this.validateForm();

        if (error) throw error;

        this.loading = true;

        const res = await axios
          .create()
          .post(`${baseApiUrl}/authenticate`, this.form, {
            withCredentials: true,
          });

        this.loading = false;

        localStorage.setItem(userKey, JSON.stringify(res.data));

        this.setUserData(res.data);

        this.$router.push({ path: "/" });

      } catch (error) {

        this.loading = false;

        if (error.response) {
          console.log(error.response.data)
        } else if (error.request) {
          console.log(error.request)
        } else {
          console.log(error)
        }
      }
    },
  },
};
</script>

<style scode>
.auth-modal {
  background-color: #fff;
  width: 350px;
  padding: 35px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

  display: flex;
  flex-direction: column;
  align-items: center;
}

.auth-modal img {
  max-width: 250px;
  margin-bottom: 20px;
}

.auth-title {
  font-size: 1.2rem;
  font-weight: 100;
  margin-top: 10px;
  margin-bottom: 15px;
}

.auth-modal input {
  border: 1px solid #bbb;
  width: 100%;
  margin-bottom: 15px;
  padding: 10px 8px;
  border-radius: 4px;
  outline: none;
}
</style>