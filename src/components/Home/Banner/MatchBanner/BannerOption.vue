<template>
  <v-touch
    tag="li"
    @tap="toggleBet"
    :class="{active: checked}"
  >
    {{option.odds | oddsFormat(option.gameType)}}
    <bet-item
      ref="betControl"
      v-model="checked"
      :oid="option.optionID"
      class="bet-item-placeholder"
    />
  </v-touch>
</template>
<script>
import BetItem from '@/components/Bet/BetItem';

export default {
  props: ['option', 'mid', 'match'],
  data() {
    return {
      checked: false,
    };
  },
  components: {
    BetItem,
  },
  methods: {
    toggleBet() {
      // status 小于7的不能投注
      if (!this.checked && this.option.betStatus < 7) {
        return;
      }
      this.$refs.betControl.bet({
        // sportID banner只有足球10
        sno: this.option.sportID,
        // 比赛id
        mid: this.mid,
        // 投注id
        oid: this.option.optionID,
        // 香港盘赔率
        ods: this.option.odds,
        // 联赛名称
        tn: this.match.tournamentName,
        // 比赛名称
        mn: `${this.match.competitor1Name} VS ${this.match.competitor2Name}`,
        // TODO 暂无   比分
        msc: this.match.matchScore,
        // gameType 玩法类型，1：标准盘，186：胜负
        gmt: this.option.gameType,
        // groupType group type, 1：比分玩法，2：角球玩法，3：罚分玩法，4：优胜冠军
        gpt: this.option.groupType,
        // 玩法值
        bar: this.option.betBar,
        // 投注项值
        opt: this.option.betOption,
        // 比赛阶段
        stg: this.option.betStage,
      });
    },
  },
};
</script>

