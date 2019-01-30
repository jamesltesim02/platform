<template>
  <transition name="inputKey">
    <div class="nb-input-keyboard" v-if="data.showInput">
      <div class="set-body">
        <div class="set-cover" @touchstart.stop @click.stop @touchend.stop="submitFun"></div>
        <div class="set-box">
          <div class="set-title">{{data.title}}</div>
          <like-input :data.sync="data" type="set"></like-input>
        </div>
      </div>
      <keyboard :data.sync="data" :max="nMax" type="set" @submit="submitFun" />
    </div>
  </transition>
</template>

<script>
import LikeInput from './LikeInput.vue';
import Keyboard from './Keyboard/index.vue';

export default {
  inheritAttrs: false,
  name: 'SetKeyboard',
  data() {
    return {
      nData: { title: '' },
      fun: null,
    };
  },
  props: {
    data: Object,
    max: [Number, String],
  },
  components: {
    LikeInput,
    Keyboard,
  },
  computed: {
    nMax() {
      return this.max || '2000000';
    },
  },
  methods: {
    submitFun() {
      const { data } = this;
      data.hide = true;
      data.value = data.value || data.placeholder;
      data.value = /^\d+\.$/.test(data.value) ? data.value.slice(0, -1) : data.value;
      this.$emit('update:data', data);
      data.showInput = false;
      if (this.fun && typeof this.fun === 'function') {
        this.fun(data.value);
      }
      setTimeout(() => { this.$emit('update:data', data); }, 100);
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.inputKey-enter-active, .inputKey-leave-active {
  transition: all 0.15s ease-out;
}
.inputKey-enter, .inputKey-leave-active{
  opacity: 0;
}
.nb-input-keyboard {
  position: fixed;
  z-index: 999999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .set-body {
    width: 100%;
    height: 100%;
    position: relative;
    .set-cover {
      width: 100%;
      height: 100%;
      background: #000;
      opacity: .7;
    }
    .set-box {
      position: absolute;
      width: 2.8rem;
      height: 1.04rem;
      left: .475rem;
      top: 2rem;
      border-radius: .1rem;
      background:  #57595E;
      padding: .05rem 0 .2rem 0;
      .set-title {
        width: 2.5rem;
        height: .4rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin: 0 auto;
        color: #FFF;
        font-family: PingFangSC-Medium;
        font-size: .17rem;
      }
    }
  }
}
</style>
