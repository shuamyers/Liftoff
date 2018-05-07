<template>
  <v-carousel
    v-if="featuredProjs" 
    :hide-controls="false"
    :hide-delimiters="true">

    <v-carousel-item 
      v-for="(proj, i) in featuredProjs" 
      :src="proj.featuredImgUrl" 
      :key="i">

      <v-jumbotron dark :to="`/project/${proj._id}`">
        <v-container fill-height>
          <v-layout class="align-end">
            <v-flex style="max-width: 350px" >
              <h4 class="featured-txt body-1 mb-3">Featured</h4>
              <h3 class="title mb-2">{{ proj.title }}</h3>
              <p class="body-1">{{ proj.desc }}</p>
              <p class="campaign-link body-2">See Campaign &gt;</p>
            </v-flex>
          </v-layout>
        </v-container>
      </v-jumbotron>

    </v-carousel-item>

  </v-carousel>
</template>

<script>
import projService from "../services/projService.js";

export default {
  data() {
    return {
      featuredProjs: null,
      testCriteria: {
        skip: 0,
        filterBy: {
          searchTxt: '',
          catergory: 'Tech',
          // status: ''

        }
      }
    };
  },
  created() {
    //TODO: query top 5 'fundsRaised'
    projService.query(this.testCriteria).then(projs => {
      this.featuredProjs = projs;
    });
  },
  updated() {
    const imgs = document.querySelectorAll(".jumbotron__image");
    imgs.forEach(img => {
      img.style.filter = "brightness(50%)";
    });
  }
};
</script>

<style scoped>
.carousel {
  height: 100%;
}

a {
  text-decoration: none;
}

.featured-txt {
  text-transform: uppercase;
  letter-spacing: 1px;
  border-bottom: 1px solid #fff;
}

.campaign-link {
  text-transform: uppercase;
}
</style>
