<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<template>
  <div class="title">
    <h1 class="title__text">{{ title }}</h1>
  </div>
</template>

<style scoped lans="scss">
.title {
  width: auto;
  align-self: flex-start;
  text-align: left;
}

.title__text {
  font-size: 1rem;
  padding-left: 1rem;
}
</style>
