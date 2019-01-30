<template>
  <ul class="game-options">
    <li
      v-for="(ocol, ci) in game.options"
      :key="ci"
    >
      <ul
        v-if="Array.isArray(ocol)"
      >
        <li
          v-for="(item, ii) in ocol"
          :key="ii"
        >
          <game-option
            :option="item"
            :game="game"
            :match="match"
            direction="column"
          />
        </li>
      </ul>
      <game-option
        v-else
        :option="ocol"
        :game="game"
        :match="match"
        direction="column"
      />
    </li>
  </ul>
</template>
<script>
import GameOption from '@/components/common/GameOption';

export default {
  props: ['game', 'match'],
  components: {
    GameOption,
  },
};
</script>
<style lang="less">
.game-options {
  border-top: @page1BlockBorder;
  display: flex;
  & > li {
    width: 100%;
    .game-option {
      border-left: @page1BlockBorder;
    }
    &:first-child  .game-option {
      border-left: 0;
    }
  }
  ul > li {
    .game-option {
      border-bottom: @page1BlockBorder;
    }
    &:last-child .game-option {
      border-bottom: 0;
    }
  }

  .game-option {
    height: .38rem;
    div, .ovalue {
      line-height: .38rem;
    }
    padding: 0 .15rem;
  }
}
</style>
