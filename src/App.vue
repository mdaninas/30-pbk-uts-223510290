<script setup>
import { ref, computed, watch } from "vue";

const newTodo = ref("");

const hideCompleted = ref(false);
let id = 0;
const todos = ref([
  { id: id++, text: "Cuci Piring", done: true },
  { id: id++, text: "Belajar Python", done: true },
  { id: id++, text: "Lulus", done: false },
]);
const page = ref(true)
const filteredTodos = computed(() => {
  return hideCompleted.value ? todos.value.filter((t) => !t.done) : todos.value;
});

function addTodo() {
  todos.value.push({ id: id++, text: newTodo.value, done: false });
  newTodo.value = "";
}

function removeTodo(todo) {
  todos.value = todos.value.filter((t) => t !== todo);
}
function changepagepost() {
  page.value = false
}
function changepagetodo() {
  page.value = true
}

const users = ref([]);
const posts = ref([]);
const selectedUser = ref(null);
const selectedUserDetails = ref({});

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

const loading = ref(false);

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
      <li><button @click="changepagetodo">TO DO LIST</button></li>
      <li><button @click="changepagepost">POST</button></li>
    </ul>
  </span>

  <div class="wrapper" v-if="page">
    <header>
      <h1>My To Do List</h1>
    </header>
    <main>
      <section class="sec a1">
        <p class="judul">Add Your To do</p>
        <div class="wrapperleft">
          <div class="tambah">
            <form @submit.prevent="addTodo">
              <input id="main-input" v-model="newTodo" required placeholder="Add Todo List..." />
              <button>add</button>
            </form>
          </div>
          <div class="info">
            <p>
              You Have <span>{{ todos.length }}</span> To Dolist
            </p>
            <p>
              <span>{{ todos.filter((todo) => todo.done).length }}</span>
              Complete
            </p>
            <p>
              <span>{{ todos.filter((todo) => !todo.done).length }}</span>
              Uncomplete
            </p>
          </div>
          <div class="filter">
            <button @click="hideCompleted = !hideCompleted" id="">
              {{ hideCompleted ? "View Completed" : "Hide Complete" }}
            </button>
          </div>
        </div>
      </section>
      <section class="sec a2">
        <p class="judul">Your To do's Here</p>
        <ul class="todol">
          <li v-for="todo in filteredTodos" :key="todo.id" :class="{ done: todo.done }">
            <input type="checkbox" v-model="todo.done" />
            <span :class="{ done: todo.done }">{{ todo.text }}</span>

            <button @click="removeTodo(todo)">remove</button>
          </li>
        </ul>
      </section>
    </main>
  </div>
  <div class="wrapper" v-else>
  </div>
  <div v-else class="v-else">
    <h1>USER POST</h1>
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
  </div>
</template>

<style scoped>
.hisi{
  margin-bottom: 10px;
  color: white;
}
.postlist{
  display: flex;
  flex-direction: column;
  color: white;
}
.postlist1{
  display: flex;
  flex-direction: column;
  border: 5px solid white;
  margin-top: 5px;
  padding-top: 10px;
  padding-left: 10px;
  padding-bottom: 10px;
}
.kosong{
  position: relative;
  padding-top: 35%;
  padding-left: 20%;
  font-size: 50px;
}
.else1 {
  top: 20px;
  left: 10px;
  position: relative;
  background-color: #36395a;
  height: 100px;
  width: 20%;
  border-radius: 25px;
  padding: 10px 10px;
  color: white;
}
.else2 {
  position: relative;
  background-color: #36395a;
  height: 100%;
  width: 80%;
  border-radius: 25px;
  overflow: auto;
  padding: 30px;
}

.v-else {
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.isielse {
  height: 70%;
  width: 70%;
  margin-left: 15%;
  margin-top: 40px;
  border-radius: 25px;
  opacity: 0.8;
  display: flex;
  flex-direction: row;
  gap: 14px;
}

.head {
  position: absolute;
  top: 0;
}

.else {
  color: aliceblue;
}

.nav {
  display: flex;
  position: absolute;
  height: 100%;
  overflow: hidden;
  width: 20%;
  align-items: center;
  justify-content: space-around;
  padding-top: 20px;
}

.navbar {
  position: absolute;
  top: 25px;
  color: #d6d6e7;
  height: 40px;
  width: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: end;
}




div.info {
  font-size: 30px;
}

div.info span {
  color: cadetblue;
}

.done span {
  text-decoration: line-through;
  color: #fff;
}

.done {
  background-color: #41b06e;
}

ul li button {
  text-decoration: none;
}

.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 60%;
  height: 80%;
  border-radius: 15px;
}

h1 {
  color: #fff;
  font-family: "Jersey 25", sans-serif;
  font-weight: 500;
  font-style: normal;
  font-size: 100px;
}

main {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-around;
  padding: 50px;
}

p {
  color: #fff;
  font-family: "Mulish", sans-serif;
  font-optical-sizing: auto;
  font-weight: 904;
  font-style: normal;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
}

section {
  position: relative;
  background-color: darkgray;
  width: 40%;
  height: 100%;
  text-align: center;
  border-radius: 15px;
}

.todol {
  position: absolute;
  width: 100%;
  list-style-type: none;
  max-height: 430px;
  overflow: auto;

}

ul li {
  text-align: left;
  display: flex;
  align-items: center;
  margin-bottom: 25px;
}

ul li button {
  margin-right: 20px;
}

ul li span {
  flex: 1;
  margin-left: 20px;
  font-family: "Roboto Mono", monospace;
  font-optical-sizing: auto;
  font-style: normal;
}

ul li input {
  margin-left: 20px;
  transform: scale(2);
}

.judul {
  margin-bottom: 10px;
  font-size: 40px;
  background-color: #000;
  padding: 20px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}

.tambah {
  flex-direction: row;
}

.wrapperleft {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 80%;
}

button {
  align-items: center;
  appearance: none;
  background-color: #fcfcfd;
  border-radius: 4px;
  border-width: 0;
  box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,
    rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #d6d6e7 0 -3px 0 inset;
  box-sizing: border-box;
  color: #36395a;
  cursor: pointer;
  display: inline-flex;
  font-family: "JetBrains Mono", monospace;
  height: 48px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow 0.15s, transform 0.15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow, transform;
  font-size: 18px;
}

ul li button {
  height: 30px;
}

button:focus {
  box-shadow: #d6d6e7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px,
    rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #d6d6e7 0 -3px 0 inset;
}

button:hover {
  box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px,
    rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #d6d6e7 0 -3px 0 inset;
  transform: translateY(-2px);
}

button:active {
  box-shadow: #d6d6e7 0 3px 7px inset;
  transform: translateY(2px);
}

#main-input {
  border: none;
  padding: 1rem;
  border-radius: 1rem;
  background: #e8e8e8;

  transition: 0.3s;
}

#main-input:focus {
  outline-color: #e8e8e8;
  background: #e8e8e8;
  transition: 0.3s;
  transform: translateY(-2px);
}

form {
  display: flex;
  justify-content: space-around;
}
</style>
