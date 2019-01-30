<template>
<list-page class="page-history" @scrollBottom="getListData">
  <nav-bar :title="$t('page2.history.list')" slot="header" />
  <date-select :data="selectData" @change="selChange" />
  <div v-if="!loading && !listData.length" class="history-null" :style="{ height: height }">{{$t('page2.history.alert')}}</div>
  <div v-else class="history-list">
    <div class="year-list" v-for="(item, index) in listData" :key="index">
      <p class="year-text">{{item.year}}{{$t('page2.history.year')}}</p>
      <div class="year-item" v-for="(v, k) in item.data" :key="k">
        <div class="item-left">
          <div class="item-date">{{v.d}}</div>
          <div class="item-bet">{{$t('page2.history.amt')}}{{getTwoBit(v.t)}}</div>
          <div class="item-bet">{{$t('page2.history.vamt')}}{{getTwoBit(v.v)}}</div>
        </div>
        <div class="item-right" @touchstart="startFun" @touchend="endFun(v.tp)">
          <span v-if="v.s" class="item-none">
            {{$t('page2.history.noacc')}}
            <arrow type="right" color="#C0C0C0" />
          </span>
          <span v-else-if="v.w >= 0" class="item-win">
            +{{getTwoBit(v.w)}}
            <arrow type="right" color="#C0C0C0" />
          </span>
          <span v-else class="item-lose">
            {{getTwoBit(v.w)}}
            <arrow type="right" color="#C0C0C0" />
          </span>
        </div>
      </div>
    </div>
    <div v-if="finish && !loading && listData.length" class="no-more">我已经把我所有给你了!</div>
    <div v-if="loading" class="loading-bar"><icon-loading /></div>
  </div>
</list-page>
</template>
<script>
import { changeTime, getUserInfo } from '@/utils/betUtils';
import { getBetHistory } from '../api/bet';
import ListPage from '../components/common/ListPage';
import NavBar from '../components/common/NavBar';
import DateSelect from '../components/common/DateSelect';
import Arrow from '../components/common/Arrow';
import IconLoading from '../components/common/icons/IconLoading';

