<template>
  <div class="nb-bet-box-tab" @touchstart.stop="sFun" @click.stop @touchend.stop>
    <div class="nb-bet-box-tab-head">
      <bet-box-head :data.sync="head" :type="type" @change="headFun" />
      <bet-box-select :data.sync="select" @change="selectFun" />
    </div>
    <div class="nb-bet-box-tab-body" ref="scrDiv" >
      <div class="bet-box-tab-detail" v-if="!loading && (!data || !data.length || foldsFlag)">
        <div class="bet-box-none">
          <bet-box-none />
          <p class="bet-box-none-text" v-if="!head.select">{{$t('page2.bet.noItem')}}</p>
          <p class="bet-box-none-text" v-else>{{$t('page2.bet.noTicket')}}</p>
        </div>
      </div>
      <div class="bet-box-tab-detail" v-else-if="!head.select && bettedFlag">
        <div class="bet-box-tab-detail-box" v-for="(v, k) in data" :key="k" v-if="k < 1">
          <div class="tab-detail-box-icon">
            <bet-box-proc v-if="/^1$/.test(v.wst)" />
            <bet-box-succ v-else-if="/^(2|3|8)$/.test(v.wst)" />
            <bet-box-fail v-else-if="/^(0|4|5|6|7)$/.test(v.wst)" />
          </div>
          <div class="tab-detail-box-pro">{{/^[0-8]$/.test(v.wst) ? $t(`page2.bet.${betPushText(v.wst)}`) : ''}}</div>
          <div class="tab-detail-box-id">{{$t('page2.bet.betId')}}{{v.mstid}}</div>
          <bet-detail-box :data="v" />
          <div class="tab-detail-box-close" @touchend.stop="closeFun">{{$t('page2.bet.close')}}</div>
        </div>
      </div>
      <div class="bet-box-tab-detail" v-else-if="!head.select">
        <div class="tab-detail-title">
          <span class="detail-title-text">{{select.select ? $t('page2.bet.betItem') : ''}}</span>
          <span class="detail-title-clear" @touchend.stop="clearFun">{{$t('page2.bet.clearAll')}}</span>
        </div>
        <bet-box-keyboard :data="data" :user.sync="user" v-if="select.select" @betted="bettedFun" />
        <div class="tab-detail-title" v-if="select.select">
          <span class="detail-title-text">{{$t('page2.bet.betSlip')}}</span>
          <span class="detail-title-alert" v-if="data.find(v => v.same)">
            <bet-box-alert />
            <span class="detail-title-alert-text">{{$t('page2.bet.sameAlert')}}</span>
          </span>
        </div>
        <bet-detail-body v-for="(v, k) in betList" :key="k" :data="v" :user.sync="user" @betted="bettedFun" type />
      </div>
      <div class="bet-box-tab-detail" v-else>
        <div class="bet-box-tab-detail-box" v-for="(v, k) in data" :key="k">
          <bet-detail-box :data="v" />
        </div>
        <div v-if="finish && !loading && data.length" class="no-more">我已经把我所有给你了!</div>
        <div v-if="loading" class="loading-bar"><icon-loading /></div>
      </div>
    </div>
    <div class="nb-bet-box-tab-foot" v-if="!type">
      <tab-bar :current-index="3" />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { getUserInfo, getMultQuotePara, betDisplay, makePushPara, changeTime } from '@/utils/betUtils';
import { getQuoteMultBetList } from '@/api/quote';
import { getBetHistory } from '@/api/bet';
import TabBar from '@/components/common/TabBar';
import BetBoxHead from './BetBoxTabComp/BetBoxHead';
import BetBoxSelect from './BetBoxTabComp/BetBoxSelect';
import BetBoxNone from './BetBoxTabComp/BetBoxNone';
import BetBoxKeyboard from './BetBoxTabComp/BetBoxKeyboard';
import BetDetailBody from './BetDetailBody.vue';
import BetBoxAlert from './BetBoxTabComp/BetBoxAlert.vue';
import BetBoxProc from './BetBoxTabComp/BetBoxProc.vue';
import BetBoxSucc from './BetBoxTabComp/BetBoxSucc.vue';
import BetBoxFail from './BetBoxTabComp/BetBoxFail.vue';
import BetDetailBox from './BetDetailBox';
import IconLoading from '../common/icons/IconLoading';

