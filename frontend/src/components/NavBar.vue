<template>
  <section class="nav-bar">
    <router-link 
      tag="img"
      src="https://upload.wikimedia.org/wikipedia/commons/2/24/GitHub_logo_2013_padded.svg"
      :to="{name: 'home'}"
      class="logo"></router-link>

    <ul>
      <router-link 
        :to="{name: 'explore'}"
        class="nav-link">Explore</router-link>  

      <template v-if="userLoggedIn">
        <router-link 
          :to="{name: 'explore'}">Log in</router-link>


      </template>  
      <template v-else>
        <router-link 
          :to="{name: 'explore'}">Log in</router-link>

      </template>  

        <!-- Just for presentation -->
        <router-link :to="{name: 'explore'}">Log in</router-link>
        <router-link :to="{name: 'explore'}">Sign Up</router-link>
      </ul>
  </section>
</template>

<script>
export default {
  computed: {
    // just for dev, change when user store ready
    userLoggedIn() {
      return true;
    }
  }
};
</script>

<style scoped>
  .logo {
    height: 50px;
    width: 150px;
    cursor: pointer;
  }
</style>