<template>
  <v-touch
    tag="i"
    class="toggle-button"
    :class="{checked: checked}"
    @tap="$emit('change', !checked)"
  ></v-touch>
</template>
<script>
export default {
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: ['checked'],
};
</script>
<style lang="less">
.toggle-button {
  position: relative;
  display: inline-block;
  width: .52rem;
  height: .32rem;
  background: #FFFFFF;
  border: .01rem solid #E5E5EA;
  border-radius: 10rem;
  text-align: left;
  overflow: hidden;
  transition: all @actionTransitionDuration;
  &::before {
    position: absolute;
    content: "";
    top: .01rem;
    left: .01rem;
    display: inline-block;
    width: .28rem;
    height: .28rem;
    border-radius: 50%;
    background: #fff;
    border: 0 solid rgba(0, 0, 0, 0.04);
    box-shadow: 0 3px 8px 0 rgba(0,0,0,0.15),
                0 1px 1px 0 rgba(0,0,0,0.16),
                0 3px 1px 0 rgba(0,0,0,0.10);
    transition: left @actionTransitionDuration;
  }
  &.checked {
    background: #4CD964;
    border: .01rem solid #4CD964;
    &::before {
      left: .23rem;
    }
  }
}
</style>
