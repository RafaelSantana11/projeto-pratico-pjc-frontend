<template>
  <v-list>
    <v-list-item class="px-2">
      <v-list-item-avatar>
        <Gravatar email="user@email.com.br" alt="user" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title> Nome do usuário </v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn small icon>
          <v-icon>mdi-logout-variant</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>

    <div v-bind:key="node.text" v-for="node in treeData">
      <v-list-group v-model="node.data.expanded" v-if="node.children.length">
        <template v-slot:activator>
          <v-list-item-action>
            <v-icon>{{ node.data.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="node.text"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-bind:key="child.text"
          v-for="child in node.children"
          @click="onNodeSelect(child)"
        >
          <v-list-item-content>
            <v-list-item-title>{{ child.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
      <v-list-item v-else @click="onNodeSelect(node)">
        <v-list-item-icon>
          <v-icon>{{ node.data.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-title>{{ node.text }}</v-list-item-title>
      </v-list-item>
    </div>
  </v-list>
</template>

<script>
import Gravatar from "vue-gravatar";
export default {
  components: {
    Gravatar,
  },
  data() {
    return {
      treeData: [
        {
          text: "Página inicial",
          children: [],
          data: {
            route: "Home",
            icon: "mdi-home",
            isVisible: true,
            expanded: false,
          },
        },
        {
          text: "Álbuns",
          children: [],
          data: {
            route: "Albums",
            icon: "mdi-bookmark-music",
            isVisible: true,
            expanded: false,
          },
        },
      ],
    };
  },
  methods: {
    onNodeSelect(node) {
      if (node.data.route) {
        this.$router.push({
          name: node.data.route,
          params: node.data,
        });
      }
    },
  },
};
</script>

<style>
</style>