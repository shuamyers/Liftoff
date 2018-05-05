<template>
  
   <v-flex  xs12 sm12 md12 wrap >
        <!-- <h1>{{reward}}}</h1> -->
        <v-card class="ma-2">
          <v-card-media class="preview-img" :src="reward.imgUrl" height="200px">
          </v-card-media>
          <v-card-title class="flex-col align-baseline"  primary-title>
            <div class="align-self-center">
                <v-chip v-show="reward.featured" label color="red200">FEATURED</v-chip>
            </div>
            <p class="reward-price mb-1">${{reward.cost}}</p>
            <p class="reward-title mb-1 align-self-center">{{reward.title}}</p>
            <p class="mb-1">{{reward.desc}}</p>
            <p class="mb-0 reward-title mb-1" style="font-size:16px">Items Included</p>
            <ul class="mb-3">
                <li class="ml-3" v-for="item in reward.itemsIndcluded" :key="item">{{item}}</li>
            </ul>
            <p class="mb-0 reward-title mb-1" style="font-size:16px">Estimated Delivery</p>
            <p class="subheading "> {{reward.estimatedDelivery | monthYear}}</p>
            <p class="mb-0">{{reward.claimed}} Claimed</p>
          </v-card-title>
          <v-card-actions class="card-footer justify-center">
            <p></p>
            <v-btn class="align-self-center reward-title mt-2 mb-2" outline flat color="blue" @click="openPerk">Get This Perk</v-btn>
          </v-card-actions>
        </v-card>
   </v-flex>
  
</template>

<script>
export default {
    props: {
        reward: {
            type: Object,
            required:true
        },
    },
    methods: {
        openPerk() {
            console.log('clicked perk!')
        }
    },

}
</script>

<style scoped>
.preview-img{
       object-fit: cover;
    }
.flex-col {
  flex-direction: column;
}
.align-baseline{
    align-items: baseline
}
.align-self-center{
    align-self: center
}
.justify-center{
    justify-content: center
}
.reward-price{
font-weight: 700;
font-size: 20px;
}
.reward-title{
font-weight: 500;
font-size: 20px;
}

</style>
