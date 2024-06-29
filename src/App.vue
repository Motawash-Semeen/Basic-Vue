<script setup>
import { computed, ref, watch, provide } from "vue";
import moment from "moment";
import Swal from "sweetalert2";
import Posts from "./components/Posts.vue";
import Form from "./components/Form.vue";
import Layout from "./components/Layout.vue";

import { useStore } from "vuex";

const store = useStore();

const posts = computed(() => store.getters["posts/getPosts"]);


watch(
  () => posts.value.length,
  (newPostslength, oldPostslength) => {
    if (newPostslength > oldPostslength) {
      Swal.fire({
        text: "Post added successfully!",
        icon: "success",
        confirmButtonText: "ok",
      });
    }
  }
);

watch(
  () => posts.value,
  (newPosts, oldPosts) => {
    newPosts.forEach((post) => {
      if (post.likes == 10 && !post.likesNotified) {
        post.likesNotified = true;
        Swal.fire({
          text: `Post ${post.title} has reached 10 likes!`,
          icon: "success",
          confirmButtonText: "ok",
        });
      }
    });
  },
  { deep: true }
);

const formData = ref({
  title: "",
  content: "",
});

const commentData = ref({
  content: {},
});

function handelLike(postId) {
  const post = posts.value.find((post) => post.id === postId);
  post.likes++;
}

// function handelComment(postId) {
//   const post = posts.value.find((post) => post.id === postId);
//   if (!commentData.value.content[postId]) {
//     Swal.fire({
//       text: "Please fill the comment field!",
//       icon: "error",
//       confirmButtonText: "ok",
//     });
//     return;
//   }
//   post.comments.push({
//     id: post.comments.length + 1,
//     user: "John Doe",
//     date: moment().format("YYYY-MM-DD HH:mm:ss"),
//     content: commentData.value.content[postId],
//   });
//   commentData.value.content[postId] = "";
// }

function handelDeleteCom(commentId, postId) {
  const post = posts.value.find((post) => post.id === postId);
  post.comments = post.comments.filter((comment) => comment.id !== commentId);
}

function showComment(postId) {
  var post = posts.value.find((post) => post.id === postId);
  post.showComments = !post.showComments;
}

const currentComp = ref("posts");

function handelTab(e) {
  if(e.target.innerText === "Posts") {
    currentComp.value = "posts";
  } else {
    currentComp.value = "create-post";
  }
}

</script>

<template>
  <Layout :userName="userName" :currentComp="currentComp" @handelTab="handelTab">
    <Form v-if="currentComp == 'create-post'" :formData="formData" @handelSubmit="handelSubmit" class="bg-light" style="padding: 10px; border-radius: 12px;"/>
    <Posts
      v-else-if="currentComp == 'posts'"
      v-model:comment="commentData"
      @handelLike="handelLike"
      @showComment="showComment"
      @handelDeleteCom="handelDeleteCom"
    />
  </Layout>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.very-low-opacity {
  opacity: 0.1;
}
</style>
