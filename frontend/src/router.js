import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Explore from './views/Explore.vue'
import Project from './views/Project.vue'
import UserConnect from './views/UserConnect.vue'
import User from './views/User.vue'
import UserProfile from './views/UserProfile.vue'
import StartCampaign from './views/StartCampaign.vue'
import checkout from './views/Checkout.vue'
import ProjectDetails from './views/ProjectDetails.vue'


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
      path: '/project',
      component: Project,
      children: [
        {
          path: '',
          redirect: { name: 'explore' }
        },
        {
          path: ':projId',
          component: ProjectDetails
        },
        {
          path: ':projId/new/:rewordId/checkout',
          component: checkout
        },
        {
          path: ':projId/:tab',
          component: ProjectDetails
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: UserConnect
    },
    {
      path: '/signup',
      name: 'signup',
      component: UserConnect
    },
    {
      path: '/start-campaign',
      name: 'startCampaign',
      component: StartCampaign,
    },
    {
      path: '/user',
      component: User,
      children: [
        {
          path: '',
          redirect: { name: 'home' }
        },
        {
          path: ':userId',
          name: 'userProfile',
          component: UserProfile
        }
      ]
    },
    {
      path: '*',
      redirect: { name: 'home' }
    }
  ]
})
