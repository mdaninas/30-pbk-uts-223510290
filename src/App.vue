<script setup>
import { ref, computed } from "vue";

const newTodo = ref("");
const hideCompleted = ref(false);
let id = 0;
const todos = ref([
  { id: id++, text: "Cuci Piring", done: true },
  { id: id++, text: "Belajar Python", done: true },
  { id: id++, text: "Lulus", done: false },
]);

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
</script>

<template>
  <div class="wrapper">
    <header>
      <h1>My To Do List</h1>
    </header>
    <main>
      <section class="sec a1">
        <p class="judul">Add Your To do</p>
        <div class="wrapperleft">
          <div class="tambah">
            <form @submit.prevent="addTodo">
              <input
                id="main-input"
                v-model="newTodo"
                required
                placeholder="Add Todo List..."
              />
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
        <ul>
          <li
            v-for="todo in filteredTodos"
            :key="todo.id"
            :class="{ done: todo.done }"
          >
            <input type="checkbox" v-model="todo.done" />
            <span :class="{ done: todo.done }">{{ todo.text }}</span>
            <button @click="removeTodo(todo)">remove</button>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<style scoped>
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
ul {
  position: absolute;
  width: 100%;
  list-style-type: none;
  max-height: 75%;
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
