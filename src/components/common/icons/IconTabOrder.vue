<template>
  <svg width=".25rem" height=".27rem" viewBox="0 0 28 31">
    <defs>
      <filter x="-1.9%" y="-17.3%" width="103.7%" height="126.9%" filterUnits="objectBoundingBox" id="filter-1">
        <feOffset dx="0" dy="-2" in="SourceAlpha" result="shadowOffsetOuter1"/>
        <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"/>
        <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.1 0" type="matrix" in="shadowBlurOuter1" result="shadowMatrixOuter1"/>
        <feMerge>
          <feMergeNode in="shadowMatrixOuter1"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g transform="translate(-324.000000, -2056.000000)" :fill="color" fill-rule="nonzero">
        <g filter="url(#filter-1)" transform="translate(0.000000, 2053.000000)">
          <g>
            <g transform="translate(314.000000, 0.000000)">
              <g>
                <g transform="translate(14.000000, 9.163265)">
                  <path d="M2,2 L2,21 L18,21 L18,10 C18,5.581722 14.418278,2 10,2 L2,2 Z M2,0 L10,0 C15.5228475,-1.01453063e-15 20,4.4771525 20,10 L20,21 C20,22.1045695 19.1045695,23 18,23 L2,23 C0.8954305,23 1.3527075e-16,22.1045695 0,21 L0,2 C-1.3527075e-16,0.8954305 0.8954305,2.02906125e-16 2,0 Z M6,7 C5.44771525,7 5,7.44771525 5,8 C5,8.55228475 5.44771525,9 6,9 L9,9 C9.55228475,9 10,8.55228475 10,8 C10,7.44771525 9.55228475,7 9,7 L6,7 Z M6,11 C5.44771525,11 5,11.4477153 5,12 C5,12.5522847 5.44771525,13 6,13 L13,13 C13.5522847,13 14,12.5522847 14,12 C14,11.4477153 13.5522847,11 13,11 L6,11 Z M6,15 C5.44771525,15 5,15.4477153 5,16 C5,16.5522847 5.44771525,17 6,17 L13,17 C13.5522847,17 14,16.5522847 14,16 C14,15.4477153 13.5522847,15 13,15 L6,15 Z" />
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
