<template>
  <v-container fluid>
    <v-layout justify-center>
      <v-flex xs12 sm8 md4>
        <v-card>
          <v-alert 
            v-model="alert.isShow" 
            :type="alert.type"
            dismissible>
            {{ alert.msg }}
          </v-alert>
          <v-card-text>
              <v-form>
                  <v-text-field 
                      prepend-icon="person" 
                      label="Name" 
                      type="text"
                      v-model="user.name"></v-text-field>
                  <v-text-field 
                      prepend-icon="email" 
                      label="Email" 
                      type="text"
                      ref="email"
                      v-model="user.email"></v-text-field>
                  <v-text-field 
                      prepend-icon="lock" 
                      label="Password" 
                      type="password"
                      v-model="user.pass"></v-text-field>
              </v-form>
          </v-card-text>
          <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn 
                  outline 
                  color="primary"
                  @click="register">Sign up</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { REGISTER } from "../store/UserStore.js";

export default {
  data() {
    return {
      alert: {
        isShow: false,
        type: null,
        msg: null
      },
      user: {
        name: null,
        email: null,
        pass: null
      }
    };
  },
  methods: {
    register() {
      this.$store
        .dispatch({ type: REGISTER, registerDetails: this.user })
        .then(() => {
          this.$router.push({ name: "home" });
        })
        .catch(err => {
          this.alert = {
            isShow: true,
            type: "error",
            msg: "Email already in use!"
          };
          this.$refs.email.focus();
        });
    }
  }
};
</script>