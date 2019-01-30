<template>
  <div class="nb-input-box-keyboard">
    <div class="nb-keyboard-input-box">
      <div class="input-box-item" v-for="(v, k) in bets" :key="k" v-if="v.nm > 1">
        <div class="input-box-item-box" @touchstart.stop="sFun" @touchend.stop="eFun(k)">
          <span class="input-box-item-title">{{getMultName(v.nm)}}</span>
          <div class="input-box-item-body">
            <span class="input-box-item-count">
              {{`${$t('page2.bet.total')}${v.mct}${$t('page2.bet.count')}`}}
            </span>
            <like-input :data.sync="v" type="mbet" @focus="focusFun(v.nm)"></like-input>
          </div>
        </div>
        <bet-box-toggle :data.sync="v" :opts="data" />
      </div>
    </div>
    <div class="bet-body-key" v-if="bets && bets.length > 1 && bets.find(v => !v.hide)">
      <keyboard :data.sync="bets[select]" :max="`${betKeyMax}`" type="bet" @change="changeFun" @submit="submitFun" />
    </div>
    <div class="bet-body-text">
      <div class="bet-body-text-item">
        <span class="bet-body-text-item-key">{{$t('page2.bet.balance')}}</span>
        <span class="bet-body-text-item-val">{{getThisBit(balLeft, 2)}}</span>
      </div>
      <div class="bet-body-text-item">
        <span class="bet-body-text-item-key">{{$t('page2.bet.maxWin')}}</span>
        <span class="bet-body-text-item-val">{{getThisBit(maxRtn, 2)}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { postDoBetList } from '@/api/bet';
import { makeBetParam, getNBit, toSeries, changeBalance } from '@/utils/betUtils';
import LikeInput from '@/components/common/LikeInput.vue';
import Keyboard from '@/components/common/Keyboard/index.vue';
import BetBoxToggle from './BetBoxToggle';

export default {
  inheritAttrs: false,
  name: 'BetBoxKeyboard',
  data() {
    return {
      betMin: 0,
      betMax: 0,
      betKeyMax: 0,
      betVal: 0,
      balLeft: 0,
      maxRtn: 0,
      select: 0,
      data: [],
      bets: [],
      series: [],
      maxArr: [],
      t: { max: 300, st: 0, timer: null },
    };
  },
  props: {
    user: Object,
  },
  components: {
    LikeInput,
    Keyboard,
    BetBoxToggle,
  },
  computed: {
    ...mapState({
      settings: state => state.setting,
      betList: state => state.bet.betList,
      betSlip: state => state.bet.betSlip,
    }),
    balance() {
      return this.user && this.user.balance ? this.user.balance : 0;
    },
  },
  watch: {
    betList() {
      this.toSeriesFun();
    },
  },
  methods: {
    ...mapMutations([
      'clearBetItem',
      'saveBetOption',
    ]),
    sFun() {
      this.t.st = Date.now();
    },
    eFun(k) {
      if (Date.now() - this.t.st > this.t.max) return;
      const dt = this.bets[k];
      dt.toggle = !dt.toggle;
      this.$set(this.bets, k, dt);
    },
    getThisBit(num, n) {
      return getNBit(num, n);
    },
    getMultName(num) {
      const lan = this.$t('page2.bet.betMoney');
      const nunStr = !/[a-z]+/i.test(lan) ? '一二三四五六七八九十' : '';
      if (nunStr && num < 11) {
        return `${'一二三四五六七八九十'.substr(num - 1, 1)}串一`;
      }
      return nunStr ? `${num}串一` : `${num} Folds`;
    },
    getMaxArr() {
      const [rtnObjArr, rtnCalArr] = [new Array(101).join('0').split(''), []];
      if (this.user && this.user.rtn) {
        Object.entries(this.user.rtn).forEach(([k, v]) => {
          const kArr = k.match(/[a-z]*(\d+)[a-z]*/i);
          const num = kArr ? +kArr[1] : 0;
          rtnObjArr[num] = num ? v : 0;
        });
      }
      for (let i = 0; i < rtnObjArr.length; i += 1) {
        rtnCalArr[i] = i && /^0$/.test(rtnObjArr[i]) ? +rtnObjArr[i - 1] : +rtnObjArr[i];
      }
      return rtnCalArr;
    },
    toSeriesFun() {
      const dt = [];
      for (let i = 0; i < this.betList.length; i += 1) {
        const obj = this.betList[i];
        obj.odds = obj.ods ? obj.ods + 1 : 1;
        dt.push(obj);
      }
      this.data = dt.filter(v => /^7$/.test(v.sts));
      [this.series, this.bets] = [toSeries(this.data), []];
      for (let i = 0; i < this.series.length; i += 1) {
        this.bets.push({
          value: '',
          placeholder: this.$t('page2.bet.betMoney'),
          click: true,
          hide: true,
          nm: this.series[i].nm,
          mct: this.series[i].mct,
          odds: this.series[i].odds,
          toggle: false,
          style: {
            'border-top': '0.01rem solid #ddd',
            'border-bottom': i < this.series.length - 1 ? '0.01rem solid #ddd' : 'none',
          },
        });
      }
    },
    focusFun(idx) {
      this.changeFun();
      let [id, betLeft] = [0, this.balLeft];
      for (let i = 0; i < this.bets.length; i += 1) {
        this.bets[i].hide = this.bets[i].nm !== idx;
        id = this.bets[i].nm === idx ? i : id;
      }
      const val = +(this.bets[id].value || 0);
      betLeft += val * this.bets[id].mct;
      betLeft = betLeft > this.betMax ? this.betMax : betLeft;
      betLeft = this.bets[id].mct ? betLeft / this.bets[id].mct : betLeft;
      [this.select, this.betKeyMax] = [id, Math.floor(betLeft)];
    },
    changeFun() {
      let [betValue, betReturn] = [0, 0];
      for (let i = 0; i < this.bets.length; i += 1) {
        const val = +(this.bets[i].value || 0);
        const tRtn = val * this.bets[i].odds;
        const aRtn = this.maxArr[this.bets[i].nm];
        betValue += val * this.bets[i].mct;
        betReturn += tRtn > aRtn ? aRtn : tRtn;
      }
      [this.betVal, this.maxRtn, this.balLeft] = [betValue, betReturn - betValue, this.balance - betValue];
    },
    async submitFun() {
      let [noneFlag, rangeFlag] = [false, true];
      for (let i = 0; i < this.bets.length; i += 1) {
        const val = +(this.bets[i].value || 0);
        noneFlag = val ? true : noneFlag;
        rangeFlag = val && (val < this.betMin || val > this.betMax) ? false : rangeFlag;
      }
      if (this.data.find(v => v.same)) { //  目前有同场比赛的不让投，若让投，删除此条件项
        this.$toast(this.$t('page2.bet.sameAlert'));
      } else if (!noneFlag || !rangeFlag) {
        this.$toast(this.$t('page2.bet.toastValid'));
      } else if (this.user && this.user.nbUser) {
        const betAmtArr = [];
        for (let i = 0; i < this.bets.length; i += 1) {
          if (+(this.bets[i].value || 0)) {
            betAmtArr.push({ num: this.bets[i].nm, cnt: this.bets[i].mct, amt: this.bets[i].value });
          }
        }
        const betPara = makeBetParam(this.settings, betAmtArr, this.data);
        let rData = null;
        try {
          rData = await postDoBetList(betPara);
        } catch (e) {
          console.log(e);
        }
        if (rData && rData.mstid) {
          betPara.mstid = rData.mstid;
          betPara.user = this.user.nbUser;
          const pBets = [];
          for (let i = 0; i < this.bets.length; i += 1) {
            if (+(this.bets[i].value || 0)) {
              const pBet = { odv: this.bets[i].odds, num: this.bets[i].nm, cnt: this.bets[i].mct };
              [pBet.win, pBet.tamt, pBet.mxp] = [0, +this.bets[i].value, +this.bets[i].value];
              pBet.tamt *= this.bets[i].mct;
              pBet.mxp *= this.bets[i].odds;
              pBets.push(pBet);
            }
          }
          this.saveBetOption({ paras: betPara, bets: pBets, opts: this.data });
          const sLen = this.betSlip.length;
          const slip = sLen ? this.betSlip[sLen - 1] : null;
          let bal = 0;
          if (sLen && `${slip.user}` === `${betPara.user}` && `${slip.mstid}` === `${betPara.mstid}`) {
            for (let i = 0; i < pBets.length; i += 1) {
              bal += pBets[i].tamt;
            }
            this.$emit('update:data', changeBalance(bal));
          }
          this.clearBetItem();
          this.$emit('betted', true);
        } else {
          this.$toast(`${this.$t('page2.bet.toastFail')}: ${rData}`);
        }
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.toSeriesFun();
      [this.betMin, this.betMax] = [0, 999999999999];
      [this.betVal, this.betKeyMax, this.maxRtn] = [0, 0, 0];
      for (let i = 0; i < this.data.length; i += 1) {
        this.betMin = this.betMin < this.data[i].min ? this.data[i].min : this.betMin;
        this.betMax = this.betMax > this.data[i].max ? this.data[i].max : this.betMax;
      }
      this.betMax = this.betMax > this.balance ? this.balance : this.betMax;
      this.betMin = this.betMin > this.betMax ? this.betMax : this.betMin;
      [this.balLeft, this.maxArr] = [this.balance, this.getMaxArr()];
    }, 0);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.nb-input-box-keyboard {
  width: 100%;
  background-image: linear-gradient(-90deg, #FFF 0%, #F1F1F1 98%);
  box-shadow: 0 .02rem .12rem 0 rgba(0,0,0,0.10);
  border-radius: .1rem;
  .nb-keyboard-input-box {
    width: 100%;
    border-bottom: .01rem solid #ddd;
    padding: .05rem 0;
    .input-box-item {
      width: 100%;
      .input-box-item-box {
        width: 100%;
        height: .44rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 .15rem;
        .input-box-item-title {
          width: 1rem;
          height: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          font-family: PingFangSC-Medium;
          font-size: .17rem;
          color: #333;
        }
        .input-box-item-body {
          width: 70%;
          height: 100%;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          .input-box-item-count {
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: PingFangSC-Regular;
            font-size: .13rem;
            color: #666;
          }
          .nb-like-input-mbet {
            margin-left: .1rem;
          }
        }
      }
    }
  }
  .bet-body-key {
    width: 100%;
    .nb-bet-keyboard {
      margin-top: .1rem;
    }
  }
  .bet-body-text {
    width: 3.25rem;
    height: .34rem;
    margin-bottom: .02rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .bet-body-text-item {
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: .13rem;
        font-family: PingFangSC-Regular;
      }
      .bet-body-text-item-key {
        color: #666;
      }
      .bet-body-text-item-val {
        color: #53C0FF;
      }
    }
  }
}
</style>
