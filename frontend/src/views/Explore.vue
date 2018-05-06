<template>
<section>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      absolute
    >
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg" >
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>John Leider</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile v-for="item in items" :key="item.title" @click="">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
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
                          <v-text-field solo label="Search" color="black" @input="search" v-model="searchTxt" prepend-icon="search"></v-text-field>
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
                <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading" class="centered">
                    <div slot="no-more">
                        There is no more :(
                    </div>
               </infinite-loading>
            </v-layout>
          </v-container>
        </div>
    </div>  
  </v-container>
</section>
</template>

<script>

import ProjPreview from '../components/ProjPreview'
import {LOAD_PROJS,LOAD_MORE_PROJS} from '../store/ProjStore'
import ProjFilters from '../components/ProjFilters.vue';
import InfiniteLoading from 'vue-infinite-loading';


export default {
  created(){
    this.$store.dispatch({ type: LOAD_PROJS })
  },
  data() {
    return {
      searchTxt:null,
      drawer:null
    }
  },
  methods: {
   goToProj(projId) {
            this.$router.push('project/' + projId)
    },
    search(){
       this.$store.commit('setFilterBySearchTxt',{searchTxt:this.searchTxt})
    },
   infiniteHandler($state) {
    this.$store.dispatch({ type: LOAD_MORE_PROJS})
    .then((length => {
        if (length) {
          $state.loaded();
          if (length < 12 ) {
            $state.complete();
          }
        } else {
          $state.complete();
        }
      })
    )},
    changeFilter() {
      this.$nextTick(() => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
      })
    }
  },
  computed: {
    projs() {
      return this.$store.getters.projsForDisplay 
    },
    numOfProjs(){
      return  this.$store.getters.numOfProjs
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

.centered{
  margin: 0 auto;
}

</style>
