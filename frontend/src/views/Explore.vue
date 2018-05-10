<template>
  <section>
    <v-container grid-list-md text-xs-center v-scroll="onScroll">
      <!-- <div class="cmp-title">
        <p class="display-3 mt-4" id="top">Invest in the Future</p>
      </div> -->
      <div class="my-flex mt-4">
        <proj-filters @filterCategory="changeFilter" class="hidden-sm-and-down"></proj-filters>
        <!-- main -->
        <div>
          <div class="search-wrapper">
            <v-container grid-list-sm wrap class="my-flex-mobile">
              <div class="filter-btn-mobile hidden-md-and-up">
                <v-btn flat color="black" @click="drawer=true">
                  <v-icon>list</v-icon> Filter</v-btn>
              </div>
              <div class="search-div">
                <v-text-field solo label="Search" color="black" @input="search" v-model="searchTxt" prepend-icon="search"></v-text-field>
              </div>
            </v-container>
          </div>
          <v-container grid-list-md>
            <v-divider class="divder"></v-divider>
            <v-flex>
              <v-spacer></v-spacer>
            </v-flex>
            <v-layout wrap>
							<v-flex xs12 sm6 md4 wrap v-for="proj in projs" :key="proj._id" >
              	<proj-preview  :proj="proj" @click.native="goToProj(proj._id)"></proj-preview>
							</v-flex>
              <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading" class="centered">

              </infinite-loading>
            </v-layout>
          </v-container>
        </div>
      </div>
      <v-navigation-drawer v-model="drawer" temporary absolute clipped>
        <div class="filter-mobile">
          <proj-filters @filterCategory="changeFilter"></proj-filters>
        </div>
      </v-navigation-drawer>
      <v-fab-transition>
        <v-btn v-show="showBtn" color="primary" bottom right fab fixed @click="$vuetify.goTo(target, option)">
          <v-icon>expand_less</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-container>

  </section>
</template>

<script>
import ProjPreview from '../components/ProjPreview';
import { LOAD_PROJS, LOAD_MORE_PROJS } from '../store/ProjStore';
import ProjFilters from '../components/ProjFilters.vue';
import InfiniteLoading from 'vue-infinite-loading';

export default {
	created() {
		this.$store.dispatch({ type: LOAD_PROJS });
	},
	data() {
		return {
			searchTxt: null,
			drawer: false,
			target: '#top',
			option: {
				duration: 1000,
				offset: 0,
				easing: 'easeInOutCubic'
			},
      offsetTop: 0
		}
	},
	methods: {
		onScroll() {
			this.offsetTop = window.pageYOffset || document.documentElement.scrollTop;
		},
		goToProj(projId) {
			this.$router.push('project/' + projId);
		},
		search() {
			this.$store.commit('setFilterBySearchTxt', { searchTxt: this.searchTxt });
			this.$store.dispatch(LOAD_PROJS);
		},
		infiniteHandler($state) {
			this.$store.dispatch({ type: LOAD_MORE_PROJS }).then(length => {
				if (length) {
					$state.loaded();
					if (length < 12) {
						$state.complete();
					}
				} else {
					$state.complete();
				}
			});
		},
		changeFilter(category) {
			this.$store.commit('setFilterByCategory', { category });
			this.$store.dispatch(LOAD_PROJS);
			this.$refs.infiniteLoading.$emit("$InfiniteLoading:reset");
		}
	},
	computed: {
		showBtn() {
			return this.offsetTop > 500;
		},
		projs() {
			return this.$store.getters.projsForDisplay;
		},
		numOfProjs() {
			return this.$store.getters.numOfProjs;
    },

	},
	components: {
		ProjPreview,
		ProjFilters,
		InfiniteLoading
	}
};
</script>

<style scoped>
.filter-mobile {
	margin: 50px 0 0 25px;
}
.filter-div {
	display: flex;
	justify-content: space-between;
}

.my-flex-mobile {
	display: block;
}

.search-div {
	display: block;
	width: 100%;
}
@media only screen and (max-width: 960px) {
	.my-flex-mobile {
		display: flex;
	}
	.search-div {
		width: 70%;
		display: inline;
	}
	.filter-btn-mobile {
		display: inline;
		width: 30%;
	}
}
.divder {
	margin: 20px 0 10px;
	width: 100%;
}

.my-flex {
	display: flex;
}

/* .proj-preview {
	cursor: pointer;
} */

.inline {
	display: inline;
	width: 80%;
}

.centered {
	margin: 0 auto;
}
</style>
