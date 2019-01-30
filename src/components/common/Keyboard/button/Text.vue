<template>
  <div class="nb-text" v-bind="attrs">
    <slot></slot>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'NBText',
  props: {
    size: String,
    color: String,
    background: String,
    weight: String,
  },
  computed: {
    attrs() {
      return Object.assign({}, this.$attrs, {
        style: {
          'font-size': this.size || '.17rem',
          color: this.color || '#fff',
          background: this.background || 'transparent',
          'font-weight': this.weight || 'normal',
        },
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.nb-text {
  display: inline-block;
  font-family: PingFangSC-Medium;
}
</style>

