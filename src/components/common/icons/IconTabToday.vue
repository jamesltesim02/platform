<template>
  <svg width=".23rem" height=".25rem" viewBox="0 0 31 33">
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
      <g transform="translate(-173.000000, -2055.000000)" :fill="color" fill-rule="nonzero">
        <g filter="url(#filter-1)" transform="translate(0.000000, 2053.000000)">
          <g>
            <g transform="translate(164.000000, 0.000000)">
              <g>
                <path d="M16.8095238,12 C15.8101514,12 15,12.8954305 15,14 L15,29 C15,30.1045695 15.8101514,31 16.8095238,31 L32.1904762,31 C33.1898486,31 34,30.1045695 34,29 L34,14 C34,12.8954305 33.1898486,12 32.1904762,12 L16.8095238,12 Z M16.68,10 L32.32,10 C34.3524079,10 36,11.790861 36,14 L36,29 C36,31.209139 34.3524079,33 32.32,33 L16.68,33 C14.6475921,33 13,31.209139 13,29 L13,14 C13,11.790861 14.6475921,10 16.68,10 Z M19,8 L19,8 C19.5522847,8 20,8.44771525 20,9 L20,11 C20,11.5522847 19.5522847,12 19,12 L19,12 C18.4477153,12 18,11.5522847 18,11 L18,9 C18,8.44771525 18.4477153,8 19,8 Z M23.6568542,23.6066017 L29.3137085,17.9497475 C29.7042328,17.5592232 30.3373978,17.5592232 30.7279221,17.9497475 C31.1184464,18.3402718 31.1184464,18.9734367 30.7279221,19.363961 L24.363961,25.7279221 C24.1686989,25.9231842 23.9127766,26.0208153 23.6568542,26.0208153 C23.4009319,26.0208153 23.1450096,25.9231842 22.9497475,25.7279221 L18.7071068,21.4852814 C18.3165825,21.0947571 18.3165825,20.4615921 18.7071068,20.0710678 C19.0976311,19.6805435 19.7307961,19.6805435 20.1213203,20.0710678 L23.6568542,23.6066017 Z M30,8 C30.5522847,8 31,8.44771525 31,9 L31,11 C31,11.5522847 30.5522847,12 30,12 C29.4477153,12 29,11.5522847 29,11 L29,9 C29,8.44771525 29.4477153,8 30,8 Z" />
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
