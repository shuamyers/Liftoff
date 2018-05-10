<template>
  <section>

    <!-- Mobile menu -->
    <v-navigation-drawer 
      clipped
      app
      fixed
      disable-resize-watcher
      v-model="drawer">
      <v-list two-line>
        <v-list-tile 
          v-for="link in filteredLinks"
          :key="link.txt"
          :to="{name: link.routeName}"
          exact>
          <v-list-tile-action>
            <v-icon>{{link.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{link.txt}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer> 

    <!-- Desktop menu -->
    <v-toolbar 
      app 
      fixed 
      clipped-left>
      <span class="ma-0 hidden-md-and-up">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      </span>

      <v-toolbar-title class="ml-1">
        <router-link 
          tag="img"
          src="./img/logo.png"
          :to="{name: 'home'}"
          class="logo"></router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items> 
        <v-btn
          v-for="link in filteredLinks"
          :key="link.txt"
          :class="{'hidden-sm-and-down': link.hiddenOnMobile}"
          :to="{name: link.routeName}"
          exact>
          {{ link.txt }}
        </v-btn>
      </v-toolbar-items> 
    </v-toolbar>

  </section>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      links: [
        {
          txt: "Home",
          icon: "home",
          routeName: "home",
          alwaysShow: true,
          hiddenOnMobile: true
        },
        {
          txt: "Explore",
          icon: "explore",
          routeName: "explore",
          alwaysShow: true,
          hiddenOnMobile: false
        },
        {
          txt: "Start Campaign",
          icon: "create",
          routeName: "startCampaign",
          alwaysShow: true,
          hiddenOnMobile: true
        },
        {
          txt: "Login / Signup",
          icon: "account_circle",
          routeName: "login",
          loginRequired: false,
          hiddenOnMobile: true
        },
        {
          txt: "My Profile",
          icon: "account_circle",
          routeName: "userProfile",
          loginRequired: true,
          hiddenOnMobile: true
        },
        {
          txt: "Logout",
          icon: "input",
          routeName: "logout",
          loginRequired: true,
          hiddenOnMobile: true
        }
      ]
    };
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    filteredLinks() {
      return this.links.filter(link => {
        if (this.loggedInUser) {
          return (link.alwaysShow || link.loginRequired);
        } else {
          return (link.alwaysShow || !link.loginRequired);
        }
      })
    }
  }
};
</script>

<style scoped>
.logo {
  width: 150px;
  cursor: pointer;
  vertical-align: middle;
}
</style>