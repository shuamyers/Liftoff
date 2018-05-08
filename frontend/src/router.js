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
import Basics from './components/open-proj/Basics.vue'
import Story from './components/open-proj/Story.vue'
import Rewards from './components/open-proj/Rewards.vue'
import Items from './components/open-proj/Items.vue'

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
      children: [
        {
          path: '/basics',
          component: Basics
        },
        {
          path: '/story',
          component: Story
        },
        {
          path: '/rewards',
          component: Rewards
        },
        {
          path: '/items',
          component: Items
        }

      ]
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
