<script setup>
import { computed } from "vue";
import moment from "moment";
import CommentSection from "./CommentSection.vue";
import { useStore } from "vuex";
import LayoutContent from "./LayoutContent.vue";

const store = useStore();
</script>

<template>
  <LayoutContent>
    <div class="posts mt-4">
      <div class="container">
        <RouterView />
      </div>
    </div>
  </LayoutContent>
</template>
