<template>
  <div class="bg-dark py-5 px-3">
    <h1 class="text-light text-center mb-5">Chit Chat</h1>
    <div>
      <div v-for="(post, index) in posts" :key="index" class="mb-3">
        <p>
          <span
            class="m-0 bg-light py-2 px-3 rounded"
            @dblclick="deletePost(post._id)"
          >{{post.text}}</span>
        </p>
      </div>
    </div>
    <b-form-textarea
      id="textarea"
      v-model="text"
      placeholder="Say something..."
      rows="5"
      no-resize
      class="mt-5"
    ></b-form-textarea>
    <b-button variant="primary" class="mt-5" @click="createPost">Submit</b-button>
    <p class="text-danger">{{error}}</p>
  </div>
</template>

<script>
import PostService from "../PostService";

export default {
  name: "PostComponent",
  data() {
    return {
      text: "",
      error: "",
      posts: []
    };
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async createPost() {
      await PostService.insertPost(this.text);
      this.posts = await PostService.getPosts();
      this.text = "";
    },
    async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
