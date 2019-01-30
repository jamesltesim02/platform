<template>
  <transition :name="kFade">
    <div :class="kClass" v-bind="$attrs" v-if="!data.hide" @click.stop @touchend.stop>
      <div class="box" :style="{ 'width':lWidth }">
        <key-button :data="data" v-for="k in lAttrs" :key="k.id" v-bind="k" @change="change" />
      </div>
      <div class="box" :style="{ 'width':rWidth }" v-if="rAttrs.length">
        <key-button :data="data" v-for="k in rAttrs" :key="k.id" v-bind="k" @change="change" />
      </div>
    </div>
  </transition>
</template>

<script>
import KeyButton from './button/KeyButton.vue';

export default {
  inheritAttrs: false,
  name: 'Keyboard',
  data() {
    return {
      kClass: '',
      kFade: '',
      lList: [],
      rList: [],
      lAttrs: [],
      rAttrs: [],
      lWidth: '',
      rWidth: '',
      fun: null,
    };
  },
  props: {
    data: Object,
    max: String,
    type: String,
    format: String,
    submit: Function,
    touchend: Function,
    click: Function,
    tap: Function,
  },
  computed: {
    btnText() {
      return this.btn.text || this.text;
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
  },
  watch: {
    max() {
      const [lArr, rArr] = [this.lAttrs, this.rAttrs];
      for (let i = 0; i < lArr.length; i += 1) {
        lArr[i].max = this.max || '';
      }
      for (let i = 0; i < rArr.length; i += 1) {
        rArr[i].max = this.max || '';
      }
      [this.lAttrs, this.rAttrs] = [lArr, rArr];
    },
  },
  methods: {
    change(e) {
      this.$emit('update:data', e);
      if (/bet/i.test(this.type)) this.$emit('change', e);
      if (e.click && this.fun) this.fun(e.value);
    },
  },
  components: {
    KeyButton,
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
    this.fun = this.fun || (this.click && typeof this.click === 'function' ? this.click : null);
    this.fun = this.fun || (this.tap && typeof this.tap === 'function' ? this.tap : null);
    this.fun = this.fun || (this.touchend && typeof this.touchend === 'function' ? this.touchend : null);
    this.fun = this.fun || (this.submit && typeof this.submit === 'function' ? this.submit : null);
    const isBet = /bet/i.test(this.type);
    this.kFade = isBet ? 'bet' : 'set';
    this.kClass = `nb-keyboard nb-${this.kFade}-keyboard`;
    if (isBet) {
      this.lList = '50,100,200,max,1,2,3,4,5,6,7,8,9,0,clear,确认投注'.split(',');
      this.rList = ''.split(',');
      [this.lWidth, this.rWidth] = ['3.25rem', '0'];
    } else {
      const { data } = this;
      let num = data.value || data.placeholder || '';
      num = num.indexOf('.') > -1 ? num : `${num}.00`;
      const len = num.length - num.indexOf('.') - 1;
      const dLen = len - this.dNum;
      num = this.dNum < len ? num.slice(0, -dLen) : `${num}${new Array(dLen + 1).join('0')}`;
      data.placeholder = num.replace(/^(.*)\.$/, '$1');
      data.value = '';
      this.$emit('update:data', data);
      this.lList = '1,2,3,4,5,6,7,8,9,.,0,hide'.split(',');
      this.rList = 'clear,确认'.split(',');
      [this.lWidth, this.rWidth] = ['2.7rem', '1rem'];
    }
    [this.lAttrs, this.rAttrs] = [[], []];
    for (let i = 0; i < this.lList.length; i += 1) {
      this.lAttrs.push({
        id: i + 10,
        text: this.lList[i],
        max: this.max || '',
        type: isBet ? 'bet' : '',
      });
    }
    for (let i = 0; i < this.rList.length; i += 1) {
      this.rAttrs.push({
        id: i + 50,
        text: this.rList[i],
        max: this.max || '',
        type: isBet ? 'bet' : '',
      });
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.bet-enter-active, .bet-leave-active {
  transition: all 0.15s ease-out;
}
.bet-enter, .bet-leave-active{
  transform: scaleY(0);
}
.set-enter-active {
  transition: all 0.25s ease-out;
}
.set-leave-active{
  transition: all 0.25s ease-in;
}
.set-enter{
  transform: translateY(3rem);
}
.set-leave-active{
  transform: translateY(3rem);
}
.nb-keyboard {
  display: flex;
  align-items: center;
  .box {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    background: transparent;
  }
}
.nb-bet-keyboard {
  width: 3.25rem;
  margin: 0 auto;
  justify-content: space-between;
  .box {
    justify-content: space-between;
  }
}
.nb-set-keyboard {
  position: fixed;
  width: 3.7rem;
  margin: 0 auto;
  left: 0;
  bottom: 0;
  z-index: 999999999;
  justify-content: space-around;
  padding: .05rem .025rem 0 .025rem;
  background: #111113;
  .box {
    justify-content: space-around;
  }
}
</style>

