<template>
   <v-container grid-list-md text-xs-center>
    <v-layout wrap >
      <v-flex xs12 sm6 md3 wrap v-for="i in items" :key="i" >
        <v-card>
          <v-card-media src="/static/doc-images/cards/desert.jpg" height="200px">
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
              <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
            </div>
          </v-card-title>
           <v-divider ></v-divider>
          <v-card-actions>
            <v-btn flat color="blue">Share</v-btn>
            <v-btn flat color="orange">Explore</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
   </v-layout>
  </v-container>
  
</template>

<script>
export default {
  data() {
    return {
      items: 17
    }
  },

}
</script>

<style scoped>
/* .container {
  display: grid;

  height: 100%;
  grid-template-columns:160px repeat(10, 1fr);
  grid-auto-rows: calc ((100vh-90px)/11);
  grid-gap: 10px;
} */
aside{
  grid-column: 1/2;
  grid-row: auto;
  background: red;
  width: 100%;
  height: 100%;
}
p{
  grid-row: span 3;
  grid-column: span 3;
}
</style>
