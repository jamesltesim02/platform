<template>
  <div
    class="expand-transition"
    :style="{height: height}"
    ref="el"
  >
    <slot />
  </div>
</template>
<script>
export default {
  props: ['expanded'],
  data() {
    return {
      expandStatus: false,
      height: 0,
      el: null,
      defaultHeight: 0,
    };
  },
  watch: {
    expanded(n) {
      if (!n) {
        this.expandClose();
      } else {
        this.expand();
      }
    },
  },
  mounted() {
    this.el = this.$refs.el;
    if (this.expanded) {
      this.expand();
    }
  },
  methods: {
    expandClose() {
      const elHeight = this.el.offsetHeight;
      this.height = `${elHeight}px`;
      this.$nextTick(() => {
        this.height = '0px';
      });
    },
    async expand() {
      const h = await this.getHeight();
      this.height = `${h}px`;
      this.$nextTick(() => {
        setTimeout(() => {
          this.height = 'auto';
        }, 160);
      });
    },
    getHeight() {
      return new Promise((resolve) => {
        this.el.style.position = 'absolute';
        this.el.style.visibility = 'hidden';
        this.el.style.width = '100%';
        this.height = 'auto';
        this.$nextTick(() => {
          const elHeight = this.el.offsetHeight;
          this.el.style.position = null;
          this.el.style.visibility = null;
          this.el.style.width = null;
          this.height = 0;
          setTimeout(() => resolve(elHeight));
        });
      });
    },
  },
};
</script>
<style lang="less">
.expand-transition {
  transition: height @animationTransitionDuration;
  overflow: hidden;
}
</style>
