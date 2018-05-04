<template>
  <section class="project-details">
    <h1 v-if="proj">Project details</h1>
        
      <v-btn  @click="goBack">Go Back</v-btn>
      <!-- <v-btn color="error" @click="deleteProj">Delete Proj</v-btn> -->
      <v-container fill-height v-if="proj" grid-list-md text-xl-center>
        <v-layout wrap>
          <v-flex xs12 sm6 md6 wrap>
            <v-container grid-list-md text-xs-center> 
              
              <v-carousel height="300px">
                <v-carousel-item  v-for="(item,i) in proj.projImgUrls" :key="i" :src="item">
                
                </v-carousel-item>
              </v-carousel>
            </v-container>
          </v-flex>
          <v-flex xs12 sm6 md6 wrap>
            <v-container grid-list-md text-xs-left fill-height reverse> 
              

                    <v-spacer></v-spacer>
                    <h3 class="grey--text mt-1 mb-1">Funding</h3>
                    <v-divider></v-divider>
                    
                    <h1 class=" display-1 inset mt-2">{{proj.title}}</h1>    
                    <p class="grey--text headline inset mt-2">{{proj.desc}}</p>  
                    <span class="body-2">PROJECT OWNER</span>
                    
                    <v-list-tile avatar :key="proj.title">
                      <v-list-tile-avatar>
                        <img src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460">
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title >{{proj.owner.name}}</v-list-tile-title>
                        <v-list-tile-sub-title>{{proj.owner.location}}</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>

                    <p class="body-1"> 
                      <span class="title">{{proj.fundsRaised}}$</span>
                      <span> Raised by {{proj.pledges.length}} backers</span>  
                    </p>
                    <v-progress-linear class=""  v-model="raisedPercent" color="success"></v-progress-linear>
                    <p>{{raisedPercent}}% of {{proj.fundingGoal}}$ flexible goal</p>  
                    <v-btn large color="primary">Back Me Up!</v-btn>
                  
             
            </v-container>

          </v-flex>

        </v-layout>
      </v-container>
  </section>

</template>

<script>

import { SET_SELECTED_PROJ, DELETE_PROJ } from "../store/ProjStore.js";

export default {
  data() {
    return {
         
    }
  },

  created() {
    const projId = this.$route.params.projId;
    this.$store.dispatch({ type: SET_SELECTED_PROJ, projId })

  },


  methods: {
    edit() {
      this.$router.push("/proj/edit/" + this.proj._id);
    },
    deleteProj() {
      this.$store
        .dispatch({ type: DELETE_PROJ, projId: this.proj._id })
        .then(_ => {
          this.$router.push("/");
        });
    },
    goBack() {
      this.$router.go(-1);
    }
  },

  computed: {
    proj() {
      return this.$store.getters.selectedProj;
    },
    raisedPercent(){
       return ((this.proj.fundsRaised/this.proj.fundingGoal)*100).toFixed(0);
    }
  },

  destroyed() {
    this.$store.commit({ type: "setSelectedProj", selectedProj: null });
  }
};
</script>

<style>

</style>
