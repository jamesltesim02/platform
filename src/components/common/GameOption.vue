<template>
  <v-touch
    v-if="option"
    :id="`opt_${option.optionID}`"
    class="game-option"
    :class="{
      horizontal: direction === 'column',
      active: checked,
      'odds-upper': option.oddsUpper,
      'odds-lower': option.oddsLower,
      disabled: option.betStatus <= 6,
    }"
    @tap="toggleBet"
  >
    <option-name
      v-if="option.betOption"
      class="ovalue"
      :game-type="game.gameType"
      :bet-bar="option.betBar"
      :bet-option="option.betOption"
    />
    <div class="odds">{{option.odds | oddsFormat(game.gameType)}}</div>
    <bet-item
      ref="betControl"
      v-model="checked"
      :oid="option.optionID"
      class="bet-item-placeholder"
    />
  </v-touch>
  <div v-else class="game-option"/>
</template>
<script>
import OptionName from '@/components/common/OptionName';
import BetItem from '@/components/Bet/BetItem';

export default {
  props: {
    option: {},
    game: {},
    match: {},
    direction: {
      default: 'row',
    },
  },
  data() {
    return {
      checked: false,
    };
  },
  components: {
    OptionName,
    BetItem,
  },
  methods: {
    toggleBet() {
      // status 小于7的不能投注
      if (!this.checked && this.option.betStatus < 7) {
        return;
      }
      this.$refs.betControl.bet({
        // sportID
        sno: this.game.sportID,
        // 比赛id
        mid: this.match.matchID,
        // 投注id
        oid: this.option.optionID,
        // 香港盘赔率
        ods: this.option.odds,
        // 联赛名称
        tn: this.match.tournamentName,
        // 比赛名称
        mn: `${this.match.competitor1Name} VS ${this.match.competitor2Name}`,
        // TODO 暂无   比分
        msc: '0:0',
        // gameType 玩法类型，1：标准盘，186：胜负
        gmt: this.game.gameType,
        // groupType group type, 1：比分玩法，2：角球玩法，3：罚分玩法，4：优胜冠军
        gpt: this.game.groupType,
        // 玩法值
        bar: this.option.betBar,
        // 投注项值
        opt: this.option.betOption,
        // 比赛阶段
        stg: this.game.betStage,
      });
    },
  },
};
</script>
<style lang="less">
.game-option {
  position: relative;
  display: flex;
  flex-direction: column;
  transition: background-color @actionTransitionDuration;
  &.horizontal {
    flex-direction: row;
    div, .ovalue{
      width: 100%;
    }
    .odds {
      text-align: right;
    }
  }
  .ovalue {
    color: @page1Font2;
    line-height: .17rem;
    font-size: .12rem;
  }
  .odds {
    color: @page1FontH1;
    font-weight: bolder;
    line-height: .16rem;
    font-size: .14rem;
  }
  &.active {
    background: @page1BetedItemBackground;
    .ovalue, .odds {
      color: #fff;
    }
  }
  &.disabled .odds{
    color: @page1Font2;
  }
  &.odds-upper::before,
  &.odds-upper::after,
  &.odds-lower::before,
  &.odds-lower::after {
    position: absolute;
    content: "";
    display: block;
    width: .08rem;
    height: .08rem;
    right: 0;
    animation: blink 1s linear infinite;
  }
  &.odds-upper::before {
    top: 0;
    background: linear-gradient(-135deg, #FF4A4A 50%, transparent 55%);
  }
  &.odds-lower::after {
    bottom: 0;
    background: linear-gradient(-45deg, #7CCD5D 50%, transparent 55%);
  }

  .bet-item-placeholder {
    display: none;
  }
}
</style>
