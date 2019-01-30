<template>
  <div class="nb-bet-box-pop" @touchstart.stop="sFun" @click.stop @touchend.stop="eFun" v-if="nshow">
    <div class="cover"></div>
    <pop-body :show="close" :user="user" />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { makePushPara } from '@/utils/betUtils';
import PopBody from './PopBody.vue';

export default {
  inheritAttrs: false,
  name: 'BetBoxPop',
  data() {
    return {
      t: { max: 300, st: 0, timer: null },
      nshow: false,
      close: false,
    };
  },
  props: {
    user: Object,
    show: Boolean,
  },
  components: {
    PopBody,
  },
  computed: {
    ...mapState({
      betList: state => state.bet.betList,
      betCount: state => state.bet.betCount,
    }),
  },
  watch: {
    show() {
      if (!this.show) {
        this.nshow = false;
        return;
      }
      if (this.user && this.user.nbUser) {
        if (this.betCount) {
          this.nshow = true;
          this.close = true;
        }
        this.pushToSever();
      } else {
        this.nshow = false;
        this.close = false;
      }
    },
    betList(v) {
      if (this.show && (!v || !v.length)) this.closeWin();
    },
  },
  methods: {
    ...mapMutations([
      'pushBetOption',
    ]),
    sFun() {
      this.t.st = Date.now();
    },
    eFun(e) {
      if (Date.now() - this.t.st > this.t.max) return;
      const clsName = typeof e.target.className === 'object' ? e.target.className.baseVal : e.target.className;
      if (/cover/i.test(clsName)) this.closeWin();
    },
    closeWin() {
      this.close = false;
      this.pushToSever(true);
      setTimeout(() => { this.$emit('close', true); }, 50);
    },
    pushToSever(flag) {
      this.$regpush(makePushPara(flag), (msg) => { this.pushBetOption({ user: this.user.nbUser || '', msg }); }, this.type);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.nb-bet-box-pop {
  position: fixed;
  z-index: 99900;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .cover {
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
  }
}
</style>
