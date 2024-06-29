import { createStore } from "vuex";
import postModule from "./postModule";

const store = createStore({
  state() {
    return {
      userName: "Jhon Doe",
    };
  },
  modules: {
    posts: postModule
  },
});

export default store;