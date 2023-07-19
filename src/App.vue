<script setup lang="ts">
import { useStore } from './store';
import SearchBar from './components/SearchBar.vue';
import PlaceForecast from './components/PlaceForecast.vue';
import PlaceCard from './components/PlaceCard.vue';

const store = useStore();
</script>

<template>
  <main>
    <div class="header">
      <span class="material-symbols-outlined header__icon"> routine </span>
      <h2 class="header__title">it's a weather app</h2>
    </div>
    <Transition mode="out-in">
      <div v-if="!store.state.selectedPlace" class="start-screen">
        <PlaceCard v-for="(place, index) of store.state.userPlaces" :key="index" :place="place" />
        <SearchBar />
      </div>
      <PlaceForecast v-else-if="store.state.selectedPlace" :place="store.state.selectedPlace" />
    </Transition>
  </main>
</template>

<style lang="scss" scoped>
@import './assets/config';

.header {
  height: 60px;
  width: 100%;
  @include flex-row;
  align-items: center;
  gap: 10px;
  cursor: default;
}

.start-screen {
  @include flex-column;
  gap: 15px;
}

.header__icon {
  width: 25px;
  transition: all 0.9s;

  &:hover {
    transform: rotate(360deg);
  }
}
</style>
