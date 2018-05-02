import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Explore from './views/Explore.vue'
import Project from './views/Project.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/explore',
      name: 'explore',
      component: Explore
    },
    {
      path: '/projects',
      children: [
        {
          path: '',
          redirect: { name: 'explore' }
        },
        {
          path: ':id',
          component: Project
        }
      ]
    }
  ]
})
