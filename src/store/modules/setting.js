import { StorageKey } from '@/config/constants';
import { loadFromStorage, saveToStorage } from '@/utils/StorageUtil';

import AppConfig from '@/config/business.config.js';

/**
 * 默认的setting数据
 */
const settingState = loadFromStorage(
  StorageKey.SETTING_KEY,
  /*
   * {
   *   // 赔率类型 1: 标准盘 3: 香港盘
   *   oddsType: 1,
   *   // 接收赔率变化类型 0 = 不接收赔率变化， 1 = 接收更高赔率， 2 = 接收所有赔率变化
   *   oddsAC: 1,
   *   // 当前使用货币
   *   currency: 'RMB',
   *   // 客户端类型 1 PC, 2 手机
   *   clientType: 2,
   *   // 默认投注额
   *   betAmount: 100,
   * }
  */
  AppConfig.setting,
);

const mutations = {
  updateSetting(state, { key, value }) {
    state[key] = value;
    saveToStorage(StorageKey.SETTING_KEY, state);
  },
};

const actions = {};

export default {
  namespaced: true,
  state: settingState,
  mutations,
  actions,
};
