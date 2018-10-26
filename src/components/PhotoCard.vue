<template>
  <v-hover>
    <v-card
      dark
      slot-scope="{ hover }"
      :class="`elevation-${hover ? 12 : 2}`"
    >
      <v-img
        :src="url"
        :lazy-src="url"
        aspect-ratio="1"
      >
        <v-container
          fill-height
          fluid
        >
          <v-layout fill-height>
            <v-flex
              xs12
              align-end
              flexbox
            >
              <span class="headline">{{title}}</span>
            </v-flex>
          </v-layout>
        </v-container>
      </v-img>
      <v-card-actions class="text-xs-center">
        <v-spacer></v-spacer>
        <v-tooltip top>
          <v-btn
            slot="activator"
            flat
            icon
            color="teal accent-3"
            @click.stop="showImages=true"
          >
            <v-icon dark>fas fa-images
            </v-icon>
          </v-btn>
          <span>author’s other pictures</span>
        </v-tooltip>
        <v-btn
          flat
          icon
          color="teal accent-3"
          @click.stop="showMap=true"
        >
          <v-icon dark>fas fa-map-marked-alt</v-icon>
        </v-btn>
        <v-btn
          flat
          icon
          color="teal accent-3"
          @click.stop="showFullPic=true"
        >
          <v-icon dark>fas fa-expand</v-icon>
        </v-btn>

        <v-btn
          icon
          @click="show = !show"
        >
          <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
        </v-btn>
      </v-card-actions>
      <v-slide-y-transition>
        <v-card-text v-show="show">
          <v-flex xs12>
            <v-layout row>
              <v-flex xs7>
                <v-card-title primary-title>
                  <div>
                    <div class="headline">{{owner_info.realname}}</div>
                    <div>{{owner_info.location}}</div>
                    <div>{{date}}</div>
                  </div>
                </v-card-title>
              </v-flex>
              <v-flex xs5>
                <v-avatar
                  slot="activator"
                  size="125px"
                >
                  <img
                    :src="avatarUrl"
                    alt="Avatar"
                  >
                </v-avatar>
              </v-flex>
            </v-layout>
            <v-divider light></v-divider>
            {{description}}
          </v-flex>
        </v-card-text>
      </v-slide-y-transition>
      <full-screen-modal
        :photo="url"
        :visible="showFullPic"
        @close="showFullPic=false"
        :title="title"
      />
      <map-modal
        :picID="photo.id"
        :visible="showMap"
        @close="showMap=false"
      />
      <show-more-images
        :nsid="owner_info.nsid"
        :visible="showImages"
        :author="owner_info.realname"
        @close="showImages=false"
      />
    </v-card>
  </v-hover>

</template>

<script>
import axios from 'axios';
import FullScreenModal from './FullScreenModal'
import MapModal from './MapModal'
import ShowMoreImages from './ShowMoreImages'
import config from '../../config/config.json'

export default {
  data() {
    return {
      card_info: {},
      owner_info: {},
      show: false,
      showFullPic: false,
      showMap: false,
      showImages: false
    }
  },
  components: {
    FullScreenModal,
    MapModal,
    ShowMoreImages
  },
  props: {
    photo: Object
  },
  watch: {
    photo() {
      if (this.photo) {
        this.fetchInfo(this.photo.id).then(({ data }) => {
          this.card_info = data.photo;
          this.owner_info = this.card_info.owner;
        }).catch(() => {
          this.$emit('error')
        });
      }
    }
  },
  created() {
    this.fetchInfo(this.photo.id).then(({ data }) => {
      this.card_info = data.photo;
      this.owner_info = this.card_info.owner;
    }).catch(() => {
      this.$emit('error')
    });
  },
  computed: {
    avatarUrl() {
      if (this.owner_info.iconserver > 0) {
        return `http://farm${this.owner_info.iconfarm}.staticflickr.com/${this.owner_info.iconserver}/buddyicons/${this.owner_info.nsid}.jpg`;
      }
      else
        return 'https://www.flickr.com/images/buddyicon.gif';

    },
    url() {
      return `https://farm${this.photo.farm}.staticflickr.com/${this.photo.server}/${this.photo.id}_${this.photo.secret}.jpg`
    },
    description() {
      let desc = this.card_info.description
      if (desc) {
        if (desc._content !== "")
          return desc._content;
        else
          return "No Description Available";
      }
      return "No Description Available";
    },
    date() {
      if ('dates' in this.card_info) {
        return this.card_info.dates.taken;
      }
      return "N/A";
    },
    title() {
      if (this.card_info.title) {
        return this.card_info.title._content;
      }
      return "";
    }
  },
  methods: {
    fetchInfo(id) {
      return axios({
        method: 'get',
        url: 'https://api.flickr.com/services/rest',
        params: {
          method: 'flickr.photos.getInfo',
          api_key: config.flickrApiKey.Key,
          photo_id: id,
          format: 'json',
          nojsoncallback: 1
        },
      });
    },
  }
}
</script>
