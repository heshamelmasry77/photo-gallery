<template>
  <v-dialog
    v-model="show"
    scrollable
    width="50%"
  >
    <v-card>
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
        <v-toolbar-title>Photo Location</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <google-map
        :center="center"
        :zoom="7"
        style="width: 100%; height: 500px"
      >
        <google-marker
          v-for=" (m, i) in markers"
          :key='i'
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="center=m.position"
        ></google-marker>
      </google-map>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios';
import config from '../../config/config.json'

export default {
  name: "MapModal",
  data() {
    return {
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
    };
  },
  props: ['picID', 'visible'],
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
  watch: {
    picID() {
      if (this.picID) {
        this.fetchGeoPosition(this.picID).then(({ data }) => {
          this.addMarker(data.photo.location);
        })
      }
    }
  },
  created() {
    this.fetchGeoPosition(this.picID).then(({ data }) => {
      this.addMarker(data.photo.location);
    }).catch(err => {
      console.log(err);
    })
  },
  methods: {
    addMarker(coord) {
      const marker = {
        lat: +coord.latitude,
        lng: +coord.longitude
      };
      this.markers.push({ position: marker });
      this.center = marker;
    },
    fetchGeoPosition(id) {
      return axios({
        method: 'get',
        url: 'https://api.flickr.com/services/rest',
        params: {
          method: 'flickr.photos.geo.getLocation',
          api_key: config.flickrApiKey.Key,
          photo_id: id,
          format: 'json',
          nojsoncallback: 1
        },
      });
    }
  }
};
</script>