<template>
  <div class="list-page">
    <div class="page-header"><slot name="header" /></div>
    <div class="page-content" ref="scroller"><slot /></div>
    <div class="page-footer"><slot name="footer" /></div>
  </div>
</template>

<script>
const SCROLL_BOTTOM_HEIGHT = 20;
export default {
  methods: {
    scorllTo(top) {
      this.$refs.scroller.scrollTop = top;
    },
  },
  mounted() {
    const sc = this.$refs.scroller;
    let [trigged, scrTop] = [false, sc.scrollTop];
    sc.addEventListener('scroll', (e) => {
      const toBottom = sc.scrollHeight - sc.clientHeight - sc.scrollTop;
      if (toBottom <= SCROLL_BOTTOM_HEIGHT && sc.scrollTop > scrTop) {
        if (!trigged) {
          trigged = true;
          setTimeout(() => { trigged = false; }, 500);
          this.$emit('scrollBottom', e);
        }
      }
      scrTop = sc.scrollTop;
    });
  },
};
</script>

<style lang="less">
.list-page {
  display: flex;
  flex-direction: column;
  color: @page1Font1;
  height: 100%;
  .page-header {
    position: relative;
    z-index: 3;
  }
  .page-content {
    position: relative;
    flex-grow: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    padding-bottom: .1rem;
    z-index: 1;
  }
  .page-footer {
    position: relative;
    z-index: 2;
  }
}
</style>
