<template>
  <svg width=".24rem" height=".24rem" viewBox="0 0 32 32">
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
      <g transform="translate(-248.000000, -2056.000000)" :fill="color" fill-rule="nonzero">
        <g filter="url(#filter-1)" transform="translate(0.000000, 2053.000000)">
          <g>
            <g transform="translate(240.000000, 0.000000)">
              <g>
                <g transform="translate(12.000000, 9.163265)">
                  <path d="M12,22 C17.5228475,22 22,17.5228475 22,12 C22,6.4771525 17.5228475,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 Z M13,11 L13,6 C13,5.44771525 12.5522847,5 12,5 C11.4477153,5 11,5.44771525 11,6 L11,12 C11,12.5522847 11.4477153,13 12,13 L16,13 C16.5522847,13 17,12.5522847 17,12 C17,11.4477153 16.5522847,11 16,11 L13,11 Z M12,24 C5.372583,24 0,18.627417 0,12 C0,5.372583 5.372583,-3.90798505e-14 12,-3.90798505e-14 C18.627417,-3.90798505e-14 24,5.372583 24,12 C24,18.627417 18.627417,24 12,24 Z" />
                </g>
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
