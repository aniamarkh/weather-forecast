import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { State } from './types';

export const key: InjectionKey<Store<State>> = Symbol();

const initialUserPlaces = localStorage.getItem('places')
  ? JSON.parse(localStorage.getItem('places') as string)
  : ['New York', 'Hong Kong', 'Tokyo', 'Istanbul'];

export const store = createStore<State>({
  state: {
    selectedPlace: '',
    userPlaces: initialUserPlaces,
  },
  mutations: {
    setSelectedPlace(state, place: string) {
      state.selectedPlace = place;
    },
    removeSelectedPlace(state) {
      state.selectedPlace = '';
    },
    addUserPlace(state, place: string) {
      state.userPlaces.push(place);
      localStorage.setItem('places', JSON.stringify(state.userPlaces));
    },
    removeUserPlace(state, place: string) {
      state.userPlaces = state.userPlaces.filter((p) => p !== place);
      localStorage.setItem('places', JSON.stringify(state.userPlaces));
    },
  },
});

export function useStore() {
  return baseUseStore(key);
}
