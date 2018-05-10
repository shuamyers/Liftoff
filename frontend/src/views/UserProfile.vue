<template>
  <section>

    <v-layout row wrap justify-end class="mt-1">
      <v-btn flat @click.native="edit=!edit">Edit Profile</v-btn>
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
                  <div v-if="user">
                    <v-text-field label="Enter user name" :value="user.name" prepend-icon="person" single-line v-if="edit"></v-text-field>
                    <v-text-field v-if="edit" label="Enter user name" :value="user.email" prepend-icon="email" single-line></v-text-field>
                    <h2 class="pl-4 mt-2 title" v-if="!edit">
                      <v-icon> person </v-icon> {{user.name}}</h2>
                    <h2 class="pl-4 mt-4 title " v-if="!edit">
                      <v-icon>email</v-icon> {{user.email}}</h2>
                    <h2 class="pl-4 mt-4 title">
                      <v-icon>account_balance_wallet</v-icon> Balance: ${{user.digitalWallet}}</h2>
                  </div>
                </v-card-title>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout justify-center align-center class="mt-5 ">

    </v-layout>

    <v-container grid-list-md>
      <h1 class="headline ">Projects</h1>
      <v-divider class="mb-5"></v-divider>
      <v-layout>
        	<v-flex xs12 sm6 md4 wrap v-for="proj in projs" :key="proj._id" >
              	<proj-preview  :proj="proj" @click.native="goToProj(proj._id)"></proj-preview>
							</v-flex>

      </v-layout>
      <h1 class="headline mt-5">Favorites</h1>
      <v-divider class=" mb-3"></v-divider>
      <v-layout>
      	<v-flex xs12 sm6 md4 wrap v-for="proj in projs" :key="proj._id" >
              	<proj-preview  :proj="proj" @click.native="goToProj(proj._id)"></proj-preview>
							</v-flex>

      </v-layout>
      <h1 class="headline mt-5">Pledges</h1>
      <v-divider class=" mb-3"></v-divider>
      <v-layout class="mb-4">
      	<v-flex xs12 sm6 md4 wrap v-for="proj in projs" :key="proj._id" >
              	<proj-preview  :proj="proj" @click.native="goToProj(proj._id)"></proj-preview>
							</v-flex>
      </v-layout>
    </v-container>

  </section>

</template>

<script>
import { LOAD_PLEDGES_BY_USER_ID } from '../store/PledgeStore.js';
import { LOAD_PROJS } from '../store/ProjStore';
import ProjPreview from '../components/ProjPreview';
import ProjService from '../services/projService.js'

export default {
	created() {
    const userId = this.$route.params.userId;
    console.log("userId",userId)
    this.$store.dispatch({ type: LOAD_PLEDGES_BY_USER_ID, userId });
    setTimeout(() =>{
              ProjService.query(this.criteria).then(projs => {
                  console.log(this.criteria)
                  console.log('catalog projs!',projs)
                this.projs = projs;
              });
          },1000)
	},
	data() {
		return {
			newUser: {
				name: '',
				email: ''
			},
      edit: false,
     criteria: {
        skip: 0,
        limit: 4,
        filterBy: {
          searchTxt: "",
          category: "",
        }
      },
    projs:null
		}
	},
	computed: {
  
		pledges() {
			return this.$store.getters.pledgesForDisplay;
		},
		// projs() {
		// 	return this.$store.getters.projsForDisplay;
		// },
		user() {
			return this.$store.getters.loggedInUser;
		}
	},
	components: {
		ProjPreview
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
