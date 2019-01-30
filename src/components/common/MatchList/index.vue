<template>
  <div class="match-list">
    <div
      v-if="loading && loadingPn == 1"
      class="loading-bar"
    ><icon-loading /></div>
    <match-item
      v-for="(m, i) in matchs"
      :key="i"
      :match-info="m"
    />
    <div v-if="!hasMore && !loading" class="no-more">我已经把我所有给你了!</div>
    <div
      v-if="loading && loadingPn > 1"
      class="loading-bar"
    ><icon-loading /></div>
  </div>
</template>
<script>
import appConfig from '@/config/business.config';
import { StorageKey } from '@/config/constants';
import { loadFromStorage, saveToStorage } from '@/utils/StorageUtil';
import { findmatchsList } from '@/api/pull';
import IconLoading from '@/components/common/icons/IconLoading';
import pushoperator from './pushoperator';
import MatchItem from './MatchItem';

export default {
  props: {
    // 体育类型id
    sportId: {},
    // 比赛状态(0早盘，1滚球，首页不传)
    matchState: {},
    // 焦点比赛 1 查询焦点比赛 (首页需要传入,其他页不传)
    isFocus: {
      default: null,
    },
    // 联赛id(tournamentID), 首页不传
    leagueId: {},
  },
  data() {
    return {
      pageNum: 1,
      pageSize: appConfig.itemSizeOfPage,
      matchs: [],
      usingTempData: false,
      hasMore: true,
      loading: false,
      loadingPn: 1,
    };
  },
  watch: {
    sportId() {
      this.resetAndQuery();
    },
    matchState() {
      this.resetAndQuery();
    },
    isFocus() {
      this.resetAndQuery();
    },
    leagueId() {
      this.resetAndQuery();
    },
    matchs(n) {
      if (this.usingTempData) {
        return;
      }
      this.$emit('pushreg-change', {
        pointData: {
          Matchs: [
            {
              // 当前页面的比赛id
              Mids: n.map(m => m.matchID),
              // 让球,大小
              GameTypes: [16, 18],
              // 全场
              GroupType: 0,
            },
          ],
        },
        callback: this.receivePush.bind(this),
      });
    },
  },
  created() {
    this.queryMatchs();
  },
  components: {
    MatchItem,
    IconLoading,
  },
  methods: {
    async queryMatchs(condition = {}) {
      const queryParam = {
        sportID: this.sportId,
        isFocus: this.isFocus,
        tournamentID: this.leagueId,
        matchState: this.matchState,
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        ...condition,
      };
      const cacheKey = `${
          StorageKey.MATCH_LIST_KEY
        }-${
          this.sportId || 'null'
        }-${
          this.isFocus || 'null'
        }-${
          this.tournamentID || 'null'
        }-${
          this.matchState || 'null'
        }-${
          this.pageNum
        }`;

      try {
        this.loading = true;
        this.loadingPn = queryParam.pageNum;

        if (queryParam.pageNum === 1) {
          // 加载缓存数据
          this.usingTempData = true;
          this.matchs = loadFromStorage(cacheKey, []);
        }

        const data = await findmatchsList(queryParam);

        if (data && data.length) {
          const mlist = [];
          data.forEach((m) => {
            if (!m.games || !m.games.length) {
              return;
            }
            const gameMap = {};
            m.games.forEach((g) => {
              if (!g.options || !g.options.length) {
                return;
              }

              if (gameMap[g.gameType]) {
                return;
              }

              const options = g.options.filter(v => v.betStatus > 5).map((opt) => {
                opt.betBar = g.betBar;
                opt.oddsLower = false;
                opt.oddsUpper = false;
                return opt;
              });

              if (!options.length) {
                return;
              }

              options.sort((o1, o2) => o1.optionNo - o2.optionNo);

              g.options = options;
              gameMap[g.gameType] = g;
            });

            const games = Object.values(gameMap);
            games.sort((g1, g2) => g1.gameNo - g2.gameNo);
            m.games = games;

            mlist.push(m);
          });
          if (queryParam.pageNum === 1) {
            saveToStorage(cacheKey, mlist);
            this.matchs = [];
          }
          this.usingTempData = false;
          this.matchs.push(...mlist);
          this.pageNum = queryParam.pageNum;
          return;
        }

        if (queryParam.pageNum === 1) {
          saveToStorage(cacheKey, []);
          this.matchs = [];
        }
        this.hasMore = false;
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
    resetAndQuery() {
      this.matchs = [];
      this.pageNum = 1;
      this.hasMore = true;
      this.queryMatchs();
    },
    toNext() {
      if (!this.hasMore || this.loading) {
        return;
      }
      this.queryMatchs({
        pageNum: this.pageNum + 1,
      });
    },
    receivePush(msg) {
      pushoperator(this, msg);
    },
  },
};
</script>

<style lang="less">
.match-list {
  padding: 0 0.1rem;
  .no-more, .loading-bar {
    padding: .16rem 0 .06rem;
    text-align: center;
    color: @page1Font3;
  }
}
</style>

