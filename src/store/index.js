import { createStore } from 'vuex'
import postModule from './postModule'

const store = createStore({
  state: {
    userName: null,
  },
  getters: {
    getUserName(state) {
      state.userName = localStorage.getItem('userName')
      return state.userName
    }
  },
  mutations: {
    login(state, payload) {
      state.userName = payload.userName
      localStorage.setItem('userName', payload.userName)
    },
    logout(state) {
      state.userName = null
      localStorage.removeItem('userName')
    }
  },
  modules: {
    posts: postModule
  }
})

export default store