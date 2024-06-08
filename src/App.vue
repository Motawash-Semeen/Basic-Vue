<script setup>
import { computed, ref, watch, provide } from "vue";
import moment from "moment";
import Swal from "sweetalert2";
import Posts from "./components/Posts.vue";
import Form from "./components/Form.vue";
import Layout from "./components/Layout.vue";

var posts = ref([
  {
    id: 1,
    title: "Post 1",
    content:
      "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
    likes: 0,
    comments: [
      {
        id: 1,
        user: "John Doe1",
        date: "2024-05-24 11:00:00",
        content: "This is a comment.",
      },
    ],
    date: "2024-05-24 11:00:00",
    showComments: false,
  },
  {
    id: 2,
    title: "Post 2",
    content:
      "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
    likes: 4,
    comments: [],
    date: "2024-05-24 11:00:00",
    showComments: false,
  },
  {
    id: 3,
    title: "Post 3",
    content:
      "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
    likes: 5,
    comments: [
      {
        id: 1,
        user: "John Doe4",
        date: "2024-05-24 11:00:00",
        content: "This is a comment.",
      },
      {
        id: 2,
        user: "John Doe5",
        date: "2024-05-24 11:00:00",
        content: "This is a comment.",
      },
    ],
    date: "2024-05-24 11:00:00",
    showComments: false,
  },
]);

// var userName = ref("Semeen Chowdhury");

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
  console.log("post", postId);
  post.likes++;
}

function handelDelete(postId) {
  console.log("post", postId);
  posts.value = posts.value.filter((post) => post.id !== postId);
  return posts.value;
}

function handelSubmit(event) {
  event.preventDefault();
  if (!formData.value.title || !formData.value.content) {
    Swal.fire({
      text: "Please fill all the fields!",
      icon: "error",
      confirmButtonText: "ok",
    });
    formData.value.title = "";
    formData.value.content = "";
    return;
  }
  posts.value.push({
    id: posts.value.length + 1,
    title: formData.value.title,
    content: formData.value.content,
    likes: 0,
    comments: [],
    date: moment().format("YYYY-MM-DD HH:mm:ss"),
    showComments: false,
  });
  formData.value.title = "";
  formData.value.content = "";
}
function handelComment(postId) {
  const post = posts.value.find((post) => post.id === postId);
  if (!commentData.value.content[postId]) {
    Swal.fire({
      text: "Please fill the comment field!",
      icon: "error",
      confirmButtonText: "ok",
    });
    return;
  }
  post.comments.push({
    id: post.comments.length + 1,
    user: "John Doe",
    date: moment().format("YYYY-MM-DD HH:mm:ss"),
    content: commentData.value.content[postId],
  });
  commentData.value.content[postId] = "";
  console.log("test");
}

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

provide("posts", posts);
</script>

<template>
  <Layout :userName="userName" :currentComp="currentComp" @handelTab="handelTab">
    <Form v-if="currentComp == 'create-post'" :formData="formData" @handelSubmit="handelSubmit" class="bg-light" style="padding: 10px; border-radius: 12px;"/>
    <Posts
      v-else-if="currentComp == 'posts'"
      v-model:comment="commentData"
      @handelLike="handelLike"
      @handelDelete="handelDelete"
      @showComment="showComment"
      @handelDeleteCom="handelDeleteCom"
      @handelComment="handelComment"
    />
    <!-- <Posts
      :posts="posts"
      :commentData="commentData"
      @handelLike="handelLike"
      @handelDelete="handelDelete"
      @showComment="showComment"
      @handelDeleteCom="handelDeleteCom"
      @handelComment="handelComment"
    /> -->
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
