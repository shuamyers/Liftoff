import Vue from 'vue'
import filter from './vueFilters'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './registerServiceWorker'
import Vuetify from 'vuetify'
import axios from 'axios'
import moment from 'moment'
import './css/main.css'
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false

window.axios = axios.create({
    withCredentials: true
});

Vue.use(Vuetify);

import { LOGIN } from "./store/UserStore.js";

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    this.$store.dispatch({type: LOGIN})
}
}).$mount('#app');