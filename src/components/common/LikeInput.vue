<template>
  <div :class="divClass">
    <div class="body" @touchend.stop="changeStatus">
      <span :class="txtClass">{{data.value}}</span>
      <span v-if="!data.value" class="place">{{place}}</span>
      <span class="insert" v-if="/^(bet|set)$/i.test(nType)"><slot></slot></span>
    </div>
  </div>
</template>

<script>

export default {
  inheritAttrs: false,
  name: 'LikeInput',
  props: {
    data: Object,
    type: String,
  },
  computed: {
    nType() {
      if (/bet/i.test(this.type)) {
        return /m/i.test(this.type) ? 'mbet' : 'bet';
      }
      return 'set';
    },
    place() {
      const str = /bet/i.test(this.type) ? this.$t('page2.bet.betMoney') : '';
      return this.data.placeholder || str;
    },
    divClass() {
      return `nb-like-input nb-like-input-${this.nType}`;
    },
    txtClass() {
      return this.data.hide ? 'text' : 'text active';
    },
  },
  methods: {
    changeStatus() {
      const { data } = this;
      if (data.hide) {
        data.hide = false;
        data.t = Date.now();
        this.$emit('update:data', data);
        this.$emit('focus', data);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@keyframes setblink {
    from { border-right: 2px solid rgba(83,255,253,1); }
    50% { border-right: 2px solid rgba(83,255,253,0); }
    to { border-right: 2px solid rgba(83,255,253,1); }
}
@-webkit-keyframes setblink {
    from { border-right: 2px solid rgba(83,255,253,1); }
    50% { border-right: 2px solid rgba(83,255,253,0); }
    to { border-right: 2px solid rgba(83,255,253,1); }
}
@keyframes betblink {
    from { border-right: 2px solid rgba(83,192,255,1); }
    50% { border-right: 2px solid rgba(83,192,255,0); }
    to { border-right: 2px solid rgba(83,192,255,1); }
}
@-webkit-keyframes betblink {
    from { border-right: 2px solid rgba(83,192,255,1); }
    50% { border-right: 2px solid rgba(83,192,255,0); }
    to { border-right: 2px solid rgba(83,192,255,1); }
}
.nb-like-input-set {
  width: 2.5rem;
  height: .4rem;
  margin: 0 auto;
  border-bottom: 1px solid rgba(46,47,52,0.5);
  .body {
    width: 2.46rem;
    background: #57595E;
    padding: 0 .02rem;
    .text { color: #FFF; }
    .active {
      animation: setblink 1000ms infinite;
      -webkit-animation: setblink 1000ms infinite;
    }
    .place { left: .04rem; color: rgba(255,255,255,0.5); }
  }
}
.nb-like-input-bet, .nb-like-input-mbet {
  border-radius: .04rem;
  .body {
    background: #EEEEEE;
    border-radius: .04rem;
    .text { color: #333; }
    .active {
      animation: betblink 1000ms infinite;
      -webkit-animation: betblink 1000ms infinite;
    }
    .place { left: .12rem; color: #999; }
  }
}
.nb-like-input-bet {
  width: 3.25rem;
  height: .4rem;
  margin: .1rem auto 0;
  .body {
    width: 100%;
    padding: 0 1.5rem 0 .1rem;
  }
}
.nb-like-input-mbet {
  width: 1rem;
  height: .3rem;
  .body {
    width: 100%;
    padding: 0 .1rem;
  }
}
.nb-like-input {
  overflow: hidden;
  .body {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    .text {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: .21rem;
      font-size: .15rem;
      font-family: PingFangSC-Regular;
      max-width: 1.65rem;
      overflow: hidden;
    }
    .place, .insert {
      position: absolute;
      height: 100%;
      top: 0;
      display: flex;
      align-items: center;
      font-family: PingFangSC-Regular;
    }
    .place {
      justify-content: flex-start;
      font-size: .15rem;
    }
    .insert {
      right: .1rem;
      justify-content: flex-end;
      color: #C0C0C0;
      font-size: .13rem;
    }
  }
}
</style>

