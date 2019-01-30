<template>
  <svg v-bind="attrs" class="nb-head-close" xmlns="http://www.w3.org/2000/svg" version="1.1">
    <g class="nb-head-close" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" opacity="0.3">
      <g class="nb-head-close" transform="translate(-347, -38)" :fill="fill">
        <path :d="data" class="nb-head-close" transform="translate(353, 44) rotate(-315) translate(-353, -44)"></path>
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'BetBoxClose',
  props: {
    size: String,
    color: String,
  },
  computed: {
    height() {
      const size = this.size || '0.13';
      const arr = size.match(/(\d+(\.\d+)?)/);
      return +(arr ? arr[1] : '0.13');
    },
    width() {
      return this.height;
    },
    fill() {
      return this.color || '#FFF';
    },
    attrs() {
      return {
        width: `${this.width}rem`,
        height: `${this.height}rem`,
        viewBox: '0 0 13 13',
      };
    },
    data() {
      let dt = 'M354.313708,43.3137085 L361.313708,43.3137085 L361.313708,45.3137085 L354.313708,45.3137085 ';
      dt += 'L354.313708,52.3137085 L352.313708,52.3137085 L352.313708,45.3137085 L345.313708,45.3137085 ';
      dt += 'L345.313708,43.3137085 L352.313708,43.3137085 L352.313708,36.3137085 L354.313708,36.3137085 ';
      dt += 'L354.313708,43.3137085 Z';
      return dt;
    },
  },
};
</script>

