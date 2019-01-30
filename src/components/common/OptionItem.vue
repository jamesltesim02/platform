<template>
  <bet-item :comp="comp" :oid="game.optionID" :option="option" :game="game" />
</template>
<script>
import BetItem from '@/components/Bet/BetItem';
import GameOption from '@/components/common/GameOption';

export default {
  props: {
    option: {},
    game: {},
    direction: {
      default: 'row',
    },
  },
  data() {
    return {
      comp: GameOption,
    };
  },
  components: {
    BetItem,
  },
};
</script>

