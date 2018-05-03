<template>
   <v-container grid-list-md text-xs-center> 
     <div class="cmp-title">
       <p class="display-3">Invest in the future</p>
     </div>
     <div class="my-flex">
       <proj-filters></proj-filters>
        <!-- main -->
        <div>
          <div class="serch-wrapper">
              <v-container grid-list-md text-xs-center> 
                <v-text-field solo label="Serch" color="black" prepend-icon="search"></v-text-field>
             </v-container>
          </div>
           <v-container grid-list-md > 
             <v-divider class="divder"></v-divider>
              <v-flex>
                <v-spacer></v-spacer>

              </v-flex>
            <v-layout wrap>
               <proj-preview class="proj-preview" :proj="proj" v-for="proj in projs"
                   :key="proj._id" @click.native="goToProj(proj._id)"></proj-preview>
            </v-layout>
          </v-container>
        </div>
    </div>  
  </v-container>
</template>

<script>

import ProjPreview from '../components/ProjPreview'
import {LOAD_PROJS} from '../store/ProjStore'
import ProjFilters from '../components/ProjFilters.vue';


export default {
  created(){
    this.$store.dispatch({ type: LOAD_PROJS })
  },
  data() {
    return {
    }
  },
  methods: {
   goToProj(projId) {
            this.$router.push('project/' + projId)
        }
  },
  computed: {
    projs() {
      return this.$store.getters.projsForDisplay 
    }
  },
  components:{
    ProjPreview,
    ProjFilters
  }

}
</script>

<style scoped>

.divder{
  margin: 20px 0 10px;
  width: 100%;
}

.my-flex{
  display: flex;
}

.proj-preview{
  cursor: pointer;
}


.inline{
  display: inline;
  width: 80%;
}

</style>
