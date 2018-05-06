<template>
  <v-toolbar>
    
    <v-toolbar-title>
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
      <v-btn :to="{name: 'startCampaign'}">Start a Campaign</v-btn>
      
      <!-- <template v-if="loggedInUser">
        <v-btn 
          :to="{name: 'userProfile', params: {userId: loggedInUser.id}}"
          >{{ loggedInUser.name }}</v-btn>
      </template>
      <template v-else>
        <v-btn :to="{name: 'login'}">Log in</v-btn>
        <v-btn :to="{name: 'signup'}">Sign up</v-btn>
      </template> -->
      <template>
        <v-btn :to="{name: 'login'}">Log in</v-btn>
        <v-btn :to="{name: 'signup'}">Sign up</v-btn>
      </template>
      <!-- <v-btn v-if="loggedInUser">{{loggedInUser.name}}</v-btn>
      <v-btn>123</v-btn> -->

    </v-toolbar-items>

  </v-toolbar>
</template>

<script>
export default {
  computed: {
    // just for dev, change when user store ready
     loggedinUser() {
            return this.$store.getters.loggedinUser;
        }
    },
  
}
</script>

<style scoped>
.logo {
  height: 50px;
  width: 150px;
  cursor: pointer;
}
</style>