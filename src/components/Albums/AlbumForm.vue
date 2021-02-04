<template>
  <v-card :loading="loading" :disabled="loading">
    <v-toolbar flat>
      <v-app-bar-nav-icon
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

      <v-row>
        <v-col>
          <v-file-input
            v-model="files"
            ref="files"
            accept="image/png, image/jpeg, image/bmp, image/jpg"
            label="Adicionar mídia do álbum:"
            show-size
            multiple
          ></v-file-input>
        </v-col>
      </v-row>

      <v-row v-if="mode === 'update'">
        <v-col>
          <h2>Imagens do álbum:</h2>
        </v-col>
      </v-row>

      <v-row class="mt-2" v-if="mode === 'update'">
        <v-col v-bind:key="img.id" v-for="img in form.AlbumMedia">
          <v-row class="mt-3">
            <v-col>
              <h3>{{ img.name }}</h3>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn title="Baixar" :href="img.url" fab small target="_blank"
                ><v-icon>mdi-cloud-download</v-icon></v-btn
              >
              <v-btn
                title="Remover"
                @click="deleteFile(img)"
                class="ml-2"
                fab
                small
                ><v-icon>mdi-trash-can</v-icon></v-btn
              >
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn class="success darken-1" @click="save">
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
  computed: {
    albumId() {
      return this.$route.params.id;
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
      files: [],
    };
  },
  methods: {
    save() {
      const errors = this.validateForm();

      if (errors.length) {
        this.$root.$errorDialog(errors, {
          width: "800",
          color: "primary",
        });
      } else {
        this[this.mode](); //chama a função de insert ou update conforme a propriedade mode
      }
    },
    async insert() {
      try {
        this.loading = true;

        let formData = new FormData();

        for (let i = 0; i < this.files.length; i++) {
          formData.append("file", this.files[i]);
        }

        const dataToSend = { ...this.form }; //faz uma cópia do objeto do formulário

        for (const key of Object.keys(dataToSend)) {
          formData.append(key, dataToSend[key]);
        }

        await axios.post(`${baseApiUrl}/albums`, formData);

        this.files = [];

        this.afterSave();

        this.loading = false;
      } catch (error) {
        this.loading = false;

        const errorHandled = errorHandler.treatError(error);

        await this.$root.$errorDialog(errorHandled, {
          width: "800",
          color: "primary",
        });
      }
    },
    async update() {
      try {
        this.loading = true;

        let formData = new FormData();

        for (let i = 0; i < this.files.length; i++) {
          formData.append("file", this.files[i]);
        }

        const dataToSend = { ...this.form };

        for (const key of Object.keys(dataToSend)) {
          formData.append(key, dataToSend[key]);
        }

        await axios.put(`${baseApiUrl}/albums/${this.albumId}`, formData);

        this.afterSave();

        this.loading = false;
      } catch (error) {
        this.loading = false;

        const errorHandled = errorHandler.treatError(error);

        await this.$root.$errorDialog(errorHandled, {
          width: "800",
          color: "primary",
        });
      }
    },
    afterSave() {
      this.form = {}; //limpa o formulário
      this.$router.go(-1); //redireciona para a página anterior
    },
    validateForm() {
      const errors = [];

      if (!this.form.publicationYear)
        errors.push("Ano de publicação obrigatório!");

      if (!this.form.name) errors.push("Nome do album obrigatório!");

      if (!this.form.ArtistId) errors.push("Campo Artista obrigatório!");

      return errors;
    },
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
    async loadAlbumData() {
      try {
        this.loading = true;

        const response = await axios.get(
          `${baseApiUrl}/albums/${this.albumId}`
        );

        console.log(response.data);

        this.setAlbumData(response.data);

        this.loading = false;
      } catch (error) {
        this.loading = false;

        const errorHandled = errorHandler.treatError(error);

        await this.$root.$errorDialog(errorHandled, {
          width: "800",
          color: "primary",
        });
      }
    },
    setAlbumData(data) {
      this.form = { ...data };

      this.loading = false;
    },
    async deleteFile(file) {
      try {
        if (
          !(await this.$root.$confirm(
            "Atenção",
            "Deseja realmente deletar este arquivo do sistema?",
            {
              color: "primary",
            }
          ))
        )
          return;

        this.loading = true;

        await axios.delete(`${baseApiUrl}/albums/${this.albumId}/files`);

        this.deleteFileLocally(file.id);

        this.loading = false;
      } catch (error) {
        this.loading = false;

        const errorHandled = errorHandler.treatError(error);

        await this.$root.$errorDialog(errorHandled, {
          width: "800",
          color: "primary",
        });
      }
    },
    deleteFileLocally(fileId) {
      const index = this.form.AlbumMedia.findIndex(
        (item) => item.id === fileId
      );

      if (index !== -1) this.form.AlbumMedia.splice(index, 1);
    },
  },
  mounted() {
    this.loadArtists();

    if (this.mode === "update") this.loadAlbumData();
  },
};
</script>

<style>
</style>