<template>
  <svg class="bet-alert-icon" v-bind="attrs" xmlns="http://www.w3.org/2000/svg" version="1.1" :class="aClass">
    <path :d="data"></path>
  </svg>
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'BetDetailAlertUp',
  props: {
    size: String,
    color: String,
    type: String,
  },
  computed: {
    aClass() {
      if (/^(top|up|0)$/i.test(this.type)) {
        return 'direct-to-top';
      } else if (/^(right|1)$/i.test(this.type)) {
        return 'direct-to-right';
      } else if (/^(bottom|down|2)$/i.test(this.type)) {
        return 'direct-to-bottom';
      }
      return 'direct-to-left';
    },
    height() {
      const size = this.size || '0.16';
      const arr = size.match(/(\d+(\.\d+)?)/);
      return +(arr ? arr[1] : '0.16');
    },
    width() {
      return this.height;
    },
    attrs() {
      return {
        width: `${this.width}rem`,
        height: `${this.height}rem`,
        fill: this.color || '#C0C0C0',
        stroke: 'none',
        viewBox: '0 0 16 16',
        'fill-rule': 'nonzero',
      };
    },
    data() {
      let dt = 'M8,16 C3.581722,16 0,12.418278 0,8 C0,3.581722 3.581722,0 8,0 C12.418278,0 16,3.581722 16,8 C16,12.418278 ';
      dt += '12.418278,16 8,16 Z M8.83205029,5.24807544 C8.75881544,5.13822315 8.66455248,5.0439602 8.5547002,4.97072534 ';
      dt += 'C8.09517151,4.66437288 7.47430216,4.78854675 7.16794971,5.24807544 L5.0364668,8.4452998 C4.92695512,8.60956732 ';
      dt += '4.86851709,8.80257501 4.86851709,9 C4.86851709,9.55228475 5.31623234,10 5.86851709,10 L10.1314829,10 ';
      dt += 'C10.3289079,10 10.5219156,9.94156197 10.6861831,9.83205029 C11.1457118,9.52569784 11.2698857,8.90482849 ';
      dt += '10.9635332,8.4452998 L8.83205029,5.24807544 Z';
      return dt;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.direct-to-right {
  transform: rotate(90deg);
}
.direct-to-bottom {
  transform: rotate(180deg);
}
.direct-to-left {
  transform: rotate(270deg);
}
</style>
