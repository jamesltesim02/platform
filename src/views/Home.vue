<template>
  <list-page @scrollBottom="$refs.matchList.toNext()" class="home-page">
    <template slot="header">
      <nav-bar
        :title="$t('page1.title.home')"
        :backurl="backurl"
        :backable="!!this.backurl"
      >
        <more-menu
          @search="searching = true"
        />
      </nav-bar>
      <sports-bar @update:selected="selectSport" />
    </template>
    <banner @pushreg-change="onBannerMatchPushChange"/>
    <hot-league-bar />
    <div class="hot-match-title">热门赛事</div>
    <match-list
      ref="matchList"
      :isFocus="1"
      @pushreg-change="onMatchListPushChange"
    />
    <tab-bar :current-index="0" slot="footer" />
  </list-page>
</template>
<script>
import ListPage from '@/components/common/ListPage';
import NavBar from '@/components/common/NavBar';
import TabBar from '@/components/common/TabBar';
import SportsBar from '@/components/common/SportsBar';
import MoreMenu from '@/components/Home/MoreMenu';
import Banner from '@/components/Home/Banner';
import HotLeagueBar from '@/components/Home/HotLeagueBar';
import MatchList from '@/components/common/MatchList';
import { getCasinoUser } from '@/utils/CasinoUserUtils';

export default {
  data() {
    return {
      matchListPoint: null,
      bannerMatchPoint: null,
      backurl: null,
    };
  },
  mounted() {
    this.backurl = getCasinoUser().backUrl;
  },
  components: {
    ListPage,
    NavBar,
    SportsBar,
    MoreMenu,
    Banner,
    HotLeagueBar,
    MatchList,
    TabBar,
  },
  methods: {
    selectSport(sport) {
      this.$router.push(`/new/sport/${sport}`);
    },
    onMatchListPushChange(pushPoint) {
      this.matchListPoint = pushPoint;
      this.updatePushPoint();
    },
    onBannerMatchPushChange(pushPoint) {
      this.bannerMatchPoint = pushPoint;
      this.updatePushPoint();
    },
    updatePushPoint() {
      const pointData = {
        Matchs: [],
      };
      if (this.matchListPoint && this.matchListPoint.pointData) {
        pointData.Matchs.push(...(this.matchListPoint.pointData.Matchs || []));
      }

      if (this.bannerMatchPoint && this.bannerMatchPoint.pointData) {
        pointData.Matchs.push(...(this.bannerMatchPoint.pointData.Matchs || []));
      }
      this.$regpush(
        pointData,
        (msg) => {
          if (this.matchListPoint && this.matchListPoint.callback) {
            this.matchListPoint.callback(msg);
          }

          if (this.bannerMatchPoint && this.bannerMatchPoint.callback) {
            this.bannerMatchPoint.callback(msg);
          }
        },
      );
    },
  },
};
</script>
<style lang="less">
.home-page.list-page .page-content {
  margin-top: -.54rem;
}
.hot-match-title{
  padding: .05rem .1rem;
  font-size: .17rem;
  color: #E8E6E8;
}
</style>
