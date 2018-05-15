<template>
  <section>
    <v-container grid-list-md text-xs-center v-scroll="onScroll">

      <div class="my-flex mt-4">
        <proj-filters @filterCategory="changeFilterCategory" @filterStatus="changeFilterStatus" class="hidden-sm-and-down"></proj-filters>
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
              <v-flex xs12 sm6 md4 wrap v-for="proj in projs" :key="proj._id">
                <proj-preview @setFavorite="setFavorite" @openLogin="openLogin" @removeFavorite="removeFavorite" :proj="proj" @click.native="goToProj(proj._id)"></proj-preview>
              </v-flex>
              <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading" class="centered">
                <span slot="no-more"></span>
              </infinite-loading>
            </v-layout>
          </v-container>
        </div>
      </div>
      <v-navigation-drawer v-model="drawer" temporary absolute clipped>
        <div class="filter-mobile">
          <proj-filters @filterCategory="changeFilterCategory" @filterStatus="changeFilterStatus"></proj-filters>
        </div>
      </v-navigation-drawer>
      <v-fab-transition>
        <v-btn v-show="showBtn" color="primary" bottom right fab fixed @click="$vuetify.goTo(target, option)">
          <v-icon>expand_less</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-container>

    <v-dialog v-model="login" width="600px">
      <v-card>
        <v-card-title>
          <div>
            <h1 class="headline">Please login</h1>
          </div>
        </v-card-title>
        <v-card-text>
            <login class=""></login>
        </v-card-text>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
import ProjPreview from '../components/ProjPreview';
import { LOAD_PROJS, LOAD_MORE_PROJS } from '../store/ProjStore';
import {
	ADD_FAVORITES,
	GET_BY_ID,
	REMOVE_FAVORITES
} from '../store/UserStore.js';
import ProjFilters from '../components/ProjFilters.vue';
import InfiniteLoading from 'vue-infinite-loading';
import Login from '../components/Login';

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
			offsetTop: 0,
			login: false
		};
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
		changeFilterCategory(category) {
			this.$store.commit('setFilterByCategory', { category });
			this.$store.dispatch(LOAD_PROJS);
			this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
		},
		changeFilterStatus(status) {
			console.log(status);
			this.$store.commit('setFilterByDuration', { status });
			this.$store.dispatch(LOAD_PROJS);
			this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
		},
		removeFavorite(projId) {
			this.$store.dispatch({
				type: REMOVE_FAVORITES,
				projId,
				user: this.$store.getters.loggedInUser
			});
		},
		setFavorite(projId) {
			this.$store.dispatch({
				type: ADD_FAVORITES,
				projId,
				user: this.$store.getters.loggedInUser
			});
		},
		openLogin() {
			console.log('here');
			this.login = true;
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
		}
	},
	destroyed() {
      this.$store.commit('setFilterByDuration', { status:'' });
      this.$store.commit('setFilterByCategory', { category:'' });
  },
	components: {
		ProjPreview,
		ProjFilters,
		InfiniteLoading,
		Login
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
