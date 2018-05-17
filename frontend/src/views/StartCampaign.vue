<template>
<section class="project-edit">
  <v-container class="pa-5 project-edit-main" grid-list-md text-xl-left style="max-width:1000px">
       <v-layout wrap>
         <!-- Start Of Edit Proj Header! -->
        <v-container class="proj-edit-header" grid-list-md text-xl-left>
                  <v-layout wrap justify-content>
                      <v-flex xs12 wrap>
                        <div class="my-flex flex-end">
                          <v-btn large color="red">Preview</v-btn>
                          <v-btn large color="primary">Save</v-btn>
                        </div>
                      </v-flex>
                  </v-layout>
        </v-container>
            <v-flex xs12 wrap>
              <v-container class="proj-edit-header" grid-list-md text-xl-left>
                  <v-layout wrap justify-content>
                      <!-- <v-flex xs12 wrap class="edit-menu-horizantal">
                          <div class="ml-2 my-flex">
                              <div class="labels-wrapper-horizantal">
                                  <p class="title-label ma-0 mb-1" >Contents</p>
                                  <div class="labels-contnet-wrapper">
                                    <div class="my-flex ">
                                        <p class="edit-label ma-0 mr-1" v-for="(type,idx) in editType" :key="type.title"
                                        @click="labelChosen(type,idx)" :class="{currLabel: idx === activeLabel}">{{type.title}}
                                        </p>         
                                    </div>
                                  </div>
                              </div>                 
                            </div>
                      </v-flex> -->
                      <v-flex xs12 sm10 md10 wrap class="">

                        <div v-for="(type,idx) in editType" :key="type.title"
                        :id="type.to" :data-idx="idx"
                        v-observe-visibility="visibilityChanged">
                          <span class="headline">{{type.title}}</span>
                          <v-divider></v-divider>
                          <component :is="type.title" class="pt-3 pb-3"></component>                    
                        </div>
                      </v-flex>
                      <v-flex xs12 sm2 md2 wrap class="my-flex flex-row edit-menu flex-end" style="height:100%">
                        <!-- <div class="seperate-line"></div> -->
                        <div class="ml-2 my-flex flex-col">
                          <div class="labels-wrapper">
                              <p class="title-label ma-0 mb-1" >Contents</p>
                              <p class="edit-label ma-0 mb-1" v-for="(type,idx) in editType" :key="type.title"
                              @click="labelChosen(type,idx)" :class="{currLabel: idx === activeLabel}">{{type.title}}
                              </p>         
                           </div>                 
                        </div>
                      </v-flex>
                  </v-layout>
              </v-container>
            </v-flex>
       </v-layout>
        
  </v-container>

</section>
</template>

<script>
import Basics from "../components/open-proj/EditBasics";
import Items from "../components/open-proj/EditItems";
import Story from "../components/open-proj/EditStory";
import Rewards from "../components/open-proj/EditRewards";

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'


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
        { title: "Items", icon: "question_answer", to: "items" },
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
.project-edit {
 font-family: "Benton Sans", "Helvetica", "sans-serif";
}
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
/* .seperate-line {
  height: 100%;
  width: 3px;
  background-color: rgb(32, 138, 224);
  border-radius: 7px;
} */
.edit-label {
  cursor: pointer;
  color: grey;
  font-size: 16px;
}
.currLabel {
  color: rgb(32, 138, 224);
}
.title-label {
  font-size: 17px;
  font-weight: 600;
}
.edit-label:hover {
  color: rgb(32, 138, 224);
}
.edit-menu {
  position: sticky;
  top: 100px;
}
.edit-menu-horizantal {
  position: sticky;
  /* top: 60px; */
  top: 60px;
  z-index: 5;
}
.labels-wrapper {
  padding-left: 20px;
  border-left: 4px solid rgb(32, 138, 224);
  border-radius: 6px;
}
.labels-wrapper-horizantal {
  padding-bottom: 5px;
   border-bottom: 4px solid rgb(32, 138, 224);
  border-radius: 6px; 
}
.labels-contnet-wrapper {
  width: 100%;
  background-color: white;
}


/* .labels-wrapper-horizantal:before, .labels-wrapper-horizantal:after {
    content: "";
    height: 1px;
background: linear-gradient(to right,  rgba(0,0,0,0) 0%,rgba(147,147,147,1) 50%,rgba(0,0,0,0) 100%);

display: block;
margin-bottom: 10px;
    margin-top: 10px;
} */
</style>
