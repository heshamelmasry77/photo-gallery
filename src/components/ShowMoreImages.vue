<template>
  <v-dialog
    v-model="show"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card tile>
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
        <v-toolbar-title>{{author}}'s Other Work</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-flex
        xs12
        sm6
        offset-sm3
      >
        <v-container
          grid-list-sm
          fluid
        >
          <v-layout
            row
            wrap
          >
            <v-flex
              v-for="(n,i) in images"
              :key="i"
              xs4
              d-flex
            >
              <v-card
                flat
                tile
                class="d-flex"
              >
                <v-img
                  :src="n"
                  :lazy-src="n"
                  aspect-ratio="1"
                  class="grey lighten-2"
                >
                  <v-layout
                    slot="placeholder"
                    fill-height
                    align-center
                    justify-center
                    ma-0
                  >
                    <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                    ></v-progress-circular>
                  </v-layout>
                </v-img>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <div style="flex: 1 1 auto;"></div>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios';
import config from '../../config/config.json'

export default {
  props: ['nsid', 'visible','author'],
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
  },
  data() {
    return {
      images: [],
      photoObjs: []
    }
  },
  watch: {
    nsid() {
      if (this.nsid) {
        this.fetchMorePhotos(this.nsid).then(({ data }) => {
          this.photoObjs.splice(0,this.photoObjs.length)
          this.images.splice(0,this.images.length)
          this.photoObjs.push(...data.photos.photo);
          this.photoObjs.forEach(photo => {
            this.images.push(`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`);
          })
        }).catch(err=>{
          console.log(err);
        })
      }
    }
  },
  methods: {
    fetchMorePhotos() {
      return axios({
        method: 'get',
        url: 'https://api.flickr.com/services/rest',
        params: {
          method: 'flickr.photos.search',
          api_key: config.flickrApiKey.Key,
          user_id: this.nsid,
          page: 1,
          format: 'json',
          nojsoncallback: 1,
          per_page: 9,
        },
      });
    },
  }
}
</script>
