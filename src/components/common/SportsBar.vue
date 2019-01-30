<template>
  <div class="sports-bar">
    <ul :style="{width: (sports.length * .682) + 'rem'}">
      <v-touch
        tag="li"
        v-for="(s, i) in sports"
        :key="i"
        :class="{ active: selectable && s === selected }"
        @tap="$emit('update:selected', s)"
      >
        <div>
          <icon-sport :sno="s" :multicolor="true" />
          <div>{{$t(`common.sportnames.${s}`)}}</div>
        </div>
      </v-touch>
    </ul>
  </div>
</template>
<script>
import IconSport from './icons/IconSport';

export default {
  model: {
    prop: 'selected',
    event: 'update:selected',
  },
  props: {
    selectable: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      /*
        体育定义 - SportID
        10 = Soccer 足球
        11 = Basketball 篮球
        12 = Tennis 网球
        14 = LOL 英雄联盟
        15 = Dota2 刀塔2
        16 = CounterStrike 反恐精英
        17 = StarCraft 星际争霸

        18 = Overwatch 守望先锋
        19 = ArenaOfValor 王者荣耀
      */
      sports: [
        10,
        11,
        12,
        14,
        15,
        // 16,
        // 17,
        19,
      ],
    };
  },
  components: {
    IconSport,
  },
};
</script>
<style lang="less">
.sports-bar {
  background: @page1HeaderBackground;
  // margin-top: 1px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;

  ul {
    display: flex;
    flex-wrap: wrap;
    height: .54rem;
    min-width: 100%;
    box-sizing: border-box;
    // padding: 0 .04rem;
  }
  li {
    position: relative;
    display: flex;
    width: .68rem;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: @page1Font4;
    letter-spacing: -0.25px;
    font-size: .12rem;
    border-bottom: 1px solid transparent;
    & > div {
      margin-top: .03rem;
    }
    &.active {
      border-bottom: 1px solid #53FFFD;
    }
  }
}
</style>
