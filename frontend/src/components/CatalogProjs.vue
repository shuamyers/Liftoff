<template>
        <section v-if="catalogedProjs.length" :class="label">
            <p class="headline ma-0 mb-4 mt-4" >{{label}}</p>
            <v-divider class="mb-4"></v-divider>
            <v-layout wrap>
                <v-flex class="mb-5" xs12 sm6 md3 wrap v-for="proj in catalogedProjs" :key="proj._id" >
                    <proj-preview :proj="proj"></proj-preview>
                </v-flex>
            </v-layout>
        </section>
</template>

<script>
import projService from "../services/projService.js";
import ProjPreview from "../components/ProjPreview.vue";
export default {
  props: {
    criteria: {
      type: Object,
      required: true
    },
    label: {
        type: String,
        required: true
    }
  },
  data() {
      return {
          catalogedProjs :[]
          
      }
  },
  created() {
      if(this.label === 'Trending') {
          setTimeout(() =>{

              projService.query(this.criteria).then(projs => {
                  console.log(this.criteria)
                  console.log('catalog projs!',projs)
                this.catalogedProjs = projs;
              });
          },1500)
      } else{

          projService.query(this.criteria).then(projs => {
              console.log(this.criteria)
              console.log('catalog projs!',projs)
            this.catalogedProjs = projs;
          });
      }
  },

  components:{
      ProjPreview
  }
};
</script>

<style>

</style>
