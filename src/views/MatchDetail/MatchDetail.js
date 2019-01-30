import ListPage from '@/components/common/ListPage';
import NavBar from '@/components/common/NavBar';
import TabHeader from '@/components/common/TabHeader';
import BettingCountBar from '@/components/Bet/BettingCountBar';
import VideoBar from '@/components/MatchDetail/VideoBar';
import MatchGameList from '@/components/MatchDetail/MatchGameList';
import IconLoading from '@/components/common/icons/IconLoading';
import { StorageKey } from '@/config/constants';
import { loadFromStorage, saveToStorage } from '@/utils/StorageUtil';
import { findmatch } from '@/api/pull';

import gameSorter from './gameSorter';
import pushoperator from './pushoperator';

export default {
  data() {
    return {
      tabIndex: 0,
      matchId: +this.$route.params.matchid,
      matchInfo: {},
      loading: false,
    };
  },
  async created() {
    const cacheKey = `${StorageKey.MATCH_DETAIL_KEY}-${this.matchId}`;
    this.matchInfo = loadFromStorage(cacheKey, {});

    try {
      this.loading = true;
      const matchInfo = await findmatch(this.matchId);
      if (!matchInfo || !matchInfo.games) {
        return;
      }
      matchInfo.games = gameSorter(matchInfo.games);
      matchInfo.games[0].expanded = true;
      this.matchInfo = matchInfo;
      pushoperator(this);
      saveToStorage(cacheKey, matchInfo);
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  },
  computed: {
    videoId() {
      return (this.matchInfo.betradarKey || '').split(':').pop();
    },
  },
  components: {
    ListPage,
    NavBar,
    TabHeader,
    BettingCountBar,
    VideoBar,
    MatchGameList,
    IconLoading,
  },
  methods: {
    toggleExpandAll(state) {
      this.matchInfo.games.forEach((g) => {
        g.expanded = state;
        this.$set(this.matchInfo.games, g);
      });
    },
  },
};
