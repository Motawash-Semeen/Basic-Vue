import { createRouter, createWebHistory } from "vue-router";
import App from "@/App.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      redirect: { name: "PostsList" },
    },
    {
      path: "/login",
      name: "login",
      component: import("@/components/Login.vue"),
    },
    {
      path: "/posts",
      name: "posts",
      component: import("@/components/Posts.vue"),
      children: [
        {
          path: "",
          name: "PostsList",
          component: import("@/components/PostList.vue"),
        },
        {
          path: ":postId",
          name: "postDetails",
          component: import("@/components/PostDetails.vue"),
        },
        {
          path: "create-post",
          name: "create-post",
          component: import("@/components/CreatePost.vue"),
        },
      ],
    },

    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: import("@/components/NotFound.vue"),
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("userName");
  if (to.name !== "login" && !isAuthenticated) next({ name: "login" });
  else next();
});

export default router;
