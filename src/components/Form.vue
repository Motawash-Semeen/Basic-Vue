<script setup>
import moment from "moment";
import Swal from "sweetalert2";

import { toRefs, defineProps, defineEmits  } from "vue";

const props = defineProps(["formData"]);
// const emit = defineEmits(["handelSubmit"]);

const { formData } = toRefs(props);

import { useStore } from "vuex";
const store = useStore();

function handelSubmit(event) {
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
  const post = {
    id: store.posts.length + 1,
    title: formData.value.title,
    content: formData.value.content,
    likes: 0,
    comments: [],
    date: moment().format("YYYY-MM-DD HH:mm:ss"),
    showComments: false,
  };

  store.commit("posts/createPost", post);

  formData.value.title = "";
  formData.value.content = "";
  // emit("handelSubmit", event)
}
</script>

<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Create a New Post</h5>
            <form @submit.prevent="handelSubmit($event)">
              <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  placeholder="Enter the title"
                  v-model="formData.title"
                />
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">Content</label>
                <textarea
                  class="form-control"
                  id="content"
                  rows="3"
                  placeholder="Enter the content"
                  v-model="formData.content"
                ></textarea>
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>