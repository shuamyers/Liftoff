<template>
  <v-footer height="auto">
    <v-card class="flex grey lighten-4">

      <v-container style="max-width: 650px">
        <v-card-title class="headline justify-center">
          Subscribe to our weekly newsletter
        </v-card-title>

        <v-card-text class="subheading">
          Sign up for Projects We Love to receive a weekly mix of noteworthy projects, handpicked by our team.
        </v-card-text>
      
        <v-card-actions>
          <v-text-field 
            solo 
            style="min-width: 200px"
            label="Email address"
            v-model="email"
          >
          </v-text-field>
          
          <v-btn 
            outline
            large
            flat
            :loading="loading"
            @click.native="loader = 'loading'"
            :disabled="loading"
          >
            Subscribe
          </v-btn>
        </v-card-actions>
      </v-container>

      <v-divider></v-divider>

      <v-card-actions class="justify-center">
        <v-btn
          v-for="icon in icons"
          :key="icon"
          icon
          light
          class="mx-4">
          <v-icon>{{ icon }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-divider></v-divider>

      <v-card-actions class="justify-center">
        <ul>
          <li 
          v-for="link in links"
          :key="link"
          class="mx-3"> 
          {{ link }}
          </li>
        </ul>
      </v-card-actions>

    </v-card>
  </v-footer>
</template>


<script>
export default {
  data() {
    return {
      icons: [
        "fab fa-facebook",
        "fab fa-twitter",
        "fab fa-youtube",
        "fab fa-linkedin",
        "fab fa-instagram"
      ],
      links: ["About Us", "Terms of Use", "Privacy Policy"],
      loader: null,
      loading: false,
      email: null
    };
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];
      setTimeout(() => (this[l] = false), 3000);
      this.loader = null;
    }
  }
};
</script>

<style scoped>
li {
  display: inline;
  line-height: 3rem;
  cursor: pointer;
}
</style>