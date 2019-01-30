<template>
  <svg v-bind="attrs" class="nb-close" xmlns="http://www.w3.org/2000/svg" version="1.1">
    <g class="nb-close" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g class="nb-close" transform="translate(-335, -164)" :fill="fill" fill-rule="nonzero">
        <g class="nb-close" transform="translate(10, 154)">
          <g class="nb-close" transform="translate(15, 10)">
            <path class="nb-close" :d="data"></path>
          </g>
        </g>
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'BetDetailClose',
  props: {
    size: String,
    color: String,
  },
  computed: {
    height() {
      const size = this.size || '0.2';
      const arr = size.match(/(\d+(\.\d+)?)/);
      return +(arr ? arr[1] : '0.2');
    },
    width() {
      return this.height;
    },
    fill() {
      return this.color || '#C0C0C0';
    },
    attrs() {
      return {
        width: `${this.width}rem`,
        height: `${this.height}rem`,
        viewBox: '0 0 20 20',
        'fill-rule': 'nonzero',
      };
    },
    data() {
      let dt = 'M320,18 C324.418278,18 328,14.418278 328,10 C328,5.581722 324.418278,2 320,2 C315.581722,2 ';
      dt += '312,5.581722 312,10 C312,14.418278 315.581722,18 320,18 Z M320,8.58578644 L317.87868,6.46446609 ';
      dt += 'C317.488155,6.0739418 316.85499,6.0739418 316.464466,6.46446609 C316.073942,6.85499039 ';
      dt += '316.073942,7.48815536 316.464466,7.87867966 L318.585786,10 L316.464466,12.1213203 ';
      dt += 'C316.073942,12.5118446 316.073942,13.1450096 316.464466,13.5355339 C316.85499,13.9260582 ';
      dt += '317.488155,13.9260582 317.87868,13.5355339 L320,11.4142136 L322.12132,13.5355339 ';
      dt += 'C322.511845,13.9260582 323.14501,13.9260582 323.535534,13.5355339 C323.926058,13.1450096 ';
      dt += '323.926058,12.5118446 323.535534,12.1213203 L321.414214,10 L323.535534,7.87867966 ';
      dt += 'C323.926058,7.48815536 323.926058,6.85499039 323.535534,6.46446609 C323.14501,6.0739418 ';
      dt += '322.511845,6.0739418 322.12132,6.46446609 L320,8.58578644 Z M320,20 C314.477153,20 310,15.5228475 310,10 ';
      dt += 'C310,4.4771525 314.477153,0 320,0 C325.522847,0 330,4.4771525 330,10 C330,15.5228475 325.522847,20 320,20 Z';
      return dt;
    },
  },
};
</script>

