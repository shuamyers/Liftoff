import Vue from 'vue'
import Vuex from 'vuex'
import ProjStore from './ProjStore.js'
import UserStore from './UserStore.js'
import PledgeStore from './PledgeStore.js'
import CommentStore from './CommentStore.js'
import EditProjStore from './EditProjStore.js'


Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    ProjStore,
    UserStore,
    PledgeStore,
    CommentStore,
    EditProjStore
  }
})
