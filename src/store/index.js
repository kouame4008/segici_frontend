import {createStore} from 'vuex';
// import {createApp} from 'vue';
// import App from "@/App.vue";
import createPersistedState from "vuex-persistedstate";
import resultat from './modules/resultat';
import auth from './modules/auth';

// Load Vuex
// Vue.use(Vuex);

// Create store
const store = createStore ({
  modules: {
    resultat : resultat,
    auth : auth
  },
  plugins: [createPersistedState()]
});


export default store;