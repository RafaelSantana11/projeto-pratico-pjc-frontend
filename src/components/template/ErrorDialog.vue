<template>
  <v-dialog
    v-model="dialog"
    :max-width="options.width"
    :style="{ zIndex: options.zIndex }"
    @keydown.esc="cancel"
  >
    <v-card>
      <v-toolbar dark :color="options.color" dense flat>
        <v-toolbar-title>Atenção</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-list flat v-if="isAnArray">
          <v-list-item v-for="m in message" :key="m">
            <v-list-item-icon>
              <v-icon color="error">mdi-close</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ m }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list flat v-else>
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="error">mdi-close</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ message }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions class="pt-0">
        <v-spacer></v-spacer>
        <v-btn color="primary darken-1" text @click.native="agree">OK</v-btn>
        <v-btn color="grey" text @click.native="cancel">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: "ErrorDialog",
  data: () => ({
    dialog: false,
    resolve: null,
    reject: null,
    message: null,
    options: {
      color: "primary",
      width: 290,
      zIndex: 200,
    },
  }),
  methods: {
    open(message, options) {
      this.dialog = true;
      this.message = message;
      this.options = Object.assign(this.options, options);
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },

    agree() {
      this.resolve(true);
      this.dialog = false;
    },
    cancel() {
      this.resolve(false);
      this.dialog = false;
    },
  },
  computed: {
    isAnArray() {
      return Array.isArray(this.message);
    },
  },
};
</script>
