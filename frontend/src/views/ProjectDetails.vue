<template>
  <section class="project-details">
    
        
      <v-btn  :to="{name: 'explore'}">Go Back</v-btn>
      <!-- <v-btn color="error" @click="deleteProj">Delete Proj</v-btn> -->
      <v-container v-if="proj" grid-list-md text-xl-center style="max-width:1300px">
        <v-layout wrap justify-content>
          <v-flex xs12 sm7 md7 wrap>
            <v-container grid-list-md text-xs-center class="proj-main-media" style="width:100%;"> 
              
              <v-carousel style="max-height:500px">
                <v-carousel-item  v-for="(item,i) in proj.projImgUrls" :key="i" :src="item">
                
                </v-carousel-item>
              </v-carousel>
            </v-container>
          </v-flex>
          <v-flex xs12 sm5 md5 wrap>
            <v-container grid-list-md text-xs-left  style="height:100%"> 
              <v-layout justify-space-between class="proj-main-info flex-col flex-baseline" style="height:100%">
                <div class="upper-content">
                    <p class="grey--text mt-1 mb-1">Funding</p>
                    <v-divider class="clr-flex-grow"></v-divider>
                    
                    <p class=" display-1 mt-2 mb-2">{{proj.title}}</p>    
                    <p class="grey--text proj-desc inset mt-2">{{proj.desc}}</p>  

                    <v-layout wrap justify-space-between style="width:100%">
                        
                          <div class="project-owner">
                             <span class="body-2">PROJECT OWNER</span>
                             <v-list-tile avatar :key="proj.title" class="">
                              <v-list-tile-avatar>
                                <img :src="proj.owner.avatarUrl">
                              </v-list-tile-avatar>
                              <v-list-tile-content>
                                <v-list-tile-title >{{proj.owner.name}}</v-list-tile-title>
                                <v-list-tile-sub-title>{{proj.owner.location}}</v-list-tile-sub-title>
                              </v-list-tile-content>
                            </v-list-tile>
                          </div>
                          
                          <div class="time-left">
                                <p class="body-2 mb-0">Days left</p>
                                <v-progress-circular :size="50" :width="7" :rotate="360" :value="(daysLeft/30)*100" color="teal">
                                   {{daysLeft}}
                                </v-progress-circular>
                          </div>            

                    </v-layout>
                    </div>

                    <div class="proj-status">
                        <span class="body-1 p-0"> 
                          <span class="title">${{proj.fundsRaised}}</span>
                          <span> Raised by {{proj.pledges.length}} backers</span>  
                        </span>
                        <v-progress-linear class="prog-bar"  v-model="raisedPercent" color="success"></v-progress-linear>
                        <p class="ma-0"><span class="raised-percent">{{raisedPercent}}%</span> of {{proj.fundingGoal}}$ flexible goal</p>  
                        <p class="caption">All or nothing. This project will only be funded if it reaches its goal by {{new Date(proj.duration).toLocaleString()}}</p>
                        <v-btn large color="primary backme-btn" >Back Me Up!</v-btn>
                    </div>

                    <!-- <v-layout>            
                       <v-icon color="info">fab fa-facebook-f</v-icon>
                       <v-icon>fab fa-twitter</v-icon>
                    </v-layout> -->
                    
                     </v-layout>
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
    return {};
  },

  created() {
    const projId = this.$route.params.projId;
    this.$store.dispatch({ type: SET_SELECTED_PROJ, projId });
  },

  methods: {
    edit() {
      this.$router.push("/project/edit/" + this.proj._id);
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
    raisedPercent() {
      return (this.proj.fundsRaised / this.proj.fundingGoal * 100).toFixed(0);
    },
    daysLeft() {
      var today = new Date();
      var endDate = this.proj.duration;
      var one_day = 1000 * 60 * 60 * 24;
      return(
        Math.ceil((endDate - today.getTime()) / one_day)
      );
    }
  },

  destroyed() {
    this.$store.commit({ type: "setSelectedProj", selectedProj: null });
  },
  binding() {
    const binding = {};
    binding.column = true;
    return binding;
  }
};
</script>

<style>
.flex-col {
  flex-direction: column;
}
.flex-baseline {
  align-items: baseline !important;
}
.clr-flex-grow {
  flex-grow: 0;
}
.proj-desc {
  font-size: 22px;
}
.prog-bar {
  margin: 5px 0;
  border-radius: 10px;
}
.backme-btn {
  /* align-self: center; */
}
.raised-percent{
font-weight: 700;
font-size: 17px;
}
</style>
