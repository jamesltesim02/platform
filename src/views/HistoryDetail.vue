<template>
<list-page class="page-detail">
  <nav-bar :title="$t('page2.history.detail')" slot="header" />
  <div v-if="!loading && !listData.length" class="history-null" :style="{ height: height }">{{$t('page2.history.alert')}}</div>
  <div class="detail-list">
    <bet-detail-box v-for="(v, k) in listData" :key="k" :data="v" />
    <icon-loading v-if="loading" class="center-loading" />
  </div>
</list-page>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import ListPage from '../components/common/ListPage';
import NavBar from '../components/common/NavBar';
import BetDetailBox from '../components/Bet/BetDetailBox';
import { getBetHistory } from '../api/bet';
import { getUserInfo, betDisplay, getTpTime, changeTime } from '../utils/betUtils';
import IconLoading from '../components/common/icons/IconLoading';

export default {
  data() {
    return {
      user: {},
      listData: [],
      pageCnt: 1000000,
      height: 0,
      loading: false,
    };
  },
  computed: {
    ...mapState({
      betSlip: state => state.bet.betSlip,
    }),
  },
  methods: {
    ...mapMutations([
      'clearBetOption',
    ]),
    async queryBetListData(obj) {
      [this.listData, this.loading] = [[], true];
      if (this.user && this.user.nbUser) {
        try {
          const data = await getBetHistory(obj);
          this.loading = false;
          if (data || data.length) {
            for (let i = 0; i < data.length; i += 1) {
              this.listData.push(betDisplay(data[i], this.$t('page2.bet')));
            }
          }
        } catch (e) {
          console.log(e);
        } finally {
          this.loading = false;
        }
        this.clearBetOption({ user: this.user.nbUser, arr: this.listData });
        if (this.betSlip.length && this.listData.length) {
          const sdt = getTpTime(changeTime(this.betSlip[0].tp)).split(' ')[0];
          const ldt = getTpTime(changeTime(this.listData[0].tp)).split(' ')[0];
          if (sdt === ldt) {
            this.listData = this.betSlip.concat(this.listData);
          }
        }
      }
    },
  },
  components: {
    ListPage,
    NavBar,
    BetDetailBox,
    IconLoading,
  },
  async mounted() {
    this.user = await getUserInfo();
    const [w, n] = [this.$el.offsetWidth, 0.44 / 3.75];
    this.height = this.$el.querySelector('.page-content').offsetHeight;
    this.height -= w * n;
    this.height = `${this.height - 50}px`;
    const dt = this.$route.params.time ? new Date(+this.$route.params.time) : new Date();
    const str = `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()} 0:00:00`;
    const st = new Date(str).getTime();
    const et = st + 86399500;
    const req = { st: changeTime(st, true), et: changeTime(et, true), tp: 2 };
    [req.wst, req.cnt] = [[-1], this.pageCnt];
    this.queryBetListData(req);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.history-null {
  width: 3.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: .15rem;
  color: #FFF;
  opacity: .7;
}
.detail-list {
  width: 3.75rem;
}
</style>
