<template>
  <div class="banner">
    <icon-loading
      v-if="loading"
      class="center-loading"
    />
    <swiper
      v-if="banners && banners.length"
      :options="swiperOption"
    >
      <swiper-slide
        v-for="(b, i) in banners"
        :key="i"
      >
        <match-banner
          v-if="b.matchID > 0"
          :match="b.slideMatch"
          :mid="b.matchID"
        />
        <v-touch
          v-else
          class="banner-item"
        >
          <cimg v-if="b.imgApp" :src="`image/${b.imgApp}`" />
        </v-touch>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css';
import IconLoading from '@/components/common/icons/IconLoading';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { findSlide } from '@/api/pull';
import { StorageKey } from '@/config/constants';
import { loadFromStorage, saveToStorage } from '@/utils/StorageUtil';

import pushoperator from './pushoperator';
import MatchBanner from './MatchBanner';

export default {
  data() {
    return {
      swiperOption: {
        autoplay: true,
        autoplayTimeout: 10000,
        slidesPerView: 'auto',
        centeredSlides: true,
        pagination: {
          el: '.swiper-pagination',
        },
      },
      banners: [],
      loading: false,
      usingTempData: false,
    };
  },
  watch: {
    banners(n) {
      if (!n || !n.length || this.usingTempData) {
        return;
      }

      const watchList = n.filter(v => !!v.matchID);

      if (!watchList || !watchList.length) {
        return;
      }

      const watchMids = n.filter(b => b.matchID).map(m => m.matchID);
      if (!watchMids.length) {
        return;
      }

      this.$emit('pushreg-change', {
        pointData: {
          Matchs: [
            {
              // 当前页面的比赛id
              Mids: watchMids,
              // 让球,大小
              GameTypes: [1],
              // 全场
              GroupType: 0,
            },
          ],
        },
        callback: this.receivePush.bind(this),
      });
    },
  },
  async created() {
    this.usingTempData = true;
    this.banners = loadFromStorage(StorageKey.BANNER_DATA_KEY, []);
    try {
      this.loading = true;
      this.banners = await findSlide();
      this.usingTempData = false;
      saveToStorage(StorageKey.BANNER_DATA_KEY, this.banners);
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  },
  components: {
    swiper,
    swiperSlide,
    MatchBanner,
    IconLoading,
  },
  methods: {
    receivePush(msg) {
      pushoperator(this, msg);
    },
  },
};
</script>

<style lang="less">
.banner {
  height: 2.64rem;
  position: relative;
  z-index: 2;
  .swiper-slide {
    height: 2.64rem;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .swiper-container {
    z-index: unset;
  }
  .swiper-wrapper {
    position: unset;
    z-index: auto;
  }
  .swiper-container-horizontal > .swiper-pagination-bullets {
    bottom: .7rem;
  }
  .swiper-pagination-bullet {
    opacity: 0.2;
    background: #36E7F6;
    height: .06rem;
    width: .06rem;
    border-radius: .06rem;
    transition: all @animationTransitionDuration;
  }
  .swiper-pagination-bullet-active {
    opacity: 0.5;
    background: #36E7F6;
    width: .14rem;
  }
}

</style>
