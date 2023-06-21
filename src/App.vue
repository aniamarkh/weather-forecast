<script setup lang="ts">
import SearchBar from './components/SearchBar.vue';
</script>

<template>
  <main>
    <h1 class="app__title">
      <span class="material-symbols-outlined"> routine </span> wow it's a weather app...
    </h1>
    <SearchBar />
  </main>
</template>

<style scoped>
.app__title {
  height: 48px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  cursor: default;
}
</style>
