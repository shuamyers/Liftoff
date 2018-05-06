<template>
   <section class="login-page">
     <p>login</p>
            <form @submit.prevent="checkLogin">
                <input ref="txtUserEmail" type="text" placeholder="Email" v-model="user.email" />
                <input type="password" placeholder="Enter your Password" v-model="user.pass"/>
                <v-btn type="submit" >Login</v-btn>
            </form>

        </section>
</template>

<script>
import UserService from '../services/UserService.js';
import { LOGIN } from "../store/UserStore.js";

export default {
data() {
        return {
            user: {email:'admin@a.com', pass: '1234'}
        }
    },
    created() {
        
    },
    methods: {
        checkLogin() {

            this.$store.dispatch({type: LOGIN, userCredentials:this.user})
            .then(res => {
                console.log('You have been logged-in!')
                // EventBusService.$emit(SHOW_MSG, {txt: `Welcome ${this.user.name}`});
                this.$router.push('/');
            })
            .catch(err => {
                console.log('Login Failed!');
                // EventBusService.$emit(SHOW_MSG, {txt: `Wrong Credentials, please try again`, type: 'danger'});
                this.$refs.txtUserEmail.focus();
            })
        }
    },
    computed: {
    }
}
</script>

<style>

</style>
