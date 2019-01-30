import Vue from 'vue';
import Vuex from 'vuex';
import setting from './modules/setting';
import bet from './modules/bet';
// import demo from './modules/demo';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    // common,
    setting,
    bet,
    // demo,
  },
});

export default store;
