import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { State } from './types';

export const key: InjectionKey<Store<State>> = Symbol();

const initialUserLocations = localStorage.getItem('locations')
  ? JSON.parse(localStorage.getItem('locations') as string)
  : ['New York', 'Hong Kong', 'Tokyo', 'Istanbul'];

export const store = createStore<State>({
  state: {
    selectedLocation: '',
    userLocations: initialUserLocations,
  },
  mutations: {
    setSelectedLocation(state, location: string) {
      state.selectedLocation = location;
    },
    removeSelectedLocation(state) {
      state.selectedLocation = '';
    },
    addUserLocation(state, location: string) {
      state.userLocations.push(location);
      localStorage.setItem('locations', JSON.stringify(state.userLocations));
    },
    removeUserLocation(state, location: string) {
      state.userLocations = state.userLocations.filter((p) => p !== location);
      localStorage.setItem('locations', JSON.stringify(state.userLocations));
    },
  },
  getters: {
    isInUserLocations:
      (state) =>
      (locationName: string): boolean => {
        return state.userLocations.includes(locationName);
      },
  },
});

export function useStore() {
  return baseUseStore(key);
}
