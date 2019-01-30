<template>
  <div id="app">
    <router-view />
    <bet-box-btn :show="pop && type" pop />
    <bet-box-pop :show="pop && !type" :user="user" @close="closeFun" />
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import { getUserInfo, makePushPara } from '@/utils/betUtils';
import BetBoxPop from '@/components/Bet/BetBoxPop';
import BetBoxBtn from '@/components/Bet/BetBoxBtn';

export default {
  data() {
    return {
      pop: false,
      type: false,
      user: {},
    };
  },
  computed: {
    ...mapState({
      barFlag: state => state.bet.barFlag,
      betFlag: state => state.bet.betFlag,
      betStatus: state => state.bet.betStatus,
      betCount: state => state.bet.betCount,
    }),
    route() {
      return this.$route.path;
    },
  },
  components: {
    BetBoxPop,
    BetBoxBtn,
  },
  watch: {
    route() {
      this.pop = false;
      this.type = /^[:/]?new\/[a-z0-9]+/i.test(this.$route.path);
    },
    betFlag() {
      this.changePop();
    },
    betCount() {
      this.changePop();
    },
  },
  methods: {
    ...mapMutations([
      'pushBetOption',
    ]),
    closeFun() {
      this.pop = false;
    },
    bet(data) {
      if (this.pop) return;
      this.clickBetItem(data);
      if (this.betStatus > -1 && this.betCount === 1) {
        this.pop = true;
        this.type = /^[:/]?new\/[a-z0-9]+/i.test(this.$route.path);
      }
    },
    async changePop() {
      if (this.type) {
        if (this.barFlag === 2) {
          this.pop = false;
        } else if (this.barFlag === 1 || (this.betStatus > -1 && this.betCount === 1)) {
          this.pop = true;
        }
      } else if (this.betStatus > -1 && this.betCount === 1) {
        this.user = await getUserInfo();
        if (this.user && this.user.nbUser) {
          this.pop = true;
        }
      }
    },
    pushToSever() {
      this.$regpush(makePushPara(true), (msg) => {
        this.pushBetOption({ user: this.user.nbUser || '', msg });
        if (msg && msg.nt && /^10$/.test(msg.nt) && msg.wst >= 0 && msg.wst !== 1) {
          this.$toast(this.$t(`page2.bet.bet${/^(2|3|8)$/.test(msg.wst) ? 'Succ' : 'Fail'}`));
        }
      }, true);
    },
  },
  mounted() {
    this.pop = false;
    this.type = /^[:/]?new\/[a-z0-9]+/i.test(this.$route.path);
    this.pushToSever();
  },
};
</script>
<style lang="less">
#app {
  height: 100%;
}
</style>
