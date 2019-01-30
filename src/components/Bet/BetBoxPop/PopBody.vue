<template>
  <transition name="pop">
    <div class="nb-bet-box-pop-body" v-if="show">
      <bet-detail-body v-for="(v, k) in betList" :key="k" :data="v" :user.sync="user" type />
    </div>
  </transition>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import BetDetailBody from '../BetDetailBody.vue';

export default {
  inheritAttrs: false,
  name: 'PopBody',
  props: {
    user: Object,
    show: Boolean,
  },
  components: {
    BetDetailBody,
  },
  computed: {
    ...mapState({
      betList: state => state.bet.betList,
    }),
  },
  methods: {
    ...mapMutations([
      'clickBetOption',
      'setBetOption',
    ]),
  },
  mounted() {
    setTimeout(async () => {
      this.clickBetOption();
      this.setBetOption();
    }, 1);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.pop-enter-active {
  transition: all 0.25s ease-out;
}
.pop-leave-active{
  transition: all 0.25s ease-in;
}
.pop-enter{
  transform: translateY(3rem);
}
.pop-leave-active{
  transform: translateY(3rem);
}
.nb-bet-box-pop-body {
  position: fixed;
  z-index: 99999;
  width: 3.55rem;
  left: .1rem;
  bottom: .1rem;
}
</style>

