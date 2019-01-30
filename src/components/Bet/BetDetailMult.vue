<template>
  <div class="nb-bet-detail-mult" @touchstart="flgBetHt" @touchend="chgBetHt">
    <div class="foot-mult-title">
      <span class="foot-mult-name">
        {{getMultName(data.num)}}
        <span class="foot-mult-count">{{data.cnt}} {{$t('page2.history.countafter')}}</span>
      </span>
      <span :class="data.class">{{data.winStu}}</span>
    </div>
    <div class="foot-mult-body" :style="bStyle">
      <div class="foot-mult-item" v-for="(v, k) in bArr" :key="k">
        <span class="foot-mult-item-name">{{v.oids.join('/')}}</span>
        <span v-if="v.win > 0" class="foot-mult-item-win">+{{v.win}}</span>
        <span v-else-if="v.win < 0" class="foot-mult-item-lose">{{v.win}}</span>
        <span v-else class="foot-mult-item-other">{{$t('page2.history.noacc')}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getMultBetList } from '@/api/bet';
import { toSerList } from '@/utils/betUtils';

export default {
  inheritAttrs: false,
  name: 'BetDetailMult',
  data() {
    return {
      t: { max: 300, st: 0, timer: null },
      bArr: [],
      bStyle: { height: '0rem', 'border-top': 'none' },
    };
  },
  props: {
    data: Object,
    opts: Array,
  },
  methods: {
    repOids(arr = []) {
      let arrStr = JSON.stringify(arr);
      for (let i = 0; i < this.opts.length; i += 1) {
        arrStr = arrStr.replace(new RegExp(`([\\[,])${this.opts[i].oid}([,\\]])`, 'g'), `$1${i + 1}$2`);
      }
      arrStr = JSON.parse(arrStr);
      for (let i = 0; i < arrStr.length; i += 1) {
        arrStr[i].win = arrStr[i].win || 0;
      }
      return arrStr;
    },
    getMultName(num) {
      const lan = this.$t('page2.bet.betMoney');
      const nunStr = !/[a-z]+/i.test(lan) ? '一二三四五六七八九十' : '';
      if (nunStr && num < 11) {
        return `${'一二三四五六七八九十'.substr(num - 1, 1)}串一`;
      }
      return nunStr ? `${num}串一` : `${num} Folds`;
    },
    flgBetHt() {
      this.t.st = Date.now();
    },
    async chgBetHt() {
      if (Date.now() - this.t.st > this.t.max) return;
      clearInterval(this.t.timer);
      let ht = parseFloat(this.bStyle.height, 10);
      if (ht > 0) {
        const step = ht / 20;
        this.t.timer = setInterval(() => {
          ht -= step;
          if (Math.abs(ht) < 0.02) {
            ht = 0;
            this.bStyle['border-top'] = 'none';
            clearInterval(this.t.timer);
          }
          this.bStyle.height = `${ht}rem`;
        }, 10);
      } else {
        [ht, this.bStyle.height] = [0, '0rem'];
        const bOpts = JSON.parse(JSON.stringify(this.opts));
        let [flag, data] = [false, []];
        for (let i = 0; i < bOpts.length; i += 1) {
          if (!bOpts[i].mid || !bOpts[i].ods) {
            flag = true;
            break;
          }
          if (!bOpts[i].res) {
            [bOpts[i].odds, bOpts[i].flag] = [0, 1];
          } else if (/^(-50|-100)$/.test(bOpts[i].res)) {
            bOpts[i].odds = /5/.test(bOpts[i].res) ? 0.5 : 0;
          } else if (/^(50|100)$/.test(bOpts[i].res)) {
            const pt = bOpts[i].ods * (/5/.test(bOpts[i].res) ? 0.5 : 1);
            bOpts[i].odds = pt + 1;
          } else {
            bOpts[i].odds = 1;
          }
        }
        if (flag) {
          data = await getMultBetList({ tid: this.data.tid });
        } else {
          const amt = this.data.tamt && this.data.cnt ? this.data.tamt / this.data.cnt : 0;
          data = toSerList(bOpts, this.data.num, this.data.amt || amt);
        }
        this.bArr = data && data.length ? this.repOids(data) : [];
        if (!this.bArr.length) return;
        const max = this.bArr.length * 0.3;
        this.bStyle['border-top'] = '.01rem solid #ddd';
        const step = max / 20;
        this.t.timer = setInterval(() => {
          ht += step;
          if (Math.abs(ht - max) < 0.02) {
            ht = max;
            clearInterval(this.t.timer);
          }
          this.bStyle.height = `${ht}rem`;
        }, 10);
      }
    },
  },
  mounted() {
    this.bStyle = { height: '0rem', 'border-top': 'none' };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.nb-bet-detail-mult {
  width: 100%;
  .foot-mult-title {
    width: 100%;
    height: .4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 .15rem;
    border-top: .01rem solid #ddd;
    .foot-mult-name {
      font-family: PingFangSC-Medium;
      font-size: .17rem;
      color: #333;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .foot-mult-count {
      margin-left: .15rem;
      font-family: PingFangSC-Regular;
      font-size: .12rem;
      color: #FF4A4A;
    }
    .bet-detail-win, .bet-detail-lose, .bet-detail-other {
      display: flex;
      justify-content: center;
      align-items: center;
      height: .2rem;
    }
    .bet-detail-win, .bet-detail-lose {
      width: .2rem;
      color: #fff;
      font-size: .12rem;
      border-radius: 100%;
    }
    .bet-detail-win {
      background: #FF4A4A;
    }
    .bet-detail-lose {
      background: #7CCD5D;
    }
    .bet-detail-other {
      font-size: .13rem;
      color: #999;
      padding-right: .04rem;
    }
  }
  .foot-mult-body {
    width: 100%;
    overflow: hidden;
    .foot-mult-item {
      width: 100%;
      height: .3rem;
      padding: 0 .15rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: .01rem solid #f1f1f1;
      .foot-mult-item-name {
        font-family: PingFangSC-Regular;
        font-size: .13rem;
        color: #666;
      }
      .foot-mult-item-win {
        font-family: PingFangSC-Regular;
        font-size: .13rem;
        color: #FF4A4A;
      }
      .foot-mult-item-lose {
        font-family: PingFangSC-Regular;
        font-size: .13rem;
        color: #7CCD5D;
      }
      .foot-mult-item-other {
        font-family: PingFangSC-Regular;
        padding-right: .05rem;
        font-size: .12rem;
        color: #999;
      }
    }
    .foot-mult-item:last-child {
      border: none;
    }

  }
}
</style>

