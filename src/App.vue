<script setup>
import { ref, watch } from "vue";
import Todolist from './components/Todol.vue'
import Postlist from './components/Post.vue'
import Todobut from "./components/Todobut.vue";
import Postbut from "./components/Postbut.vue";
const page = ref(true)
const userlink = 'https://jsonplaceholder.typicode.com/users'
const userlinkdetail = 'https://jsonplaceholder.typicode.com/users/'
const userpostlink = 'https://jsonplaceholder.typicode.com/posts?userId='
const changepagepost = () => {
  page.value = false
}
const changepagetodo = () => {
  page.value = true
}
const users = ref([]);
const selectedUser = ref(null);
const selectedUserDetails = ref({});
const posts = ref([]);
const loading = ref(false);
const fetchUsers = () => {
  fetch(userlink)
    .then(response => response.json())
    .then(data => {
      users.value = data;
    });
};
const fetchUserDetails = (userId) => {
  fetch(userlinkdetail + userId)
    .then(response => response.json())
    .then(data => {
      selectedUserDetails.value = data;
    });
};
const fetchPosts = (userId) => {
  loading.value = true;
  fetch(userpostlink + userId)
    .then(response => response.json())
    .then(data => {
      posts.value = data;
      fetchUserDetails(userId);
      loading.value = false;
    });
};
watch(selectedUser, (newUserId) => {
  if (newUserId) {
    fetchPosts(newUserId);
  }
});
fetchUsers();
</script>
<template>
  <span class="navbar">
    <ul class="nav">
      <li><button @click="changepagetodo"><Todobut /></button></li>
      <li><button @click="changepagepost"><Postbut /></button></li>
    </ul>
  </span>
  <div class="wrapper" v-if="page">
    <header>
      <h1>My To Do List</h1>
    </header>
    <Todolist />
  </div>
  <div v-else class="v-else">
    <h1>USER POST</h1>
    <Postlist :users="users" :selectedUser="selectedUser" :selectedUserDetails="selectedUserDetails" :posts="posts"
      :loading="loading" />
  </div>
</template>
