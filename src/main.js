import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import './registerServiceWorker'
import * as VueGoogleMaps from "vue2-google-maps";
import config from '../config/config.json'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')

Vue.use(VueGoogleMaps, {
  load: {
    key: config.googleMapsApi.key
  }
});

Vue.component("google-map", VueGoogleMaps.Map);
Vue.component("google-marker", VueGoogleMaps.Marker);
