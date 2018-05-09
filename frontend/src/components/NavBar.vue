<template>
  <section>

    <v-navigation-drawer 
      clipped
      app
      fixed
      disable-resize-watcher
      v-model="drawer">

      <v-list two-line>
          <v-list-tile 
              v-for="tile in tiles"
              :key="tile.txt"
              :to="{name: tile.routeName}"
              exact>

              <v-list-tile-action>
                  <v-icon>{{tile.icon}}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                  <v-list-tile-title>{{tile.txt}}</v-list-tile-title>
              </v-list-tile-content>

          </v-list-tile>
      </v-list>

    </v-navigation-drawer> 

    <v-toolbar 
      app 
      fixed 
      clipped-left>

      <span class="ma-0 hidden-md-and-up">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      </span>

      <v-toolbar-title class="ml-1">
        <router-link 
          tag="img"
          src="./img/logo.png"
          :to="{name: 'home'}"
          class="logo"></router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      
      <v-toolbar-items>     
        <v-btn :to="{name: 'explore'}">Explore</v-btn>
        <v-btn 
          :to="{name: 'startCampaign'}"
          class="hidden-sm-and-down">Start Campaign</v-btn>
        
        <template v-if="loggedInUser">
          <v-btn 
            :to="{name: 'userProfile', params: {userId: loggedInUser._id}}"
            class="hidden-sm-and-down"
            >{{ loggedInUser.name }}</v-btn>
        </template>

        <template v-else>
          <v-btn 
            :to="{name: 'login'}"
            class="hidden-sm-and-down">Log in</v-btn>
          <v-btn 
            :to="{name: 'signup'}"
            class="hidden-sm-and-down">Sign up</v-btn>
        </template>
      </v-toolbar-items>

    </v-toolbar>

  </section>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      tiles: [
        {
          txt: "Home",
          icon: "home",
          routeName: "home"
        },
        {
          txt: "Explore",
          icon: "explore",
          routeName: "explore"
        },
        {
          txt: "Start Campaign",
          icon: "create",
          routeName: "startCampaign"
        }
      ]
    };
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    }
  }
};
</script>

<style scoped>
.logo {
  width: 150px;
  cursor: pointer;
  vertical-align: middle;
}
</style>