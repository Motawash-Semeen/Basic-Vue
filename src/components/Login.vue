<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const formData = ref({
  userName: '',
  password: ''
})

function login() {
  store.commit('login', formData.value)
  router.push('/')
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <div class="card mt-5">
          <div class="card-body">
            <h5 class="card-title text-center">Login</h5>
            <form @submit.prevent="login()">
              <div class="mb-3">
                <label class="form-label">Username</label>
                <input type="text" class="form-control" v-model="formData.userName" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Password</label>
                <input type="password" class="form-control" v-model="formData.password" />
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>
