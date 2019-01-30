<template>
  <svg v-bind="attrs" xmlns="http://www.w3.org/2000/svg" version="1.1">
    <path :d="data"></path>
  </svg>
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'KeyboardHide',
  props: {
    size: String,
    color: String,
  },
  computed: {
    height() {
      const size = this.size || '0.24';
      const arr = size.match(/(\d+(\.\d+)?)/);
      return +(arr ? arr[1] : '0.24');
    },
    width() {
      return this.height * (17 / 12);
    },
    attrs() {
      return {
        width: `${this.width}rem`,
        height: `${this.height}rem`,
        fill: this.color || '#fff',
        stroke: 'none',
        viewBox: '0 0 34 24',
        'fill-rule': 'nonzero',
      };
    },
    data() {
      let dt = 'M2,1 C1.44771525,1 1,1.44771525 1,2 L1,17 C1,17.5522847 1.44771525,18 2,18 L32,18 C32.5522847,18 ';
      dt += '33,17.5522847 33,17 L33,2 C33,1.44771525 32.5522847,1 32,1 L2,1 Z M2,0 L32,0 C33.1045695,0 ';
      dt += '34,0.8954305 34,2 L34,17 C34,18.1045695 33.1045695,19 32,19 L2,19 C0.8954305,19 0,18.1045695 ';
      dt += '0,17 L0,2 C0,0.8954305 0.8954305,0 2,0 Z M3,3 L3,6 L6,6 L6,3 L3,3 Z M8,3 L8,6 L11,6 L11,3 L8,3 Z ';
      dt += 'M13,3 L13,6 L16,6 L16,3 L13,3 Z M18,3 L18,6 L21,6 L21,3 L18,3 Z M23,3 L23,6 L26,6 L26,3 ';
      dt += 'L23,3 Z M28,3 L28,6 L31,6 L31,3 L28,3 Z M5,8 L5,11 L8,11 L8,8 L5,8 Z M10,8 L10,11 L13,11 L13,8 ';
      dt += 'L10,8 Z M15,8 L15,11 L18,11 L18,8 L15,8 Z M20,8 L20,11 L23,11 L23,8 L20,8 Z M25,8 L25,11 L28,11 ';
      dt += 'L28,8 L25,8 Z M3,13 L3,16 L6,16 L6,13 L3,13 Z M8,13 L8,16 L26,16 L26,13 L8,13 Z M28,13 L28,16 ';
      dt += 'L31,16 L31,13 L28,13 Z M17,24 L13,21 L21,21 L17,24 Z';
      return dt;
    },
  },
};
</script>
