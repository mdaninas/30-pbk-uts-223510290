<template>
  <div class="gg">
    <li>
      <RouterLink to="/"><button>Home</button></RouterLink>
    </li>
    <li>
      <RouterLink to="/todos"><button>To do List</button></RouterLink>
    </li>
    <li>
      <RouterLink to="/posts"><button>Post</button></RouterLink>
    </li>
    <li>
      <RouterLink to="/albums"><button>Galeri</button></RouterLink>
    </li>
  </div>
  <router-view />
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  components: {
    RouterLink
  }
}
</script>

<style>
li {
  list-style-type: none;
  position: relative;
}

.gg {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  gap: 40px;
  margin-top: 40px;
  margin-left: 40px;
}
</style>
