<template>
<ul class="date-type-bar">
  <v-touch
    tag="li"
    v-for="(t, i) in tabs"
    :key="i"
    :class="{
      active: i === current
    }"
    @tap="$emit('update:current', i)"
  >{{$t(t)}}</v-touch>
</ul>
</template>
<script>
export default {
  props: {
    current: {
      default: 0,
    },
    tabs: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
    };
  },
};
</script>
<style lang="less">
.date-type-bar {
  display: flex;
  background: @page1HeaderBackground;
  box-shadow: @page1HeaderBoxshadow;
  color: @page1Font2;
  font-size: .15rem;
  li {
    position: relative;
    width: 100%;
    line-height: .44rem;
    text-align: center;
    &.active {
      color: @page1FontH1;
      &.active::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 10rem;
        background: #02FFFF;
        height: .02rem;
        width: .24rem;
      }
    }
  }
}
</style>
