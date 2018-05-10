<template>
        <v-card class="text-xs-center proj-preview prokema-2">
          <v-card-media class="preview-img" :src="proj.featuredImgUrl" height="200px">
          </v-card-media>
             <v-btn icon v-if="!proj.isFavorite" @click.stop ="favorite = !favorite">
                 <v-icon color="info">favorite_border</v-icon>
             </v-btn>
                <v-btn icon v-if="proj.isFavorite" @click.stop ="favorite = !favorite" >
                 <v-icon color="info">favorite</v-icon>
             </v-btn>
           <v-divider ></v-divider>
          <v-card-title primary-title>
            <div>
              <h3 class="display-1 mb-0">{{proj.title}}</h3>
              <div class="mt-5">
                  <div class="prgs-bar-stats">
                    <span class="text-xs-left title">{{proj.fundsRaised}}$</span>
                    <span>{{procentRasied}}%</span>
                  </div>
                <v-progress-linear :value="procentRasied" height="5" color="info"></v-progress-linear>
              </div>
              <div class="my-flex space-between">
                <v-chip  label outline color="black">{{proj.category}}</v-chip>
                <div></div>
              </div>
              <div class="text-xs-left mt-2">{{proj.desc}}</div>
            </div>
          </v-card-title>
          <v-card-actions class="card-footer">
            <p>{{proj.duration | daysRemainingHardCoded}}</p>
            <v-btn flat color="blue" @click="goToProj(proj._id)">Explore</v-btn>
          </v-card-actions>
        </v-card>
</template>

<script>
export default {
    props: {
        proj: {
            type: Object,
            required:true
        }
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
        procentRasied() {
            return ((this.proj.fundsRaised/this.proj.fundingGoal)*100).toFixed(0);
        }
    },

}
</script>

<style scoped>
    .preview-img{
       object-fit: cover;
    }   
   .prgs-bar-stats{
       display: flex;
       justify-content: space-between;
   }
   .card-footer{
       display: flex;
       justify-content: space-between;
   }
   .my-flex{
       display: flex;
   }
   .space-between{
       justify-content: space-between;
   }
    .proj-preview {
    margin: 5px;
	cursor: pointer;
    transition: all 0.5s;

    }
    .proj-preview:hover{
        box-shadow: 0 0 10px rgb(68, 66, 66);
    }
</style>
