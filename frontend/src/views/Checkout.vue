<template>
  <section>

    <v-container grid-list-md v-if="reward">
      <div class="my-flex">
        <h1 class="display-1 my-title ma-3">Checkout</h1>
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
                <v-flex xs12 class="mr-5 ml-3" sm5>
                  <v-text-field class="my-border" v-model="shippingInfo.firstName" autofocus box label="Full Name"></v-text-field>
                </v-flex>
                <v-flex xs12 class="ml-5" sm5>
                  <v-text-field class="my-border" v-model="shippingInfo.lastName" autofocus box label="Last Name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm5 class="mr-5 ml-3">
                  <v-text-field v-model="shippingInfo.phone" box label="Phone number"></v-text-field>
                </v-flex>
                <v-flex xs12 sm5 class="ml-5">
                  <v-text-field v-model="shippingInfo.country" box label="Country"></v-text-field>
                </v-flex>
                <v-flex xs12 sm5 class="mr-5 ml-3">
                  <v-text-field v-model="shippingInfo.City" box label="City"></v-text-field>
                </v-flex>
                <v-flex xs12 sm5 class="ml-5">
                  <v-text-field v-model="shippingInfo.postalCode" box label="Postal code"></v-text-field>
                </v-flex>
              </v-layout>
              <v-flex xs12 sm12 class="mb-5">
                <v-text-field v-model="shippingInfo.address" box label="Street address"></v-text-field>
              </v-flex>
            </v-container>
          </v-card>
          <v-btn class="mt-5 mb-5" @click.native="pay" large block color="primary">Pay With Your Wallet</v-btn>

        </v-flex>

        <v-flex xs12 sm12 md3 wrap>
            <v-card class="">
          <div class="my-box">
              <v-container justify-center>
                <v-layout wrap>
                  <v-card-title primary-title>
                    <v-icon class="mr-2">account_balance_wallet</v-icon>
                    <h1 class="mx-auto">Your Wallet</h1>
                  </v-card-title>
                  <v-card-title>
                    <div class="ml-4 headline">
                      <span>Balance:</span>
                      <span>${{user.digitalWallet}}</span>
                    </div>
                  </v-card-title>
                </v-layout>
              </v-container>
          </div>
            </v-card>
        </v-flex>
      </v-layout>
    </v-container>

  </section>
</template>

<script>
import { SET_SELECTED_PROJ } from '../store/ProjStore.js';
import { SAVE_PLEDGE } from '../store/PledgeStore.js';
import { UPDATE_WALLET_DIFF } from '../store/UserStore.js';

export default {
	data() {
		return {
			reward: null,
			shippingInfo: {
				firstName: '',
				lastName: '',
				phone: '',
				address: '',
				country: '',
				city: '',
				postalCode: ''
			},
			pledge: {
				userId: '',
				projId: '',
				rewardsId: '',
        pledgedAmount: 0,
        userName:'',
        userImg:'',
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
      this.pledge.userId = this.user._id;
      this.pledge.userName = this.user.name;
      this.pledge.userImg = this.user.imgUrl;

      this.$store.dispatch({ type: SAVE_PLEDGE, pledge: this.pledge })
      .then(pledge => {
        console.log('got after pay',pledge)
        this.$store.dispatch({type:UPDATE_WALLET_DIFF,user:{diff:this.reward.cost,_id:this.user._id} })
        });
		}
	},
	computed: {
		proj() {
			return this.$store.getters.selectedProj;
    },
    user() {
      return this.$store.getters.loggedInUser;
    },
	}
};
</script>

<style scoped>
.my-box {
	border: 1px solid #f5f5f5;
	padding: 7px;
}
.my-flex {
	display: flex;
	justify-content: center;
}
</style>
