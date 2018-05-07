<template>
    <section>

        <v-container>
            <v-tabs 
                fixed-tabs 
                color="grey lighten-5">

                <v-tab :to="{name: 'login'}">
                    Login
                </v-tab>
                <v-tab :to="{name: 'signup'}">
                    Signup
                </v-tab>

            </v-tabs>
        </v-container>

        <component :is="currentTab"></component>

    </section>
</template>

<script>
import Login from "../components/Login.vue";
import Signup from "../components/Signup.vue";

export default {
  computed: {
    currentTab() {
      return this.$route.name;
    }
  },
  components: {
    Login,
    Signup
  }
};
</script>