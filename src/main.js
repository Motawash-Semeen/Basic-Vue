import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import store from "./store";

const app = createApp(App);

app.use(router);

app.use(store);

// app.provide('userName', 'Semeen Chowdhury')
app.mount("#app");
