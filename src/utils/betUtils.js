import { StorageKey } from '@/config/constants';
import { getBetBalance } from '@/api/bet';
import { getMultMaxBetList } from '@/api/quote';
import oddsFormat from '@/filters/oddsFormat';
import { getCasinoUser } from '@/utils/CasinoUserUtils';

/**
 * 计算可串关列表
 * @param {array} items
 * 已选中的投注项
 */
export const getTpTime = (time) => {
  const dt = time ? new Date(time) : new Date();
  const rt = `${dt.getFullYear()}/${`0${dt.getMonth() + 1}`.slice(-2)}/${`0${dt.getDate()}`.slice(-2)}`;
  return `${rt} ${`0${dt.getHours()}`.slice(-2)}:${`0${dt.getMinutes()}`.slice(-2)}:${`0${dt.getSeconds()}`.slice(-2)}`;
};

export const toMatch = (items = [], type) => {
  const matchs = [];
  for (let i = 0, find = 0; i < items.length; i += 1, find = 0) {
    const idx = items[i].idx || items[i].oid || i + 1;
    for (let j = 0; j < matchs.length; j += 1) {
      if (!type && matchs[j].mid === items[i].mid) {
        matchs[j] = { mid: items[i].mid, mct: matchs[j].mct + 1, odds: matchs[j].odds + (items[i].odds || 0) };
        find = 1;
      } else if (type && matchs[j][0].mid === items[i].mid) {
        matchs[j].push({
          mid: items[i].mid,
          oid: idx,
          odds: items[i].odds || 0,
          flag: items[i].flag || 0,
        });
        find = 1;
      }
      if (find) break;
    }
    if (!find && !type) {
      matchs.push({ mid: items[i].mid, mct: 1, odds: items[i].odds || 0 });
    } else if (!find && type) {
      matchs.push([{
        mid: items[i].mid,
        oid: idx,
        odds: items[i].odds || 0,
        flag: items[i].flag || 0,
      }]);
    }
  }
  return matchs;
};

export const getCount = (ops = [], arr = [], id, k, result) => {
  const len = ops.length + arr.length;
  if (arr.length === id) {
    let cal = { mct: 0, odds: 0 };
    for (let i = k; i < ops.length; i += 1) {
      cal = { mct: cal.mct + ops[i].mct, odds: cal.odds + ops[i].odds };
    }
    for (let i = 0; i < id; i += 1) {
      cal = { mct: cal.mct * arr[i].mct, odds: cal.odds * arr[i].odds };
    }
    return { mct: result.mct + cal.mct, odds: result.odds + cal.odds };
  }
  for (let i = k; i < len - id; i += 1) {
    result = getCount(ops, [ops[i]].concat(arr), id, i + 1, result);
  }
  return result;
};

export const toSeries = (items = []) => {
  const [result, ops, n] = [[], toMatch(items), 10 ** 8];
  for (let i = 0; i < ops.length; i += 1) {
    const rObj = Object.assign({ nm: i + 1 }, getCount(ops, [], i, 0, { mct: 0, odds: 0 }));
    rObj.odds = Math.round(rObj.odds * n) / n;
    result.push(rObj);
  }
  return result;
};

export const getSerList = (ops = [], arr = [], id, k, def, result) => {
  const [len, n] = [ops.length + arr.length, 10 ** 8];
  if (arr.length === id) {
    let cal = { oids: [], win: def || 1, flag: 0 };
    for (let i = 0; i < id; i += 1) {
      cal = { oids: cal.oids.concat([arr[i].oid]), win: cal.win * arr[i].odds, flag: cal.flag + arr[i].flag };
    }
    for (let i = k; i < ops.length; i += 1) {
      for (let j = 0; j < ops[i].length; j += 1) {
        const rObj = { oids: cal.oids.concat([ops[i][j].oid]), win: cal.win * ops[i][j].odds, flag: cal.flag + ops[i][j].flag };
        rObj.win = Math.round(rObj.win * n) / n;
        const rWin = rObj.flag ? 0 : rObj.win - def;
        result.push({ oids: rObj.oids, win: Math.floor(rWin * 100) / 100 });
      }
    }
    return result;
  }
  for (let i = k; i < len - id; i += 1) {
    for (let j = 0; j < ops[i].length; j += 1) {
      result = getSerList(ops, arr.concat([ops[i][j]]), id, i + 1, def, result);
    }
  }
  return result;
};

export const toSerList = (items = [], num = 2, def = 1) => getSerList(toMatch(items, true), [], num - 1, 0, def, []);

