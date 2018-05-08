<template>
  <section class="project-details">
      <!-- <v-btn  :to="{name: 'explore'}">Go Back</v-btn> -->
      <!-- <v-btn color="error" @click="deleteProj">Delete Proj</v-btn> -->
      <v-container v-if="proj" grid-list-md text-xl-center style="max-width:1200px">
        <!-- Start Of Proj Main! -->
        <v-layout class="proj-main" wrap justify-content>
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
                    <p class="grey--text proj-tagline inset mt-2">{{proj.tagLine}}</p> 
                    <v-layout class="mb-4" wrap justify-space-between style="width:100%">
                          <div class="proj-owner">
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
                                   {{proj.duration | daysRemaining}}
                                </v-progress-circular>
                          </div>            
                    </v-layout>
                    </div>
                    <div class="proj-status">
                        <span class="body-1 p-0"> 
                          <span class="title">${{proj.fundsRaised}}</span>
                          <span> Raised by {{proj.pledges.length}} backers</span>  
                        </span>
                        <v-progress-linear class="prog-bar" v-model="raisedPercent" color="success"></v-progress-linear>
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
        <!-- End of Proj Main! -->

         <!-- Start Of Proj Down! -->
        <v-layout class="proj-down" wrap justify-content>
          <v-flex xs12 sm7 md8 lg8 wrap>
             <v-container grid-list-md text-xs-left class="proj-down-media" style="width:100%;"> 
               <p class="grey--text mt-1 mb-1">Overview</p>
               <v-divider></v-divider>
               <v-container grid-list-md text-xs-left class="proj-overview" style="width:100%;">   
                     <v-layout wrap>
                       <v-flex xs12 sm6 md6 wrap>
                          <img :src="proj.featuredImgUrl" alt="overview-img" style="width:100%;height:auto;">
                       </v-flex>
                       <v-flex xs12 sm6 md6 wrap>
                         <p class="ma-2 subheading">{{proj.overView}}</p> 
                       </v-flex>
                     </v-layout>
                </v-container>
                <v-divider></v-divider>
                <v-tabs color="transparent">
                    <!-- <v-tab :to="{path:`${this.$route.params.projId}/tab-story`}">STORY</v-tab> -->
                    <!-- <v-tab :to="{path:`tab-story`,params:{projId : this.$route.params.projId}}">STORY</v-tab> -->
                    <v-tab :to="`tab-story`">STORY</v-tab>
                    <v-tab :to="`tab-updates`">UPDATES</v-tab>
                    <v-tab :to="`tab-comments`">Comments</v-tab>
                    <v-tab :to="`tab-backers`"> BACKERS</v-tab>

                    <v-tab-item :id="`tab-story`">
                      <div v-html="proj.story"></div>
                    </v-tab-item>
                    <v-tab-item :id="`tab-updates`">
                      <proj-update v-for="update in proj.updates" :key="update.userName" :update="update" class="my-flex flex-col proj-update mt-2 mb-2"></proj-update>
                    </v-tab-item>
                    <v-tab-item :id="`tab-comments`">
                       <proj-new-comment></proj-new-comment>
                       <proj-comment v-for="comment in proj.comments" :key="comment.userName" :comment="comment" class="my-flex flex-col proj-comment mt-0 mb-0"></proj-comment>
                    </v-tab-item>
                    <v-tab-item :id="`tab-backers`">
                       <proj-backer v-for="backer in proj.backers" :key="backer.userName" :backer="backer" class="my-flex flex-col proj-backer mt-2 mb-2"></proj-backer>
                    </v-tab-item>
                </v-tabs>
            </v-container>
          </v-flex>
          <v-flex xs12 sm5 md4 lg4 wrap>
             <v-container grid-list-md text-xs-left class="proj-down-rewards" style="width:100%;"> 
                  <p class="grey--text mt-1 mb-1">Rewards</p>
                    <v-divider></v-divider>
                 <v-layout wrap>
                 <reward-preview class="proj-reward" v-for="reward in proj.rewards" :key="reward.id" :reward="reward" ></reward-preview>
               </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </v-container>
  </section>

</template>

<script>
import { SET_SELECTED_PROJ, DELETE_PROJ } from "../store/ProjStore.js";
import RewardPreview from '../components/RewardPreview'
import ProjUpdate from '../components/ProjUpdate'
import ProjBacker from '../components/ProjBacker'
import ProjComment from '../components/ProjComment'
import ProjNewComment from '../components/ProjNewComment'

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
  components: {
    RewardPreview,
    ProjUpdate,
    ProjBacker,
    ProjComment,
    ProjNewComment
  }

};
</script>

<style scoped>
.flex-col {
  flex-direction: column;
}
.flex-baseline {
  align-items: baseline !important;
}
.my-flex {
  display: flex
}
.justify-space-between{
  justify-content: space-between
}
.clr-flex-grow {
  flex-grow: 0;
}
.proj-tagline {
  font-size: 20px;
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
.proj-update{
  border:1px solid lightgrey;
  border-radius: 3px;
  
}
</style>
