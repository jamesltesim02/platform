<template>
  <div class="nb-bet-detail-body" :style="style" @touchstart="startFun" @touchend="endFun">
    <div class="nb-bet-detail-body-show">
      <div class="nb-bet-detail-body-box">
        <div class="nb-bet-detail-real-body">
          <div class="detail-real-body-head">
            <span class="head-team">
              <span class="head-team-id" v-if="data.idx">{{data.idx}}</span>
              <span v-if="this.data.bo" class="head-team-title">{{data.bo.split(/\s{2,}/)[0]}}</span>
              <option-name v-else class="head-team-title" :game-type="data.gmt"
              :bet-bar="data.bar" :bet-option="data.opt" :mn="data.mn" />
              <span class="head-team-score">@{{odv}}</span>
              <span class="head-team-score">{{format}}</span>
            </span>
            <bet-detail-close class="bet-detail-close" v-if="type" />
            <span v-else :class="data.class">{{data.winStu}}</span>
          </div>
          <div class="real-body-item">
            <span class="item-opt">{{$t(`common.wf.wf_${data.sno}_${data.gpt}_${data.stg}_${data.gmt}`)}}</span>
            <span class="item-opt">{{$t(`common.gpt.gpt_${data.gpt}`)}}</span>
          </div>
          <div class="real-body-item">
            {{data.mn}}
            <span class="item-score" v-if="data.dt && data.dt > 0">{{data.msc}}</span>
          </div>
          <div class="real-body-alert">
            <span class="item-opt">{{data.tn}}</span>
            <span class="item-alert" v-if="type && data.alert">
              <bet-detail-alert-up type="up" color="#FF4A4A" v-if="data.alert === 1" />
              <bet-detail-alert-up type="down" color="#7CCD5D" v-else-if="data.alert === 2" />
              <bet-detail-alert-pause v-else-if="data.alert === 3" />
              <bet-detail-alert-close v-else-if="data.alert === 4" />
              {{alert}}
            </span>
          </div>
        </div>
        <div v-if="showBottom" class="bet-detail-body-more">
          <arrow :type="data.hasBtn" color="#C0C0C0" />
        </div>
      </div>
      <div class="nb-bet-detail-body-alert" v-if="type && data.idx && data.same"></div>
    </div>
    <div class="nb-bet-detail-body-input" v-if="type && !data.hide && !data.idx">
      <bet-keyboard :data.sync="data" :user="user" @change="changeUser" @betted="betFun" />
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import oddsFormat from '@/filters/oddsFormat';
import Arrow from '../common/Arrow';
import OptionName from '../common/OptionName';
import BetKeyboard from '../common/BetKeyboard';
import BetDetailClose from './BetIcons/BetDetailClose';
import BetDetailAlertClose from './BetIcons/BetDetailAlertClose';
import BetDetailAlertPause from './BetIcons/BetDetailAlertPause';
import BetDetailAlertUp from './BetIcons/BetDetailAlertUp';

