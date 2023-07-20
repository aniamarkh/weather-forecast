<script setup lang="ts">
import { useStore } from './store';
import SearchBar from './components/startScreen/SearchBar.vue';
import DetailedForecast from '@/components/detailedForecast/DetailedForecast.vue';
import LocationCard from '@/components/startScreen/LocationCard.vue';

const store = useStore();
</script>

<template>
  <main>
    <div class="header">
      <span class="material-symbols-outlined header__icon"> routine </span>
      <h2 class="header__title">it's a weather app</h2>
    </div>
    <Transition mode="out-in">
      <div v-if="!store.state.selectedLocation" class="start-screen">
        <LocationCard
          v-for="(location, index) of store.state.userLocations"
          :key="index"
          :location="location"
        />
        <SearchBar />
      </div>
      <DetailedForecast
        v-else-if="store.state.selectedLocation"
        :location="store.state.selectedLocation"
      />
    </Transition>
  </main>
</template>

<style lang="scss" scoped>
@import '@/assets/config';

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
  width: 100%;
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
