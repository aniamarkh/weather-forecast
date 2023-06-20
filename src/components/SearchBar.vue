<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import axios from 'axios';
import type { ResponseFeature } from '../types';

const searchQuery = ref('');
const queryTimeout: Ref<null | number> = ref(null);
const searchResults: Ref<null | ResponseFeature[]> = ref(null);
const searchError: Ref<boolean> = ref(false);

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
        searchResults.value = result.data.features as ResponseFeature[];
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
    />
    <ul class="search__results" v-if="searchResults && searchResults.length">
      <li
        class="results__item"
        v-for="searchResult in searchResults"
        :key="searchResult.id"
        @click="console.log(searchResult.text_en)"
      >
        <span v-html="formatPlaceName(searchResult.place_name)"></span>
      </li>
    </ul>
    <p v-if="!searchResults && !searchError" class="search__comment">
      Start tracking a location by searching above.
    </p>
    <p v-if="searchResults && !searchResults.length && !searchError" class="search__comment">
      No places found 🤔
    </p>
    <p v-if="searchError" class="search__comment">Something went wrong, please try again 😵‍💫</p>
  </div>
</template>

<style lang="scss" scoped>
.search {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 460px;
  margin-top: 20px;

  &__comment {
    font-weight: bold;
    margin: 10px 10px 0;
    align-self: flex-start;
  }

  &__input {
    min-width: 300px;
    width: 100%;
    height: 32px;
    padding: 12px;
    border: none;
    border-radius: 10px;
    background: #ffffff24;
    box-shadow: 0 4px 30px #74142742;
    backdrop-filter: blur(10px);
    font-size: 16px;

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
    gap: 6px;
    padding: 10px;
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
