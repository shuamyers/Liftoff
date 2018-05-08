<template>
  <v-container grid-list-md v-if="reward">
    <div>
      <h1 class="display-1 my-title">Checkout</h1>
    </div>
    <v-layout row wrap>
      <v-flex xs12 md9>
        <v-card>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm5>
                <v-card-media :src="this.reward.imgUrl" height="200" contain>
                </v-card-media>
              </v-flex>
              <v-flex xs12 sm7>
                <v-card-title primary-title>
                  <div>
                    <div class="headline">{{this.reward.title}}</div>
                    <div>{{this.reward.desc}}</div>
                    <div>
                      <div class="headline mt-3">Reward includes</div>
                      <ul>
                        <li class="ml-3" v-for="(item,i) in this.reward.itemsIndcluded" :key="i">{{item}}</li>
                      </ul>
                    </div>
                    <v-divider class="mt-3"></v-divider>
                    <v-flex justify-end row ali>
                      <div class="headline mt-3 ">
                        Total:
                        <span>{{this.reward.cost}}.00$</span>
                      </div>
                    </v-flex>
                  </div>
                </v-card-title>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
        <h1 class=" headline mt-5 ml-2">Shipping Info</h1>
        <v-card class="mt-3">
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs12 sm6>
                <v-text-field class="my-border" v-model="shippingInfo.fullName" autofocus box label="Full Name"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field v-model="shippingInfo.phone" box label="Phone number"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field v-model="shippingInfo.address" box label="Street address"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field v-model="shippingInfo.country" box label="Country"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field v-model="shippingInfo.City" box label="City"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field v-model="shippingInfo.postalCode" box label="Postal code"></v-text-field>
              </v-flex>

            </v-layout>
          </v-container>
        </v-card>
        <v-btn class="mt-5 mb-5" @click.native="pay" block color="primary">Pay With Your Wallet</v-btn>

      </v-flex>

      <v-flex xs12 sm12 md3 wrap>
        <v-card class="ml-2">
          <v-container grid-list-md>
            <v-layout wrap>
              <v-card-title primary-title>
                <v-icon class="mr-2">account_balance_wallet</v-icon>
                <h1 class="mx-auto">Your Wallet</h1>
              </v-card-title>
              <v-card-title>
                <div class="ml-4 headline my-box">
                  <span>Balance:</span>
                  <span> 1000$</span>
                </div>
              </v-card-title>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { SET_SELECTED_PROJ } from '../store/ProjStore.js';
import { SAVE_PLEDGE } from '../store/PledgeStore.js';

export default {
	data() {
		return {
			reward: null,
			shippingInfo: {
				fullName: '',
				phone: '',
				address: '',
				country: '',
				city: '',
				postalCode: ''
			},
			pledge: {
				userId: '5af197f9f6d0a90aa07c3c84',
				projId: '',
				rewardsId: '',
        pledgedAmount: 0,
        userName:'normal',
        userImg:'http://www.avglobalservices.in/img/testimonial/02.jpg',
			}
		};
	},
	created() {
		const projId = this.$route.params.projId;
		const rewordId = this.$route.params.rewordId;
		this.$store.dispatch({ type: SET_SELECTED_PROJ, projId }).then(_ => {
			this.reward = this.proj.rewards.find(reward => reward.id === rewordId);
      this.pledge.pledgedAmount = this.reward.cost;
      this.pledge.rewardsId = rewordId;
      this.pledge.projId = projId;
		});
	},
	methods: {
		pay() {
			console.log('paying');
			this.$store.dispatch({ type: SAVE_PLEDGE, pledge: this.pledge });
		}
	},
	computed: {
		proj() {
			return this.$store.getters.selectedProj;
		}
	}
};
</script>

<style scoped>
.my-box {
	border: 1px solid #000;
	padding: 7px;
}
</style>
