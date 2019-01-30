<template>
  <svg v-bind="attrs" xmlns="http://www.w3.org/2000/svg" version="1.1" :class="aClass">
    <path :d="data" transform="translate(8.5, 8.5) rotate(-315) translate(-8.5, -8.5)"></path>
  </svg>
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'Arrow',
  props: {
    size: String,
    color: String,
    type: String,
  },
  computed: {
    aClass() {
      if (/^(top|up|0)$/i.test(this.type)) {
        return 'arrow-to-top';
      } else if (/^(right|1)$/i.test(this.type)) {
        return 'arrow-to-right';
      } else if (/^(bottom|down|2)$/i.test(this.type)) {
        return 'arrow-to-bottom';
      }
      return 'arrow-to-left';
    },
    height() {
      const size = this.size || '0.17';
      const arr = size.match(/(\d+(\.\d+)?)/);
      return +(arr ? arr[1] : '0.17');
    },
    width() {
      return (11 / 17) * this.height;
    },
    attrs() {
      return {
        width: `${this.width}rem`,
        height: `${this.height}rem`,
        fill: this.color || '#fff',
        stroke: 'none',
        viewBox: '0 0 11 17',
        'fill-rule': 'nonzero',
      };
    },
    data() {
      let dt = 'M4.48528137,12.4852814 L14.4852814,12.4852814 L14.4852814,14.4852814 L4.48528137,14.4852814 ';
      dt += 'L2.48528137,14.4852814 L2.48528137,2.48528137 L4.48528137,2.48528137 L4.48528137,12.4852814 Z';
      return dt;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.arrow-to-top {
  transform: rotate(90deg);
}
.arrow-to-right {
  transform: rotate(180deg);
}
.arrow-to-bottom {
  transform: rotate(270deg);
}
</style>
