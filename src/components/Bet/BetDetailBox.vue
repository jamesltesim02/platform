<template>
  <div class="nb-bet-detail-box">
    <div class="title">
      <span class="name">{{data.title}}</span>
      <span class="time">{{data.time}}</span>
    </div>
    <div class="bet-detail-body" :style="oStyle" @touchstart="flgOptHt" @touchend="chgOptHt">
      <bet-detail-body v-for="(v, k) in data.opts" :key="k" :data="v" :flag="flag" />
    </div>
    <div v-if="/(单|單|sin)/i.test(data.title)" class="foot-single">
      <bet-detail-foot :data="data.bets[0]" />
    </div>
    <div v-else class="foot-multip">
      <div v-for="(v, i) in data.bets" :key="i">
        <bet-detail-mult :data="v" :opts="data.opts" />
        <bet-detail-foot :data="v" />
      </div>
    </div>
  </div>
</template>

<script>
import BetDetailFoot from './BetDetailFoot.vue';
import BetDetailBody from './BetDetailBody.vue';
import BetDetailMult from './BetDetailMult.vue';

export default {
  inheritAttrs: false,
  name: 'BetDetailBox',
  data() {
    return {
      t: { max: 300, st: 0, timer: null },
      flag: false,
      bArr: [],
      oStyle: { height: '1.14rem' },
    };
  },
  props: {
    data: Object,
  },
  components: {
    BetDetailFoot,
    BetDetailBody,
    BetDetailMult,
  },
  methods: {
    flgOptHt() {
      this.t.st = Date.now();
    },
    chgOptHt(event) {
      const cName = typeof event.target.className === 'object' ? event.target.className.baseVal : event.target.className;
      if (Date.now() - this.t.st > this.t.max || /close/i.test(cName)) return;
      if (this.data.opts.length > 1) {
        clearInterval(this.t.timer);
        const [min, max] = [1.34, 1.14 * this.data.opts.length];
        let [step, ht] = [max - min, parseFloat(this.oStyle.height, 10)];
        step /= 20;
        if (ht === 1.34) {
          this.flag = true;
          this.t.timer = setInterval(() => {
            ht += step;
            if (Math.abs(ht - max) < 0.02) {
              ht = max;
              clearInterval(this.t.timer);
            }
            this.oStyle.height = `${ht}rem`;
          }, 10);
        } else {
          this.t.timer = setInterval(() => {
            ht -= step;
            if (Math.abs(ht - min) < 0.02) {
              [ht, this.flag] = [min, false];
              clearInterval(this.t.timer);
            }
            this.oStyle.height = `${ht}rem`;
          }, 10);
        }
      }
    },
  },
  mounted() {
    setTimeout(() => {
      const ht = this.data.opts.length > 1 ? 1.34 : 1.14;
      this.oStyle.height = `${ht}rem`;
    }, 10);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.nb-bet-detail-box {
  width: 3.55rem;
  margin: .1rem auto 0;
  background-image: linear-gradient(-90deg, #FFFFFF 0%, #F1F1F1 98%);
  box-shadow: 0 .02rem .12rem 0 rgba(0,0,0,0.10);
  border-radius: .1rem;
  .title {
    width: 100%;
    height: .32rem;
    padding: 0 .15rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .name {
      font-size: .13rem;
      color: #333;
      font-family: PingFangSC-Regular;
    }
    .time {
      font-size: .13rem;
      color: #666;
      font-family: PingFangSC-Regular;
    }
  }
  .bet-detail-body {
    width: 100%;
    overflow: hidden;
  }
}
</style>

