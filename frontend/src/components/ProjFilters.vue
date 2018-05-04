<template>
  <div class="sidebar">
          <p class="text-xs-left headline mt-3 hidden-sm-and-down">Filter results</p>
          <div>
            <p class="headlinefont text-xs-left  filter-title">CATEGORY</p>
            <ul class="clean-list text-xs-left filter hidden-sm-and-down">
              <li >All Categories</li>
              <li>Tech & Innovation</li>
              <li>Art</li>
              <li>Community Projects</li>
            </ul>
            <v-divider ></v-divider>
          </div>


          <div>
            <p class="headlinefont text-xs-left  filter-title">PROJECT TIMING</p>
            <ul class="clean-list text-xs-left filter hidden-sm-and-down">
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

}
</script>

<style>
.sidebar{
  display: inline;
}
.sidebar ul{
  width: 150px;
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
