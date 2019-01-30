<template>
  <div class="league-chooser">
    <v-touch
      tag="a"
      @tap="expanded = true"
      class="btn-show-league"
    >
      {{$t('common.operations.leagues')}} <icon-arrow direction="right" />
    </v-touch>
    <transition name="fade">
      <v-touch
        v-if="expanded"
        class="cover"
        @tap="expanded = false"
      ></v-touch>
    </transition>
    <transition name="league-move">
      <div
        v-if="expanded"
        class="league-list"
      >
        <v-touch
          class="placeholder"
          @tap="expanded = false"
        >&nbsp;</v-touch>
        <div class="league-container">
          <icon-loading
            v-if="loading"
            class="center-loading"
          />
          <div class="lecon-title">
            {{$t('common.operations.leagues')}}
          </div>
          <league-list
            class="lecon-content"
            :selected.sync="selectedLeague"
            :league-list="leagueList"
          />
          <div class="lecon-footer">
            <v-touch
              tag="button"
              class="btn btn-reset"
              @tap="selectedLeague = lastSelected"
            >{{$t('common.forms.reset')}}</v-touch>
            <v-touch
              tag="button"
              @tap="submitChoice"
              class="btn btn-submit"
            >{{$t('common.forms.complete')}}</v-touch>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import IconArrow from '@/components/common/icons/IconArrow';
import { StorageKey } from '@/config/constants';
import { loadFromStorage, saveToStorage } from '@/utils/StorageUtil';
import { findtournament } from '@/api/pull';
import IconLoading from '@/components/common/icons/IconLoading';
import LeagueList from './LeagueList';

export default {
  model: {
    prop: 'league',
    event: 'change',
  },
  props: ['league', 'sportId', 'matchState'],
  data() {
    return {
      leagueList: [],
      selectedLeague: this.league,
      lastSelected: this.league,
      expanded: false,
      lastLoadTime: 0,
      loading: false,
    };
  },
  watch: {
    expanded(n) {
      if (!n) {
        return;
      }

      const now = Date.now();
      if (now - this.lastLoadTime < 30000) {
        return;
      }

      this.queryLeagueList();
      this.lastLoadTime = now;
    },
    sportId() {
      this.lastLoadTime = 0;
    },
    matchState() {
      this.lastLoadTime = 0;
    },
  },
  components: {
    IconArrow,
    LeagueList,
    IconLoading,
  },
  methods: {
    async queryLeagueList() {
      const cacheKey = `${StorageKey.TOURNAMENT_LIST_KEY}-${this.sportId}-${this.matchState}`;
      this.leagueList = loadFromStorage(cacheKey, []);
      try {
        this.loading = true;
        this.leagueList = await findtournament({
          matchState: this.matchState,
          sportID: this.sportId,
        });
        saveToStorage(cacheKey, this.leagueList);
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
    submitChoice() {
      this.$emit('change', this.selectedLeague);
      this.expanded = false;
      this.lastSelected = this.selectedLeague;
    },
  },
};
</script>
<style lang="less">
.league-chooser {
  position: relative;
  .btn-show-league {
    display: flex;
    align-items: center;
    padding: 0 .15rem;
    height: .44rem;
    line-height: .44rem;
    svg {
      margin-left: .05rem;
    }
  }
  .cover {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin-top: .44rem;
      background: rgba(0, 0, 0, .5);
    }
  }

  .league-list {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    width: 2.85rem;
    .placeholder {
      height: .44rem;
      line-height: .44rem;
    }
    .league-container {
      position: relative;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      background-image: linear-gradient(180deg, #3A393F 2%, #333238 97%);
      box-shadow: 0 2px 12px 0 rgba(0,0,0,0.10);
    }
    .lecon-title {
      line-height: .41rem;
      text-align: center;
      // border-bottom: 1px solid rgba(40, 45, 63, .5);
    }
    .lecon-content {
      flex-grow: 1;
    }
    .lecon-footer {
      position: relative;
      z-index: 3;
      .btn {
        width: 50%;
        line-height: .52rem;
        color: #fff;
        font-size: .17rem;
        letter-spacing: -0.41px;
        font-family: PingFangSC-Medium;
      }
      .btn-reset {
        background: #5D5E63;
      }
      .btn-submit {
        background: #53B6FF;
      }
    }
  }
}

.league-move-enter-active, .league-move-leave-active {
  transition: transform @animationTransitionDuration;
}
.league-move-enter, .league-move-leave-to {
  transform: translateX(100%);
}
</style>
