<template>
        <v-card>
            <v-card-text>
                <v-form>
                    <v-text-field 
                        prepend-icon="person" 
                        label="Email" 
                        type="text"
                        @keyup.enter.native="checkLogin"
                        v-model="user.email"></v-text-field>
                    <v-text-field 
                        prepend-icon="lock" 
                        label="Password" 
                        type="password"
                        @keyup.enter.native="checkLogin"
                        v-model="user.pass"></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn 
                    outline 
                    color="primary"
                    @click="checkLogin">Log in</v-btn>
            </v-card-actions>
        </v-card>
</template>

<script>
import { LOGIN } from "../store/UserStore.js";

export default {
  data() {
    return {
      user: {
        email: null,
        pass: null
      }
    };
  },
  methods: {
    checkLogin() {
      this.$store
        .dispatch({ type: LOGIN, userCredentials: this.user })
        .then(() => {
          this.$router.push({ name: "home" });
        })
        .catch(err => {
          throw new Error("Login Failed");
        });
    }
  },
};
</script>