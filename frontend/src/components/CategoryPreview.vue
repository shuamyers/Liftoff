<template>  
            <v-jumbotron
                :src="category.imgUrl" class="category-preview">

                <v-container fill-height>
                <v-layout align-center>
                    <v-flex text-xs-center>
                    <h3 class="title-category">{{category.name}}</h3>

                    </v-flex>
                </v-layout>
                </v-container>
            </v-jumbotron>
</template>

<script>

export default {
  props: {
    category: {
      type: Object,
      required: true
    },
  },

};
</script>

<style>
.title-category{
    font-family: "Domine";
   font-size: 40px;
    color: white;
}
.category-preview{
    cursor: pointer;
}
</style>
