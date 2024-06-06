<script setup>
import { defineProps, defineEmits, computed, ref, watch, toRefs } from "vue";
import moment from "moment";
import Swal from "sweetalert2";

const props = defineProps(["comments", "postID"]);
const { comments } = toRefs(props);

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
  emit("handelDeleteCom", commentId, postId);
}

watch(()=>props.comments.length, (newVal, oldVal) => {
  if(newVal > oldVal){
    Swal.fire({
      icon: "success",
      title: "Comment added successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  if(newVal == 3){
    Swal.fire({
      icon: "success",
      title: "Post has reached 3 comments",
      showConfirmButton: false,
      timer: 1500,
    });
  }
});
</script>

<template>
  <div v-for="comment in revComments" :key="comment.id">
    <div class="comment mb-3 ms-3">
      <h6 class="card-title small">
        {{ comment.user }}
        <span
          class="text-danger float-end cursor-pointer"
          @click="handelDeleteCom(comment.id, postID)"
          >X</span
        >
      </h6>
      <p class="card-subtitle mb-1 text-body-secondary small">
        {{ moment(comment.date).fromNow() }}
      </p>
      <p class="card-text small">{{ comment.content }}</p>
    </div>
    <hr class="my-2 very-low-opacity" />
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
