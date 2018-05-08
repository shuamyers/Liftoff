<template>
  <v-container grid-list-md>
    <v-layout row>
      <v-flex xs12 md9>
        <h1>hi</h1>
      </v-flex>
      <v-flex xs12 sm12 md3 wrap>
        <v-card class="ma-2" flat>
          <v-card-title>
            <v-icon>account_balance_wallet</v-icon>
          <h1>Your Wallet</h1>
            <h2>1000</h2>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { SET_SELECTED_PROJ } from "../store/ProjStore.js";
export default {
  data() {
    return {
      reword: null
    }
  },
  created() {
    const projId = this.$route.params.projId;
    const rewordId = this.$route.params.rewordId;    
    this.$store.dispatch({ type: SET_SELECTED_PROJ, projId }).then(
      
    )
  },
};
</script>

<style>

</style>
