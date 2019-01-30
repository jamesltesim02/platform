<template>
  <div class="nb-input-bet-keyboard" v-if="!data.hide">
    <like-input :data.sync="bet" type="bet">
      {{$t('page2.bet.betRange')}}{{betMin}}-{{betMax}}
    </like-input>
    <div class="bet-body-text">
      <div class="bet-body-text-item">
        <span class="bet-body-text-item-key">{{$t('page2.bet.balance')}}</span>
        <span class="bet-body-text-item-val">{{balLeft}}</span>
      </div>
      <div class="bet-body-text-item">
        <span class="bet-body-text-item-key">{{$t('page2.bet.maxWin')}}</span>
        <span class="bet-body-text-item-val">{{maxRtn}}</span>
      </div>
    </div>
    <div class="bet-body-key">
      <keyboard :data.sync="bet" :max="`${betMax}`" type="bet" @submit="submitFun" />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { postDoBetList } from '@/api/bet';
import { makeBetParam, getNBit, changeBalance } from '@/utils/betUtils';
import LikeInput from './LikeInput.vue';
import Keyboard from './Keyboard/index.vue';

export default {
  inheritAttrs: false,
  name: 'BetKeyboard',
  data() {
    return {
      bet: {
        value: this.$store.state.setting.betAmount || 100,
        placeholder: this.$t('page2.bet.betMoney'),
        click: true,
        hide: false,
      },
    };
  },
  props: {
    user: Object,
    data: Object,
  },
  components: {
    LikeInput,
    Keyboard,
  },
  computed: {
    ...mapState({
      settings: state => state.setting,
      betSlip: state => state.bet.betSlip,
    }),
    balance() {
      return this.user && this.user.balance ? this.user.balance : 0;
    },
    betVal() {
      return +(this.bet.value || 0);
    },
    balLeft() {
      return getNBit(this.balance - this.betVal, 2);
    },
    maxRtn() {
      const odds = this.data.ods || 0;
      return getNBit(this.betVal * odds, 2);
    },
    betMax() {
      const maxBet = this.data.max || 1000;
      return this.balance < maxBet ? this.balance : maxBet;
    },
    betMin() {
      const minBet = this.data.min || 10;
      return minBet > this.betMax ? this.betMax : minBet;
    },
  },
  methods: {
    ...mapMutations([
      'clearBetItem',
      'saveBetOption',
    ]),
    async submitFun() {
      const val = +(this.bet.value || 0);
      if (!val || val < this.betMin || val > this.betMax) {
        this.$toast(this.$t('page2.bet.toastValid'));
      } else if (this.user && this.user.nbUser) {
        const betPara = makeBetParam(this.settings, [{ amt: val }], [this.data]);
        let rData = null;
        try {
          rData = await postDoBetList(betPara);
        } catch (e) {
          console.log(e);
        }
        if (rData && rData.mstid && rData.tickets && rData.tickets.length && rData.tickets[0] && rData.tickets[0].wid) {
          betPara.mstid = rData.tickets[0].wid;
          betPara.user = this.user.nbUser;
          const pBet = { odv: betPara.opts[0].odv, num: 1, tamt: val };
          [pBet.cnt, pBet.win, pBet.mxp] = [1, 0, val];
          pBet.mxp *= this.data.ods + 1;
          this.saveBetOption({ paras: betPara, bets: [pBet], opts: [this.data] });
          const sLen = this.betSlip.length;
          const slip = sLen ? this.betSlip[sLen - 1] : null;
          if (sLen && `${slip.user}` === `${betPara.user}` && `${slip.mstid}` === `${betPara.mstid}`) {
            this.$emit('change', changeBalance(pBet.tamt || 0));
          }
          this.clearBetItem(this.data);
          this.$emit('betted', true);
        } else {
          this.$toast(`${this.$t('page2.bet.toastFail')}: ${rData}`);
        }
      }
    },
  },
  mounted() {
    setTimeout(() => {
      const val = this.$store.state.setting.betAmount || 100;
      this.bet.value = val > this.betMax ? this.betMax : val;
      this.bet.value = this.bet.value || '';
    }, 0);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.nb-input-bet-keyboard {
  width: 100%;
  border-top: .01rem solid #ddd;
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
  .bet-body-key {
    width: 100%;
    min-height: 1.88rem;
    margin: .02rem 0 0;
  }
}
</style>
