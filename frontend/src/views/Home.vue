<template>
    <section>
        <featured></featured>
        <site-stats></site-stats>
        <v-container grid-list-md text-xs-left style="max-width:1200px">
            <catalog-projs :criteria="endingSoonCriteria" :label="'Ending Soon'"></catalog-projs>
        </v-container>
        <section>
            <v-container grid-list-md text-xs-left style="max-width:1200px" class="mb-5">
                <v-layout wrap class="categories">
                    <v-flex xs12 sm6 md6 wrap  v-for="(category,idx) in categories" :key="category.name">
                        <category-preview @mouseover.native="changeBrightness(idx,true)" @mouseout.native="changeBrightness(idx,false)" @click.native="$router.push(category.to)" :category="category"></category-preview>
                    </v-flex>
                </v-layout>
            </v-container>
              <v-jumbotron light
                    src="https://images.pexels.com/photos/356830/pexels-photo-356830.jpeg?auto=compress&cs=tinysrgb&h=1080&w=1980">

                    <v-container fill-height>
                    <v-layout align-center>
                        <v-flex text-xs-center>
                        <h3 class="moto big-font hidden-xs-only">Lift-off Your Creativity</h3>
                        <h3 class="moto medium-font hidden-sm-and-up">Lift-off Your Creativity</h3>
                            <v-btn
                                class="blue lighten-2 mt-5"
                                dark
                                large
                                :to="'/explore'"
                                >
                                Explore
                                </v-btn>
                        </v-flex>
                    </v-layout>
                    </v-container>
                </v-jumbotron>
        </section>
        <v-container grid-list-md text-xs-left style="max-width:1200px">
            <catalog-projs :criteria="completedCriteria" :label="'Trending'"></catalog-projs>
        </v-container>
        <v-container grid-list-md text-xs-left style="max-width:1200px">
            <catalog-projs :criteria="allCriteria" :label="'All'"></catalog-projs>
        </v-container>
    </section>
</template>

<script>
import Featured from "../components/Featured.vue";
import SiteStats from "../components/SiteStats.vue";
import CatalogProjs from "../components/CatalogProjs.vue";
import CategoryPreview from "../components/CategoryPreview.vue";

export default {
  components: {
    Featured,
    SiteStats,
    CatalogProjs,
    CategoryPreview
  },
  data() {
    return {
      endingSoonCriteria: {
        skip: 0,
        limit: 4,
        filterBy: {
          searchTxt: "",
          category: "Tech"
        }
      },
      completedCriteria: {
        skip: 0,
        limit: 4,
        filterBy: {
          searchTxt: "",
          category: "Art"
        }
      },
      popularCriteria: {
        skip: 0,
        limit: 4,
        filterBy: {
          searchTxt: "",
          category: "Tech"
        }
      },
      allCriteria: {
        skip: 0,
        limit: 4,
        filterBy: {
          searchTxt: "",
          category: ""
        }
      },
      newCriteria: {
        skip: 0,
        limit: 4,
        filterBy: {
          searchTxt: "",
          category: "Tech"
        }
      },
      categories: [
        {
          name: "Tech",
          imgUrl:
            "https://images.pexels.com/photos/908284/pexels-photo-908284.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
          to: "/explore"
        },
        {
          name: "Art",
          imgUrl:
            "https://images.pexels.com/photos/20967/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=750&w=1260",
          to: "/explore"
        },
        {
          name: "Music",
          imgUrl:
            "https://images.pexels.com/photos/374703/pexels-photo-374703.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
          to: "/explore"
        },
        {
          name: "Animals",
          imgUrl:
            "https://images.pexels.com/photos/59523/pexels-photo-59523.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
          to: "/explore"
        }
      ]
    };
  },
  methods:{
      changeBrightness(idx,toBright){
          var el = document.querySelectorAll('.category-preview .jumbotron__image')[idx];
            el.style.filter = (toBright) ? 'brightness(90%)' : 'brightness(50%)';
      }
  }
};
</script>
<style scoped>
.moto {
  font-family: "Domine";
  color: rgb(255, 207, 51);
  margin-bottom: 110px;
}
.big-font{
    font-size: 60px;
}
.medium-font{
    font-size: 40px;
}


.categories:nth-child(even){
    margin-right: 50px;
} 
</style>
<style>
.category-preview .jumbotron__image{
    transition: 0.5 all;
    /* filter: brightness(100%) !important; */
}
</style>
