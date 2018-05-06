<template>
  <section>

    <v-navigation-drawer 
      fixed
      clipped
      app
      v-model="drawer">

      <v-list two-line>
        <v-list-tile :to="{name: 'home'}">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      <v-list-tile :to="{name: 'startCampaign'}">
        <v-list-tile-action>
          <v-icon>create</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Start Campaign</v-list-tile-title>
        </v-list-tile-content>
        </v-list-tile>
      </v-list>

    </v-navigation-drawer>
    
    <v-toolbar app fixed clipped-left>
      
      <span class="ma-0 hidden-md-and-up">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      </span>

      <v-toolbar-title class="ml-1">
        <router-link 
          tag="img"
          src="https://upload.wikimedia.org/wikipedia/commons/2/24/GitHub_logo_2013_padded.svg"
          :to="{name: 'home'}"
          class="logo"></router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>
        
      <v-toolbar-items class="hidden-sm-and-down">
        
        <!-- Update all links when components are ready -->
        <v-btn :to="{name: 'explore'}">Explore</v-btn>
        <v-btn :to="{name: 'startCampaign'}">Start Campaign</v-btn>
        
        <template v-if="loggedInUser.name">
          <v-btn 
            :to="{name: 'userProfile', params: {userId: loggedInUser.id}}"
            >{{ loggedInUser.name }}</v-btn>
        </template>

        <template v-else>
          <v-btn :to="{name: 'login'}">Log in</v-btn>
          <v-btn :to="{name: 'signup'}">Sign up</v-btn>
        </template>

      </v-toolbar-items>

    </v-toolbar>
  </section>
</template>

<script>
export default {
  data() {
    return {
      drawer: false
    }
  },
  computed: {
    // just for dev, change when user store ready
    loggedInUser() {
      return {
        name: "Ophir",
        id: 123
      };
    }
  }
};
</script>

<style scoped>
.logo {
  height: 35px;
  width: 150px;
  cursor: pointer;
  vertical-align: middle;
}
</style>