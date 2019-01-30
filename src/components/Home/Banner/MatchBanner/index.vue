<template>
<div class="match-banner">
  <div class="titles">
    {{match.tournamentName}}
  </div>
  <ul class="tns">
    <li class="t1">{{match.competitor1Name}}</li>
    <li class="match-time">
      {{match.matchDate | dateFormat('M/dd HH:mm')}}
    </li>
    <li class="t2">{{match.competitor2Name}}</li>
  </ul>
  <ul class="opt-list">
    <banner-option
      v-for="(o, i) in match.options"
      :key="i"
      :option="o"
      :mid="mid"
      :match="match"
    />
  </ul>
</div>
</template>
<script>
import BannerOption from './BannerOption';

export default {
  props: ['match', 'mid'],
  components: {
    BannerOption,
  },
};
</script>
<style lang="less">
.match-banner {
  height: 2.64rem;
  background: url('../../../../assets/images/banner-match-background.png');
  border-radius: 10px;
  padding: .8rem .2rem 0;
  .titles {
    position: relative;
    text-align: center;
    letter-spacing: -0.31px;
    line-height: .18rem;
    font-size: .14rem;
  }
  .tns {
    display: flex;
    margin-top: .07rem;
    text-align: center;
    line-height: .22rem;
    .t1, .t2 {
      width: 35%;
      font-size: .16rem;
    }
    .match-time {
      flex-grow: 1;
      color: @page1Font4;
    }
  }
  .opt-list {
    display: flex;
    justify-content: space-between;
    margin-top: .08rem;
    li {
      width: 1.03rem;
      text-align: center;
      line-height: .26rem;
      height: .3rem;
      border: 2px solid rgba(214, 232, 251, .5);
      border-radius: 10rem;
      font-size: .14rem;
      color: @page1FontH3;
      transition: all @actionTransitionDuration;
      &.active {
        background: #fff;
        border: 2px solid #fff;
        color: #666;
      }
    }
  }
}
</style>
