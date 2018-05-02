<template>
  <section>
    <img class="logo" src="https://upload.wikimedia.org/wikipedia/commons/2/24/GitHub_logo_2013_padded.svg" alt="Liftoff logo">
    <ul>
      <router-link :to="{name: 'explore'}" class="">Explore</router-link>
      <!-- Just for presentation -->
      <router-link :to="{name: 'explore'}">Log in</router-link>
      <router-link :to="{name: 'explore'}">Sign Up</router-link>
    </ul>
  </section>
</template>

<script>
export default {};
</script>

<style scoped>
.logo {
  height: 50px;
  width: 200px;
}
a {
  
}
</style>