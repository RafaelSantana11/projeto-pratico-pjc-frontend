<template>
  <v-card flat>
    <v-toolbar flat>
      <v-card-title>Ver detalhes de um artista</v-card-title>

      <v-spacer></v-spacer>

      <v-app-bar-nav-icon
        ><v-btn title="voltar" icon @click.stop="$emit('close-dialog')"
          ><v-icon>mdi-close</v-icon></v-btn
        ></v-app-bar-nav-icon
      >
    </v-toolbar>

    <v-divider></v-divider>

    <v-card-text>
      <v-row class="mt-3">
        <v-col>
          <h3>Dados do artista </h3>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          Nome: <b>{{ artist.name }}</b>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          Banda: <b>{{ artist.MusicalGroup.name }}</b>
        </v-col>
      </v-row>

      <v-row>
        <v-col> Albuns do artista (no sistema): </v-col>
      </v-row>

      <v-row>
        <v-col v-bind:key="album.id" v-for="album in artist.Albums">
          {{ album.name }} ({{album.publicationYear}})
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    artist: {
      type: Object,
      required: true,
    },
  },
  watch: {
    artist(value) {
      if (value) this.artist = value;
    },
  },
};
</script>

<style>
</style>