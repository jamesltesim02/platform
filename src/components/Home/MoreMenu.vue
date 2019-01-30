<template>
  <div class="operator-more">
    <v-touch
      tag="a"
      @tap="expandMore"
      class="btn-more"
    ><icon-more /></v-touch>
    <v-touch
      tag="div"
      v-if="expanded"
      class="cover"
      @tap="expanded = false"
    ></v-touch>
    <div
      ref="menus"
      class="operator-options"
      :class="{expanded: expanded}"
    >
      <expand-transition :expanded="expanded">
        <ul>
          <v-touch
            v-for="(m ,i) in menus"
            :key="i"
            tag="li"
            @tap="toUrl(m.url)"
          >
            <component :is="m.icon" />{{$t(m.text)}}
          </v-touch>
        </ul>
      </expand-transition>
    </div>
  </div>
</template>
<script>
import { getCasinoUser } from '@/utils/CasinoUserUtils';
import IconMore from '@/components/common/icons/IconMore';
import ExpandTransition from '@/components/common/ExpandTransition';

import IconDeposit from '@/components/common/icons/IconDeposit';
import IconHistory from '@/components/common/icons/IconHistory';
import IconSetting from '@/components/common/icons/IconSetting';

export default {
  data() {
    return {
      expanded: false,
      menus: [],
    };
  },
  created() {
    const user = getCasinoUser();
    if (user.depositUrl) {
      this.menus.unshift({
        icon: IconDeposit,
        url: user.depositUrl,
        text: 'page1.menu.deposit',
      });
    }

    if (user.token) {
      this.menus.push({
        icon: IconHistory,
        url: '/history',
        text: 'page1.menu.history',
      });
    }

    this.menus.push({
      icon: IconSetting,
      url: '/setting',
      text: 'page1.menu.setting',
    });
  },
  components: {
    IconMore,
    ExpandTransition,
  },
  methods: {
    expandMore() {
      if (this.menus.length === 1) {
        this.toUrl(this.menus[0].url);
        return;
      }
      this.expanded = true;
    },
    toUrl(url) {
      if (/^https?:\/\//.test(url)) {
        this.expanded = false;
        window.location = url;
        return;
      }

      this.$router.push(url);
    },
  },
};
</script>
<style lang="less">
.operator-more {
  position: relative;
  .btn-more {
    display: flex;
    align-items: center;
    height: .44rem;
    line-height: .44rem;
    padding: 0 .15rem;
  }
  .cover {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .operator-options {
    position: absolute;
    width: 1.4rem;
    right: .1rem;
    top: .54rem;
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.20);
    &::before {
      content: "";
      display: block;
      position: absolute;
      border-left: .06rem solid transparent;
      border-right: .06rem solid transparent;
      border-bottom: .1rem solid #3e3c45;
      top: -.09rem;
      right: .13rem;
      z-index: 0;
      opacity: 0;
      transition: all @animationTransitionDuration;
    }
    &.expanded::before {
      opacity: 1;
    }
    ul {
      position: relative;
      z-index: 1;
      background: @appHeaderBackground;
      box-shadow: 0 2px 8px 0 rgba(0,0,0,0.20);
      border-radius: 4px;
      overflow: hidden;
      font-size:.15rem;
      font-family: "PingFangSC-Regular";
      li {
        display: flex;
        height: .45rem;
        align-items: center;
        padding: 0 .2rem;
        background: #3e3c45;
        transition: background-color @actionTransitionDuration;
        svg {
          margin-right: .13rem;
        }
        &:active {
          background: @appHeaderBackgroundH;
        }
      }
    }
  }
}
</style>
