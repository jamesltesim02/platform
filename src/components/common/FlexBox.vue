<template>
  <div class="nb-bet-flex-box" v-bind="attrs" @touchstart="sFun" @touchmove="mFun" @touchend="eFun">
    <span v-for="wave in waves" :key="wave.id" class="wave" :style="wave.style"></span>
    <slot></slot>
  </div>
</template>

<script>

export default {
  inheritAttrs: false,
  name: 'FlexBox',
  data() {
    return {
      id: 0,
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      radius: 0,
      waves: [],
      clicked: false,
      position: [0, 0],
      t: { max: 300, st: 0, timer: null },
      waveFlag: false,
      attrs: [],
      fun: null,
    };
  },
  props: {
    column: Boolean,
    wave: Boolean,
    position: String,
    justifyContent: String,
  },
  methods: {
    enableMenu(e) {
      e.returnValue = false;
    },
    sFun(e) {
      this.t.st = Date.now();
      if (this.waveFlag && !this.clicked) {
        this.clicked = true;
        this.createWave(e);
        setTimeout(() => {
          if (this.clicked) {
            this.eFun();
          }
        }, 2000);
      }
    },
    mFun(e) {
      const [ex, ey] = [e.targetTouches[0].clientX, e.targetTouches[0].clientY];
      let result = Math.abs(ex - this.position[0]) > this.width;
      result = result || Math.abs(ey - this.position[1]) > this.height;
      if (result && this.clicked) {
        this.eFun();
      }
    },
    eFun() {
      this.changeWave();
      const tFlag = Date.now() - this.t.st > this.t.max;
      if (this.clicked && !tFlag && this.fun && typeof this.fun === 'function') {
        this.fun();
      }
      this.clicked = false;
    },
    getPara(e) {
      this.id += 1;
      const pPosit = window.getComputedStyle(this.$el.parentNode.parentNode).position;
      const pTop = /fix/i.test(pPosit) ? this.$el.parentNode.parentNode.offsetTop : 0;
      const pLeft = /fix/i.test(pPosit) ? this.$el.parentNode.parentNode.offsetLeft : 0;
      [this.left, this.top] = [this.$el.offsetLeft + pLeft, this.$el.offsetTop + pTop];
      const [ex, ey] = [e.targetTouches[0].clientX, e.targetTouches[0].clientY];
      this.position = [ex, ey];
      const [hWidth, hHeight] = [this.width / 2, this.height / 2];
      let [x, y] = [ex - this.left - hWidth, ey - this.top - hHeight];
      x = Math.abs(x) > hWidth ? 0 : x;
      y = Math.abs(y) > hHeight ? 0 : y;
      return [this.id, hWidth, hHeight, x, y, 0];
    },
    runWave() {
      for (let i = this.waves.length - 1; i >= 0; i -= 1) {
        this.waves[i].scale += this.waves[i].speed;
        this.waves[i].style.transform = `scale(${this.waves[i].scale},${this.waves[i].scale})`;
        if (this.waves[i].scale >= 1) {
          this.waves.splice(i, 1);
        }
      }
      if (this.waves.length) {
        setTimeout(this.runWave, 20);
      }
    },
    createWave(e) {
      const [id, hWidth, hHeight, x, y, scale] = this.getPara(e);
      const obj = {
        id,
        scale,
        speed: 0.01,
        style: {
          'z-index': id + 100,
          width: `${2 * this.radius}px`,
          height: `${2 * this.radius}px`,
          top: `${hHeight - this.radius}px`,
          left: `${hWidth - this.radius}px`,
          'transform-origin': `${this.radius + x}px ${this.radius + y}px`,
          transform: `scale(${scale},${scale})`,
        },
      };
      this.waves.push(obj);
      if (this.waves.length < 2) {
        this.runWave();
      }
    },
    changeWave() {
      for (let i = 0; i < this.waves.length; i += 1) {
        this.waves[i].speed = 0.08;
      }
    },
  },
  mounted() {
    if (this.$listeners.click) {
      this.fun = typeof this.$listeners.click === 'function' ? this.$listeners.click : null;
      delete this.$listeners.click;
    }
    if (this.$listeners.tap) {
      this.fun = typeof this.$listeners.tap === 'function' ? this.$listeners.tap : null;
      delete this.$listeners.tap;
    }
    if (this.$listeners.touchend) {
      this.fun = typeof this.$listeners.touchend === 'function' ? this.$listeners.touchend : null;
      delete this.$listeners.touchend;
    }
    if (this.$listeners.submit) {
      this.fun = typeof this.$listeners.submit === 'function' ? this.$listeners.submit : null;
      delete this.$listeners.submit;
    }
    setTimeout(() => {
      const ats = Object.assign({}, $attrs);
      ats['flex-direction'] = this.column ? 'column' : 'row';
      ats['position'] = this.wave ? 'relative' : 'static';
      ats['position'] = this.position ? this.position : ats['position'];
      this.waveFlag = this.wave && ats['position'] === 'relative';
      if (!this.justifyContent) {
        ats['justify-content'] = 'center';
      } else if (/(start|left|begin)/i.test(this.justifyContent)) {
        ats['justify-content'] = 'flex-start';
      } else if (/(end|right|finish)/i.test(this.justifyContent)) {
        ats['justify-content'] = 'flex-end';
      } else if (/(bet|twe|wee|een)/i.test(this.justifyContent)) {
        ats['justify-content'] = 'space-between';
      } else if (/(aro|rou|oun|und)/i.test(this.justifyContent)) {
        ats['justify-content'] = 'space-around';
      } else {
        ats['justify-content'] = 'center';
      }
      this.attrs = ats;
      this.$el.oncontextmenu = this.enableMenu;
      this.width = this.$el.offsetWidth;
      this.height = this.$el.offsetHeight;
      const [sWidth, sHeight] = [this.width * this.width, this.height * this.height];
      const rds = Math.sqrt(sWidth + sHeight) / 2;
      this.radius = parseInt(rds, 10) + 1;
    }, 0);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.nb-bet-flex-box {
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
  z-index: 90;
  .wave {
    position: absolute;
    display: block;
    border-radius: 100%;
    background: rgba(0,0,0,0.1);
  }
}
</style>

