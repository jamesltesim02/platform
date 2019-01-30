<template>
  <div class="league-list-container">
    <div class="league-items">
      <div class="league-scroll-panel">
        <template v-for="(l1, i1) in letters">
          <div
            class="letter-title"
            :key="'t' + i1"
            :ref="'title' + l1"
          >{{l1}}</div>
          <ul :key="'l' + i1">
            <v-touch
              tag="li"
              v-for="(l2, i2) in leagues[i1]"
              :key="i2"
              @tap="$emit('update:selected', selected == l2.tournamentID ? null : l2.tournamentID)"
            >
              <span>{{l2.name}}</span>
              <icon-chosen v-if="selected == l2.tournamentID" />
            </v-touch>
          </ul>
        </template>
      </div>
    </div>
    <div class="letter-items">
      <ul
        @touchmove="scrollMove"
      >
        <v-touch
          tag="li"
          v-for="(l1, i1) in letters"
          :key="i1"
          @tap="scrollToLetter(l1)"
        >{{l1}}</v-touch>
      </ul>
    </div>
    <transition name="fade">
      <div
        v-if="showTips"
        class="letter-tips"
      >{{movedLetter}}</div>
    </transition>
  </div>
</template>
<script>
import getFirstLetter from '@/utils/getFirstLetter';
import IconChosen from '@/components/common/icons/IconChosen';

export default {
  props: {
    selected: {},
    leagueList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      movedLetter: '',
      showTips: false,
      hideTimer: null,
      leagues: [],
      letters: [],
    };
  },
  watch: {
    leagueList(n) {
      if (n) {
        this.sortingLeagues(n);
      }
    },
  },
  mounted() {
    if (this.leagueList && this.leagueList.length) {
      this.sortingLeagues(this.leagueList);
    }
  },
  methods: {
    sortingLeagues(leagues) {
      if (!leagues || !leagues.length) {
        return;
      }

      const leagueMap = {};
      leagues.forEach((item) => {
        const fls = getFirstLetter(item.name || '');
        const firstLetter = fls.charAt(0);
        let leagueList = leagueMap[firstLetter];
        if (!leagueList) {
          leagueList = [];
          leagueMap[firstLetter] = leagueList;
        }

        leagueList.push({
          league: item,
          sortCode: fls,
        });
      });

      const letters = Object.keys(leagueMap).sort((v1, v2) => {
        if (v1 === '#') {
          return 1;
        }

        if (v2 === '#') {
          return -1;
        }

        return v1.localeCompare(v2);
      });
      const sortedLeagues = letters.map((letter) => {
        const leags = leagueMap[letter];
        leags.sort((v1, v2) => v1.sortCode.localeCompare(v2.sortCode));
        return leags.map(leag => leag.league);
      });

      this.letters = letters;
      this.leagues = sortedLeagues;
    },
    scrollToLetter(letter) {
      const titleEl = this.$refs[`title${letter}`][0];
      titleEl.offsetParent.scrollTop = titleEl.offsetTop;
      this.movedLetter = letter;
      this.showTips = true;
      clearTimeout(this.hideTimer);
      this.hideTimer = setTimeout(() => {
        this.showTips = false;
      }, 300);
    },
    scrollMove(e) {
      const targetEl = document.elementFromPoint(e.touches[0].pageX, e.touches[0].pageY);
      const letter = (targetEl || {}).innerHTML;
      if (!letter || !/^[A-Z]$/.test(letter) || this.movedLetter === letter) {
        return;
      }
      this.scrollToLetter(letter);
    },
  },
  components: {
    IconChosen,
  },
};
</script>
<style lang="less">
.league-list-container {
  position: relative;
  display: flex;
  .league-items {
    position: absolute;
    width: 100%;
    display: flex;
    height: 100%;
    & > .league-scroll-panel {
      position: relative;
      max-height: 100%;
      width: 100%;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      .letter-title {
        background: #5D5E63;
        font-size: .13rem;
        line-height: .22rem;
        padding-left: .14rem;
        color: rgba(255, 255, 255, .3);;
      }
    }
    ul {
      padding: 0 .3rem 0 .15rem;
      li {
        display: flex;
        height: .5rem;
        border-bottom: 1px solid rgba(255, 255, 255, .1);
        align-items: center;
        span {
          flex-grow: 1;
        }
        &:last-child {
          border-bottom: 0;
        }
      }
    }
  }
  .letter-items {
    position: absolute;
    right: 0;
    display: flex;
    align-items: center;
    height: 100%;
    font-size: .12rem;
    color: #53B6FF;
    text-align: center;
    ul {
      max-height: 100%;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }
    li {
      width: .32rem;
      line-height: .22rem;
    }
  }
  .letter-tips {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, .5);
    font-size: .6rem;
    width: 1rem;
    height: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
  }
}
</style>
