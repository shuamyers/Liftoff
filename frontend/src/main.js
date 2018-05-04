import Vue from 'vue'
import filter from './vueFilters'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './registerServiceWorker'
import Vuetify from 'vuetify'

import moment from 'moment'

import './css/main.css'
import 'vuetify/dist/vuetify.min.css'
 
Vue.use(Vuetify)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
