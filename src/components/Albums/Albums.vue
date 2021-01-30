<template>
  <div>
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title
          >Listagem dos álbuns cadastrados no sistema</v-toolbar-title
        >

        <v-spacer></v-spacer>
        <v-btn small text @click="openInsertScreen">
          Cadastrar novo <v-icon right dark> mdi-plus </v-icon></v-btn
        >
      </v-toolbar>

      <v-card-text>
        <v-data-table
          :headers="headers"
          :loading="loading"
          :items="items"
          item-key="id"
          hide-default-footer
          disable-pagination
        >
          <template v-slot:top>
            <v-expansion-panels class="mb-5" :value="1">
              <v-expansion-panel>
                <v-expansion-panel-header> Filtros </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-container fluid>
                    <v-row>
                      <v-col>
                        <v-text-field
                          label="Buscar por álbum"
                          v-model="filters.name"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col>
                        <v-text-field
                          label="Buscar por cantor"
                          v-model="filters.artistName"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <div class="d-flex justify-end align-center flex-wrap">
                      <v-btn color="primary" class="mr-2" @click="loadAlbuns">
                        <v-icon left>mdi-filter</v-icon> Filtrar</v-btn
                      >
                      <v-btn @click="clearFilters"
                        ><v-icon left>mdi-eraser</v-icon> Limpar</v-btn
                      >
                    </div>
                  </v-container>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <v-btn icon title="Detalhes">
              <v-icon> mdi-eye </v-icon>
            </v-btn>

            <v-btn icon title="Editar" @click="openUpdateScreen(item.id)">
              <v-icon> mdi-pencil </v-icon>
            </v-btn>

            <v-btn icon title="Excluir" @click="deleteAlbum(item.id)">
              <v-icon> mdi-delete </v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <div class="text-center mt-2">
      <v-pagination
        circle
        v-model="filters.currentPage"
        :length="numberOfPages"
        @input="loadAlbuns"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl } from "@/global";
import errorHandler from "@/helpers/error_handler";

export default {
  computed: {
    numberOfPages() {
      return Math.ceil(this.totalRows / this.resultsPerPage);
    },
  },
  data() {
    return {
      resultsPerPage: 5,
      totalRows: 0,
      loading: false,
      headers: [
        { text: "ID", value: "id" },
        { text: "Nome", value: "name" },
        { text: "Artista", value: "artistName" },
        { text: "Publicado em", value: "publicationYear" },
        { text: "Ações", value: "actions", sortable: false },
      ],
      items: [],
      filters: {
        name: null,
        artistName: null,
        currentPage: 1,
      },
    };
  },
  methods: {
    async loadAlbuns(page) {
      try {
        this.loading = true;

        let currentPage = page ? page : 1;

        const params = {
          currentPage: currentPage,
          ...this.filters,
        };

        let url = `${baseApiUrl}/albums`;

        const response = await axios.get(url, { params });

        this.totalRows = response.data.count ? response.data.count : 0;

        this.setResponseData(response.data.rows);

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
    setResponseData(data) {
      const copyOfData = [...data];

      this.items = copyOfData.map((item) => {
        item.artistName = item.Artist.name;

        return item;
      });

      this.loading = false;
    },
    clearFilters() {
      this.filters = {
        name: null,
        artistName: null,
        currentPage: 1,
      },

      this.loadAlbuns();
    },
    openInsertScreen() {
      this.$router.push("/albuns/cadastrar");
    },
    openUpdateScreen(albumId) {
      this.$router.push(`/albuns/editar/${albumId}`);
    },
    deleteAlbum() {},
  },
  created() {
    this.loadAlbuns();
  },
};
</script>

<style>
</style>