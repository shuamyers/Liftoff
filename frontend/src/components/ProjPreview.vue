<template>
  <v-flex xs12 sm6 md3 wrap  >
        <v-card>
          <v-card-media :src="proj.featuredImgUrl" height="200px">
          </v-card-media>
             <v-icon>favorite</v-icon>
           <v-divider ></v-divider>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{proj.title}}</h3>
               <v-progress-linear value="30" height="5" color="success"></v-progress-linear>
              <div>{{proj.desc}}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="bule">Share</v-btn>
            <v-btn flat color="orange">Explore</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
</template>

<script>
export default {
    props: {
        proj: {
            type: Object,
            required:true
        },
    },

}
</script>

<style scoped>

</style>
