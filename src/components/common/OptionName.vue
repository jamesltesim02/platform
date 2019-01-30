<template>
  <span>{{gameName}}</span>
</template>

<script>
const YES_NO_FORMATER = (betBar, betOption) => ({
  Yes: '是',
  No: '否',
}[betOption]);
const MAX_SCORE_FORMATER = (betBar, betOption) => ({
  1: '上半场',
  2: '下半场',
  Equals: '平局',
}[betOption]);

const OPTION_FORMATERS = {
  // 标准盘
  1: (betBar, betOption, mn) => {
    const tArr = (mn || '主 vs 客').trim().split(/\s+vs\s+/i);
    return ({
      1: tArr[0],
      X: '平',
      x: '平',
      2: tArr[1],
    })[betOption];
  },
  10: (betBar, betOption) => ({
    '1X': '主和',
    12: '主客',
    X2: '和客',
  })[betOption],
  // 让球盘
  14: (betBar, betOption, mn) => {
    const tArr = (mn || '').trim().split(/\s+vs\s+/i);
    const suffix = ({
      1: mn ? `${tArr[0]}` : '主',
      X: '平',
      x: '平',
      2: mn ? `${tArr[1]}` : '客',
    })[betOption];
    const preScores = betBar.split(':');

    if (mn) {
      return `${suffix} ${preScores[1] - preScores[0]}`;
    }
    return `${preScores[1] - preScores[0]} ${suffix}`;
  },
  16: (betBar, betOption, mn) => {
    const tArr = (mn || '').trim().split(/\s+vs\s+/i);
    const optionValue = (+betOption === 1 ? 1 : -1) * betBar;
    const prefix = ({
      1: mn ? `${tArr[0]} ` : '',
      2: mn ? `${tArr[1]} ` : '',
    })[betOption];

    return `${prefix}${optionValue}`;
  },
  // 大小盘
  18: (betBar, betOption) => ({
    Over: '大',
    Under: '小',
  }[betOption]) + betBar,
  // 单双
  26: (betBar, betOption) => ({
    Odd: '单',
    Even: '双',
  })[betOption],
  29: YES_NO_FORMATER,
  33: YES_NO_FORMATER,
  34: YES_NO_FORMATER,
  // 半全场
  47: (betBar, betOption) => {
    const maps = {
      1: '主',
      x: '平',
      X: '平',
      2: '客',
    };
    const bos = betOption.split('/');
    return `${maps[bos[0]]}/${maps[bos[1]]}`;
  },
  48: YES_NO_FORMATER,
  49: YES_NO_FORMATER,
  50: YES_NO_FORMATER,
  51: YES_NO_FORMATER,
  52: (betBar, betOption, mn) => {
    const tArr = (mn || '主 vs 客').trim().split(/\s+vs\s+/i);
    return ({
      1: tArr[0],
      2: tArr[1],
      Equals: '平局',
    })[betOption];
  },
  53: MAX_SCORE_FORMATER,
  54: MAX_SCORE_FORMATER,
};
export default {
  props: ['gameType', 'betBar', 'betOption', 'mn'],
  computed: {
    gameName() {
      const formater = OPTION_FORMATERS[this.gameType];
      if (formater) {
        return formater(this.betBar, this.betOption, this.mn);
      }
      return this.betBar || this.betOption;
    },
  },
};
</script>
