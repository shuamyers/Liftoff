<template>
  <section>

    <v-layout row wrap justify-end class="mt-1">
      <v-btn flat>Edit Profile</v-btn>
    </v-layout>
    <v-layout column justify-center align-center>
      <v-flex align-center>
        <v-card color="transparent">
          <v-container grid-list-md>
            <v-layout>
              <v-flex xs5 align-content-start>
                <div class="ml-3 mb-3">
                  <v-avatar size="150px" color="grey lighten-4" class="mx-auto mt-4">
                    <img src="http://www.avglobalservices.in/img/testimonial/02.jpg" alt="avatar">
                  </v-avatar>
                </div>
              </v-flex>
              <v-flex xs12>
                <v-card-title primary-title>
                  <div>
                    <h2 class="pl-4 mt-2 title">
                      <v-icon>person</v-icon> Shua Myers</h2>
                    <h2 class="pl-4 mt-4 title ">
                      <v-icon>email</v-icon> shua@gmail.com</h2>
                    <h2 class="pl-4 mt-4 title">
                      <v-icon>account_balance_wallet</v-icon> Balance: 1000$</h2>
                  </div>
                </v-card-title>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout justify-center align-center class="mt-5 ">
      <div>
        <proj-preview class="proj-preview" :proj="proj" v-for="proj in projs" :key="proj._id" @click.native="goToProj(proj._id)"></proj-preview>
      </div>
    </v-layout>

  </section>

</template>

<script>
import { LOAD_PLEDGES_BY_USER_ID } from '../store/PledgeStore.js';

export default {
	created() {
		const userId = this.$route.params.userId;
		this.$store.dispatch({ type: LOAD_PLEDGES_BY_USER_ID, userId });
	},
	computed: {
		pledges() {
			return this.$store.getters.pledgesForDisplay;
		},
		projs() {
			return this.$store.getters.projsForDisplay
		}
	}
};
</script>

<style scoped>
.my-proj {
	border: 1px solid lightgrey;
	border-radius: 3px;
}
.featuredImg {
	width: 30%;
	height: 125px;
	background-size: cover;
	background-image: url('https://ksr-ugc.imgix.net/assets/021/057/608/7eb31893f9290bf30a1f5d0988717312_original.jpg?w=680&fit=max&v=1525027427&auto=format&q=92&s=8d7d1c31d877d70eb58e3f270518bf41');
}
</style>
