<script setup>
import { ref, watch, defineProps } from "vue";

const props = defineProps({
    users: Array,
    posts: Array,
    selectedUser: [Number, String, null],
    selectedUserDetails: Object,
    loading: Boolean
});
const fetchUsers = () => {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => {
      users.value = data;
    });
};
const fetchUserDetails = (userId) => {
  fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(response => response.json())
    .then(data => {
      selectedUserDetails.value = data;
    });
};
const fetchPosts = (userId) => {
  loading.value = true; 
  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then(response => response.json())
    .then(data => {
      posts.value = data;
      fetchUserDetails(userId);
      loading.value = false; 
    });
};
const users = ref([]);
const posts = ref([]);
const selectedUser = ref(null);
const selectedUserDetails = ref({});
const loading = ref(false);
watch(selectedUser, (newUserId) => {
  if (newUserId) {
    fetchPosts(newUserId);
  }
});
fetchUsers();
</script>
<template>
    <div class="isielse">
        <div class="else1">
            <label for="userSelect">Pilih User</label>
            <select v-model="selectedUser">
                <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
            </select>
        </div>
        <div class="else2">
            <div v-if="loading">Loading...</div>
            <div v-else>
                <div v-if="selectedUser === null">
                    <p class="kosong">PILIH NAMA USER</p>
                </div>
                <div v-if="posts.length">
                    <h2 class="hisi">Postingan Milik : {{ selectedUserDetails.name }}</h2>
                    <ul class="postlist">
                        <li v-for="post in posts" :key="post.id" class="postlist1">
                            <div class="postlist12">
                                <div>judul : {{ post.title }}</div>
                                <br>
                                <div> Isi :{{ post.body }}</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>