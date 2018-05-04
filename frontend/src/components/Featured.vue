<template>
  <p>{{ featuredProjs }}</p>
</template>

<script>
import projService from "../services/projService.js";

export default {
  data() {
    return {
      featuredProjs: []
    }
  },
  created() {
      projService.query({category: 'Tech'}).then(projs => {
        this.featuredProjs.push(projs);
      });
  }
};
</script>

<style>

</style>
