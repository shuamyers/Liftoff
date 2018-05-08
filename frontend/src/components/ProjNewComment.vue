<template>
   <section class="proj-new-comment pt-2 pl-2 pr-2 mt-2">
        <div class="my-flex justify-space-between">
            <div class="comment-owner full-width my-flex">
                <v-list-tile class="" avatar :key="user.imgUrl" >
                  <v-list-tile-avatar class="">
                      <img :src="user.imgUrl">
                  </v-list-tile-avatar>
                </v-list-tile>
                <div class="comment-info full-width">
                    <div class="mb-2">
                        <!-- <span class="user-name">{{user.name}}</span> -->
                        <form v-on:submit.prevent="addComment">
                            <v-text-field
                           class="pt-0"
                            placeholder="Add a public comment..."
                            v-model="commentTxt"
                            auto-grow                            
                            hint="nvnt"
                            hide-details
                            :maxlength="10" 
                            @focus="onComment = true"
                            ></v-text-field> 
                        </form>
                        <transition duration="100" name="fade">
                          <div v-show="onComment" class="comments-buttons">
                            <v-btn  style="float:right" color="primary" @click="addComment">Comment</v-btn>
                            <v-btn  style="float:right" @click="onComment = false">Cancel</v-btn>
                          </div>
                        </transition>
                    </div>
                </div>
            </div>
        </div>
     </section>
</template>

<script>
export default {
  props: {
    user: {
        type: Object,
        required:true
    },
  },
  data() {
    return {
      onComment:false,
      commentTxt: ""
    };
  },
  methods: {
    addComment(){
      this.$emit('addComment',this.commentTxt)
    }
  }
};
</script>

<style scoped>
.my-flex {
  display: flex;
}
.justify-space-between {
  justify-content: space-between;
}
.justify-end {
  justify-content: flex-end;
}
.flex-col {
  flex-direction: column;
}
.align-self-end {
  align-self: flex-end;
}
.small-txt {
  /* font-weight: 700; */
  font-size: 13px;
}
.user-name {
  font-weight: 700;
  font-size: 13px;
}
.align-center {
  align-items: center;
}
.full-width {
  width: 100%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s
}

.fade-enter,
.fade-leave-to
/* .fade-leave-active in <2.1.8 */

{
  opacity: 0
}
</style>
<style>
.comment-owner .list__tile {
  padding-right: 0 !important;
}
</style>
