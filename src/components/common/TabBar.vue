<template>
  <ul class="tab-bar">
    <li
      v-for="(tb, i) in tabs"
      :key="i"
      :class="{active: currentIndex == i}"
    >
      <v-touch
        tag="a"
        @tap="$router.push(tb.url)"
      >
        <span
          class="tab-icon"
        >
          <bet-count v-if="tb.url === '/bet'" animate />
          <component
            :is="tb.component"
            :color="currentIndex == i ? '#02FFFF' : 'rgba(255, 255, 255, .4)'"
          />
        </span>
        <div>{{$t(tb.text)}}</div>
      </v-touch>
    </li>
  </ul>
</template>
<script>
import BetCount from '@/components/Bet/BetCount';
import IconTabHome from './icons/IconTabHome';
import IconTabRolling from './icons/IconTabRolling';
// import IconTabToday from './icons/IconTabToday';
import IconTabEarly from './icons/IconTabEarly';
import IconTabOrder from './icons/IconTabOrder';

export default {
  props: {
    currentIndex: {
      type: Number,
      default: 0,
    },
  },
  components: {
    BetCount,
  },
  data() {
    return {
      tabs: [
        {
          url: '/',
          text: 'page1.tab.home',
          component: IconTabHome,
        },
        {
          url: '/state/rolling',
          text: 'common.datetypes.rolling',
          component: IconTabRolling,
        },
        // {
        //   url: '/state/today',
        //   text: 'common.datetypes.today',
        //   component: IconTabToday,
        // },
        {
          url: '/state/early',
          text: 'common.datetypes.early',
          component: IconTabEarly,
        },
        {
          url: '/bet',
          text: 'page1.tab.order',
          component: IconTabOrder,
        },
      ],
    };
  },
};
</script>
<style lang="less">
.tab-bar {
  display: flex;
  background: #202126;
  height: .52rem;
  li {
    width: 100%;
    text-align: center;
    font-size: .12rem;
    color: rgba(255, 255, 255, .4);
    &.active a {
      color: #02FFFF;
    }
    a {
      display: block;
      height: 100%;
    }
    .tab-icon {
      position: relative;
      display: inline-block;
      margin-top: .04rem;
      .nb-bet-number {
        position: absolute;
        display: inline-block;
        background: #FF4A4A;
        border-radius: 10rem;
        color: #FFFFFF;
        letter-spacing: 0;
        text-align: center;
        line-height: .16rem;
        padding: 0 .05rem;
        right: -0.08rem;
        transform: translateX(50%);
        top: -.02rem;
      }
      svg {
        height: .26rem;
      }
    }
  }
}
</style>
