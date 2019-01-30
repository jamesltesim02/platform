<template>
  <svg class="bet-alert-icon" v-bind="attrs" xmlns="http://www.w3.org/2000/svg" version="1.1">
    <path :d="data"></path>
  </svg>
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'BetDetailAlertPause',
  props: {
    size: String,
    color: String,
  },
  computed: {
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
      let dt = 'M8,0 C12.418278,0 16,3.581722 16,8 C16,12.418278 12.418278,16 8,16 C3.581722,16 0,12.418278 0,8 ';
      dt += 'C0,3.581722 3.581722,0 8,0 Z M6,5 C5.44771525,5 5,5.44771525 5,6 L5,10 C5,10.5522847 5.44771525,11 ';
      dt += '6,11 C6.55228475,11 7,10.5522847 7,10 L7,6 C7,5.44771525 6.55228475,5 6,5 Z M10,5 C9.44771525,5 ';
      dt += '9,5.44771525 9,6 L9,10 C9,10.5522847 9.44771525,11 10,11 C10.5522847,11 11,10.5522847 11,10 L11,6 ';
      dt += 'C11,5.44771525 10.5522847,5 10,5 Z';
      return dt;
    },
  },
};
</script>

