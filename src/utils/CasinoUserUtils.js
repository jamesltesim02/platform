import { StorageKey } from '@/config/constants';

let casinoUserInfo = JSON.parse(localStorage.getItem(StorageKey.CASINO_USER_KEY) || '{}') || {};

export const saveCasinoUser = (userInfo) => {
  if (!userInfo) {
    return;
  }
  localStorage.setItem(StorageKey.CASINO_USER_KEY, JSON.stringify(userInfo));
  casinoUserInfo = userInfo;
};

export const getCasinoUser = () => casinoUserInfo;

export const removeCasinoUser = () => {
  localStorage.removeItem(StorageKey.CASINO_USER_KEY);
  casinoUserInfo = {};
};
