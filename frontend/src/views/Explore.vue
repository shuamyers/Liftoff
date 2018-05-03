<template>
   <v-container grid-list-md text-xs-center>
    <v-layout wrap >
      <proj-preview :proj="proj" v-for="proj in projs" :key="proj._id"></proj-preview>
   </v-layout>
  </v-container>
  
</template>

<script>

import projPreview from '../components/ProjPreview'
import {LOAD_PROJS} from '../store/ProjStore'

export default {
  created(){
    this.$store.dispatch({ type: LOAD_PROJS })
  },
  data() {
    return {
    
    }
  },
  computed: {
    projs() {
      return this.$store.getters.projsForDisplay 
    }
  },
  components:{
    projPreview
  }

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
