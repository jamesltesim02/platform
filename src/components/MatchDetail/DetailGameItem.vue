<template>
  <div class="detail-game-item">
    <v-touch
      class="game-item-title"
      @tap="$emit('update:expanded', !expanded)"
    >
      <game-name
        :sport-id="game.sportID"
        :group-type="game.groupType"
        :bet-stage="game.betStage"
        :game-type="game.gameType"
      />
      <button>
        <icon-arrow
          width=".14rem"
          color="rgba(255, 255, 255, .7)"
          :direction="expanded ? 'up' : 'down'"
        />
      </button>
    </v-touch>
    <expand-transition :expanded="expanded">
      <game-options
        :game="game"
        :match="match"
      />
    </expand-transition>
  </div>
</template>
<script>
import IconArrow from '@/components/common/icons/IconArrow';
import GameName from '@/components/common/GameName';
import ExpandTransition from '@/components/common/ExpandTransition';

import GameOptions from './GameOptions';

export default {
  props: {
    expanded: {
      default: false,
    },
    game: {},
    match: {},
  },
  components: {
    IconArrow,
    GameName,
    ExpandTransition,
    GameOptions,
  },
};
</script>

<style lang="less">
.detail-game-item {
  background: @page1BlockBackground;
  box-shadow: @page1BlockBoxshadow;
  border-radius: 10px;
  margin-bottom: .1rem;
  overflow: hidden;
  &:last-child {
    margin-bottom: 0;
  }

  .game-item-title {
    display: flex;
    height: .38rem;
    align-items: center;
    span {
      flex-grow: 1;
      padding-left: .1rem;
    }
    button {
      height: 100%;
      padding: .1rem;
    }
  }
}
</style>
