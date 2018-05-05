<template>
  <v-carousel
    v-if="featuredProjs" 
    :hide-controls="false"
    :hide-delimiters="false">

    <v-carousel-item 
      v-for="(proj, i) in featuredProjs" 
      :src="proj.featuredImgUrl" 
      :key="i">
    </v-carousel-item>

  </v-carousel>
</template>

<script>
import projService from "../services/projService.js";

export default {
  data() {
    return {
      featuredProjs: null
    };
  },
  created() {
    //TODO: query top 5 'fundsRaised'
    projService.query({ category: "Tech" }).then(projs => {
      this.featuredProjs = projs;
    });
  }
};
</script>