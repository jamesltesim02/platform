<template>
  <div class="nb-bet-detail-foot">
    <div class="detail-foot-item">
      <span class="foot-item-up">{{$t('page2.history.tPrincipal')}}</span>
      <span class="foot-item-down">{{amtCnt}}</span>
    </div>
    <div class="detail-foot-item">
      <span class="foot-item-up">{{$t('page2.history.odds')}}</span>
      <span class="foot-item-down">{{odvCnt}}</span>
    </div>
    <div class="detail-foot-item">
      <span class="foot-item-up">{{data.status}}</span>
      <span class="foot-item-down">{{rtnNum}}</span>
    </div>
  </div>
</template>

<script>
import { getNBit } from '@/utils/betUtils';

export default {
  inheritAttrs: false,
  name: 'BetDetailFoot',
  props: {
    data: Object,
  },
  computed: {
    amtCnt() {
      return getNBit(this.data.tamt || this.data.amt, 2);
    },
    odvCnt() {
      return getNBit(this.data.odv, 3);
    },
    rtnNum() {
      if (/(最|高|hig|max)/i.test(this.data.status)) {
        return getNBit(this.data.mxp, 2);
      } else if (/(盈|亏|虧|profit|loss|win)/i.test(this.data.status)) {
        return getNBit(this.data.win, 2);
      }
      return getNBit(this.data.tamt || this.data.amt, 2);
    },
  },
  mounted() {
    if (this.$listeners.click) {
      this.fun = typeof this.$listeners.click === 'function' ? this.$listeners.click : null;
      delete this.$listeners.click;
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.nb-bet-detail-foot {
  width: 100%;
  height: .62rem;
  border-top: .01rem solid #ddd;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .detail-foot-item {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-right: .01rem solid #ddd;
    .foot-item-up ,.foot-item-down {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .foot-item-up {
      height: 35%;
      font-size: .13rem;
      color: #666;
    }
    .foot-item-down {
      height: 40%;
      font-size: .17rem;
      color: #333;
    }
  }
  .detail-foot-item:last-child {
    border-right: none;
  }
}
</style>

