<template>
<div>
  <expand-all-bar
    :expanded="expandAll"
    @update:expanded="toggleExpandAll"
  />
  <div class="match-detail-games">
    <detail-game-item
      v-for="(g, i) in matchInfo.games"
      v-if="optionLength(g) > 0"
      :key="i"
      :expanded.sync="g.expanded"
      :game="g"
      :match="matchInfo"
    />
  </div>
</div>
</template>
<script>
import ExpandAllBar from './ExpandAllBar';
import DetailGameItem from './DetailGameItem';

export default {
  props: ['matchInfo'],
  data() {
    return {
      // expandedList: [],
    };
  },
  computed: {
    expandAll() {
      if (!this.matchInfo || !this.matchInfo.games) {
        return false;
      }

      return this.matchInfo.games.reduce((acc, curr) => acc || curr.expanded, false);
    },
  },
  components: {
    ExpandAllBar,
    DetailGameItem,
  },
  methods: {
    optionLength(g) {
      if (!Array.isArray(g[0])) {
        return g.options.length;
      }

      return g.options.reduce((acc, curr) => acc || curr.length, 0);
    },
    toggleExpandAll(state) {
      this.$emit('toggle-expand-all', state);
    },
  },
};
</script>
<style>
.match-detail-games {
  padding: 0 .1rem;
}
</style>
