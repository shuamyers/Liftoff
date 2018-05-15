<template>
  <section>

    <v-container>
      <v-tabs fixed-tabs color="grey lighten-5">

        <v-tab :to="{name: 'login'}">
          Login
        </v-tab>
        <v-tab :to="{name: 'signup'}">
          Signup
        </v-tab>

      </v-tabs>
    </v-container>
    <v-container fluid>
      <v-layout justify-center>
        <v-flex xs12 sm8 md4>
          <component :is="currentTab"></component>
          </v-flex>
    </v-layout>
  </v-container>

  </section>
</template>

<script>
import Login from '../components/Login.vue';
import Signup from '../components/Signup.vue';
import { LOGOUT } from '../store/UserStore.js';

export default {
	computed: {
		currentTab() {
			const tab = this.$route.name;
			if (tab === 'logout') {
				const user = this.$store.getters.loggedInUser;
				return user ? this.logoutUser() : this.$router.push({ name: 'home' });
			}
			return tab;
		}
	},
	methods: {
		logoutUser() {
			this.$store
				.dispatch({ type: LOGOUT })
				.then(() => {
					this.$router.push({ name: 'home' });
				})
				.catch(err => {
					throw new Error('Logout Failed');
				});
		}
	},
	components: {
		Login,
		Signup
	}
};
</script>