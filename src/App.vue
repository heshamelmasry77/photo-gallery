<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>swingdev </span>
        <span class="font-weight-light">PHOTO GALLERY</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://www.swingdev.io/"
        target="_blank"
        icon
      >
        <v-img
          :src="require('./assets/swingdev.png')"
          contain
        ></v-img>
      </v-btn>
    </v-toolbar>

    <v-content>
      <photo-gallery />
    </v-content>
  </v-app>
</template>

<script>
import PhotoGallery from './components/PhotoGallery'

export default {
  name: 'App',
  components: {
    PhotoGallery
  },
  data() {
    return {
      //
    }
  }
}
</script>
