<template>
  <list-page
    @scrollBottom="$refs.matchList.toNext()"
    ref="listPage"
  >
    <template slot="header">
      <nav-bar :title="$t(`common.sportnames.${sno}`)">
        <league-chooser
          v-model="league"
          :sport-id="sno"
          :match-state="[null, 1, 0][dt]"
        />
      </nav-bar>
      <tab-header
        :tabs="dts"
        :current.sync="dt"
      />
    </template>
    <match-list
      ref="matchList"
      :sport-id="sno"
      :league-id="league"
      :matchState="[null, 1, 0][dt]"
      @pushreg-change="({pointData, callback}) => $regpush(pointData, callback)"
    />
    <betting-count-bar slot="footer" />
  </list-page>
</template>
<script>
import ListPage from '@/components/common/ListPage';
import NavBar from '@/components/common/NavBar';
import LeagueChooser from '@/components/common/LeagueChooser';
import TabHeader from '@/components/common/TabHeader';
import BettingCountBar from '@/components/Bet/BettingCountBar';
import MatchList from '@/components/common/MatchList';

export default {
  data() {
    return {
      dt: 0,
      league: null,
      sno: this.$route.params.sno,
      dts: [
        'common.datetypes.all',
        'common.datetypes.rolling',
        // 'common.datetypes.today',
        'common.datetypes.early',
      ],
    };
  },
  watch: {
    dt() {
      this.$refs.listPage.scorllTo(0);
    },
    league() {
      this.$refs.listPage.scorllTo(0);
    },
  },
  components: {
    ListPage,
    NavBar,
    LeagueChooser,
    TabHeader,
    // LeagueItem,
    MatchList,
    BettingCountBar,
  },
};
</script>
<style>
</style>
