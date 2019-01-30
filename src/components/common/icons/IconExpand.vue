<template>
  <i
    class="icon icon-expand"
    :class="{expanded: expanded}"
  ></i>
</template>
<script>
export default {
  props: {
    expanded: {
      default: false,
    },
  },
};
</script>
<style lang="less">
.icon.icon-expand {
  position: relative;
  display: inline-block;
  width: .16rem;
  height: .16rem;
  &::before,&::after {
    content: "";
    position: absolute;
    background: #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &::before {
    width: 100%;
    height: .02rem;
  }
  &::after {
    width: .02rem;
    height: 100%;
    transition: background-color @actionTransitionDuration;
  }
  &.expanded::after {
    background: rgba(255, 255, 255, 0);
  }
}
</style>
