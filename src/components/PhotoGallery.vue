<template>
  <v-container
    v-bind:grid-list-sm=true
    fluid
  >
    <v-layout
      column
      align-center
      justify-center
    >
      <v-toolbar
        color='grey darken-3'
        dense
        floating
      >
        <v-text-field
          dark
          v-model='search'
          hide-details
          color="teal accent-3"
          background-color="grey darken-3"
          prepend-icon="search"
          single-line
        ></v-text-field>

        <v-btn
          color="teal accent-3"
          icon
          @click="searchPhotos()"
        >
          <v-icon>fas fa-camera-retro</v-icon>
        </v-btn>
      </v-toolbar>
    </v-layout>

    <v-layout
      row
      wrap
    >
      <v-flex
        v-for="(photo, index) in photos"
        v-bind:key="index"
        xs4
      >
        <photo-card
          @error="snackbar=true"
          class="ma-4"
          v-bind:photo="photo"
        >
        </photo-card>
      </v-flex>
    </v-layout>
    <v-dialog
      v-model="dialog"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="grey darken-3"
        dark
      >
        <v-card-text>
          Loading Images ...
          <v-progress-linear
            indeterminate
            color="teal accent-3"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
      <v-btn
        color="teal accent-3"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from 'axios';
import PhotoCard from './PhotoCard'
import config from '../../config/config.json'

export default {
  data() {
    return {
      photos: [],
      page: 1,
      dialog: false,
      snackbar: false,
      y: 'top',
      x: null,
      mode: '',
      timeout: 6000,
      text: 'Error, Unable To Connect To API',
      search: 'dog'
    }
  },
  components: {
    PhotoCard
  },
  mounted() {
    this.scroll();
  },
  beforeMount() {
    this.fetchImages(this.search).then((data) => {
      this.photos = data.data.photos.photo;
    }).catch(() => {
      this.snackbar = true;
    })
  },
  methods: {
    fetchImages(search) {
      return axios({
        method: 'get',
        url: 'https://api.flickr.com/services/rest',
        params: {
          method: 'flickr.photos.search',
          api_key: config.flickrApiKey.Key,
          text: search,
          extras: 'url_n',
          page: this.page,
          format: 'json',
          nojsoncallback: 1,
          has_geo: 1,
          per_page: 30,
        },
      });
    },
    searchPhotos() {
      if (this.search.trim() == "") {
        this.search = "dog"
      }
      this.dialog = true;
      this.fetchImages(this.search).then((data) => {
        this.photos.splice(0, this.photos.length)
        this.photos.push(...data.data.photos.photo);
        this.dialog = false;
      }).catch(() => {
        this.snackbar = true;
      })
    },
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow = ((document.documentElement.scrollTop + window.innerHeight) / document.documentElement.offsetHeight) >= 0.99;
        if (bottomOfWindow && !this.dialog) {
          this.dialog = true;
          this.page++
          this.fetchImages(this.search).then((data) => {
            this.photos.push(...data.data.photos.photo);
            this.dialog = false;
          })
        }
      };
    },
  }
}
</script>
<style>
</style>
