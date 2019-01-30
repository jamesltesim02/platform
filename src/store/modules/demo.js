import { StorageKey } from '@/config/constants';
import { loadFromStorage, saveToStorage } from '@/utils/StorageUtil';

const demoState = {
  isLoged: false,
  userInfo: null,
  bettings: loadFromStorage(StorageKey.BET_CART_KEY, []),
};

const mutations = {
  /**
   * 加入/取消意向投注
   * @param {object} state
   *
   * @param {object} option
   */
  toggleBetting(state, option) {
    const index = state.bettings.findIndex(o => o.oid === option.oid);

    if (index > -1) {
      state.bettings.splice(index, 1);
    } else {
      state.bettings.push(option);
    }

    saveToStorage(StorageKey.BET_CART_KEY, state.bettings);
  },
};

const actions = {};

export default {
  namespaced: true,
  state: demoState,
  mutations,
  actions,
};
