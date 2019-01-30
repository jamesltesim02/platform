<template>
  <div class="nb-bet-box-toggole" :style="bStyle" @touchstart.stop="sFun" @touchend.stop="eFun">
    <div class="nb-bet-box-item" v-for="(v, k) in bArr" :key="k">{{v.oids.join('/')}}</div>
  </div>
</template>

<script>
import { toSerList } from '@/utils/betUtils';

export default {
  inheritAttrs: false,
  name: 'BetBoxToggle',
  data() {
    return {
      t: { max: 300, st: 0, timer: null },
      bArr: [],
      bStyle: { height: '0rem', 'border-top': 'none', 'border-bottom': 'none' },
    };
  },
  props: {
    data: Object,
    opts: Array,
  },
  computed: {
    toggle() {
      return this.data.toggle;
    },
  },
  watch: {
    toggle() {
      this.toToggleFun();
    },
  },
  methods: {
    sFun() {
      this.t.st = Date.now();
    },
    eFun() {
      if (Date.now() - this.t.st > this.t.max) return;
      const dt = this.data;
      dt.toggle = false;
      this.$emit('update:data', dt);
    },
    toToggleFun() {
      clearInterval(this.t.timer);
      let ht = parseFloat(this.bStyle.height, 10);
      if (ht > 0) {
        const step = ht / 20;
        this.t.timer = setInterval(() => {
          ht -= step;
          if (Math.abs(ht) < 0.02) {
            ht = 0;
            this.bStyle['border-top'] = 'none';
            this.bStyle['border-bottom'] = 'none';
            clearInterval(this.t.timer);
          }
          this.bStyle.height = `${ht}rem`;
        }, 10);
      } else {
        [ht, this.bStyle.height] = [0, '0rem'];
        const bOpts = JSON.parse(JSON.stringify(this.opts));
        let data = toSerList(this.opts, this.data.nm, 1);
        this.bArr = data && data.length ? data : [];
        if (!this.bArr.length) return;
        const max = this.bArr.length * 0.3;
        this.bStyle['border-top'] = this.data.style['border-top'];
        this.bStyle['border-bottom'] = this.data.style['border-bottom'];
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
    this.bStyle = { height: '0rem', 'border-top': 'none', 'border-bottom': 'none' };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.nb-bet-box-toggole {
  width: 100%;
  overflow: hidden;
  .nb-bet-box-item {
    width: 100%;
    height: .3rem;
    padding: 0 .15rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: .01rem solid #f1f1f1;
    font-family: PingFangSC-Regular;
    font-size: .13rem;
    color: #666;
  }
  .nb-bet-box-item:last-child {
    border: none;
  }
}
</style>

