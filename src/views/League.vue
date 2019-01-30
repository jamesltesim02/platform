<template>
  <list-page @scrollBottom="$refs.matchList.toNext()">
    <nav-bar
      :title="leagueName"
      slot="header"
    />
    <match-list
      ref="matchList"
      :sport-id="sno"
      :league-id="leagueid"
      @pushreg-change="({pointData, callback}) => $regpush(pointData, callback)"
    />
    <betting-count-bar slot="footer" />
  </list-page>
</template>
<script>
import ListPage from '@/components/common/ListPage';
import NavBar from '@/components/common/NavBar';
import MatchList from '@/components/common/MatchList';
import BettingCountBar from '@/components/Bet/BettingCountBar';
import { findbyid } from '@/api/pull';

export default {
  data() {
    return {
      leagueName: '热门联赛',
      sno: this.$route.params.sno,
      leagueid: this.$route.params.leagueid,
    };
  },
  async created() {
    this.leagueName = await findbyid(this.leagueid);
  },
  components: {
    ListPage,
    NavBar,
    MatchList,
    BettingCountBar,
  },
};
</script>
