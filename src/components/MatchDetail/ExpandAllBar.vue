<template>
  <v-touch
    class="expand-all-bar"
    @tap="$emit('update:expanded', !expanded)"
  >
    <icon-all />
    <span>全部玩法</span>
    <div>
      <icon-expand :expanded="expanded" />
    </div>
  </v-touch>
</template>
<script>
import IconAll from '../common/icons/IconAll';
import IconExpand from '../common/icons/IconExpand';

export default {
  props: ['expanded'],
  components: {
    IconAll,
    IconExpand,
  },
};
</script>
<style lang="less">
.expand-all-bar {
  display: flex;
  align-items: center;
  height: .44rem;
  padding: 0 .1rem;
  span {
    flex-grow: 1;
    margin-left: .1rem;
    font-size: .13rem;
  }
  button {
    height: 100%;
    padding: 0 .1rem;
    margin-right: -.1rem;
  }
}
</style>