/*
 * 投注项同场比赛标记
 *
*/
export const checkSameMid = (data = []) => {
  const nData = data.constructor === Array ? data : [];
  for (let i = nData.length - 1; i >= 0; i -= 1) {
    [nData[i].rtn, nData[i].max, nData[i].idx] = [nData[i].rtn || 1000000, nData[i].max || 1000000, nData[i].idx || 0];
    [nData[i].same, nData[i].sts, nData[i].res] = [false, nData[i].sts || 7, nData[i].res || 0];
    [nData[i].alert, nData[i].min] = [nData[i].alert || 0, nData[i].min || 0];
    [nData[i].hide, nData[i].dt] = [!!nData[i].hide, nData[i].dt || 0];
    for (let j = 0; j < i; j += 1) {
      if (nData[j].oid === nData[i].oid) {
        nData.splice(i, 1);
        break;
      }
    }
  }
  for (let i = 0; i < nData.length - 1; i += 1) {
    if (!nData[i].same && /^7$/.test(nData[i].sts)) {
      for (let j = i + 1; j < nData.length; j += 1) {
        if (nData[j].mid === nData[i].mid && /^7$/.test(nData[j].sts)) {
          nData[i].same = true;
          nData[j].same = true;
        }
      }
    }
  }
  return nData;
};

/*
 * 获取余额和最大返还值
 *
*/
export const getUserInfo = async (falg) => {
  let user = JSON.parse(localStorage.getItem(StorageKey.USER_INFO_KEY) || 'null');
  let token = getCasinoUser() || {};
  let [data, bal] = [null, null];
  const [nowt, maxdt, maxut] = [Date.now(), 43200000, 1800000];
  token = token && token.token ? token.token : null;
  user = user || { rtn: { t: 0 }, t: 0 };
  if (token) {
    if (!user.rtn || !user.rtn.t || nowt - user.rtn.t > maxdt) {
      try {
        data = await getMultMaxBetList();
      } catch (e) {
        console.log(e);
      }
      user.rtn = Object.assign({}, user.rtn || {}, data || {}, { t: nowt });
      localStorage.setItem(StorageKey.USER_INFO_KEY, JSON.stringify(user));
    }
    if (falg || !user.token || !user.nbUser || user.token !== token || nowt - user.t > maxut) {
      try {
        bal = await getBetBalance();
      } catch (e) {
        console.log(e);
      }
      if (bal && bal.nbUser) {
        [user.nbUser, user.balance, user.token] = [bal.nbUser, bal.balance || 0, token];
      } else {
        user = { rtn: user.rtn || { t: 0 } };
      }
      user.t = nowt;
    }
  } else {
    user = { rtn: user.rtn || { t: 0 }, t: 0 };
  }
  localStorage.setItem(StorageKey.USER_INFO_KEY, JSON.stringify(user));
  return user && user.nbUser && user.token ? user : null;
};

/*
 * 修改余额
 *
*/
export const changeBalance = (bal) => {
  let user = JSON.parse(localStorage.getItem(StorageKey.USER_INFO_KEY) || 'null');
  let token = getCasinoUser() || {};
  token = token && token.token ? token.token : null;
  user = user || { rtn: { t: 0 }, t: 0 };
  if (user && token && user.token === token) {
    user.balance = user.balance && bal ? user.balance - bal : user.balance || 0;
  } else {
    user = { rtn: user.rtn || { t: 0 }, t: 0 };
  }
  localStorage.setItem(StorageKey.USER_INFO_KEY, JSON.stringify(user));
  return user && user.nbUser && user.token ? user : null;
};

/*
 * 生成点水参数
 *
*/
export const getMultQuotePara = (user, arr) => {
  const data = arr || JSON.parse(localStorage.getItem(StorageKey.BET_CART_KEY) || 'null') || [];
  if (!user || !user.nbUser || !data || data.constructor !== Array || !data.length) {
    return null;
  }
  const req = { userId: user.nbUser, options: [] };
  for (let i = 0; i < data.length; i += 1) {
    req.options.push({ optionId: data[i].oid });
  }
  return req;
};

/*
 * 构造推送参数
 *
*/
export const makePushPara = (flag) => {
  const [matchs, options, tickets] = [[], [], []];
  const data = JSON.parse(localStorage.getItem(StorageKey.BET_CART_KEY) || 'null') || [];
  for (let i = 0; i < data.length; i += 1) {
    if (matchs.indexOf(data[i].mid) < 0) {
      matchs.push(data[i].mid);
    }
    if (options.indexOf(data[i].oid) < 0) {
      options.push(data[i].oid);
    }
  }
  const list = JSON.parse(localStorage.getItem(StorageKey.BET_SLIPS_KEY) || 'null') || [];
  for (let i = 0; i < list.length; i += 1) {
    if (!new RegExp(`[:"]${list[i].mstid}[},]`).test(JSON.stringify(tickets))) {
      tickets.push({ TicketID: list[i].mstid });
    }
  }
  return { Matchs: flag ? [] : [{ Mids: matchs }], OptionIDs: flag ? [] : options, Tickets: flag ? [] : tickets };
};

