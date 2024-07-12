import moment from "moment"

const postModule = {
  namespaced: true,
  state: {
    posts: [
      {
        id: 1,
        title: 'Post 1',
        content:
          'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
        likes: 0,
        comments: [],
        date: '2024-05-24 11:00:00',
        commentFormData: '',
        showCommentSection: false
      },
      {
        id: 2,
        title: 'Post 2',
        content:
          'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
        likes: 0,
        comments: [],
        date: '2024-05-24 11:00:00',
        commentFormData: '',
        showCommentSection: false
      },
      {
        id: 3,
        title: 'Post 3',
        content:
          'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
        likes: 0,
        comments: [],
        date: '2024-05-24 11:00:00',
        commentFormData: '',
        showCommentSection: false
      }
    ],
    postTitle: '',
    postContent: '',
  },
  getters: {
    getPosts(state) {
      return state.posts
    },
    getPost(state) {
      return (postId) => state.posts.find((post) => post.id == postId)
    },
    getPostTitle(state) {
        return state.postTitle;
    },
    getPostContent(state) {
        return state.postContent;
    },
  },
  mutations: {
    createPost(state) {
      const post = {
        id: state.posts.length + 1,
        title: state.postTitle,
        content: state.postContent,
        likes: 0,
        comments: [],
        date: moment().format('YYYY-MM-DD HH:mm:ss')
      }

      state.posts.push(post)
    },
    async addComment(state, { postId, comment }) {
      const post = state.posts.find((post) => post.id === postId)
      post.comments.push(comment)
      post.showCommentSection = true
    },
    updatePostTitle(state, title) {
        state.postTitle = title;
        console.log(state.postTitle);
    },
    updatePostContent(state, content) {
        state.postContent = content;
    },
    deletePost(state, postId) {
      state.posts = state.posts.filter((post) => post.id !== postId)
    },
    increaseLikeCount(state, postId) {
      const post = state.posts.find((post) => post.id === postId)
      post.likes++
    },
    deleteComment(state, { postId, commentId }) {
      const post = state.posts.find((post) => post.id === postId)
      post.comments = post.comments.filter((comment) => comment.id !== commentId)
    },
  },
  actions: {
    async addComment({ commit, rootState }, { postId, comment }) {
      comment.userName = rootState.userName
      commit('addComment', { postId: postId, comment: comment })
    }
  }
}

export default postModule
