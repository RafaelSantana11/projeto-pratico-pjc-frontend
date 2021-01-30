<template>
  <v-card :loading="loading" :disabled="loading">
    <v-toolbar flat>
      <v-app-bar-nav-icon v-if="!dialog"
        ><v-btn title="voltar" icon @click="$router.go(-1)"
          ><v-icon>mdi-keyboard-backspace</v-icon></v-btn
        ></v-app-bar-nav-icon
      >

      <v-card-title>{{ title }}</v-card-title>
    </v-toolbar>

    <v-divider></v-divider>

    <v-card-text>
      <v-row>
        <v-col>
          <v-text-field
            label="Nome:"
            v-model="form.name"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field
            label="Ano de publicação:"
            v-model="form.publicationYear"
            :rules="[rules.required]"
            type="number"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-select
            :loading="loadingArtists"
            v-model="form.ArtistId"
            :items="artistsOptions"
            :rules="[rules.required]"
            label="Artista:"
          ></v-select>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn class="success darken-1">
        <v-icon left>mdi-content-save</v-icon> Salvar</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import { baseApiUrl } from "@/global";
import axios from "axios";
import errorHandler from "@/helpers/error_handler";

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      loadingArtists: false,
      form: {},
      rules: {
        required: (value) => !!value || "Obrigatório.",
      },
      artistsOptions: [],
    };
  },
  methods: {
    setArtistsData(data) {
      this.artistsOptions = data.map((d) => {
        return {
          value: d.id,
          text: d.name,
        };
      });
    },
    async loadArtists() {
      try {
        this.loadingArtists = true;

        this.artistsOptions = [];

        const url = `${baseApiUrl}/artists`;

        const res = await axios.get(url);

        this.setArtistsData(res.data);

        this.loadingArtists = false;
      } catch (error) {
        this.loadingArtists = false;

        const errorHandled = errorHandler.treatError(error);

        await this.$root.$errorDialog(errorHandled, {
          width: "800",
          color: "primary",
        });
      }
    },
  },
  created() {
    this.loadArtists();
  },
};
</script>

<style>
</style>