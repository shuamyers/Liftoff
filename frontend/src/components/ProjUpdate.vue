<template>
   <div class="pa-2">
        <div class="my-flex justify-space-between">
            <div class="comment-owner">
                <v-list-tile avatar :key="update.userName" class="">
                <v-list-tile-avatar>
                    <img :src="update.userImg">
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title >Posted by {{update.userName}}</v-list-tile-title>
                    <v-list-tile-sub-title>{{update.createdAt | shortDay}}</v-list-tile-sub-title>
                </v-list-tile-content>
                </v-list-tile>
            </div>
            <p>{{update.createdAt | timePassed}}</p>
        </div>  
        <v-divider></v-divider>
        <div>
            <p>{{update.desc}}</p>  
        </div>
     </div>
</template>

<script>
export default {
props: {
        update: {
            type: Object,
            required:true
        },
    },
}
</script>

<style scoped>
.my-flex {
  display: flex
}
.justify-space-between{
  justify-content: space-between
}
</style>
