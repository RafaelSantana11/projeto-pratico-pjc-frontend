<template>
  <div>
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title
          >Listagem dos álbuns cadastrados no sistema</v-toolbar-title
        >

        <v-spacer></v-spacer>
        <v-btn small rounded color="success" @click="openInsertScreen">
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
                      <v-col></v-col>
                    </v-row>

                    <div class="d-flex justify-end align-center flex-wrap">
                      <v-btn color="success" class="mr-2" @click="loadAlbuns">
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
        v-model="filters.currentPage"
        :length="numberOfPages"
        @input="loadAlbuns"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
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
        { text: "Ações", value: "actions", sortable: false },
      ],
      items: [],
      filters: {
        currentPage: 1,
      },
    };
  },
  methods: {
    loadAlbuns() {},
    clearFilters() {},
    openInsertScreen() {},
  },
};
</script>

<style>
</style>