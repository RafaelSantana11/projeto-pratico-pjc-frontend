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
        <v-btn color="primary" block dark>Entrar</v-btn>
      </v-card-text>
    </v-card>
  </v-row>

</template>

<script>

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
  methods: {},
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