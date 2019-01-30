<template>
<div class="betting-count-bar" v-bind="attrs" @touchstart="startFun" @touchend="endFun">
  <div class="betting-count-icon">
    <icon-tab-order class="icon icon-order" />
    <span class="bet-text">{{$t('page1.btbar.name')}}</span>
  </div>
  <div class="count-content">
    <span class="bet-text">{{$t('page1.btbar.countbefore')}}</span>
    <bet-count class="bet-count" show />
    <span class="bet-text">{{$t('page1.btbar.countafter')}}</span>
  </div>
  <button class="expand-button">
    <icon-arrow direction="up" class="icon icon-expand" />
  </button>
</div>
</template>
<script>
import { mapMutations } from 'vuex';
import IconTabOrder from '@/components/common/icons/IconTabOrder';
import IconArrow from '@/components/common/icons/IconArrow';
import BetCount from './BetCount';

export default {
  data() {
    return {
      t: { max: 300, st: 0, timer: null },
    };
  },
  computed: {
    betPct() {
      return this.$store.state.bet ? `${this.$store.state.bet.betPerct || 1}` : 1;
    },
    attrs() {
      return Object.assign({}, this.$attrs, {
        style: { transform: `scaleY(${this.betPct})`, 'transform-origin': '50% 100% 0' },
      });
    },
  },
  components: {
    IconTabOrder,
    IconArrow,
    BetCount,
  },
  methods: {
    ...mapMutations([
      'clickBetItem',
    ]),
    startFun() {
      this.t.st = Date.now();
    },
    endFun() {
      if (Date.now() - this.t.st > this.t.max) return;
      this.clickBetItem();
    },
  },
};
</script>
<style lang="less">
.betting-count-bar {
  background: #27282D;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);
  height: .52rem;
  display: flex;
  padding-left: .15rem;
  font-size: .15rem;
  font-family: PingFangSC-Regular;
  .bet-text, .bet-count {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .betting-count-icon {
    width: 1rem;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .icon-order {
      margin-right: .06rem;
      margin-top: -.05rem;
    }
  }
  .count-content {
    width: 70%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .bet-count {
      font-size: .2rem;
      color: #53B6FF;
      padding: 0 .1rem;
    }
  }
  .expand-button {
    width: .46rem;
    height: 100%;
    padding: .15rem;
    svg {
      transform: rotate(-270deg) translateX(.03rem);
    }
  }
}
</style>
