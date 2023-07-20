<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import axios from 'axios';
import { useStore } from '../store';
import type { LocationResponce } from '../types';

const searchQuery = ref('');
const queryTimeout: Ref<null | number> = ref(null);
const searchResults: Ref<null | LocationResponce[]> = ref(null);
const searchError: Ref<boolean> = ref(false);

const store = useStore();

const vFocus = {
  mounted: (el: HTMLInputElement) => el.focus(),
};

const searchPlaces = () => {
  if (queryTimeout.value !== null) clearTimeout(queryTimeout.value);
  queryTimeout.value = window.setTimeout(async () => {
    if (searchQuery.value !== '') {
      try {
        const result = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${
            searchQuery.value
          }.json?access_token=${import.meta.env.VITE_MAPBOX_API_KEY}&types=place&language=en`
        );
        searchResults.value = result.data.features as LocationResponce[];
      } catch {
        searchError.value = true;
      }

      return;
    }
    searchError.value = false;
    searchResults.value = null;
  }, 500);
};

const formatPlaceName = (placeName: string) => {
  const parts = placeName.split(',');
  return `<b>${parts[0]}</b>,${parts.slice(1).join(',')}`;
};
</script>

<template>
  <div class="search">
    <input
      class="search__input"
      type="text"
      v-model="searchQuery"
      @input="searchPlaces"
      placeholder="Enter city name here"
      v-focus
    />
    <Transition mode="out-in">
      <ul class="search__results" v-if="searchResults && searchResults.length">
        <li
          class="results__item"
          v-for="searchResult in searchResults"
          :key="searchResult.id"
          @click="store.commit('setSelectedPlace', searchResult.text_en)"
        >
          <p v-html="formatPlaceName(searchResult.place_name)"></p>
        </li>
      </ul>
      <p v-else-if="!searchResults && !searchError" class="search__comment">
        Start tracking a location by searching above.
      </p>
      <p v-else-if="searchResults && !searchResults.length && !searchError" class="search__comment">
        No places found 🤔
      </p>
      <p v-else-if="searchError" class="search__error">Something went wrong, please try again 😵‍💫</p>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.search {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 10px;

  &__comment,
  .search__error {
    font-weight: bold;
    margin: 15px 10px 0;
    align-self: flex-start;
  }

  &__input {
    width: 100%;
    height: 42px;
    padding: 12px;
    border: none;
    border-radius: 10px;
    background: #ffffff24;
    box-shadow: 0 4px 30px #74142728;
    backdrop-filter: blur(10px);

    &::placeholder {
      color: white;
    }

    &:focus {
      outline: 2px solid #ffffff;
    }
  }

  &__results {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 15px 10px;
    width: 100%;
    .results__item {
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        transform: translateX(4px);
      }
    }
  }
}
</style>
