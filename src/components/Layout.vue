<script setup>
// import { defineProps, ref } from "vue";
import { inject, defineEmits,defineProps, ref, computed } from "vue";

// const props = defineProps(["userName"]);
// const userName = ref(props.userName);
const props = defineProps(["currentComp"]);
const currentComp = computed(() => props.currentComp);
const userName = inject("userName");
const emit = defineEmits(["handelTab"]);
function handelTab(e) {
  emit("handelTab", e);
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
    <div class="container">
      <a class="navbar-brand" href="#">BAT Blog</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item" @click="handelTab($event)">
            <a :class="{'active': currentComp == 'posts', 'nav-link': true }" aria-current="page" href="#">Posts</a>
          </li>
          <li class="nav-item" @click="handelTab($event)">
            <a :class="{'active': currentComp == 'create-post', 'nav-link': true }" href="#">Create Post</a>
          </li>
        </ul>
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ $store.state.userName }}
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><a class="dropdown-item" href="#">Profile</a></li>
              <li><a class="dropdown-item" href="#">Logout</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <slot></slot>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.very-low-opacity {
  opacity: 0.1;
}
</style>