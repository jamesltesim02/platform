<template>
  <div class="nb-bet-box-head" v-bind="attrs" @touchstart.stop="sFun" @click.stop @touchend.stop>
    <div v-for="v in nData" :key="v.id" :class="v.class" @touchend="changeFun(v.id)" >
      {{v.text}}
    </div>
    <div class="head-close" v-if="type" @touchend.stop="closeFun" >
      <bet-box-close size="0.22" />
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import BetBoxClose from './BetBoxClose.vue';

export default {
  inheritAttrs: false,
  name: 'BetBoxHead',
  data() {
    return {
      t: { max: 300, st: 0, timer: null },
    };
  },
  props: {
    data: Object,
    type: Boolean,
  },
  computed: {
    nData() {
      const [dt, rtn] = [this.data.data, []];
      for (let i = 0; i < dt.length; i += 1) {
        const obj = dt[i];
        obj.class = obj.id === this.data.select ? 'head-item head-active' : 'head-item';
        rtn.push(obj);
      }
      return rtn;
    },
    attrs() {
      return Object.assign({}, this.$attrs, {
        style: {
          height: this.type ? '.48rem' : '.44rem',
          background: this.type ? 'transparent' : '#57595E',
        },
      });
    },
  },
  components: {
    BetBoxClose,
  },
  methods: {
    ...mapMutations([
      'clickBetItem',
    ]),
    sFun() {
      this.t.st = Date.now();
    },
    closeFun() {
      if (Date.now() - this.t.st > this.t.max) return;
      this.clickBetItem(null);
    },
    changeFun(id) {
      if (Date.now() - this.t.st > this.t.max) return;
      this.$emit('change', id || 0);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.nb-bet-box-head {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .head-item {
    width: 30%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: PingFangSC-Semibold;
    font-size: .17rem;
    color: #FFF;
    opacity: 0.3;
  }
  .head-active {
    opacity: 1;
  }
  .head-close {
    position: absolute;
    top: 0;
    right: 0;
    width: .44rem;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

