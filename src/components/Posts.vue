<script setup>
import { defineProps, defineEmits, computed, toRefs, defineModel, inject, onUpdated } from "vue";
import moment from "moment";
import Comments from "./Comments.vue";

// const props = defineProps({
//   // posts: {
//   //   type: Array,
//   //   required: true,
//   // },
//   // commentData: {
//   //   type: Object,
//   // },
// });

const commentData = defineModel("comment");

const emit = defineEmits([
  "handelDelete",
  "handelLike",
  "showComment",
  "handelComment",
  "handelDeleteCom",
]);

/*const posts = ref(props.posts);*/

/* const { posts, commentData } = toRefs(props); */

const posts = inject("posts");

const revposts = computed(() => [...posts.value].reverse());

function handelDelete(postId) {
  emit("handelDelete", postId);
}
function handelLike(postId) {
  emit("handelLike", postId);
}
function showComment(postId) {
  emit("showComment", postId);
}
function handelDeleteCom(commentId, postId) {
  emit("handelDeleteCom", commentId, postId);
}
function handelComment(postId) {
  emit("handelComment", postId);
}

onUpdated(() => {
  console.log("Posts updated");
});
</script>

<template>
  <div class="posts mt-4">
    <div class="container">
      <div class="nav nav-tabs mb-4">
        <h3>
          Posts
          <span :class="{ 'text-danger': posts.length <= 0 }">{{
            posts.length
          }}</span>
        </h3>
      </div>

      <div class="row">
        <div class="col-md-4" v-for="post in revposts" :key="post.id">
          <div class="card mb-4">
            <div class="card-body">
              <h5 class="card-title">{{ post.title }}</h5>
              <h6 class="card-subtitle mb-2 text-body-secondary">
                {{ moment(post.date).fromNow() }}
              </h6>
              <p class="card-text">{{ post.content }}</p>
              <p class="card-text">
                <small v-if="post.likes == 0" class="text-danger"
                  >No likes,
                </small>
                <small v-else-if="post.likes >= 1"
                  >{{ post.likes }} likes,
                </small>
                <small
                  @click="showComment(post.id)"
                  :style="{
                    color: post.comments.length > 0 ? post.comments.length >= 3 ? 'green' : 'black' : 'red',
                    cursor: 'pointer',
                  }"
                >
                  <span v-if="post.comments.length==0">No</span> 
                  <span v-else>{{ post.comments.length }}</span> 
                  
                  comments</small
                >
              </p>

              <div
                class="comments mb-3"
                id="comment"
              >
                <div class="comments-input d-flex mb-3">
                  <input
                    type="text"
                    class="form-control form-control-sm me-2"
                    placeholder="Write Comment"
                    v-model="commentData.content[post.id]"
                  />
                  <button
                    class="btn btn-sm btn-success"
                    @click="handelComment(post.id)"
                  >
                    <i class="bi bi-send"></i>
                  </button>
                </div>

                <Comments
                  :comments="post.comments"
                  :postID="post.id"
                  :showComments="post.showComments"
                  @handelDeleteCom="handelDeleteCom"
                />
              </div>

              <button
                class="btn btn-sm btn-primary"
                @click="handelLike(post.id)"
              >
                Like
              </button>
              <button
                class="btn btn-sm btn-danger float-end"
                @click="handelDelete(post.id)"
              >
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.very-low-opacity {
  opacity: 0.1;
}
</style>