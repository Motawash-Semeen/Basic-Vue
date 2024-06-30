<script setup>
import moment from "moment";
import Swal from "sweetalert2";

import { toRefs, defineProps, defineEmits, computed  } from "vue";

// const props = defineProps(["formData"]);
// const emit = defineEmits(["handelSubmit"]);

// const { formData } = toRefs(props);

import { useStore } from "vuex";
const store = useStore();

// const postTitle = computed(() => store.getters["posts/postTitle"]);
// const postContent = computed(() => store.getters["posts/postContent"]);

function handelSubmit(event) {
  store.commit("posts/createPost");
}

// function updatePostTitle(event) {
//   store.commit("posts/updatePostTitle", event.target.value);
// }
// function updatePostContent(event) {
//   store.commit("posts/updatePostContent", event.target.value);
// }

const postTitle = computed({
  get(){
    return store.getters["posts/getPostTitle"];
  },
  set(){
    store.commit("posts/updatePostTitle", event.target.value);
  }

});

const postContent = computed({
  get(){
    return store.getters["posts/getPostContent"];
  },
  set(){
    store.commit("posts/updatePostContent", event.target.value);
  }

});
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
                  v-model="postTitle"
                />
                <!-- <input
                  type="text"
                  class="form-control"
                  id="title"
                  placeholder="Enter the title"
                  :value="postTitle" @input="updatePostTitle"
                /> -->
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">Content</label>
                <textarea
                  class="form-control"
                  id="content"
                  rows="3"
                  placeholder="Enter the content"
                  v-model="postContent"
                ></textarea>
                <!-- <textarea
                  class="form-control"
                  id="content"
                  rows="3"
                  placeholder="Enter the content"
                  :value="postContent" @input="updatePostContent"
                ></textarea> -->
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