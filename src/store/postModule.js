
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
    };
  },
  getters: {
    getPosts(state) {
      return state.posts;
    }
  },
  mutations:{
    createPost(state, post){
      state.posts.push(post); 
    },
    addComment(state, {comment, postId}){
      const post = state.posts.find((post) => post.id === postId);
      post.comments.push(comment);
      post.showComments = true;
    }
  },
  actions:{
    async addComment({state, commit, rootState}, {comment, postId}){
      await new Promise((resolve) => setTimeout(resolve, 2000));
      comment.user = rootState.userName;
      commit('addComment', {comment, postId});
    }
  
  }
};

export default postModule;