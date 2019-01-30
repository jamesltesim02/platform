<template>
  <transition name="btn">
    <div class="nb-bet-box-btn" @touchstart.stop @click.stop @touchend.stop v-if="show">
      <div class="bet-box-btn-cover">
        <bet-box-tab :pop="pop" type />
      </div>
    </div>
  </transition>
</template>

<script>
import { mapMutations } from 'vuex';
import { makePushPara, getUserInfo } from '@/utils/betUtils';
import BetBoxTab from './BetBoxTab';

export default {
  inheritAttrs: false,
  name: 'BetBoxBtn',
  data() {
    return {
      user: {},
    };
  },
  props: {
    show: Boolean,
    pop: Boolean,
  },
  watch: {
    show() {
      if (!this.show) this.pushToSever(true);
    },
  },
  components: {
    BetBoxTab,
  },
  methods: {
    ...mapMutations([
      'pushBetOption',
    ]),
    pushToSever(flag) {
      this.$regpush(makePushPara(flag), (msg) => { this.pushBetOption({ user: this.user && this.user.nbUser ? this.user.nbUser : '', msg }); }, this.type);
    },
  },
  async mounted() {
    this.user = await getUserInfo();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.btn-enter-active {
  transition: all 0.3s ease-out;
}
.btn-leave-active{
  transition: all 0.3s ease-in;
}
.btn-enter{
  transform: translateY(10rem);
}
.btn-leave-active{
  transform: translateY(10rem);
}
.nb-bet-box-btn {
  position: fixed;
  z-index: 999;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #57595E;
  .bet-box-btn-cover {
    width: 100%;
    height: 100%;
    background: #2E2F34;
    border-top-left-radius: .15rem;
    border-top-right-radius: .15rem;
  }
}
</style>