export default {
  inheritAttrs: false,
  name: 'BetDetailBody',
  data() {
    return {
      t: { max: 300, st: 0, timer: null },
    };
  },
  props: {
    data: Object,
    user: Object,
    flag: Boolean,
    type: Boolean,
  },
  components: {
    Arrow,
    OptionName,
    BetDetailClose,
    BetKeyboard,
    BetDetailAlertClose,
    BetDetailAlertPause,
    BetDetailAlertUp,
  },
  computed: {
    style() {
      let back = /^7$/.test(this.data.sts) ? '#FFFFFF 0%, #F1F1F1' : '#DDDDDD 0%, #D1D1D1';
      back = `linear-gradient(-90deg, ${back} 98%)`;
      if (this.type) {
        return { 'background-image': back, 'border-radius': '0.1rem', 'box-shadow': '0 .02rem .12rem 0 rgba(0,0,0,0.10)' };
      }
      return { 'background-image': back, 'border-top': '0.01rem solid #ddd' };
    },
    odv() {
      return this.data.odv || oddsFormat(this.data.ods, this.data.gmt);
    },
    format() {
      let fmtId = this.data.ofid || 0;
      fmtId = !fmtId && this.$store.state.setting ? this.$store.state.setting.oddsType - 1 : fmtId - 1;
      fmtId = fmtId < 0 || fmtId > 7 ? 0 : fmtId;
      return ['EU', 'US', 'HK', 'MY', 'GB', 'ID', 'MM', 'IT'][fmtId];
    },
    showBottom() {
      return this.flag ? this.data.hasBtn === 'top' : this.data.hasBtn === 'bottom';
    },
    alert() {
      if (this.data.alert) {
        return this.$t(`page2.bet.alert_${this.data.alert}`);
      }
      return '';
    },
    betOpt() {
      const arr = this.data.mn.trim().split(/\s+vs\s+/i);
      return /^(1|2)$/.test(this.data.opt) && arr[this.data.opt] ? arr[this.data.opt] : this.data.opt;
    },
  },
  methods: {
    ...mapMutations([
      'clearBetItem',
      'clickBetOption',
      'setBetOption',
    ]),
    startFun() {
      this.t.st = Date.now();
    },
    endFun(event) {
      const clsName = typeof event.target.className === 'object' ? event.target.className.baseVal : event.target.className;
      if (Date.now() - this.t.st > this.t.max) return;
      if (/close/i.test(clsName)) {
        const flag = this.data.idx;
        this.clearBetItem(this.data);
        this.setBetOption(flag);
      } else if (this.type && !this.data.idx) {
        this.clickBetOption(this.data);
      }
    },
    betFun() {
      this.$emit('betted', true);
    },
    changeUser(e) {
      this.$emit('update:data', e);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.nb-bet-detail-body {
  width: 100%;
  .nb-bet-detail-body-show {
    width: 100%;
    position: relative;
    .nb-bet-detail-body-box {
      width: 100%;
      .nb-bet-detail-real-body {
        height: 1.13rem;
        padding: 0 .15rem;
        .detail-real-body-head {
          width: 100%;
          height: .38rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .head-team {
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            .head-team-id {
              font-size: .13rem;
              color: #FF4A4A;
              font-weight: bold;
              margin-right: .05rem;
            }
            .head-team-title, .head-team-score {
              font-family: PingFangSC-Medium;
              font-size: .17rem;
              color: #333;
            }
            .head-team-score {
              margin-left: .15rem;
            }
          }
          .bet-body-win, .bet-body-lose, .bet-body-other, .bet-body-mult {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: .12rem;
            height: .2rem;
          }
          .bet-body-win, .bet-body-lose {
            width: .2rem;
            color: #fff;
            font-size: .12rem;
            border-radius: 100%;
          }
          .bet-body-win {
            background: #FF4A4A;
          }
          .bet-body-lose {
            background: #7CCD5D;
          }
          .bet-body-other {
            color: #999;
            padding-right: .04rem;
          }
          .bet-body-mult {
            color: #333;
            padding-right: .04rem;
          }
        }
        .real-body-item {
          justify-content: flex-start;
        }
        .real-body-alert {
          justify-content: space-between;
        }
        .real-body-item, .real-body-alert {
          width: 100%;
          height: .22rem;
          font-size: .13rem;
          color: #666;
          display: flex;
          align-items: center;
          font-family: PingFangSC-Regular;
          .item-opt {
            font-family: PingFangSC-Regular;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: .15rem;
            height: .22rem;
            font-size: .13rem;
            color: #666;
          }
          .item-alert {
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: PingFangSC-Regular;
            height: .22rem;
            font-size: .12rem;
            color: #666;
            .bet-alert-icon {
              width: .16rem;
              height: .16rem;
              margin-right: .05rem;
              border-radius: 100%;
            }
          }
          .item-score {
            font-family: PingFangSC-Regular;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: .1rem;
            height: 100%;
            font-size: .13rem;
            color: #53B6FF;
          }
        }
      }
      .bet-detail-body-more {
        width: 100%;
        height: .2rem;
        display: flex;
        justify-content: center;
        align-items: flex-start;
      }

    }
    .nb-bet-detail-body-alert {
      position: absolute;
      width: .05rem;
      left: 0;
      top: .03rem;
      bottom: .03rem;
      background: #DD4646;
      border-top-left-radius: .1rem;
      border-bottom-left-radius: .1rem;
    }
  }
  .nb-bet-detail-body-input {
    width: 100%;
  }
}
</style>

