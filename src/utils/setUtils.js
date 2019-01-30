import { StorageKey } from '@/config/constants';
import { loadFromStorage } from '@/utils/StorageUtil';
import AppConfig from '@/config/business.config.js';
import { getLang } from '@/utils/I18nUtil';

/**
 * 获取语言配置对象
 */
export const getLangObj = () => {
  const data = [{ value: 'zh', text: '简体中文' }, { value: 'zht', text: '繁体中文' }, { value: 'en', text: 'English' }];
  const [lan, obj] = [getLang(), { hide: true, title: '语言', data: [data] }];
  obj.default = data[0].text;
  for (let i = 0; i < data.length; i += 1) {
    if (data[i].value === lan) {
      obj.default = data[i].text;
      break;
    }
  }
  return obj;
};

/**
 * 获取赔率配置对象
 */
export const getOddsObj = () => {
  const data = [{ value: '1', text: '欧洲盘' }, { value: '3', text: '香港盘' }];
  const set = loadFromStorage(StorageKey.SETTING_KEY, AppConfig.setting);
  const [obj, odds] = [{ hide: true, title: '赔率', data: [data] }, set.oddsType];
  obj.default = data[0].text;
  for (let i = 0; i < data.length; i += 1) {
    if (`${data[i].value}` === `${odds}`) {
      obj.default = data[i].text;
      break;
    }
  }
  return obj;
};

/**
 * 获取语言配置对象
 */
export const getAmountObj = () => {
  const set = loadFromStorage(StorageKey.SETTING_KEY, AppConfig.setting);
  const obj = { placeholder: '', format: '0.00', title: '投注本金设置' };
  [obj.showInput, obj.click, obj.hide] = [false, false, true];
  obj.value = `${set.betAmount}`;
  return obj;
};
