import moment from "moment";
import Swal from "sweetalert2";

const postModule = {
  namespaced: true, 

  state() {
    
    return {
      posts: [
        {
          id: 1,
          title: "Post 1",
          content:
            "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
          likes: 0,
          comments: [
            {
              id: 1,
              user: "John Doe1",
              date: "2024-05-24 11:00:00",
              content: "This is a comment.",
            },
          ],
          date: "2024-05-24 11:00:00",
          showComments: false,
        },
        {
          id: 2,
          title: "Post 2",
          content:
            "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
          likes: 4,
          comments: [],
          date: "2024-05-24 11:00:00",
          showComments: false,
        },
        {
          id: 3,
          title: "Post 3",
          content:
            "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
          likes: 5,
          comments: [
            {
              id: 1,
              user: "John Doe4",
              date: "2024-05-24 11:00:00",
              content: "This is a comment.",
            },
            {
              id: 2,
              user: "John Doe5",
              date: "2024-05-24 11:00:00",
              content: "This is a comment.",
            },
          ],
          date: "2024-05-24 11:00:00",
          showComments: false,
        },
      ],
      postTitle: "",
      postContent: "",
    };
  },
  getters: {
    getPosts(state) {
      return state.posts;
    },
    getPostTitle(state) {
      return state.postTitle;
    },
    getPostContent(state) {
      return state.postContent;
    }
  },
  mutations:{
    createPost(state){
      if(!state.postTitle || !state.postContent) {
        Swal.fire({
          text: "Please fill all the fields!",
          icon: "error",
          confirmButtonText: "ok",
        });
        return;
      }
      const post = {
        id: Math.max(...state.posts.map((post) => post.id)) + 1,
        title: state.postTitle,
        content: state.postContent,
        likes: 0,
        comments: [],
        date: moment().format("YYYY-MM-DD HH:mm:ss"),
        showComments: false,
      };
      state.posts.push(post);
      state.postTitle = "";
      state.postContent = ""; 
      
    },
    addComment(state, {comment, postId}){
      const post = state.posts.find((post) => post.id === postId);
      post.comments.push(comment);
      post.showComments = true;
    },
    deletePost(state, postId){
      state.posts = state.posts.filter((post) => post.id !== postId);
    },
    deleteComment(state, {postId, commentId}) {
      const post = state.posts.find((post) => post.id === postId);
      post.comments = post.comments.filter((comment) => comment.id !== commentId);
    },
    handelLike(state, postId){
      const post = state.posts.find((post) => post.id === postId);
      post.likes++;
    },
    updatePostTitle(state, title){
      state.postTitle = title;
    },
    updatePostContent(state, content){
      state.postContent = content;
    }
  },
  actions:{
    async addComment({state, commit, rootState}, {comment, postId}){
      await new Promise((resolve) => setTimeout(resolve, 1000));
      comment.user = rootState.userName;
      commit('addComment', {comment, postId});
    },
    async deletePost({state, commit}, postId){
      await new Promise((resolve) => setTimeout(resolve, 1000));
      commit('deletePost', postId);
    },
    async deleteComment({state, commit}, {postId, commentId}){
      await new Promise((resolve) => setTimeout(resolve, 1000));
      commit('deleteComment', {postId, commentId});
    }
  
  }
};

export default postModule;