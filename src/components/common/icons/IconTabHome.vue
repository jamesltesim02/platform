<template>
  <svg width=".22rem" height=".24rem" viewBox="0 0 30 32">
    <defs>
      <filter x="-1.9%" y="-17.3%" width="103.7%" height="126.9%" filterUnits="objectBoundingBox" id="filter-1">
        <feOffset dx="0" dy="-2" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
        <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
        <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.1 0" type="matrix" in="shadowBlurOuter1" result="shadowMatrixOuter1"></feColorMatrix>
        <feMerge>
          <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
          <feMergeNode in="SourceGraphic"></feMergeNode>
        </feMerge>
      </filter>
    </defs>
    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g transform="translate(-23.000000, -2056.000000)" :fill="color">
        <g filter="url(#filter-1)" transform="translate(0.000000, 2053.000000)">
          <g>
            <g transform="translate(14.000000, 0.000000)">
              <g transform="translate(13.000000, 9.000000)">
                <path d="M10,23.5000034 L8.14728015,23.5000034 L2.15085714,23.5000034 C1.24663813,23.5000034 0.5,22.8050237 0.5,21.9286703 L0.5,8.4288979 C0.5,7.93221548 0.745349217,7.46736005 1.15801922,7.17094971 L10.0026222,0.817951442 C10.5929187,0.394016186 11.407367,0.394016186 11.9977013,0.817978534 L20.8419764,7.17094654 C21.2546508,7.46736005 21.5,7.93221548 21.5,8.4288979 L21.5,21.9286703 C21.5,22.804962 20.7534236,23.5000034 19.8494286,23.5000034 L12,23.5000034 L12,19 C12,18.4477153 11.5522847,18 11,18 C10.4477153,18 10,18.4477153 10,19 L10,23.5000034 Z" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
</template>
<script>
import Icon from './Icon';

export default { extends: Icon };
</script>
