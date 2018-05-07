<template>
<section class="project-edit">
    <v-navigation-drawer :mini-variant="mini" app hide-overlay clipped
      fixed
     permanent
      v-model="drawer"
      width="150">
    <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile class="my-flex justify-right">
            <v-btn v-if="mini" icon @click.native.stop="mini = !mini">
              <v-icon >chevron_right</v-icon>
            </v-btn>
          <!-- <v-list-tile-title class="title">
            Application
          </v-list-tile-title> -->
          <v-list-tile-action>
          </v-list-tile-action>
            <v-btn icon @click.native.stop="mini = !mini">
              <v-icon v-if="!mini">chevron_left</v-icon>
            </v-btn>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-list class="pt-0" dense>
      <v-divider></v-divider>
      <v-list-tile v-for="item in items" :key="item.title" :to="item.to">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
  <v-container class="pa-5 project-edit-main" grid-list-md text-xl-left style="max-width:1000px">
       <v-layout>
            <v-flex xs12 wrap>
              <v-container class="proj-edit-header" grid-list-md text-xl-left>
                  <v-layout wrap justify-content>
                      <v-flex xs12 sm6 md6 wrap>
                        <span>Campaign/{{edit}}</span>
                      </v-flex>
                      <v-flex xs12 sm6 md6 wrap class="my-flex flex-row">
                        <p>bbbbbbb</p>
                        <p>cccc</p>
                      </v-flex>
                  </v-layout>
              </v-container>
            </v-flex>
       </v-layout>
        <!-- Start Of Proj Main! -->
        <v-container class="proj-edit-header" grid-list-md text-xl-left>
                  <v-layout wrap justify-content>
                      <v-flex xs12 sm6 md6 wrap>
                         <router-view></router-view>
                      </v-flex>
                  </v-layout>
        </v-container>
  </v-container>

</section>
</template>

<script>
export default {
 data () {
      return {
        drawer: true,
        items: [
          { title: 'Basics', icon: 'dashboard' ,to:'basics'},
          { title: 'Story', icon: 'question_answer' ,to:{path:'story'}},
          { title: 'Rewards', icon: 'question_answer',to:'rewards' },
          { title: 'Items', icon: 'question_answer',to:'items' },
        ],
        mini: true,
      }
    },
    computed: {
      edit(){

        // return this.href.substr(this.href.lastIndexOf('/') + 1)
      }
    }
}
</script>

<style scoped>
.my-flex{
  display: flex;
}
.justify-end {
  justify-content: flex-end
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
.justify-space-between{
  justify-content: space-between
}
</style>
