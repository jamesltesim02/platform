export default {
  msg1: '你好!',
  msg2: '我是msg2.',
  msg3: '我是msg3',

  common: {
    operations: {
      leagues: '选择联赛',
    },
    sportnames: {
      10: '足球',
      11: '篮球',
      12: '网球',
      14: '英雄联盟',
      15: '刀塔2',
      16: '反恐精英',
      17: '星际争霸',
      18: '守望先锋',
      19: '王者荣耀',
    },
    datetypes: {
      all: '全部',
      rolling: '滚球',
      today: '今日',
      early: '早盘',
    },
    forms: {
      reset: '重置',
      complete: '完成',
    },
    gpt: {
      gpt_1: '比分',
      gpt_2: '角球',
      gpt_3: '罚牌',
      gpt_30: '优胜冠军',
    },
    wf: {
      // sno_grouptype_比赛阶段_gtp
      // 核心玩法
      wf_10_1_0_1: '标准盘',
      wf_10_1_0_14: '让分标准盘',
      wf_10_1_0_16: '让球盘',
      wf_10_1_0_18: '大小盘',
      wf_10_1_0_26: '单双',

      // 主要玩法
      wf_10_1_1_1: '上半场标准盘',
      wf_10_1_2_1: '下半场标准盘',
      wf_10_1_1_16: '上半场让球',
      wf_10_1_1_18: '上半场大小',
      wf_10_1_1_26: '上半场单双',
      wf_10_1_2_26: '下半场单双',
      wf_10_1_0_45: '波胆',
      wf_10_1_0_47: '半全场',
      wf_10_1_1_45: '上半场波胆',
      wf_10_1_2_45: '下半场波胆',
      //  wf_10_1_0_21: '总进球',
      wf_10_1_2_16: '下半场让球盘',
      wf_10_1_2_18: '下半场大小盘',
      wf_10_1_0_10: '双胜彩',
      wf_10_1_1_10: '上半场双胜彩',
      wf_10_1_2_10: '下半场双胜彩',
      wf_10_1_0_11: '平局退款',
      wf_10_1_1_11: '上半场平局退款',
      wf_10_1_2_11: '下半场平局退款',
      wf_10_1_0_12: '主队平局退款',
      wf_10_1_0_13: '客队平局退款',
      // 赛果
      wf_10_1_0_37: '标准盘&大小',
      wf_10_1_1_37: '上半场标准盘&大小',
      wf_10_1_2_37: '下半场标准盘&大小',
      wf_10_1_0_33: '主胜且零封对手',
      wf_10_1_0_34: '客胜且零封对手',
      wf_10_1_0_5: '获胜方式',
      wf_10_1_0_220: '是否出现加时赛',
      wf_10_1_3_112: '加时赛并发生得分',
      wf_10_1_0_25: '得分范围',
      wf_10_1_0_56: '主队在两个半场均得分',
      wf_10_1_0_57: '客队在两个半场均得分',
      wf_10_1_0_48: '主队在两个半场均获胜',
      wf_10_1_0_49: '客队在两个半场均获胜',
      wf_10_1_0_50: '主队在任意半场均获胜',
      wf_10_1_0_51: '客队在任意半场均获胜',
      wf_10_1_0_53: '主队最高得分半场',
      wf_10_1_0_54: '客队最高得分半场',
      wf_10_1_0_58: '两个半场均大球',
      wf_10_1_0_59: '两个半场均小球',
      wf_10_1_0_122: '是否进入点球决战',
      wf_10_1_6_123: '点球决战获胜者',
      // 角球
      wf_10_2_0_1: '角球标准盘',
      wf_10_2_1_1: '上半场角球标准盘',
      wf_10_2_0_16: '角球让分盘',
      wf_10_2_0_18: '角球数大小',

      wf_10_2_0_26: '角球数单双',
      wf_10_2_1_26: '上半场角球数单双',
      wf_10_2_0_25: '总角球数',
      wf_10_2_1_25: '上半场总角球数',
      wf_10_2_0_8: '第一个角球',
      wf_10_2_1_8: '上半场第一个角球',
      wf_10_2_0_9: '最后一个角球',
      wf_10_2_1_9: '上半场最后一个角球',
      wf_10_2_1_16: '上半场角球让盘',
      wf_10_2_1_18: '上半场角球大小',

      wf_10_2_0_19: '主队角球数大小',
      wf_10_2_1_19: '上半场主队角球数大小',
      wf_10_2_0_20: '客队角球数大小',
      wf_10_2_1_20: '上半场客队角球数大小',
      wf_10_2_0_170: '主队总角球数',
      wf_10_2_1_170: '上半场主队总角球数',
      wf_10_2_0_171: '客队总角球数',
      wf_10_2_1_171: '上半场客队总角球数',
      // 罚牌
      wf_10_3_0_1: '罚牌标准盘',
      wf_10_3_1_1: '上半场罚牌标准盘',
      wf_10_3_0_18: '罚牌数大小',
      wf_10_3_1_18: '上半场罚牌数大小',
      wf_10_3_0_8: '最先被罚牌球队',
      wf_10_3_1_8: '上半场最先被罚牌球队',
      wf_10_3_0_19: '主队罚牌数大小',
      wf_10_3_1_19: '上半场主队罚牌数大小',
      wf_10_3_0_20: '客队罚牌数大小',
      wf_10_3_1_20: '上半场客队罚牌数大小',
      wf_10_3_0_23: '主队罚牌数',
      wf_10_3_1_23: '上半场主队罚牌数',
      wf_10_3_0_24: '客队罚牌数',
      wf_10_3_1_24: '上半场客队罚牌数',
      wf_10_3_0_146: '是否出现红牌',
      wf_10_3_1_146: '上半场是否出现红牌',
      wf_10_3_0_147: '主队是否出现红牌',
      wf_10_3_1_147: '上半场主队是否出现红牌',
      wf_10_3_0_148: '客队是否出现红牌',
      wf_10_3_1_148: '上半场客队是否出现红牌',
      // 得分球队
      wf_10_1_0_8: '率先得分球队',
      wf_10_1_1_8: '上半场率先得分球队',
      wf_10_1_2_8: '下半场率先得分球队',
      wf_10_1_0_9: '最后得分球队',
      wf_10_1_0_30: '得分球队',
      wf_10_1_0_29: '两队均得分',
      wf_10_1_0_52: '半场最高得分',
      wf_10_1_1_29: '上半场两队均得分',
      wf_10_1_2_29: '下半场两队均得分',
      wf_10_1_0_35: '标准盘及两队均得分',
      wf_10_1_1_35: '上半场标准盘及两队均得分',
      wf_10_1_2_35: '下半场标准盘及两队均得分',
      wf_10_1_0_36: '大小盘及两队均得分',
      wf_10_1_1_36: '上半场大小盘及两队均得分',
      wf_10_1_2_36: '下半场大小盘及两队均得分',
      // 进球
      wf_10_1_0_23: '主队精确进球数',
      wf_10_1_1_23: '上半场主队精确进球数',
      wf_10_1_0_24: '客队精确进球数',
      wf_10_1_1_24: '上半场客队精确进球数',
      wf_10_1_0_21: '精确进球数',
      wf_10_1_1_21: '上半场精确进球数',
      wf_10_1_2_21: '下半场精确进球数',
      wf_10_1_0_19: '主队进球大小',
      wf_10_1_0_20: '客队进球大小',
      wf_10_1_1_19: '上半场主队进球大小',
      wf_10_1_1_20: '上半场客队进球大小',
      wf_10_1_2_19: '下半场主队进球大小',
      wf_10_1_2_20: '下半场客队进球大小',
      wf_10_1_0_27: '主队进球单双',
      wf_10_1_0_28: '客队进球单双',

      // 加时赛
      wf_10_1_3_1: '加时标准盘',
      wf_10_1_3_16: '加时让球盘',
      wf_10_1_3_18: '加时大小盘',
      // 点球
      // wf_10_1_6_123: '点球胜负盘',
      wf_10_1_6_18: '点球大小盘',


      // 正盘
      // 核心玩法
      wf_10_1_1000_1: '标准盘',
      wf_10_1_1000_16: '让球盘',
      wf_10_1_1000_18: '大小盘',
      wf_10_1_1000_26: '单双',

      // 主要玩法
      wf_10_1_1001_1: '上半场标准盘',
      wf_10_1_1002_1: '下半场标准盘',
      wf_10_1_1001_16: '上半场让球',
      wf_10_1_1001_18: '上半场大小',
      wf_10_1_1001_26: '上半场单双',
      wf_10_1_1002_26: '下半场单双',
      wf_10_1_1000_45: '波胆',
      wf_10_1_1000_47: '半全场',
      wf_10_1_1001_45: '上半场波胆',
      wf_10_1_1002_45: '下半场波胆',
      wf_10_1_1000_21: '总进球',
      wf_10_1_1002_16: '下半场让球盘',
      wf_10_1_1002_18: '下半场大小盘',
      wf_10_1_1000_10: '双胜彩',
      wf_10_1_1001_10: '上半场双胜彩',
      wf_10_1_1002_10: '下半场双胜彩',
      wf_10_1_1000_11: '平局退款',
      wf_10_1_1001_11: '上半场平局退款',
      wf_10_1_1002_11: '下半场平局退款',
      wf_10_1_1000_12: '主队平局退款',
      wf_10_1_1000_13: '客队平局退款',
      // 赛果
      wf_10_1_1000_37: '标准盘&大小',
      wf_10_1_1001_37: '上半场标准盘&大小',
      wf_10_1_1002_37: '下半场标准盘&大小',
      wf_10_1_1000_33: '主胜且零封对手',
      wf_10_1_1000_34: '客胜且零封对手',
      wf_10_1_1000_5: '获胜方式',
      wf_10_1_1000_220: '加时赛(是否出现加时赛)',
      wf_10_1_1003_112: '加时赛并发生得分',
      wf_10_1_1000_25: '得分范围',
      wf_10_1_1000_56: '主队在两个半场均得分',
      wf_10_1_1000_57: '客队在两个半场均得分',
      wf_10_1_1000_48: '主队在两个半场均获胜',
      wf_10_1_1000_49: '客队在两个半场均获胜',
      wf_10_1_1000_50: '主队在任意半场均获胜',
      wf_10_1_1000_51: '客队在任意半场均获胜',
      wf_10_1_1000_53: '主队最高得分半场',
      wf_10_1_1000_54: '客队最高得分半场',
      wf_10_1_1000_58: '两个半场均大球',
      wf_10_1_1000_59: '两个半场均小球',
      wf_10_1_1000_122: '是否进入点球决战',
      // wf_10_1_1006_123: '点球决战获胜者',
      // 角球
      wf_10_2_1000_1: '角球标准盘',
      wf_10_2_1001_1: '上半场角球标准盘',
      wf_10_2_1000_16: '角球让分盘',
      wf_10_2_1000_18: '角球数大小',
      wf_10_2_1000_26: '角球数单双',
      wf_10_2_1001_26: '上半场角球数单双',
      wf_10_2_1000_25: '总角球数',
      wf_10_2_1001_25: '上半场总角球数',
      wf_10_2_1000_8: '第一个角球',
      wf_10_2_1001_8: '上半场第一个角球',
      wf_10_2_1000_9: '最后一个角球',
      wf_10_2_1001_9: '上半场最后一个角球',
      wf_10_2_1001_16: '上半场角球让盘',
      wf_10_2_1001_18: '上半场角球大小',

      wf_10_2_1000_19: '主队角球数大小',
      wf_10_2_1001_19: '上半场主队角球数大小',
      wf_10_2_1000_20: '客队角球数大小',
      wf_10_2_1001_20: '上半场客队角球数大小',
      wf_10_2_1000_170: '主队总角球数',
      wf_10_2_1001_170: '上半场主队总角球数',
      wf_10_2_1000_171: '客队总角球数',
      wf_10_2_1001_171: '上半场客队总角球数',
      // 罚牌
      wf_10_3_1000_1: '罚牌标准盘',
      wf_10_3_1001_1: '上半场罚牌标准盘',
      wf_10_3_1000_18: '罚牌数大小',
      wf_10_3_1001_18: '上半场罚牌数大小',
      wf_10_3_1000_8: '最先被罚牌球队',
      wf_10_3_1001_8: '上半场最先被罚牌球队',
      wf_10_3_1000_19: '主队罚牌数大小',
      wf_10_3_1001_19: '上半场主队罚牌数大小',
      wf_10_3_1000_20: '客队罚牌数大小',
      wf_10_3_1001_20: '上半场客队罚牌数大小',
      wf_10_3_1000_23: '主队罚牌数',
      wf_10_3_1001_23: '上半场主队罚牌数',
      wf_10_3_1000_24: '客队罚牌数',
      wf_10_3_1001_24: '上半场客队罚牌数',
      wf_10_3_1000_146: '是否出现红牌',
      wf_10_3_1001_146: '上半场是否出现红牌',
      wf_10_3_1000_147: '主队是否出现红牌',
      wf_10_3_1001_147: '上半场主队是否出现红牌',
      wf_10_3_1000_148: '客队是否出现红牌',
      wf_10_3_1001_148: '上半场客队是否出现红牌',
      // 得分球队
      wf_10_1_1000_8: '率先得分球队',
      wf_10_1_1001_8: '上半场率先得分球队',
      wf_10_1_1002_8: '下半场率先得分球队',
      wf_10_1_1000_9: '最后得分球队',
      wf_10_1_1000_30: '得分球队',
      wf_10_1_1000_29: '两队均得分',
      wf_10_1_1000_52: '半场得分最高',
      wf_10_1_1001_29: '上半场两队均得分',
      wf_10_1_1002_29: '下半场两队均得分',
      wf_10_1_1000_35: '标准盘及两队均得分',
      wf_10_1_1001_35: '上半场标准盘及两队均得分',
      wf_10_1_1002_35: '下半场标准盘及两队均得分',
      wf_10_1_1000_36: '大小盘及两队均得分',
      wf_10_1_1001_36: '上半场大小盘及两队均得分',
      wf_10_1_1002_36: '下半场大小盘及两队均得分',
      // 进球
      wf_10_1_1000_23: '主队精确进球数',
      wf_10_1_1001_23: '上半场主队精确进球数',
      wf_10_1_1000_24: '客队精确进球数',
      wf_10_1_1001_24: '上半场客队精确进球数',
      // wf_10_1_1000_21: '精确进球数',
      wf_10_1_1001_21: '上半场精确进球数',
      wf_10_1_1002_21: '下半场精确进球数',
      wf_10_1_1000_19: '主队进球大小',
      wf_10_1_1000_20: '客队进球大小',
      wf_10_1_1001_19: '上半主队进球大小',
      wf_10_1_1001_20: '上半客队进球大小',
      wf_10_1_1002_19: '下半主队进球大小',
      wf_10_1_1002_20: '下半客队进球大小',
      wf_10_1_1000_27: '主队进球单双',
      wf_10_1_1000_28: '客队进球单双',
      // 加时赛
      wf_10_1_1003_1: '加时标准盘',
      wf_10_1_1003_16: '加时让球盘',
      wf_10_1_1003_18: '加时大小盘',
      // 点球
      wf_10_1_1006_123: '点球胜负盘',
      wf_10_1_1006_18: '点球大小盘',

      // 滚球
      // 核心玩法
      wf_10_1_2000_1: '标准盘',
      wf_10_1_2000_16: '让球盘',
      wf_10_1_2000_18: '大小盘',
      wf_10_1_2000_26: '单双',

      // 主要玩法
      wf_10_1_2001_1: '上半场标准盘',
      wf_10_1_2002_1: '下半场标准盘',
      wf_10_1_2001_16: '上半场让球',
      wf_10_1_2001_18: '上半场大小',
      wf_10_1_2001_26: '上半场单双',
      wf_10_1_2002_26: '下半场单双',
      wf_10_1_2000_45: '波胆',
      wf_10_1_2000_47: '半全场',
      wf_10_1_2001_45: '上半场波胆',
      wf_10_1_2002_45: '下半场波胆',
      wf_10_1_2000_21: '总进球',
      wf_10_1_2002_16: '下半场让球盘',
      wf_10_1_2002_18: '下半场大小盘',
      wf_10_1_2000_10: '双胜彩',
      wf_10_1_2001_10: '上半场双胜彩',
      wf_10_1_2002_10: '下半场双胜彩',
      wf_10_1_2000_11: '平局退款',
      wf_10_1_2001_11: '上半场平局退款',
      wf_10_1_2002_11: '下半场平局退款',
      wf_10_1_2000_12: '主队平局退款',
      wf_10_1_2000_13: '客队平局退款',
      // 赛果
      wf_10_1_2000_37: '标准盘&大小',
      wf_10_1_2001_37: '上半场标准盘&大小',
      wf_10_1_2002_37: '下半场标准盘&大小',
      wf_10_1_2000_33: '主胜且零封对手',
      wf_10_1_2000_34: '客胜且零封对手',
      wf_10_1_2000_5: '获胜方式',
      wf_10_1_2000_220: '是否出现加时赛',
      wf_10_1_2003_112: '加时赛并发生得分',
      wf_10_1_2000_25: '得分范围',
      wf_10_1_2000_56: '主队在两个半场均得分',
      wf_10_1_2000_57: '客队在两个半场均得分',
      wf_10_1_2000_48: '主队在两个半场均获胜',
      wf_10_1_2000_49: '客队在两个半场均获胜',
      wf_10_1_2000_50: '主队在任意半场均获胜',
      wf_10_1_2000_51: '客队在任意半场均获胜',
      wf_10_1_2000_53: '主队最高得分半场',
      wf_10_1_2000_54: '客队最高得分半场',
      wf_10_1_2000_58: '两个半场均大球',
      wf_10_1_2000_59: '两个半场均小球',
      wf_10_1_2000_122: '是否进入点球决战',
      // wf_10_1_2006_123: '点球决战获胜者',
      // 角球
      wf_10_2_2000_1: '角球标准盘',
      wf_10_2_2001_1: '上半场角球标准盘',
      wf_10_2_2000_16: '角球让分盘',
      wf_10_2_2000_18: '角球数大小',
      wf_10_2_2000_26: '角球数单双',
      wf_10_2_2001_26: '上半场角球数单双',
      wf_10_2_2000_25: '总角球数',
      wf_10_2_2001_25: '上半场总角球数',
      wf_10_2_2000_8: '第一个角球',
      wf_10_2_2001_8: '上半场第一个角球',
      wf_10_2_2000_9: '最后一个角球',
      wf_10_2_2001_9: '上半场最后一个角球',
      wf_10_2_2001_16: '上半场角球让盘',
      wf_10_2_2001_18: '上半场角球大小',

      wf_10_2_2000_19: '主队角球数大小',
      wf_10_2_2001_19: '上半场主队角球数大小',
      wf_10_2_2000_20: '客队角球数大小',
      wf_10_2_2001_20: '上半场客队角球数大小',
      wf_10_2_2000_170: '主队总角球数',
      wf_10_2_2001_170: '上半场主队总角球数',
      wf_10_2_2000_171: '客队总角球数',
      wf_10_2_2001_171: '上半场客队总角球数',
      // 罚牌
      wf_10_3_2000_1: '罚牌标准盘',
      wf_10_3_2001_1: '上半场罚牌标准盘',
      wf_10_3_2000_18: '罚牌数大小',
      wf_10_3_2001_18: '上半场罚牌数大小',
      wf_10_3_2000_8: '最先被罚牌球队',
      wf_10_3_2001_8: '上半场最先被罚牌球队',
      wf_10_3_2000_19: '主队罚牌数大小',
      wf_10_3_2001_19: '上半场主队罚牌数大小',
      wf_10_3_2000_20: '客队罚牌数大小',
      wf_10_3_2001_20: '上半场客队罚牌数大小',
      wf_10_3_2000_23: '主队罚牌数',
      wf_10_3_2001_23: '上半场主队罚牌数',
      wf_10_3_2000_24: '客队罚牌数',
      wf_10_3_2001_24: '上半场客队罚牌数',
      wf_10_3_2000_146: '是否出现红牌',
      wf_10_3_2001_146: '上半场是否出现红牌',
      wf_10_3_2000_147: '主队是否出现红牌',
      wf_10_3_2001_147: '上半场主队是否出现红牌',
      wf_10_3_2000_148: '客队是否出现红牌',
      wf_10_3_2001_148: '上半场客队是否出现红牌',
      // 得分球队
      wf_10_1_2000_8: '率先得分球队',
      wf_10_1_2001_8: '上半场率先得分球队',
      wf_10_1_2002_8: '下半场率先得分球队',
      wf_10_1_2000_9: '最后得分球队',
      wf_10_1_2000_30: '得分球队',
      wf_10_1_2000_29: '两队均得分',
      wf_10_1_2000_52: '半场最高得分',
      wf_10_1_2001_29: '上半场两队均得分',
      wf_10_1_2002_29: '下半场两队均得分',
      wf_10_1_2000_35: '标准盘及两队均得分',
      wf_10_1_2001_35: '上半场标准盘及两队均得分',
      wf_10_1_2002_35: '下半场标准盘及两队均得分',
      wf_10_1_2000_36: '大小盘及两队均得分',
      wf_10_1_2001_36: '上半场大小盘及两队均得分',
      wf_10_1_2002_36: '下半场大小盘及两队均得分',
      // 进球
      wf_10_1_2000_23: '主队精确进球数',
      wf_10_1_2001_23: '上半场主队精确进球数',
      wf_10_1_2000_24: '客队精确进球数',
      wf_10_1_2001_24: '上半场客队精确进球数',
      // wf_10_1_2000_21: '精确进球数',
      wf_10_1_2001_21: '上半场精确进球数',
      wf_10_1_2002_21: '下半场精确进球数',
      wf_10_1_2000_19: '主队进球大小',
      wf_10_1_2000_20: '客队进球大小',
      wf_10_1_2001_19: '上半主队进球大小',
      wf_10_1_2001_20: '上半客队进球大小',
      wf_10_1_2002_19: '下半主队进球大小',
      wf_10_1_2002_20: '下半客队进球大小',
      wf_10_1_2000_27: '主队进球单双',
      wf_10_1_2000_28: '客队进球单双',
      // 加时赛
      wf_10_1_2003_1: '加时标准盘',
      wf_10_1_2003_16: '加时让球盘',
      wf_10_1_2003_18: '加时大小盘',
      // 点球
      wf_10_1_2006_123: '点球胜负盘',
      wf_10_1_2006_18: '点球大小盘',

      // 篮球
      // 早盘
      // 核心玩法
      wf_11_1_0_186: '获胜者',
      wf_11_1_0_16: '全场让分',
      wf_11_1_0_18: '全场大小',
      wf_11_1_0_26: '单双',
      wf_11_1_0_11: '平局退款',
      // 全场玩法
      wf_11_1_0_47: '半全场',
      wf_11_1_0_19: '主队大小分',
      wf_11_1_0_20: '客队大小分',
      // 常规时间
      wf_11_1_0_1: '标准盘',
      wf_11_1_0_220: '是否出现加时赛',


      // 上半场玩法
      wf_11_1_1_186: '上半场胜负盘',
      wf_11_1_1_26: '上半场单双',
      wf_11_1_1_1: '上半场标准盘',
      wf_11_1_1_16: '上半场让分盘',
      wf_11_1_1_18: '上半场大小',
      wf_11_1_1_19: '上半场主队大小盘',
      wf_11_1_1_20: '上半场客队大小盘',

      // 单节玩法
      wf_11_1_51_1: '第一节标准盘',
      wf_11_1_51_16: '第一节让分盘',
      wf_11_1_51_18: '第一节大小盘',
      wf_11_1_51_26: '第一节单双',
      wf_11_1_51_11: '第一节平局退款',
      wf_11_1_52_1: '第二节标准盘',
      wf_11_1_52_16: '第二节让分盘',
      wf_11_1_52_18: '第二节大小盘',
      wf_11_1_52_26: '第二节单双',
      wf_11_1_52_11: '第二节平局退款',
      wf_11_1_53_1: '第三节标准盘',
      wf_11_1_53_16: '第三节让分盘',
      wf_11_1_53_18: '第三节大小盘',
      wf_11_1_53_26: '第三节单双',
      wf_11_1_53_11: '第三节平局退款',
      wf_11_1_54_1: '第四节标准盘',
      wf_11_1_54_16: '第四节让分盘',
      wf_11_1_54_18: '第四节大小盘',
      wf_11_1_54_26: '第四节单双',
      wf_11_1_54_11: '第四节平局退款',
      // 正盘
      // 核心玩法
      wf_11_1_1000_186: '获胜者',
      wf_11_1_1000_16: '全场让分',
      wf_11_1_1000_18: '全场大小',
      wf_11_1_1000_26: '全场单双',
      wf_11_1_1000_11: '平局退款',
      // 全场玩法
      wf_11_1_1000_47: '半全场',
      wf_11_1_1000_19: '主队大小分',
      wf_11_1_1000_20: '客队大小分',
      // 常规时间
      wf_11_1_1000_1: '标准盘',
      wf_11_1_1000_220: '是否出现加时赛',

      // 上半场玩法
      wf_11_1_1001_186: '上半场胜负盘',
      wf_11_1_1001_26: '上半场单双',
      wf_11_1_1001_1: '上半场标准盘',
      wf_11_1_1001_16: '上半场让分',
      wf_11_1_1001_18: '上半场大小',
      wf_11_1_1001_19: '上半场主队大小盘',
      wf_11_1_1001_20: '上半场客队大小盘',
      wf_11_1_1001_11: '上半场平局退款',

      // 单节玩法
      wf_11_1_1051_1: '第一节标准盘',
      wf_11_1_1051_16: '第一节让分',
      wf_11_1_1051_18: '第一节大小',
      wf_11_1_1051_26: '第一节单双',
      wf_11_1_1051_11: '第一节平局退款',
      wf_11_1_1052_1: '第二节标准盘',
      wf_11_1_1052_16: '第二节让分',
      wf_11_1_1052_18: '第二节大小',
      wf_11_1_1052_26: '第二节单双',
      wf_11_1_1052_11: '第二节平局退款',
      wf_11_1_1053_1: '第三节标准盘',
      wf_11_1_1053_16: '第三节让分',
      wf_11_1_1053_18: '第三节大小',
      wf_11_1_1053_26: '第三节单双',
      wf_11_1_1053_11: '第三节平局退款',
      wf_11_1_1054_1: '第四节标准盘',
      wf_11_1_1054_16: '第四节让分',
      wf_11_1_1054_18: '第四节大小',
      wf_11_1_1054_26: '第四节单双',
      wf_11_1_1054_11: '第四节平局退款',

      // 滚球
      // 核心玩法
      wf_11_1_2000_186: '获胜者',
      wf_11_1_2000_16: '全场让分',
      wf_11_1_2000_18: '全场大小',
      wf_11_1_2000_26: '单双',
      wf_11_1_2000_11: '平局退款',
      // 全场玩法
      wf_11_1_2000_47: '半全场',
      wf_11_1_2000_19: '主队大小分',
      wf_11_1_2000_20: '客队大小分',
      // 常规时间
      wf_11_1_2000_1: '标准盘',
      wf_11_1_2000_220: '是否出现加时赛',

      // 上半场玩法
      wf_11_1_2001_186: '上半场胜负盘',
      wf_11_1_2001_26: '上半场单双',
      wf_11_1_2001_1: '上半场标准盘',
      wf_11_1_2001_18: '上半场大小',
      wf_11_1_2001_16: '上半场让分盘',
      wf_11_1_2001_19: '上半场主队大小盘',
      wf_11_1_2001_20: '上半场客队大小盘',

      // 单节玩法
      wf_11_1_2051_1: '第一节标准盘',
      wf_11_1_2051_16: '第一节让分盘',
      wf_11_1_2051_18: '第一节大小盘',
      wf_11_1_2051_26: '第一节单双',
      wf_11_1_2051_11: '第一节平局退款',
      wf_11_1_2052_1: '第二节标准盘',
      wf_11_1_2052_16: '第二节让分盘',
      wf_11_1_2052_18: '第二节大小盘',
      wf_11_1_2052_26: '第二节单双',
      wf_11_1_2052_11: '第二节平局退款',
      wf_11_1_2053_1: '第三节标准盘',
      wf_11_1_2053_16: '第三节让分盘',
      wf_11_1_2053_18: '第三节大小盘',
      wf_11_1_2053_26: '第三节单双',
      wf_11_1_2053_11: '第三节平局退款',
      wf_11_1_2054_1: '第四节标准盘',
      wf_11_1_2054_16: '第四节让分盘',
      wf_11_1_2054_18: '第四节大小盘',
      wf_11_1_2054_26: '第四节单双',
      wf_11_1_2054_11: '第四节平局退款',

      // 网球
      // 早盘
      // 核心玩法
      wf_12_1_0_186: '比赛获胜',
      wf_12_1_0_16: '局数让分',
      wf_12_1_0_18: '总局数',
      wf_12_1_0_26: '局数单双',
      wf_12_1_0_196: '总盘数',
      // wf_12_1_0_  让局
      // wf_12_1_0_总局数
      // wf_12_1_0_局数单双
      // 全场玩法
      // 盘波胆(3局2胜)
      // wf_12_1_0_21: '盘波胆（5盘3胜）',
      wf_12_1_0_45: '比赛得分',
      // wf_12_1_0_总盘数(3盘2胜)

      wf_12_1_0_21: '总盘数(5局3胜)',
      wf_12_1_0_195: '是否出现抢七',
      // 单局玩法
      wf_12_1_51_16: '第1盘局数让分',
      wf_12_1_52_16: '第2盘局数让分',
      wf_12_1_53_16: '第3盘局数让分',
      wf_12_1_54_16: '第4盘局数让分',
      wf_12_1_55_16: '第5盘局数让分',

      wf_12_1_51_18: '第1盘总局数',
      wf_12_1_52_18: '第2盘总局数',
      wf_12_1_53_18: '第3盘总局数',
      wf_12_1_54_18: '第4盘总局数',
      wf_12_1_55_18: '第5盘总局数',


      wf_12_1_51_26: '第1盘局数单双',
      wf_12_1_52_26: '第2盘局数单双',
      wf_12_1_53_26: '第3盘局数单双',
      wf_12_1_54_26: '第4盘局数单双',
      wf_12_1_55_26: '第5盘局数单双',

      wf_12_1_51_202: '第1盘获胜者',
      wf_12_1_52_202: '第2盘获胜者',
      wf_12_1_53_202: '第3盘获胜者',
      wf_12_1_54_202: '第4盘获胜者',
      wf_12_1_55_202: '第5盘获胜者',

      wf_12_1_51_45: '第1盘比赛得分(波胆)',
      wf_12_1_52_45: '第2盘比赛得分(波胆)',
      wf_12_1_53_45: '第3盘比赛得分(波胆)',
      wf_12_1_54_45: '第4盘比赛得分(波胆)',
      wf_12_1_55_45: '第5盘比赛得分(波胆)',

      wf_12_1_51_195: '第1盘是否出现抢七',
      wf_12_1_52_195: '第2盘是否出现抢七',
      wf_12_1_53_195: '第3盘是否出现抢七',
      wf_12_1_54_195: '第4盘是否出现抢七',
      wf_12_1_55_195: '第5盘是否出现抢七',

      wf_12_1_51_21: '第一盘局波胆',
      // wf_12_1_51_ 第一盘让局胜负

      // 正盘
      // 核心玩法
      wf_12_1_1000_186: '比赛获胜',
      wf_12_1_1000_16: '局数让分',
      wf_12_1_1000_18: '总局数',
      wf_12_1_1000_26: '局数单双',
      wf_12_1_1000_196: '总盘数',
      // wf_12_1_0_  让局
      // wf_12_1_0_总局数
      // wf_12_1_0_局数单双
      // 全场玩法
      // 盘波胆(3局2胜)
      // wf_12_1_1000_21: '盘波胆（5盘3胜）',
      wf_12_1_1000_45: '比赛得分',
      // wf_12_1_0_总盘数(3盘2胜)

      wf_12_1_1000_21: '总盘数(5局3胜)',
      wf_12_1_1000_195: '是否出现抢七',
      // 单局玩法
      wf_12_1_1051_16: '第1盘局数让分',
      wf_12_1_1052_16: '第2盘局数让分',
      wf_12_1_1053_16: '第3盘局数让分',
      wf_12_1_1054_16: '第4盘局数让分',
      wf_12_1_1055_16: '第5盘局数让分',

      wf_12_1_1051_18: '第1盘总局数',
      wf_12_1_1052_18: '第2盘总局数',
      wf_12_1_1053_18: '第3盘总局数',
      wf_12_1_1054_18: '第4盘总局数',
      wf_12_1_1055_18: '第5盘总局数',

      wf_12_1_1051_26: '第1盘局数单双',
      wf_12_1_1052_26: '第2盘局数单双',
      wf_12_1_1053_26: '第3盘局数单双',
      wf_12_1_1054_26: '第4盘局数单双',
      wf_12_1_1055_26: '第5盘局数单双',

      wf_12_1_1051_202: '第1盘获胜者',
      wf_12_1_1052_202: '第2盘获胜者',
      wf_12_1_1053_202: '第3盘获胜者',
      wf_12_1_1054_202: '第4盘获胜者',
      wf_12_1_1055_202: '第5盘获胜者',

      wf_12_1_1051_45: '第1盘比赛得分(波胆)',
      wf_12_1_1052_45: '第2盘比赛得分(波胆)',
      wf_12_1_1053_45: '第3盘比赛得分(波胆)',
      wf_12_1_1054_45: '第4盘比赛得分(波胆)',
      wf_12_1_1055_45: '第5盘比赛得分(波胆)',

      wf_12_1_1051_195: '第1盘是否出现抢七',
      wf_12_1_1052_195: '第2盘是否出现抢七',
      wf_12_1_1053_195: '第3盘是否出现抢七',
      wf_12_1_1054_195: '第4盘是否出现抢七',
      wf_12_1_1055_195: '第5盘是否出现抢七',


      wf_12_1_1051_21: '第一盘局波胆',
      // wf_12_1_51_ 第一盘让局胜负

      // 滚球
      // 核心玩法
      wf_12_1_2000_186: '比赛获胜',
      wf_12_1_2000_16: '局数让分',
      wf_12_1_2000_18: '总局数',
      wf_12_1_2000_26: '局数单双',
      wf_12_1_2000_196: '总盘数',
      // wf_12_1_0_  让局
      // wf_12_1_0_总局数
      // wf_12_1_0_局数单双
      // 全场玩法
      // 盘波胆(3局2胜)
      wf_12_1_2000_45: '比赛得分',
      // wf_12_1_0_总盘数(3盘2胜)

      wf_12_1_2000_21: '总盘数(5局3胜)',
      wf_12_1_2000_195: '是否出现抢七',
      // 单局玩法
      wf_12_1_2051_16: '第1盘局数让分',
      wf_12_1_2052_16: '第2盘局数让分',
      wf_12_1_2053_16: '第3盘局数让分',
      wf_12_1_2054_16: '第4盘局数让分',
      wf_12_1_2055_16: '第5盘局数让分',

      wf_12_1_2051_18: '第1盘总局数',
      wf_12_1_2052_18: '第2盘总局数',
      wf_12_1_2053_18: '第3盘总局数',
      wf_12_1_2054_18: '第4盘总局数',
      wf_12_1_2055_18: '第5盘总局数',

      wf_12_1_2051_26: '第1盘局数单双',
      wf_12_1_2052_26: '第2盘局数单双',
      wf_12_1_2053_26: '第3盘局数单双',
      wf_12_1_2054_26: '第4盘局数单双',
      wf_12_1_2055_26: '第5盘局数单双',

      wf_12_1_2051_202: '第1盘获胜者',
      wf_12_1_2052_202: '第2盘获胜者',
      wf_12_1_2053_202: '第3盘获胜者',
      wf_12_1_2054_202: '第4盘获胜者',
      wf_12_1_2055_202: '第5盘获胜者',

      wf_12_1_2051_45: '第1盘比赛得分(波胆)',
      wf_12_1_2052_45: '第2盘比赛得分(波胆)',
      wf_12_1_2053_45: '第3盘比赛得分(波胆)',
      wf_12_1_2054_45: '第4盘比赛得分(波胆)',
      wf_12_1_2055_45: '第5盘比赛得分(波胆)',

      wf_12_1_2051_195: '第1盘是否出现抢七',
      wf_12_1_2052_195: '第2盘是否出现抢七',
      wf_12_1_2053_195: '第3盘是否出现抢七',
      wf_12_1_2054_195: '第4盘是否出现抢七',
      wf_12_1_2055_195: '第5盘是否出现抢七',

      wf_12_1_2051_21: '第1盘局波胆',
    },
  },
  page1: {
    title: {
      home: '体育投注',
      hotleague: '热门联赛',
    },
    tab: {
      home: '首页',
      order: '投注单',
    },
    menu: {
      search: '搜索',
      deposit: '充值',
      history: '投注记录',
      setting: '设置',
    },
    hot: '热门',
    detailtab: {
      all: '所有盘口',
      data: '比赛数据',
    },
    btbar: {
      name: '投注单',
      countbefore: '已添加',
      countafter: '注',
    },
  },
  page2: {
    history: {
      list: '投注记录',
      detail: '投注详情',
      alert: '暂无匹配的投注记录',
      year: '年',
      amt: '投注额：',
      vamt: '有效投注额：',
      noacc: '未结算',
      start: '开始日期',
      end: '结束日期',
      til: '至',
      tPrincipal: '总本金',
      odds: '赔率',
      countafter: '注',
    },
    bet: {
      betMoney: '投注金额',
      alert_1: '赔率已上升',
      alert_2: '赔率已下降',
      alert_3: '盘口已暂停',
      alert_4: '盘口已关闭',
      betRange: '下注限额：',
      toastValid: '请输入有效投注金额',
      toastFail: '投注失败',
      win0: '和',
      win50: '赢半',
      win75: '盈',
      win100: '赢',
      lose0: '平',
      lose50: '输半',
      lose100: '亏',
      admiss: '受理中',
      settle: '未结算',
      cancel: '取消',
      sinBet: '单式投注',
      mulBet: '串关投注',
      rtnMoney: '退还本金',
      highRtn: '最高返还',
      winLose: '盈亏金额',
      balance: '余额：',
      maxWin: '可赢额：',
      betSlips: '投注单',
      myBet: '我的注单',
      single: '单式',
      multiple: '串关',
      setNo: '未结算',
      setYes: '已结算',
      setCan: '已取消',
      noItem: '暂无投注项',
      noTicket: '暂无投注单',
      betItem: '投注选项',
      betSlip: '投注单',
      clearAll: '全部清除',
      sameAlert: '所选红色项目中有关类似选项不能组合串关',
      total: '共',
      count: '注',
      betProc: '投注受理中',
      betSucc: '投注成功',
      betFail: '投注失败',
      betId: '订单号：',
      close: '关闭',
    },
  },
};
