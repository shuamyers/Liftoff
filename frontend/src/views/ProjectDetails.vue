<template>
  <section class="project-details">
    <h1>Project details</h1>
  {{proj}}
      <button @click="goBack">Go Back</button>
      <button @click="deleteProj">Delete Proj</button>
  </section>
</template>

<script>
import { SET_SELECTED_PROJ, DELETE_PROJ } from "../store/ProjStore.js";
export default {
  data() {
    return {
      
    };
  },

  created() {
    const projId = this.$route.params.projId;
    this.$store.dispatch({ type: SET_SELECTED_PROJ, projId })

  },

  methods: {
    edit() {
      this.$router.push("/proj/edit/" + this.proj._id);
    },
    deleteProj() {
      this.$store
        .dispatch({ type: DELETE_PROJ, projId: this.proj._id })
        .then(_ => {
          this.$router.push("/");
        });
    },
    goBack() {
      this.$router.go(-1);
    }
  },

  computed: {
    proj() {
      return this.$store.state.ProjStore.selectedProj;
    }
  },

  destroyed() {
    this.$store.commit({ type: "setSelectedProj", selectedProj: null });
  }
};
</script>

<style>

</style>
