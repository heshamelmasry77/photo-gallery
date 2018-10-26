<template>
  <v-dialog
    v-model="show"
    transition="dialog-bottom-transition"
    width="50%"
  >
    <v-card tile >
      <v-toolbar
        card
        dark
        color="teal accent-3"
      >
        <v-btn
          icon
          dark
          @click.native="show = false"
        >
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>{{title}}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-img
        :src="photo"
        :lazy-src="photo"
        contain
      >
      </v-img>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['visible', 'photo','title'],
  computed: {
    show: {
      get() {
        return this.visible
      },
      set(value) {
        if (!value) {
          this.$emit('close')
        }
      }
    }
  }
}
</script>
