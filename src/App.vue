<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import type { Ref } from 'vue';
import SearchBar from './components/SearchBar.vue';
import PlaceForecast from './components/PlaceForecast.vue';
import PlaceCard from './components/PlaceCard.vue';

const userPlaces: Ref<Array<string>> = ref([]);
const selectedPlace: Ref<null | string> = ref(null);

const setSelectedPlace = (placeName: string) => (selectedPlace.value = placeName);
const backToSearch = () => (selectedPlace.value = null);

onBeforeMount(() => {
  const localData = localStorage.getItem('places');
  if (localData) userPlaces.value = JSON.parse(localData);
  else userPlaces.value = ['New York', 'Hong Kong', 'Tokyo', 'Istanbul'];
});
</script>

<template>
  <main>
    <div class="header">
      <span class="material-symbols-outlined header__icon"> routine </span>
      <h2 class="header__title">wow it's a weather app...</h2>
    </div>
    <Transition mode="out-in">
      <div v-if="!selectedPlace" class="start-screen">
        <PlaceCard
          v-for="(place, index) of userPlaces"
          :key="index"
          :place="place"
          @set-place="setSelectedPlace"
        />
        <SearchBar @set-place="setSelectedPlace" />
      </div>
      <PlaceForecast
        v-else-if="selectedPlace"
        :place="selectedPlace"
        @back-to-search="backToSearch"
      />
    </Transition>
  </main>
</template>

<style lang="scss" scoped>
@import './assets/config';

.header {
  height: 60px;
  width: 100%;
  display: flex;
  flex-direction: row;
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