export default {
  inheritAttrs: false,
  name: 'BetBoxTab',
  data() {
    return {
      user: {},
      bettedFlag: false,
      t: { max: 300, st: 0, timer: null },
      head: { select: 0, data: [{ id: 0, text: this.$t('page2.bet.betSlips') }, { id: 1, text: this.$t('page2.bet.myBet') }] },
      select: { select: 0, data: [{ id: 0, text: this.$t('page2.bet.single') }, { id: 1, text: this.$t('page2.bet.multiple') }] },
      tsel: { from: '', to: '', mid: '' },
      data: [],
      loading: false,
      finish: false,
      pageCnt: 10,
    };
  },
  props: {
    type: Boolean,
    pop: Boolean,
  },
  computed: {
    ...mapState({
      betList: state => state.bet.betList,
      betSlip: state => state.bet.betSlip,
    }),
    foldsFlag() {
      return this.data.length === 1 && this.head.select === 0 && this.select.select === 1 && !this.bettedFlag;
    },
  },
  watch: {
    betList() {
      this.data = this.betList;
      this.pushToSever();
    },
    betSlip() {
      if (this.bettedFlag && this.betSlip.length) {
        this.data = [betDisplay(this.betSlip[this.betSlip.length - 1], this.$t('page2.bet'))];
      } else {
        this.loadData(true);
      }
      this.pushToSever();
    },
  },
  components: {
    TabBar,
    BetBoxHead,
    BetBoxSelect,
    BetBoxNone,
    BetBoxKeyboard,
    BetDetailBody,
    BetBoxAlert,
    BetBoxProc,
    BetBoxSucc,
    BetBoxFail,
    BetDetailBox,
    IconLoading,
  },
  methods: {
    ...mapMutations([
      'quoteBetOption',
      'clickBetOption',
      'setBetOption',
      'clearBetItem',
      'clearBetOption',
      'pushBetOption',
      'clearBetAlert',
      'saveBetOption',
    ]),
    betPushText(wst) {
      let str = /^1$/.test(wst) ? 'betProc' : '';
      str = /^(2|3|8)$/.test(wst) ? 'betSucc' : str;
      return /^(0|4|5|6|7)$/.test(wst) ? 'betFail' : str;
    },
    sFun() {
      this.t.st = Date.now();
    },
    clearFun() {
      if (Date.now() - this.t.st > this.t.max) return;
      this.clearBetItem();
    },
    closeFun() {
      if (Date.now() - this.t.st > this.t.max) return;
      if (this.bettedFlag) {
        this.clearBetOption({ user: this.user && this.user.nbUser ? this.user.nbUser : '', arr: [] });
        this.resetQuery();
        this.loadData();
      }
    },
    headFun(id) {
      const nId = id || 0;
      if (nId !== this.head.select) {
        this.$set(this.head, 'select', nId);
        if (nId === 0) {
          this.select = { select: 0, data: [{ id: 0, text: this.$t('page2.bet.single') }, { id: 1, text: this.$t('page2.bet.multiple') }] };
        } else if (nId === 1) {
          this.select = {
            select: 0,
            data: [{ id: 0, text: this.$t('page2.bet.setNo') }, { id: 1, text: this.$t('page2.bet.setYes') }, { id: 2, text: this.$t('page2.bet.setCan') }],
          };
        }
        this.resetQuery();
        this.loadData();
      }
    },
    selectFun(id) {
      const nId = id || 0;
      if (nId !== this.select.select) {
        this.$set(this.select, 'select', nId);
        this.resetQuery();
        this.loadData();
      }
    },
    async loadData(flag) {
      const [title, sel] = [this.head.select, this.select.select];
      [this.series, this.bettedFlag] = [[], false];
      if (!title) {
        this.clearBetAlert();
        const para = getMultQuotePara(this.user);
        if (!this.pop && para) {
          try {
            const rst = await getQuoteMultBetList(para);
            if (rst && rst.length) {
              this.quoteBetOption(rst);
            }
          } catch (e) {
            console.log(e);
          }
        }
        this.clickBetOption();
        this.setBetOption(sel > 0);
        this.data = this.betList;
      } else {
        let para = sel ? [3, 8] : [1, 2];
        para = sel > 1 ? [4, 5, 6, 7] : para;
        const check = !this.loading && !this.finish && this.user && this.user.nbUser;
        if (!flag && check && new Date(this.tsel.from) <= new Date(this.tsel.mid)) {
          const et = new Date(this.tsel.mid).getTime();
          const st = new Date(this.tsel.from).getTime();
          const req = { st: changeTime(st, true), et: changeTime(et, true), tp: 2 };
          [req.wst, req.cnt] = [para, this.pageCnt];
          [this.loading, this.finish] = [true, false];
          await this.queryBetListData(req, (data) => {
            if (data && data.length && data.length >= this.pageCnt) {
              const dt = changeTime(data[data.length - 1].tp) - 1;
              this.tsel.mid = this.getDate(dt);
            } else {
              this.tsel.mid = this.tsel.from;
              this.finish = true;
            }
          });
        }
      }
    },
    async queryBetListData(obj, fun) {
      try {
        const data = await getBetHistory(obj);
        this.loading = false;
        if (data && data.length) {
          for (let i = 0; i < data.length; i += 1) {
            for (let j = 0; j < this.data.length; j += 1) {
              if (`${this.data[j].mstid}` === `${data[i].mstid}` || `${this.data[j].mstid}` === `${data[i].wid}`) {
                this.data.splice(j, 1);
                break;
              }
            }
            this.data.push(betDisplay(data[i], this.$t('page2.bet')));
          }
          if (fun && typeof fun === 'function') {
            fun(data);
          }
        }
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
    getDate(time, d) {
      const [dt, sd] = [time ? new Date(time) : new Date(), (d || 0) * 86400000];
      const ndt = new Date(dt.getTime() + sd);
      let tstr = `${ndt.getFullYear()}-${`0${ndt.getMonth() + 1}`.slice(-2)}-${`0${ndt.getDate()}`.slice(-2)}`;
      tstr += ` ${`0${ndt.getHours()}`.slice(-2)}:${`0${ndt.getMinutes()}`.slice(-2)}:${`0${ndt.getSeconds()}`.slice(-2)}`;
      return tstr;
    },
    bettedFun() {
      const len = this.betSlip.length;
      if (len) {
        const dt = betDisplay(this.betSlip[len - 1], this.$t('page2.bet'));
        [this.data, this.bettedFlag] = [[dt], true];
      }
    },
    pushToSever(flag) {
      this.$regpush(makePushPara(flag), async (msg) => {
        this.pushBetOption({ user: this.user && this.user.nbUser ? this.user.nbUser : '', msg });
        if (msg && msg.nt && /^10$/.test(msg.nt)) {
          this.user = await getUserInfo(true);
        }
      }, this.type);
    },
    resetQuery() {
      const user = this.user && this.user.nbUser ? this.user.nbUser : '';
      this.tsel.from = `${this.getDate(null, -3652).split(' ')[0]} 00:00:00`;
      this.tsel.to = `${this.getDate(null, 1).split(' ')[0]} 23:59:59`;
      [this.loading, this.finish] = [false, false];
      this.tsel.mid = this.tsel.to;
      this.saveBetOption({ paras: { user }, bets: [], opts: [] });
      this.data = this.head.select && !this.select.select ? this.getList() : [];
    },
    getList() {
      const dt = [];
      for (let i = this.betSlip.length - 1; i >= 0; i -= 1) {
        dt.push(betDisplay(this.betSlip[i], this.$t('page2.bet')));
      }
      return dt;
    },
  },
  mounted() {
    const [sc, that] = [this.$refs.scrDiv, this];
    let [triged, scrTop] = [false, sc.scrollTop];
    sc.addEventListener('scroll', () => {
      if (sc.scrollHeight - sc.clientHeight - sc.scrollTop <= 20 && sc.scrollTop > scrTop) {
        if (!triged) {
          if (that.head.select) that.loadData();
          triged = true;
          setTimeout(() => { triged = false; }, 500);
        }
      }
      scrTop = sc.scrollTop;
    });
    setTimeout(async () => {
      this.head = { select: 0, data: [{ id: 0, text: this.$t('page2.bet.betSlips') }, { id: 1, text: this.$t('page2.bet.myBet') }] };
      this.select = { select: 0, data: [{ id: 0, text: this.$t('page2.bet.single') }, { id: 1, text: this.$t('page2.bet.multiple') }] };
      this.user = await getUserInfo();
      this.resetQuery();
      this.loadData();
    }, 1);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.nb-bet-box-tab {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  .nb-bet-box-tab-head {
    position: relative;
    z-index: 3;
    width: 100%;
  }
  .nb-bet-box-tab-body {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 90%;
    flex-grow: 1;
    overflow: scroll;
    .bet-box-tab-detail {
      width: 3.55rem;
      margin: 0 auto;
      padding-bottom: .1rem;
      .bet-box-none {
        width: 100%;
        height: 4.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .bet-box-none-text {
          width: 100%;
          height: .53rem;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: PingFangSC-Regular;
          font-size: .15rem;
          color: #FFF;
          opacity: 0.7;
        }
      }
      .bet-box-tab-detail-box {
        width: 100%;
        .tab-detail-box-icon {
          width: 100%;
          height: 1.28rem;
          display: flex;
          justify-content: center;
          align-items: flex-end;
        }
        .tab-detail-box-pro {
          width: 100%;
          height: .33rem;
          margin-top: .1rem;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: PingFangSC-Regular;
          color: rgba(255,255,255,0.5);
          font-size: .15rem;
        }
        .tab-detail-box-id {
          width: 100%;
          height: .44rem;
          margin: .05rem auto;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          font-family: PingFangSC-Regular;
          color: rgba(255,255,255,0.5);
          font-size: .15rem;
        }
        .tab-detail-box-close {
          width: 100%;
          height: .4rem;
          margin: .1rem auto;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #53C0FF;
          box-shadow: 0 .02rem .08rem 0 rgba(0,0,0,0.10);
          border-radius: .04rem;
          font-family: PingFangSC-Medium;
          font-size: .17rem;
          color: #FFF;
        }
      }
      .tab-detail-title {
        width: 100%;
        height: .43rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: PingFangSC-Regular;
        .detail-title-text {
          color: rgba(255,255,255,0.7);
          font-size: .13rem;
        }
        .detail-title-clear {
          height: .22rem;
          padding: 0 .1rem;
          display: flex;
          justify-content: center;
          align-items: center;
          border: .01rem solid #666;
          border-radius: .11rem;
          color: rgba(255,255,255,0.5);
          font-size: .12rem;
        }
        .detail-title-alert {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .detail-title-alert-text {
            display: flex;
            align-items: center;
            color: rgba(255,255,255,0.3);
            font-size: .12rem;
            padding: 0 .03rem;
          }
        }
      }
      .nb-bet-detail-body {
        margin-bottom: .1rem;
      }
    }
  }
  .nb-bet-box-tab-foot {
    position: relative;
    z-index: 2;
    width: 100%;
  }
  .no-more, .loading-bar {
    padding: .16rem 0 .06rem;
    text-align: center;
    color: @page1Font3;
  }
}
</style>
