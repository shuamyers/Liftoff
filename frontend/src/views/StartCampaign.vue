<template>
<section class="project-edit">
    <!-- <v-navigation-drawer app hide-overlay clipped
      fixed
     permanent
      v-model="drawer"
      width="150">
    <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile class="my-flex justify-right">
          <v-list-tile-title class="title">
            Application
          </v-list-tile-title>
          <v-list-tile-action>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-list class="pt-0" dense>
      <v-divider></v-divider>
      <v-list-tile v-for="item in items" :key="item.title" @click="labelChosen(item)">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer> -->
  <v-container class="pa-5 project-edit-main" grid-list-md text-xl-left style="max-width:1000px">
       <v-layout>
            <v-flex xs12 wrap>
              <v-container class="proj-edit-header" grid-list-md text-xl-left>
                  <v-layout wrap justify-content>
                      <v-flex xs12 sm10 md10 wrap class="">

                        <div v-for="(type,idx) in editType" :key="type.title"
                        :id="type.to" :data-idx="idx"
                        v-observe-visibility="visibilityChanged">
                          <span class="headline">{{type.title}}</span>
                          <v-divider></v-divider>
                        <component  
                          :is="type.to" >
                        </component>                    
                        </div>
                      </v-flex>
                      <v-flex xs12 sm2 md2 wrap class="my-flex flex-row edit-menu flex-end" style="height:100%">
                        <div class="seperate-line"></div>
                        <div class="ml-2 my-flex flex-col">
                          <p class="title-label ma-0 mb-1" >Contents</p>
                          <p class="edit-label ma-0 mb-1" v-for="(type,idx) in editType" :key="type.title"
                           @click="labelChosen(type,idx)" :class="{currLabel: idx === activeLabel}">{{type.title}}
                           </p>                          
                        </div>
                      </v-flex>
                  </v-layout>
              </v-container>
            </v-flex>
       </v-layout>
        <!-- Start Of Edit Proj Header! -->
        <v-container class="proj-edit-header" grid-list-md text-xl-left>
                  <v-layout wrap justify-content>
                      <v-flex xs12 sm6 md6 wrap>
                      </v-flex>
                  </v-layout>
        </v-container>
  </v-container>

</section>
</template>

<script>
import Basics from "../components/open-proj/EditBasics";
import Items from "../components/open-proj/EditItems";
import Story from "../components/open-proj/EditStory";
import Rewards from "../components/open-proj/EditRewards";

export default {
  created() {
    // console.log(this.$vuetify.breakpoint);
  },
  data() {
    return {
      drawer: true,
      editType: [
        { title: "Basics", icon: "dashboard", to: "basics" },
        { title: "Story", icon: "question_answer", to: "story" },
        { title: "Rewards", icon: "question_answer", to: "rewards" },
        { title: "Items", icon: "question_answer", to: "items" }
      ],
      mini: true,
      activeLabel: 1
    };
  },
  computed: {
    edit() {
      // return this.href.substr(this.href.lastIndexOf('/') + 1)
    }
  },
  methods: {
    labelChosen(item, idx) {
      this.activeLabel = idx;
      let navBaroffset = document.querySelector(".toolbar__content")
        .offsetHeight;
      this.$vuetify.goTo("#" + item.to, {
        duration: 300,
        offset: -navBaroffset,
        easing: "easeInOutCubic"
      });
    },
    visibilityChanged(isVisible, entry) {
      if (entry.boundingClientRect.top < 0) {
        if (isVisible) this.activeLabel = +entry.target.dataset.idx;
        else this.activeLabel = +entry.target.dataset.idx + 1;
        console.log(+entry.target.dataset.idx);
      }
    }
  },
  components: {
    Basics,
    Items,
    Story,
    Rewards
  }
};
</script>

<style scoped>
.my-flex {
  display: flex;
}
.justify-end {
  justify-content: flex-end;
}
.flex-col {
  flex-direction: column;
}
.flex-row {
  flex-direction: row;
}
.flex-baseline {
  align-items: baseline;
}
.justify-space-between {
  justify-content: space-between;
}
.flex-end {
  justify-content: flex-end;
}
.seperate-line {
  height: 120px;
  width: 3px;
  background-color: rgb(32, 138, 224);
  border-radius: 7px;
}
.edit-label {
  cursor: pointer;
  color: grey;
  font-size: 13px;
}
.currLabel {
  color: rgb(32, 138, 224);
}
.title-label {
  font-size: 15px;
  font-weight: 600;
}
.edit-label:hover {
  color: rgb(32, 138, 224);
}
.edit-menu {
  position: sticky;
  top: 100px;
}
</style>
