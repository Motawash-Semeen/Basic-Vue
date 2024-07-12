<script setup>
import { ref, computed, watch, provide } from 'vue'
import Posts from './components/Posts.vue'
import CreatePost from './components/CreatePost.vue';
import LayoutContent from './components/LayoutContent.vue';
import { useStore } from 'vuex';
import { RouterView } from 'vue-router';

const store = useStore();

const posts = computed(() => store.getters['posts/getPosts']);

watch(
  () => posts.value.length,
  (newValue, oldValue) => {
    if (newValue > oldValue) {
      alert('A new post has been created!')
    }
  },
  { immediate: true }
)

watch(
  () => posts.value,
  () => {
    posts.value.forEach((post) => {
      if (post.likes === 10 && !post.likeConfirmation) {
        post.likeConfirmation = true
        alert('A post has reached 10 likes!')
      }
    })
  },
  { deep: true }
)

provide('posts', posts);

const currentComp = ref('posts');
</script>

<template>
    <RouterView />
  <!-- <LayoutContent @changeComp="(comp) => currentComp = comp" :currentComp="currentComp">
    <CreatePost v-if="currentComp == 'create-post'" />
    <Posts v-else-if="currentComp == 'posts'" />
  </LayoutContent> -->
</template>

<style>
.cursor-pointer {
  cursor: pointer;
}

.very-low-opacity {
  opacity: 0.1;
}
</style>
