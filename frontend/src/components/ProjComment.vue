<template>
   <div class="pa-2">
        <div class="my-flex justify-space-between">
            <div class="comment-owner my-flex">
                <v-list-tile class="" avatar :key="comment.userName" >
                <v-list-tile-avatar class="">
                    <img :src="comment.userImg">
                </v-list-tile-avatar>
                </v-list-tile>
                <div class="comment-info mt-2">
                    <div class="my-flex mb-2">
                        <span class="user-name">{{comment.userName}}</span>
                        <span class="ml-2 small-txt">{{comment.createdAt | timePassed}}</span>
                    </div>
                    <p class="mb-0">{{comment.desc}}</p>
                </div>
            </div>
        </div>
     </div>
</template>

<script>
export default {
props: {
        comment: {
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
.small-txt{
/* font-weight: 700; */
font-size: 13px;
}
.user-name{
    font-weight: 700;
    font-size: 13px;
    
}
.align-center{
    align-items: center
}
</style>
<style>
.comment-owner .list__tile{
        padding-right:0 !important;
    }
</style>

