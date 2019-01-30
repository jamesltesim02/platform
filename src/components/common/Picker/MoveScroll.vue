<template>
  <div class="nb-scroll" @touchstart="setStart" @touchmove="setMove" @touchend="setEnd">
    <div class="top"></div>
    <div class="bottom"></div>
    <div class="list">
      <span v-for="v in nData" :key="v.id" :class="`scroll_spn_${v.id}`">{{v.text}}</span>
    </div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'Scroll',
  data() {
    return {
      start: { t: 0, my: 0, f: 0 },
      move: { t: 0, my: 0, f: 0 },
      end: { t: 0, my: 0, f: 0 },
      scroll: { v: 0, f: 0, top: 9999 },
      height: 0,
      clicked: false,
      sTimmer: null,
      last: -1,
      clickFlag: false,
      fun: null,
    };
  },
  props: {
    data: Object,
    i: Number,
    flg: Boolean,
  },
  computed: {
    nId() {
      return this.i || 0;
    },
    nData() {
      const arr = [];
      if (this.data && this.data.data) {
        for (let i = 0; i < this.data.data.length; i += 1) {
          let obj = this.data.data[i];
          if (typeof obj === 'string') {
            obj = { text: obj };
          }
          obj.value = obj.value || obj.text || obj.id;
          obj.text = obj.text || obj.value || obj.id;
          obj.id = i;
          arr.push(obj);
        }
        if (arr.length && this.$el && !this.clickFlag) this.changeStyle(arr);
      }
      return arr;
    },
  },
  methods: {
    enableMenu(e) {
      e.returnValue = false;
    },
    changeData(obj) {
      const { data } = this;
      Object.entries(obj).forEach(([k, v]) => {
        data[k] = v;
      });
      this.$emit('update:data', data);
    },
    getHeight() {
      if (!this.height && this.$el) {
        this.height = this.$el.querySelector('span').offsetHeight;
      }
      if (this.scroll.top > 5000 && this.$el) {
        this.scroll.top = parseFloat(window.getComputedStyle(this.$el.querySelector('.list')).top, 10);
      }
    },
    getPosition(e) {
      const top = this.$el.querySelector('.list').offsetTop;
      if (e && e.targetTouches && e.targetTouches.length) {
        return { t: Date.now(), my: e.targetTouches[0].clientY, py: top };
      }
      return { t: Date.now(), my: e.changedTouches[0].clientY, py: top };
    },
    setStart(e, flag) {
      if (this.clicked && !flag) return;
      clearInterval(this.sTimmer);
      this.getHeight();
      this.start = this.getPosition(e);
      this.move = this.start;
      [this.clicked, this.clickFlag] = [true, true];
    },
    setMove(e) {
      if (!this.clicked) return;
      const [pPosit, pHeight] = [this.$el.offsetTop, this.$el.offsetHeight];
      this.getHeight();
      this.move = this.getPosition(e);
      this.move.f = this.move.my >= this.start.my;
      const end = this.move.my < pPosit || this.move.my > pPosit + pHeight;
      if (!end && this.move.f !== this.start.f) {
        this.start = this.move;
      }
      this.move.my = this.move.my < pPosit ? pPosit : this.move.my;
      this.move.my = this.move.my > pPosit + pHeight ? pPosit + pHeight : this.move.my;
      const height = this.height * (this.nData.length - 1);
      const disTop = this.move.my - this.start.my;
      const newTop = this.start.py + disTop;
      const [t1, t2] = [disTop * (2 / 3), (newTop + height) / 3];
      if (newTop > 0 && disTop > 0) {
        this.scroll.top = this.start.py > 0 ? newTop - t1 : newTop / 3;
      } else if (newTop < -height && disTop < 0) {
        this.scroll.top = this.start.py < -height ? newTop - t1 : t2 - height;
      } else {
        this.scroll.top = newTop;
      }
      this.changeStyle();
      if (end) this.setEnd(e);
    },
    setEnd(e) {
      if (!this.clicked) return;
      clearInterval(this.sTimmer);
      this.getHeight();
      this.end = this.getPosition(e);
      const [self, ds] = [this, this.end.my - this.start.my];
      const height = this.height * (this.nData.length - 1);
      let [dt, da, s] = [this.end.t - this.start.t, 0.5, 0];
      let [dv, nTop, flag] = [dt ? ds / dt : 0, this.scroll.top, false];
      if ((this.scroll.top > 0 && ds >= 0) || (this.scroll.top < -height && ds < 0)) {
        s = ds >= 0 ? this.scroll.top : this.scroll.top + height;
        da = s / 50;
        dv = -10 * da;
      } else if (dt > 300 || Math.abs(dv) < Math.abs(0.1 * da)) {
        s = this.height * Math.round(nTop / this.height);
        s = nTop - s;
        da = s / 50;
        dv = -10 * da;
      } else {
        s = 8 * ds * dv;
        let n = parseInt(s / this.height, 10);
        s = n * this.height;
        n = parseInt(this.scroll.top / this.height, 10);
        n = (ds >= 0 ? n : n - 1) * this.height;
        s += Math.abs(nTop - n);
        dt = parseInt(Math.abs(ds) > 40 ? 40 : Math.abs(ds) * 0.4, 10);
        da = 2 * s;
        if (dt) {
          da /= dt * dt;
          da = ds >= 0 ? -da : da;
          dv = -da * dt;
        } else {
          da = 0;
          dv = 0;
        }
        flag = true;
      }
      this.clicked = false;
      self.sTimmer = setInterval(() => {
        if (self.flg) {
          self.stopMove();
        } else if (Math.abs(dv) < 0.5 * Math.abs(da) || Math.abs(dv) < 0.001) {
          if (nTop >= -height - 0.5 && nTop <= 0.5) {
            self.stopMove();
          } else {
            s = nTop > 0 ? nTop : nTop + height;
            da = s / 50;
            dv = -10 * da;
          }
        } else {
          let lDis = dv * dv;
          lDis /= Math.abs(2 * da);
          if (flag && ((da < 0 && nTop > 0) || (da > 0 && nTop < -height))) {
            dv = -4 * da;
            flag = false;
          } else if (flag && lDis <= self.height) {
            da = da > 0 ? lDis / 50 : -lDis / 50;
            dv = -10 * da;
            flag = false;
          }
          nTop += dv;
          nTop += da / 2;
          dv += da;
          self.scroll.top = nTop;
          self.changeStyle();
        }
      }, 40);
    },
    stopMove() {
      this.changeStyle(null, true);
      clearInterval(this.sTimmer);
      this.clickFlag = false;
    },
    changeStyle(arr, stopFlag) {
      const data = arr || this.nData;
      this.scroll.top = Math.round(this.scroll.top * 1000) / 1000;
      let deId = this.data.select || 0;
      deId = deId > data.length - 1 ? data.length - 1 : deId;
      deId = deId < 0 ? 0 : deId;
      const id = this.height && this.clickFlag && !arr ? -this.scroll.top / this.height : deId;
      for (let i = 0; i < data.length; i += 1) {
        const span = this.$el.querySelector(`.scroll_spn_${i}`);
        if (span) span.style.transform = `rotateX(${Math.round((i - id) * 25)}deg)`;
      }
      const list = this.$el.querySelector('.list');
      if (list) list.style.top = this.height ? `${Math.round(-this.height * id)}px` : `${-0.44 * id}rem`;
      deId = id > data.length - 1 ? data.length - 1 : id;
      deId = Math.round(deId < 0 ? 0 : deId);
      if (this.fun && typeof this.fun === 'function' && this.last !== deId) {
        this.changeData({ select: deId });
        this.fun(this.nId, data[deId], !arr, stopFlag);
        this.last = deId;
      }
    },
  },
  mounted() {
    this.$el.oncontextmenu = this.enableMenu;
    this.clicked = false;
    if (this.$listeners.change) {
      this.fun = typeof this.$listeners.change === 'function' ? this.$listeners.change : null;
      delete this.$listeners.change;
    }
    if (this.$listeners.update) {
      this.fun = typeof this.$listeners.update === 'function' ? this.$listeners.update : null;
      delete this.$listeners.update;
    }
    if (this.$listeners.scroll) {
      this.fun = typeof this.$listeners.scroll === 'function' ? this.$listeners.scroll : null;
      delete this.$listeners.scroll;
    }
    this.end.t = Date.now();
    this.$emit('start', this.end.t);
    setTimeout(() => { this.changeStyle(); }, 5);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.nb-scroll {
  position: relative;
  z-index: 0;
  width: 100%;
  height: 1.7rem;
  overflow: hidden;
  .top,.bottom,.list {
    position: absolute;
    left: 0;
    right: 0;
  }
  .top,.bottom {
    z-index: 99;
    height: .62rem;
  }
  .top {
    top: 0;
    border-bottom: .01rem solid rgba(0, 0, 0, 0.3);
    background: linear-gradient(rgba(46,47,52,1), rgba(46,47,52,.3));
  }
  .bottom {
    bottom: 0;
    border-top: .01rem solid rgba(0, 0, 0, 0.3);
    background: linear-gradient(rgba(46,47,52,.3), rgba(46,47,52,1));
  }
  .list {
    padding-top: .63rem;
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: .44rem;
      color: #FFF;
      font-size: .17rem;
      font-family: PingFangSC-Regular;
    }
  }
}
</style>
