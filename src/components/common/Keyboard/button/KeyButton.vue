<template>
  <div v-if="text" v-bind="attrs" @touchstart.stop="sFun" @touchmove="mFun" @touchend.stop="eFun">
    <span v-for="wave in waves" :key="wave.id" class="wave" :style="wave.style"></span>
    <n-b-text v-if="textType === 'text'">{{text}}</n-b-text>
    <clear-letter v-else-if="textType === 'clear'" />
    <keyboard-hide v-else-if="textType === 'hide'" />
  </div>
</template>

<script>
import NBText from './Text.vue';
import ClearLetter from './ClearLetter.vue';
import KeyboardHide from './KeyboardHide.vue';

export default {
  inheritAttrs: false,
  name: 'KeyButton',
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
    };
  },
  props: {
    data: Object,
    text: String,
    max: String,
    type: String,
  },
  computed: {
    isBet() {
      return /bet/i.test(this.type);
    },
    kValue() {
      return /(ok|sub|com|[\u4e00-\u9fa5])/i.test(this.text) ? 'submit' : this.text;
    },
    maxStr() {
      return this.max || '';
    },
    dNum() {
      if (this.data.format) {
        const fmt = this.data.format;
        if (/^\d{1,2}$/.test(fmt)) {
          return +fmt;
        } else if (`${fmt}`.indexOf('.') > -1) {
          return fmt.length - fmt.indexOf('.') - 1;
        }
      }
      return 0;
    },
    bWidth() {
      let width = '';
      if (/(50|100|200|max)/i.test(this.kValue)) {
        width = '.775rem';
      } else if (/(clear|back)/i.test(this.kValue)) {
        width = this.isBet ? '1.05rem' : '.95rem';
      } else if (/([0-9.]|hide)/i.test(this.kValue)) {
        width = this.isBet ? '.5rem' : '.85rem';
      } else if (/(ok|sub)/i.test(this.kValue)) {
        width = this.isBet ? '3.25rem' : '.95rem';
      }
      return width;
    },
    bHeight() {
      let height = '.4rem';
      if (!this.isBet && /(ok|sub|back|clear)/i.test(this.kValue)) {
        height = '.97rem';
      } else if (!this.isBet) {
        height = '.46rem';
      }
      return height;
    },
    background() {
      if (/(ok|sub|\.|hide)/i.test(this.kValue)) {
        return /(ok|sub)/i.test(this.kValue) ? '#53C0FF' : '#111113';
      } else if (this.isBet) {
        return this.clicked ? '#777777' : '#A0A0A0';
      }
      return '#37393D';
    },
    attrs() {
      return Object.assign({}, this.$attrs, {
        class: this.isBet && /sub/i.test(this.kValue) ? 'nb-keyboard-button-none' : 'nb-keyboard-button',
        type: this.isBet ? 'bet' : '',
        style: {
          width: this.bWidth,
          height: this.bHeight,
          background: this.background,
        },
      });
    },
    textType() {
      if (/(clear|back)/i.test(this.kValue)) {
        return 'clear';
      } else if (/hide/i.test(this.kValue)) {
        return 'hide';
      }
      return 'text';
    },
  },
  methods: {
    enableMenu(e) {
      e.returnValue = false;
    },
    changeData() {
      const { data } = this;
      [data.hide, data.click] = [false, false];
      let [id, val] = [data.id || 0, data.value];
      if (data.value.constructor === Array) {
        id = id < 0 || id > data.value.length ? 0 : id;
        val = data.value[id];
      }
      if (/(50|100|200|max)/i.test(this.kValue)) {
        let newVal = +(val || 0);
        if (/max/i.test(this.kValue)) {
          newVal += +(this.max || 0);
        } else if (!this.max || +this.kValue <= +this.max) {
          newVal += +this.kValue;
        }
        val = newVal < +this.max ? `${newVal}` : val;
      } else if (/(clear|back)/i.test(this.kValue)) {
        val = val ? `${val}`.slice(0, -1) : '';
      } else if (/[0-9]/i.test(this.kValue)) {
        let text = `${val}${this.kValue}`;
        text = text.replace(/^0+([1-9].*)?/, '$1');
        text = !text || /^\./.test(text) ? `0${text}` : text;
        const len = text.length - text.indexOf('.') - 1;
        if (text.indexOf('.') > -1 && len > this.dNum) {
          text = text.slice(0, this.dNum - len);
        }
        if (!this.max || +text <= +this.max) {
          val = text;
        }
      } else if (/\./i.test(this.kValue)) {
        val += /\./.test(val) ? '' : '.';
        val = `${val}`.replace(/^\.([\d.]+)?/, '$1');
      } else if (/hide/i.test(this.kValue)) {
        data.hide = true;
      } else if (/(ok|sub)/i.test(this.kValue)) {
        data.click = true;
      }
      if (data.value.constructor === Array) {
        data.value[id] = val;
      } else {
        data.value = val;
      }
      this.$emit('change', data);
    },
    sFun(e) {
      if (!this.clicked) {
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
      if (this.clicked) {
        this.changeData();
        this.clicked = false;
      }
    },
    getLeft(el) {
      return el.offsetParent ? el.offsetLeft + this.getLeft(el.offsetParent) : el.offsetLeft;
    },
    getTop(el) {
      return el.offsetParent ? el.offsetTop + this.getTop(el.offsetParent) : el.offsetTop;
    },
    getPara(e) {
      this.id += 1;
      [this.left, this.top] = [this.getLeft(this.$el), this.getTop(this.$el)];
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
  components: {
    NBText,
    ClearLetter,
    KeyboardHide,
  },
  mounted() {
    this.$el.oncontextmenu = this.enableMenu;
    this.width = this.$el.offsetWidth;
    this.height = this.$el.offsetHeight;
    const [sWidth, sHeight] = [this.width * this.width, this.height * this.height];
    const rds = Math.sqrt(sWidth + sHeight) / 2;
    this.radius = parseInt(rds, 10) + 1;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.nb-keyboard-button, .nb-keyboard-button-none {
  position: relative;
  z-index: 90;
  display: flex;
  justify-content: center;
  align-items: center;
  height: .4rem;
  color: #fff;
  border-radius: .04rem;
  user-select: none;
  cursor: pointer;
  overflow: hidden;
  -webkit-tap-highlight-color: transparent;
  .wave {
    position: absolute;
    display: block;
    border-radius: 100%;
    background: #000;
    opacity: .1;
  }
}
.nb-keyboard-button {
  margin-bottom: .05rem;
}
</style>

