<template>
  <div class="sidebar">
          <p class="text-xs-left headline mt-3">Filter results</p>
          <div>
            <p class="headlinefont text-xs-left  filter-title">CATEGORY</p>
            <ul class="clean-list text-xs-left filter">
              <li @click="emitfilter('All')">All Categories</li>
              <li @click="emitfilter('Tech')">Tech & Innovation</li>
              <li @click="emitfilter('Art')">Art</li>
              <li @click="emitfilter('Community')">Community Projects</li>
            </ul>
            <v-divider ></v-divider>
          </div>
          <div>
            <p class="headlinefont text-xs-left  filter-title">PROJECT TIMING</p>
            <ul class="clean-list text-xs-left filter">
              <li >All </li>
              <li>Launching soon</li>
              <li>Just launched</li>
              <li>Ending soon</li>
            </ul>
            <v-divider ></v-divider>
          </div>

        </div>
</template>

<script>
export default {

methods: {
    emitfilter(filter) {
        console.log('hi',filter)
        // this.$emit('filterCategory',filter)
    }
},
}
</script>

<style>
.sidebar{
  display: inline;
}
.sidebar ul{
  width: 180px;
}
.filter li{
  margin: 20px 0;
  font-size: 20px;
}
.filter li:hover{
  color: #2196f3;
  cursor: pointer;
}
.filter-title{
  margin-top:35px;
  color:#b5b5b5;
  font-weight: bold;
}

.clean-list{
  list-style: none;
}
</style>