/*
 * 构造投注项参数
 *
*/
export const makeBetParam = (set, bs, ops) => {
  const [rtnObj, bets, opts] = [{ ac: set.oddsAC, cry: set.currency, ctp: set.clientType }, [], []];
  rtnObj.btp = 1;
  for (let i = 0; i < bs.length; i += 1) {
    bets.push({ num: bs[i].num || 1, cnt: bs[i].cnt || 1, amt: +bs[i].amt });
    if (bs[i].num && bs[i].num > 1) {
      rtnObj.btp = 2;
    }
  }
  for (let i = 0; i < ops.length; i += 1) {
    if (/^7$/.test(ops[i].sts)) {
      opts.push({ oid: ops[i].oid, gpt: ops[i].gpt, odv: oddsFormat(ops[i].ods, ops[i].gmt) });
    }
  }
  return opts.length ? Object.assign({}, rtnObj, { ofid: set.oddsType, bets, opts }) : null;
};

/*
 * 检查推送Option
 *
*/
export const updatePushOption = (bet, arr = [], flag) => {
  const [item, data] = [bet, arr];
  for (let i = 0; i < data.length; i += 1) {
    if (data[i].options && data[i].options.length) {
      for (let j = 0; j < data[i].options.length; j += 1) {
        if (data[i].options[j] && data[i].options[j].oid === item.oid) {
          if (flag) {
            item.ods = data[i].options[j].odds || 0;
          } else {
            item.sts = data[i].options[j].state || 0;
          }
          return item;
        }
      }
    }
  }
  return item;
};

/*
 * 时间格式转换
 *
*/
export const changeTime = (tp, flag) => {
  if (!flag) {
    return tp < 10 ** 12 ? tp * 1000 : tp;
  }
  return tp < 10 ** 12 ? tp : Math.floor(tp / 1000);
};

/*
 * 投注项显示数据转换
 *
*/
export const getMultStatus = (st, win, $t) => {
  if (/^1$/.test(st)) {
    return $t.admiss;
  } else if (/^2$/.test(st)) {
    return $t.settle;
  } else if (/^(3|8)$/.test(st)) {
    const rs = win > 0 ? $t.win75 : $t.lose0;
    return win < 0 ? $t.lose100 : rs;
  }
  return $t.cancel;
};

export const getNBit = (num, n) => {
  const [nNum, fN, oN] = [Math.abs(num), n + 4, n + 1];
  let nn = 10 ** -fN;
  nn *= 5;
  const [numStr, flag] = [(nNum + nn).toString(), +num < 0 ? '-' : ''];
  return `${flag}${numStr.slice(0, numStr.indexOf('.') + oN)}`;
};

export const getBetStatus = (st, $t) => {
  const obj = {
    '-100': $t.lose100,
    '-50': $t.lose50,
    1: $t.win0,
    0: $t.settle,
    50: $t.win50,
    100: $t.win100,
    3: $t.cancel,
  };
  return obj[st] || $t.cancel;
};

export const betDisplay = (opt, $t) => {
  const item = opt;
  item.title = $t.sinBet;
  if (item.opts.length > 1) {
    for (let k = 0; k < item.bets.length; k += 1) {
      if (item.bets[k].num > 1) {
        item.title = $t.mulBet;
        break;
      }
    }
  }
  item.time = getTpTime(changeTime(item.tp));
  let status = $t.rtnMoney;
  if (/^(1|2)$/.test(item.wst)) {
    status = $t.highRtn;
  } else if (/^(3|8)$/.test(item.wst)) {
    status = $t.winLose;
  }
  const oSts = getMultStatus(item.wst, item.win, $t);
  for (let k = 0; k < item.bets.length; k += 1) {
    [item.bets[k].status, item.bets[k].class] = [status, 'bet-detail-other'];
    item.bets[k].winStu = getMultStatus(item.wst, item.bets[k].win, $t);
    if (item.bets[k].winStu === $t.win75) {
      item.bets[k].class = 'bet-detail-win';
    } else if (item.bets[k].winStu === $t.lose100) {
      item.bets[k].class = 'bet-detail-lose';
    }
  }
  for (let k = 0; k < item.opts.length; k += 1) {
    item.opts[k].ofid = item.ofid;
    item.opts[k].idx = item.opts.length > 1 ? k + 1 : 0;
    if (item.title === $t.sinBet) {
      item.opts[k].winStu = oSts;
      item.opts[k].class = 'bet-body-other';
      if (item.opts[k].winStu === $t.win75) {
        item.opts[k].class = 'bet-body-win';
      } else if (item.opts[k].winStu === $t.lose100) {
        item.opts[k].class = 'bet-body-lose';
      }
    } else {
      item.opts[k].winStu = getBetStatus(item.opts[k].res, $t);
      item.opts[k].class = 'bet-body-mult';
    }
    [item.opts[k].rtn, item.opts[k].max] = [item.opts[k].rtn || 1000000, item.opts[k].max || 1000000];
    [item.opts[k].same, item.opts[k].sts, item.opts[k].res] = [false, item.opts[k].sts || 7, item.opts[k].res || 0];
    [item.opts[k].alert, item.opts[k].min, item.opts[k].hide] = [item.opts[k].alert || 0, item.opts[k].min || 0, !!item.opts[k].hide];
  }
  if (item.opts.length > 1) {
    item.opts[0].hasBtn = 'bottom';
  }
  return item;
};
