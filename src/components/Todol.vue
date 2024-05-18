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
</template>