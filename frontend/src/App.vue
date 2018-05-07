<template>
    <section>
        <v-app>
            <v-content>
                <app-header></app-header>
                <router-view></router-view>
                <app-footer></app-footer>
            </v-content>
        </v-app>
    </section>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
    components: {
        'app-header': Header,
        'app-footer': Footer
    }
}
</script>

<style>

</style>
