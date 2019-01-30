<template>
  <div class="date-select">
    <div class="select-from" @touchend="showFrom">{{fDef || data.from}}</div>
    <Picker :data.sync="fromData" @select="selectFromFun" />
    <span class="select-mid">{{$t('page2.history.til')}}</span>
    <div class="select-to" @touchend="showTo">{{tDef || data.to}}</div>
    <Picker :data.sync="toData" @select="selectToFun" />
  </div>
</template>

<script>
import Picker from './Picker/index.vue';

export default {
  inheritAttrs: false,
  name: 'DateSelect',
  data() {
    return {
      fHide: true,
      fFrom: this.getDate(null, -10, 0, 0),
      fTo: this.getDate(null, 0, 0, 0),
      fDef: '',
      tHide: true,
      tFrom: this.getDate(null, -10, 0, 0),
      tTo: this.getDate(null, 0, 0, 0),
      tDef: '',
    };
  },
  props: {
    data: Object,
  },
  components: {
    Picker,
  },
  computed: {
    min() {
      const nMin = this.data.min;
      if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(nMin)) {
        return [nMin, 0, 0, 0];
      } else if (/^[+-]?\d{1,3}([,;]+[+-]?\d{1,3}){2}$/.test(nMin)) {
        return [null].concat(nMin.split(/[,;]+/));
      }
      return [null, -10, 0, 0];
    },
    max() {
      const nMax = this.data.max;
      if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(nMax)) {
        return [nMax, 0, 0, 0];
      } else if (/^[+-]?\d{1,3}([,;]+[+-]?\d{1,3}){2}$/.test(nMax)) {
        return [null].concat(nMax.split(/[,;]+/));
      }
      return [null, 0, 0, 0];
    },
    fromData: {
      get() {
        const obj = { hide: this.fHide, default: this.fDef, join: '/' };
        obj.title = this.data.from;
        obj.from = this.fFrom;
        obj.to = this.fTo;
        return obj;
      },
      set(obj) {
        if (obj.hide !== undefined) {
          this.fHide = obj.hide;
        }
        if (obj.from !== undefined) {
          this.fFrom = obj.from;
        }
        if (obj.to !== undefined) {
          this.fTo = obj.to;
        }
        if (obj.default !== undefined) {
          this.fDef = obj.default;
        }
      },
    },
    toData: {
      get() {
        const obj = { hide: this.tHide, default: this.tDef, join: '/' };
        obj.title = this.data.to;
        obj.from = this.tFrom;
        obj.to = this.tTo;
        return obj;
      },
      set(obj) {
        if (obj.hide !== undefined) {
          this.tHide = obj.hide;
        }
        if (obj.from !== undefined) {
          this.tFrom = obj.from;
        }
        if (obj.to !== undefined) {
          this.tTo = obj.to;
        }
        if (obj.default !== undefined) {
          this.tDef = obj.default;
        }
      },
    },
  },
  methods: {
    getTStr(time) {
      const dt = time ? new Date(time) : new Date();
      return `${dt.getFullYear()}-${`0${dt.getMonth() + 1}`.slice(-2)}-${`0${dt.getDate()}`.slice(-2)}`;
    },
    getDate(time, y, m, d) {
      const [dt, sd] = [time ? new Date(time) : new Date(), d * 86400000];
      let year = dt.getFullYear() + y;
      let month = dt.getMonth() + m + 1;
      const [num, flag] = [parseInt(month / 12, 10), month < 0 ? 1 : 0];
      if (month < 0 || month > 12) {
        year += num - flag;
        month += (flag - num) * 12;
      }
      const ndt = new Date(`${year}-${month}-${dt.getDate()}`);
      return this.getTStr(ndt.getTime() + sd);
    },
    showFrom() {
      this.fHide = false;
    },
    showTo() {
      this.tHide = false;
    },
    selectFromFun(i, v) {
      this.tFrom = v.join('-');
      setTimeout(() => { this.$emit('change', this.fDef, this.tDef); }, 10);
    },
    selectToFun(i, v) {
      this.fTo = v.join('-');
      setTimeout(() => { this.$emit('change', this.fDef, this.tDef); }, 10);
    },
  },
  mounted() {
    this.fFrom = this.getDate(this.min[0], +this.min[1], +this.min[2], +this.min[3]);
    this.fTo = this.getDate(this.max[0], +this.max[1], +this.max[2], +this.max[3]);
    this.tFrom = this.getDate(this.min[0], +this.min[1], +this.min[2], +this.min[3]);
    this.tTo = this.getDate(this.max[0], +this.max[1], +this.max[2], +this.max[3]);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.date-select {
  width: 100%;
  height: .44rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #3F4045;
  .select-from, .select-mid, .select-to {
    height: .44rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: .15rem;
    color: #FFF;
    opacity: .5;
    font-family: PingFangSC-Regular;
  }
  .select-from, .select-to {
    width: 1.6rem;
  }
  .select-mid {
    width: .55rem;
  }
}
</style>
