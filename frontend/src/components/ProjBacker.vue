<template>
   <div class="pa-2">
        <div class="my-flex justify-space-between align-center">
            <div class="update-owner">
                <v-list-tile avatar :key="backer.userName" class="">
                <v-list-tile-avatar>
                    <img :src="backer.userImg">
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title >{{backer.userName}}</v-list-tile-title>
                    <v-list-tile-sub-title>{{backer.createdAt | timePassed}}</v-list-tile-sub-title>
                </v-list-tile-content>
                </v-list-tile>
            </div>
            <p class="basic-bold">${{backer.pledgedAmount
}}</p>
        </div>
        <v-divider></v-divider>
     </div>
</template>

<script>
export default {
props: {
        backer: {
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
.basic-bold{
font-weight: 700;
font-size: 17px;
}
.align-center{
    align-items: center
}
</style>
