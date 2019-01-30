<template>
  <list-page
    @scrollBottom="$refs.matchList.toNext()"
    ref="listPage"
  >
    <template slot="header">
      <nav-bar
        :title="$t(`common.datetypes.${this.matchState}`)"
        :backable="false"
      >
        <league-chooser
          v-model="league"
          :sport-id="currentSport"
          :match-state="stateKey"
        />
      </nav-bar>
      <sports-bar
        :selectable="true"
        v-model="currentSport"
      />
    </template>
    <match-list
      ref="matchList"
      :sport-id="currentSport"
      :league-id="league"
      :matchState="stateKey"
      @pushreg-change="({pointData, callback}) => $regpush(pointData, callback)"
    />
    <tab-bar :current-index="[2, 1][stateKey]" slot="footer" />
  </list-page>
</template>
<script>
import ListPage from '@/components/common/ListPage';
import NavBar from '@/components/common/NavBar';
import TabBar from '@/components/common/TabBar';
import LeagueChooser from '@/components/common/LeagueChooser';
import SportsBar from '@/components/common/SportsBar';

import MatchList from '@/components/common/MatchList';

export default {
  props: ['matchState'],
  data() {
    return {
      currentSport: 10,
      league: null,
    };
  },
  watch: {
    currentSport() {
      this.$refs.listPage.scorllTo(0);
    },
    league() {
      this.$refs.listPage.scorllTo(0);
    },
  },
  computed: {
    stateKey() {
      return {
        early: 0,
        rolling: 1,
      }[this.matchState];
    },
  },
  components: {
    ListPage,
    NavBar,
    LeagueChooser,
    SportsBar,
    MatchList,
    TabBar,
  },
};
</script>
