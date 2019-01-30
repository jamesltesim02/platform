<template>
  <svg width=".24rem" height=".24rem" viewBox="0 0 24 24">
    <defs>
      <linearGradient x1="24.1422287%" y1="3.88141257%" x2="78.5807292%" y2="83.0973307%" id="lol-linear-1">
        <stop stop-color="#DCEFFF" offset="0%"></stop>
        <stop stop-color="#A5B3C0" offset="100%"></stop>
      </linearGradient>
      <linearGradient x1="24.1422287%" y1="3.88141257%" x2="100%" y2="106.530762%" id="lol-linear-2">
        <stop stop-color="#E89341" offset="0%"></stop>
        <stop stop-color="#53515E" offset="100%"></stop>
      </linearGradient>
    </defs>
    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g :fill="[multicolor ? 'url(#lol-linear-2)' : 'url(#lol-linear-1)']">
        <path d="M12,0 C5.372583,-4.05812251e-16 8.11624501e-16,5.372583 0,12 C-8.11624501e-16,18.627417 5.372583,24 12,24 C18.627417,24 24,18.627417 24,12 C24,8.81740212 22.7357179,5.76515517 20.4852814,3.51471863 C18.2348448,1.26428208 15.1825979,1.94877915e-16 12,0 Z M16.955,19.1 L6.77,19.1 L6.77,18.185 L6.795,18.185 L8.645,15.88 L8.645,7.38 L6.645,4.91 L13.335,4.91 L11.335,7.38 L11.335,15.79 L15.41,15.79 L18.28,13.29 L16.955,19.1 Z" />
      </g>
    </g>
</svg>
</template>
<script>
export default {
  props: {
    multicolor: {
      default: false,
      type: Boolean,
    },
  },
};
</script>
