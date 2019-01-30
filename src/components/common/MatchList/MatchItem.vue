<template>
  <div class="match-item">
    <div class="item-title">
      <div class="sport-icon-container center-box">
        <icon-sport
          :sno="matchInfo.sportID"
          width=".14rem"
          height=".14rem"
        />
      </div>
      <div class="title-fields">
        <span class="match-date">
          {{matchInfo.matchDate | dateFormat('MM/dd')}}
        </span>
        <span class="league-name">
          {{matchInfo.tournamentName}}
        </span>
        <span class="match-time">{{matchInfo.matchTime}}</span>
        <span class="play-icon-container center-box">
          <icon-play-xs v-if="matchInfo.matchState !== 0" />
        </span>
      </div>
    </div>
    <div class="match-info">
      <v-touch
        class="match-teams"
        @tap="toMatchDetail"
      >
        <div class="team1 leading">
          <label>{{matchInfo.competitor1Name}}</label>
          <div class="score">
            <span>0</span>
            <!-- <span>0</span>
            <span>15</span> -->
          </div>
        </div>
        <div class="team2">
          <label>{{matchInfo.competitor2Name}}</label>
          <div class="score">
            <span>0</span>
            <!-- <span>2</span>
            <span>30</span> -->
          </div>
        </div>
      </v-touch>
      <div class="match-games">
        <ul
          class="game-item"
          v-for="(g, i1) in matchInfo.games"
          :key="i1"
        >
          <li
            v-for="(o, i2) in g.options"
            :key="i2"
          >
            <game-option :option="o" :game="g" :match="matchInfo" />
          </li>
        </ul>
      </div>
      <div class="detail-button-container center-box">
        <v-touch
          tag="button"
          @tap="toMatchDetail"
        >+{{matchInfo.matchGame}}</v-touch>
      </div>
    </div>
  </div>
</template>
<script>
import IconSport from '@/components/common/icons/IconSport';
import IconPlayXs from '@/components/common/icons/IconPlayXs';

import GameOption from '@/components/common/GameOption';

export default {
  props: ['matchInfo'],
  data() {
    return {};
  },
  components: {
    IconSport,
    IconPlayXs,
    GameOption,
  },
  methods: {
    toMatchDetail() {
      this.$router.push(`/new/match/${this.matchInfo.matchID}`);
    },
  },
};
</script>
<style lang="less">
.match-item {
  background: @page1BlockBackground;
  box-shadow: @page1BlockBoxshadow;
  border-radius: 10px;
  margin-top: .1rem;
  overflow: hidden;
  &:last-child {
    margin-bottom: 0;
  }
  .center-box {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .item-title {
    display: flex;
    line-height: .3rem;
    border-bottom: @page1BlockBorder;
    color: @page1Font2;
    font-size: .12rem;
  }
  .title-fields {
    flex-grow: 1;
    display: flex;
  }
  .sport-icon-container {
    height: .3rem;
    width: .3rem;
    border-right: @page1BlockBorder;
  }
  .match-date {
    width: .58rem;
    text-align: center;
  }
  .league-name {
    flex-grow: 1;
  }
  .match-time {
    width: .36rem;
    text-align: right;
  }
  .play-icon-container {
    width: .37rem;
  }
  .match-info {
    display: flex;
    & > div {
      border-right: @page1BlockBorder;
      &:last-child {
        border-right: 0;
      }
    }
  }
  .match-teams {
    width: 1.76rem;
    padding-left: .1rem;
    .team1, .team2 {
      height: .4rem;
      display: flex;
      align-items: center;
      label {
        text-align: center;
        width: 60%;
      }
      .score {
        width: 40%;
        text-align: right;
        padding-right: .15rem;
        color: @page1FontH2;
        span {
          margin-left: .05rem;
        }
      }
    }
    .team1 {
      position: relative;
      label {
        font-weight: bolder;
      }
      &.leading::before {
        content: "";
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        border-right:  .06rem solid #2E2F34;
        border-top: .05rem solid transparent;
        border-bottom: .05rem solid transparent;
      }
    }
  }
  .match-games {
    display: flex;
    width: 1.6rem;
    & > .game-item {
      width: 100%;
      border-right: @page1BlockBorder;
      &:last-child {
        border-right: 0;
      }
      li {
        border-bottom: @page1BlockBorder;
        &:last-child {
          border-bottom: 0;
        }
      }
    }
    .game-option {
      height: .4rem;
      align-items: center;
      justify-content: center;
    }
  }
  .detail-button-container {
    button {
      width: .38rem;
      height: 100%;
      font-size: .12rem;
      color: rgba(255, 255, 255, .5);
    }
  }
}
</style>
