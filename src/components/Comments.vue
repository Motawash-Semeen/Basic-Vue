<script setup>
import { defineProps, defineEmits, computed, ref, watch, toRefs, onMounted, onBeforeMount, onUnmounted } from "vue";
import moment from "moment";
import Swal from "sweetalert2";

import { useStore } from "vuex";
const store = useStore();

const props = defineProps(["comments", "postID", "showComments"]);
const { comments, showComments } = toRefs(props);

const revComments = computed(() => [...comments.value].reverse());

const postID = ref(props.postID);

const emit = defineEmits({
  handelDeleteCom: (commentId, postId) => {
    if (typeof commentId === "number" && typeof postId === "number") {
      return true;
    }
    return false;
  },
});

function handelDeleteCom(commentId, postId) {
  // emit("handelDeleteCom", commentId, postId);
  store.dispatch("posts/deleteComment", { commentId, postId });
}

watch(
  () => props.comments.length,
  (newVal, oldVal) => {
    if (newVal > oldVal) {
      Swal.fire({
        icon: "success",
        title: "Comment added successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    if (newVal == 3) {
      Swal.fire({
        icon: "success",
        title: "Post has reached 3 comments",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
);

onMounted(() => {
  console.log("Comments mounted");
});
onBeforeMount(() => {
  console.log("Comments before mount");
});
onUnmounted(() => {
  console.log("Comments unmounted");
});
</script>

<template>
  <template v-if="showComments">
    <div v-for="comment in revComments" :key="comment.id">
      <div class="comment mb-3 ms-3">
        <h6 class="card-title small">
          {{ comment.user }}
          <span class="text-danger float-end cursor-pointer" @click="handelDeleteCom(comment.id, postID)">X</span>
        </h6>
        <p class="card-subtitle mb-1 text-body-secondary small">
          {{ moment(comment.date).fromNow() }}
        </p>
        <p class="card-text small">{{ comment.content }}</p>
      </div>
      <hr class="my-2 very-low-opacity" />
    </div>
  </template>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.very-low-opacity {
  opacity: 0.1;
}
</style>
