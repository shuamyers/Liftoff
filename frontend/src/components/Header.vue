<template>
  <section>
    <nav-bar></nav-bar>
    <p>Header</p>
    <button @click="qury">qury</button>
  </section>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import services from "../services/projService";

export default {
  methods: {
    qury() {
      services.getProjs().then((result) => {
        console.log(result)
      }).catch((err) => {
        
      });
    }
  },
  components: {
    NavBar
  }
};
</script>

<style>

</style>
