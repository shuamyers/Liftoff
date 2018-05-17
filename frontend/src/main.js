import filter from './vueFilters'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './registerServiceWorker'
import Vuetify from 'vuetify'
import VueObserveVisibility from 'vue-observe-visibility'
import VueQuillEditor from 'vue-quill-editor'
import moment from 'moment'

// require styles
import './css/main.css'
import 'vuetify/dist/vuetify.min.css'


Vue.use(Vuetify)
Vue.use(VueObserveVisibility)
Vue.use(VueQuillEditor, /* { default global options } */)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
