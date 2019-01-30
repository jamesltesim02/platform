<template>
  <div class="fields-list">
    <div class="title">{{title}}</div>
    <div class="lists">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  props: ['title'],
};
</script>
<style lang="less">
.fields-list {
  .title {
    color: @page1Font3;
    line-height: .38rem;
    padding: 0 .1rem;
  }
}
</style>
