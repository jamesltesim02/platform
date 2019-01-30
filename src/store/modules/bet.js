import { StorageKey } from '@/config/constants';
import { loadFromStorage, saveToStorage } from '@/utils/StorageUtil';
import { checkSameMid, updatePushOption } from '@/utils/betUtils';

const state = {
  betSlip: loadFromStorage(StorageKey.BET_SLIPS_KEY, []),
  betList: loadFromStorage(StorageKey.BET_CART_KEY, []),
  betCount: loadFromStorage(StorageKey.BET_CART_KEY, []).filter(v => /^7$/.test(v.sts)).length,
  betPerct: 1,
  betStatus: [],
  betFlag: false,
  barFlag: 0,
};

const mutations = {
  saveBetOption(bState, obj = { paras: {}, bets: [], opts: [] }) {
    const [{ paras, bets, opts }, slip] = [obj, { tp: Date.now(), wst: 1, win: 0 }];
    [slip.ofid, slip.tamt, slip.user] = [paras.ofid || 1, 0, paras.user || ''];
    const data = loadFromStorage(StorageKey.BET_SLIPS_KEY, []);
    for (let i = data.length - 1; i >= 0; i -= 1) {
      if (data[i].wst !== 1 || slip.tp - data[i].tp > 600000 || data[i].user !== slip.user) {
        data.splice(i, 1);
      }
    }
    if (paras.mstid) {
      [slip.mstid, slip.bets, slip.opts] = [paras.mstid, bets, opts];
      for (let i = 0; i < bets.length; i += 1) {
        slip.bets[i].tid = paras.mstid;
        slip.tamt += slip.bets[i].tamt;
      }
      let find = false;
      for (let i = 0; i < data.length; i += 1) {
        if (`${data[i].mstid}` === `${slip.mstid}`) {
          find = true;
          break;
        }
      }
      if (!find) data.push(slip);
    }
    saveToStorage(StorageKey.BET_SLIPS_KEY, data);
    this.state.bet.betSlip = data;
  },
  clearBetOption(bState, obj = { user: '', arr: [] }) {
    const data = loadFromStorage(StorageKey.BET_SLIPS_KEY, []);
    const dtn = Date.now();
    for (let i = data.length - 1; i >= 0; i -= 1) {
      if (data[i].wst !== 1 || dtn - data[i].tp > 600000 || data[i].user !== obj.user) {
        data.splice(i, 1);
      } else {
        for (let j = 0; j < obj.arr.length; j += 1) {
          if (`${obj.arr[j].mstid}` === `${data[i].mstid}`) {
            data.splice(i, 1);
            break;
          }
        }
      }
    }
    saveToStorage(StorageKey.BET_SLIPS_KEY, data);
    this.state.bet.betSlip = data;
  },
  clearBetItem(bState, arr = []) {
    let data = loadFromStorage(StorageKey.BET_CART_KEY, []);
    const nArr = arr.constructor === Object ? [arr] : arr;
    if (nArr.length) {
      for (let k = 0; k < nArr.length; k += 1) {
        for (let i = 0; i < data.length; i += 1) {
          if (`${data[i].oid}` === `${nArr[k].oid}`) {
            data.splice(i, 1);
            break;
          }
        }
      }
    } else {
      data = [];
    }
    data = checkSameMid(data);
    saveToStorage(StorageKey.BET_CART_KEY, data);
    [this.state.bet.betList, this.state.bet.betCount] = [data, data.filter(v => /^7$/.test(v.sts)).length];
  },
  updateBetItem(bState, arr = []) {
    let data = loadFromStorage(StorageKey.BET_CART_KEY, []);
    const nArr = arr.constructor === Object ? [arr] : arr;
    for (let k = 0; k < nArr.length; k += 1) {
      for (let i = 0; i < data.length; i += 1) {
        if (`${data[i].oid}` === `${nArr[k].oid}`) {
          data[i] = Object.assign({}, data[i], nArr[k]);
          break;
        }
      }
    }
    data = checkSameMid(data);
    saveToStorage(StorageKey.BET_CART_KEY, data);
    [this.state.bet.betList, this.state.bet.betCount] = [data, data.filter(v => /^7$/.test(v.sts)).length];
  },
  clickBetItem(bState, item) {
    let [data, delFlag] = [loadFromStorage(StorageKey.BET_CART_KEY, []), 0];
    for (let i = data.length - 1; i >= 0; i -= 1) {
      if (item && typeof item === 'object' && `${data[i].oid}` === `${item.oid}`) {
        data.splice(i, 1);
        delFlag = 1;
      }
    }
    if (!delFlag && item) data.push(item);
    data = checkSameMid(data);
    saveToStorage(StorageKey.BET_CART_KEY, data);
    const bFlag = item === undefined ? 1 : 0;
    [this.state.bet.betFlag, this.state.bet.betList, this.state.bet.barFlag] = [!this.state.bet.betFlag, data, !bFlag && !item ? 2 : bFlag];
    [this.state.bet.betCount, this.state.bet.betStatus] = [data.filter(v => /^7$/.test(v.sts)).length, 0 - delFlag];
    if (delFlag || !item) return;
    let [pct, aFlag] = [100, false];
    clearInterval(window.betPctTimer);
    window.betPctTimer = setInterval(() => {
      if (aFlag && pct >= 100) {
        pct = 100;
        clearInterval(window.betPctTimer);
      } else if (aFlag) {
        pct += 4;
      } else {
        [pct, aFlag] = [pct - 10, pct <= 50];
      }
      this.state.bet.betPerct = pct / 100;
    }, 10);
  },
  checkBetItem(bState, items = []) {
    let data = loadFromStorage(StorageKey.BET_CART_KEY, []);
    data = checkSameMid(data);
    [this.state.bet.betList, this.state.bet.betCount] = [data, data.filter(v => /^7$/.test(v.sts)).length];
    let iData = items.constructor === Array ? items : [items];
    iData = iData.length === 1 && iData[0].constructor === Array ? iData[0] : iData;
    const result = [];
    for (let i = 0; i < iData.length; i += 1) {
      const oid = typeof iData[i] === 'object' ? iData[i].oid : iData[i];
      for (let j = 0; j < data.length; j += 1) {
        if (`${data[j].oid}` === `${oid}`) {
          result.push(j);
          break;
        }
      }
      if (result.length <= i) result.push(-1);
    }
    const rtn = result.length ? result : null;
    this.state.bet.betStatus = rtn && rtn.length === 1 ? rtn[0] : rtn;
  },
  setBetOption(bState, flag) {
    let data = loadFromStorage(StorageKey.BET_CART_KEY, []);
    for (let i = 0; i < data.length; i += 1) {
      data[i].idx = flag ? i + 1 : 0;
    }
    data = checkSameMid(data);
    saveToStorage(StorageKey.BET_CART_KEY, data);
    [this.state.bet.betList, this.state.bet.betCount] = [data, data.filter(v => /^7$/.test(v.sts)).length];
  },
  clickBetOption(bState, item) {
    let data = loadFromStorage(StorageKey.BET_CART_KEY, []);
    for (let i = 0; i < data.length; i += 1) {
      const rst = item ? data[i].oid !== item.oid : data.length !== 1;
      data[i].hide = /^7$/.test(data[i].sts) ? rst : true;
    }
    data = checkSameMid(data);
    saveToStorage(StorageKey.BET_CART_KEY, data);
    [this.state.bet.betList, this.state.bet.betCount] = [data, data.filter(v => /^7$/.test(v.sts)).length];
  },
  clearBetAlert(bState, item) {
    let data = loadFromStorage(StorageKey.BET_CART_KEY, []);
    for (let i = 0; i < data.length; i += 1) {
      const rst = item ? `${data[i].oid}` === `${item.oid}` : true;
      data[i].alert = rst ? 0 : data[i].alert;
    }
    data = checkSameMid(data);
    saveToStorage(StorageKey.BET_CART_KEY, data);
    [this.state.bet.betList, this.state.bet.betCount] = [data, data.filter(v => /^7$/.test(v.sts)).length];
  },
  quoteBetOption(bState, list = []) {
    let data = loadFromStorage(StorageKey.BET_CART_KEY, []);
    for (let i = 0; i < list.length; i += 1) {
      for (let j = data.length - 1; j >= 0; j -= 1) {
        if (`${list[i].optionId}` === `${data[j].oid}`) {
          const obj = { odo: data[j].ods, odn: list[i].odds || 0 };
          [data[j].msc, data[j].dt] = [list[i].matchScore || data[j].msc, list[i].matchScore ? 1 : 0];
          [data[j].min, data[j].max] = [list[i].minBet || 0, list[i].maxBet || data[j].max];
          [data[j].ods, data[j].rtn] = [obj.odn, list[i].maxReturn || data[j].rtn];
          [data[j].alert, data[j].sts] = [0, list[i].state];
          if (/^6$/.test(list[i].state)) {
            data[j].alert = 3;
          } else if (obj.odn < obj.odo) {
            data[j].alert = 2;
          } else if (obj.odn > obj.odo) {
            data[j].alert = 1;
          }
          if (!/^(6|7)$/.test(list[i].state)) data.splice(j, 1);
          break;
        }
      }
    }
    data = checkSameMid(data);
    saveToStorage(StorageKey.BET_CART_KEY, data);
    [this.state.bet.betList, this.state.bet.betCount] = [data, data.filter(v => /^7$/.test(v.sts)).length];
  },
  pushBetOption(bState, obj) {
    const [user, item, nowt] = [obj.user || '', obj.msg || obj.item || { nt: -1 }, Date.now()];
    let bets = loadFromStorage(StorageKey.BET_CART_KEY, []);
    const slips = loadFromStorage(StorageKey.BET_SLIPS_KEY, []);
    if (/^(1|2)$/.test(item.nt) && item.mid && item.data && item.data.length) {
      for (let i = bets.length - 1; i >= 0; i -= 1) {
        if (`${bets[i].mid}` === `${item.mid}`) {
          bets[i] = updatePushOption(bets[i], item.data, /^2$/.test(item.nt));
          if (!/^(6|7)$/.test(bets[i].state)) bets.splice(i, 1);
        }
      }
    } else if (/^3$/.test(item.nt)) {
      for (let i = bets.length - 1; i >= 0; i -= 1) {
        if (`${bets[i].mid}` === `${item.mid}`) {
          bets[i].bar = item.data && item.data.betbar ? item.data.betbar : '';
        }
      }
    } else if (/^(4|7)$/.test(item.nt)) {
      for (let i = bets.length - 1; i >= 0; i -= 1) {
        if (`${bets[i].mid}` === `${item.mid}`) {
          if (/^4$/.test(item.nt) && item.data) {
            bets[i].msc = `${item.data.hs || 0}:${item.data.as || 0}`;
          } else if (item.data) {
            bets[i].msc = `${item.data.set_scores || '0-0'} ${item.data.game_score || '0:0'}`;
          }
          bets[i].dt = 1;
        }
      }
    } else if (/^(6|8|9|11)$/.test(item.nt)) {
      for (let i = bets.length - 1; i >= 0; i -= 1) {
        if (`${bets[i].mid}` === `${item.mid}`) {
          bets[i].dt = 1;
        }
      }
    } else if (/^10$/.test(item.nt)) {
      for (let i = slips.length - 1; i >= 0; i -= 1) {
        if (`${slips[i].user}` !== `${user}` || nowt - slips[i].tp > 600000) {
          slips.splice(i, 1);
        } else if (`${slips[i].mstid}` === `${item.wid}`) {
          slips[i].wst = item.wst || 0;
        }
      }
    } else if (/^15$/.test(item.nt)) {
      for (let i = bets.length - 1; i >= 0; i -= 1) {
        if (`${bets[i].mid}` === `${item.mid}`) bets.splice(i, 1);
      }
    }
    saveToStorage(StorageKey.BET_SLIPS_KEY, slips);
    [this.state.bet.betSlip, bets] = [slips, checkSameMid(bets)];
    saveToStorage(StorageKey.BET_CART_KEY, bets);
    [this.state.bet.betList, this.state.bet.betCount] = [bets, bets.filter(v => /^7$/.test(v.sts)).length];
  },
};

const actions = {};

export default {
  state,
  mutations,
  actions,
};