export default {
  data() {
    return {
      user: {},
      t: { max: 300, st: 0, timer: null },
      selectData: {
        from: this.$t('page2.history.start'),
        to: this.$t('page2.history.end'),
        min: '-2,0,0',
        max: '',
      },
      listData: [],
      tsel: { from: '', to: '', mid: '' },
      height: 0,
      loading: false,
      finish: false,
      pageCnt: 100,
    };
  },
  methods: {
    startFun() {
      this.t.st = Date.now();
    },
    endFun(tp) {
      if (Date.now() - this.t.st <= this.t.max) {
        this.$router.push(`/hDetail/${tp}`);
      }
    },
    getTwoBit(num) {
      const nNum = Math.abs(num);
      let nn = 10 ** -6;
      nn *= 5;
      const [numStr, flag] = [(nNum + nn).toString(), +num < 0 ? '-' : ''];
      return `${flag}${numStr.slice(0, numStr.indexOf('.') + 3)}`;
    },
    async queryBetListData(obj, fun) {
      try {
        const data = await getBetHistory(obj);
        this.loading = false;
        if (data && data.length) {
          const [ldt, len] = [JSON.parse(JSON.stringify(this.listData)), this.listData.length];
          for (let i = 0; i < data.length; i += 1) {
            const item = data[i];
            const dt = new Date(changeTime(item.tp));
            const [year, monAndDay] = [dt.getFullYear(), `${`0${dt.getMonth() + 1}`.slice(-2)}/${`0${dt.getDate()}`.slice(-2)}`];
            let ly = ldt.length;
            if (!ly || ldt[ly - 1].year !== year) {
              ldt.push({ year, data: [] });
              ly += 1;
            }
            let ld = ldt[ly - 1].data.length;
            if (!ld || ldt[ly - 1].data[ld - 1].d !== monAndDay) {
              const optn = { t: 0, v: 0, w: 0 };
              [optn.d, optn.s, optn.tp] = [monAndDay, true, changeTime(item.tp)];
              ldt[ly - 1].data.push(optn);
              ld += 1;
            }
            const opt = ldt[ly - 1].data[ld - 1];
            opt.t += item.tamt || 0;
            opt.w += item.win || 0;
            if (/^(1|2|3|8)$/.test(item.wst)) {
              opt.v += item.tamt || 0;
              opt.s = false;
            }
            ldt[ly - 1].data[ld - 1] = opt;
          }
          if (len) {
            this.$set(this.listData, len - 1, ldt[len - 1]);
          }
          for (let i = len; i < ldt.length; i += 1) {
            this.listData.push(ldt[i]);
          }
          if (fun && typeof fun === 'function') {
            fun(data);
          }
        }
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
    getListData() {
      const check = !this.loading && !this.finish && this.user && this.user.nbUser;
      if (check && new Date(this.tsel.from) <= new Date(this.tsel.mid)) {
        const et = new Date(this.tsel.mid).getTime();
        const st = new Date(this.tsel.from).getTime();
        const req = { st: changeTime(st, true), et: changeTime(et, true), tp: 2 };
        [req.wst, req.cnt] = [[-1], this.pageCnt];
        [this.loading, this.finish] = [true, false];
        this.queryBetListData(req, (data) => {
          if (data && data.length && data.length >= this.pageCnt) {
            const dt = changeTime(data[data.length - 1].tp) - 1;
            this.tsel.mid = this.getDate(dt);
          } else {
            this.tsel.mid = this.tsel.from;
            this.finish = true;
          }
        });
      }
    },
    getDate(time, d) {
      const [dt, sd] = [time ? new Date(time) : new Date(), (d || 0) * 86400000];
      const ndt = new Date(dt.getTime() + sd);
      let tstr = `${ndt.getFullYear()}-${`0${ndt.getMonth() + 1}`.slice(-2)}-${`0${ndt.getDate()}`.slice(-2)}`;
      tstr += ` ${`0${ndt.getHours()}`.slice(-2)}:${`0${ndt.getMinutes()}`.slice(-2)}:${`0${ndt.getSeconds()}`.slice(-2)}`;
      return tstr;
    },
    makeArange(from, to) {
      this.tsel.from = `${`${from || this.getDate(null, -3652)}`.split(' ')[0]} 00:00:00`;
      this.tsel.to = `${`${to || this.getDate(null, 1)}`.split(' ')[0]} 23:59:59`;
      [this.tsel.mid, this.listData] = [this.tsel.to, []];
      [this.loading, this.finish] = [false, false];
      this.getListData();
    },
    selChange(from, to) {
      this.makeArange(from, to);
    },
  },
  components: {
    ListPage,
    NavBar,
    DateSelect,
    Arrow,
    IconLoading,
  },
  async mounted() {
    this.user = await getUserInfo();
    const [w, n] = [this.$el.offsetWidth, 0.44 / 3.75];
    this.height = this.$el.querySelector('.page-content').offsetHeight;
    this.height -= w * n;
    this.height = `${this.height - 50}px`;
    this.makeArange();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.history-null {
  width: 3.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: .15rem;
  color: #FFF;
  opacity: .7;
}
.history-list {
  width: 100%;
  .year-list {
    width: 95%;
    margin: 0 auto;
    .year-text {
      width: 100%;
      height: .21rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: .15rem;
      color: #FFF;
      opacity: .5;
      margin-top: .1rem;
      font-family: PingFangSC-Regular;
    }
    .year-item {
      width: 100%;
      height: .9rem;
      margin-top: .1rem;
      background-image: linear-gradient(-90deg, #FFFFFF 0%, #F1F1F1 98%);
      box-shadow: 0 .02ewm .12rem 0 rgba(0,0,0,0.10);
      border-radius: .1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: .1rem .13rem;
      .item-left, .item-right {
        width: 50%;
        height: 100%;
        display: flex;
        align-items: center;
      }
      .item-left {
        flex-direction: column;
        justify-content: space-around;
        .item-date, .item-bet{
          width: 100%;
        }
        .item-date {
          font-family: DIN-Medium;
          font-size: .2rem;
          color: #333;
        }
        .item-bet {
          font-family: PingFangSC-Regular;
          font-size: .13rem;
          color: #666;
        }
      }
      .item-right {
        justify-content: flex-end;
        .item-none, .item-win, .item-lose {
          display: flex;
          align-items: center;
          svg {
            margin-left: .08rem;
          }
        }
        .item-none {
          color: #999;
          font-size: .15rem;
          font-family: PingFangSC-Regular;
        }
        .item-win {
          color: #FF4A4A;
          font-size: .2rem;
          font-family: DIN-Medium;
        }
        .item-lose {
          color: #7CCD5D;
          font-size: .2rem;
          font-family: DIN-Medium;
        }
      }
    }
  }
  .no-more, .loading-bar {
    padding: .16rem 0 .06rem;
    text-align: center;
    color: @page1Font3;
  }
}
</style>
