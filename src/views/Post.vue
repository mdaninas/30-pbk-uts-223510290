<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, watch } from "vue";
import Postlist from '../components/Post.vue'
const userlink = 'https://jsonplaceholder.typicode.com/users'
const userlinkdetail = 'https://jsonplaceholder.typicode.com/users/'
const userpostlink = 'https://jsonplaceholder.typicode.com/posts?userId='
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
    <div class="v-else">
        <h1 class="judulpost">USER POST</h1>
        <Postlist :users="users" :selectedUser="selectedUser" :selectedUserDetails="selectedUserDetails" :posts="posts"
            :loading="loading" />
    </div>
</template>
