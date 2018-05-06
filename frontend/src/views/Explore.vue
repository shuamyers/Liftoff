<template>
   <v-container grid-list-md text-xs-center> 
     <div class="cmp-title">
       <p class="display-3 mt-4">Invest in the Future</p>
     </div>
     <div class="my-flex">
       <proj-filters></proj-filters>
        <!-- main -->
        <div>
          <div class="serch-wrapper">
              <v-container grid-list-sm wrap> 
                      <div class="serch-div">
                          <v-text-field solo label="Serch" color="black" prepend-icon="search"></v-text-field>
                      </div>
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
                   <infinite-loading @infinite="infiniteHandler">
                      <span slot="no-more">
                        There is no more :(
                      </span>
                    </infinite-loading>
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
import InfiniteLoading from 'vue-infinite-loading';


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
    },
   infiniteHandler($state) {
      axios.get(api, {
        params: {
          page: this.list.length / 20 + 1,
        },
      }).then(({ data }) => {
        if (data.hits.length) {
          this.list = this.list.concat(data.hits);
          $state.loaded();
          if (this.list.length / 20 === 10) {
            $state.complete();
          }
        } else {
          $state.complete();
        }
      });
    },
  },
  computed: {
    projs() {
      return this.$store.getters.projsForDisplay 
    }
  },
  components:{
    ProjPreview,
    ProjFilters,
    InfiniteLoading
  }

}
</script>

<style scoped>

.serch-container{
  display:flex;
  justify-content: center;
}
 /* .serch-div{
  width: 80%;
  display: inline;
} */
.filter-div{
  display: flex;
  justify-content: space-between;
} 

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
