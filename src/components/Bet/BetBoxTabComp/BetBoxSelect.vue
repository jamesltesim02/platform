<template>
  <div class="nb-bet-box-select" v-bind="$attrs" @touchstart.stop="sFun" @click.stop @touchend.stop>
    <div v-for="v in nData" :key="v.id" :class="v.class" @touchend="changeFun(v.id)" >
      <span class="select-text">{{v.text}}</span>
      <span class="select-flag"><i class="select-line"></i></span>
    </div>
  </div>
</template>

<script>

export default {
  inheritAttrs: false,
  name: 'BetBoxSelect',
  data() {
    return {
      t: { max: 300, st: 0, timer: null },
    };
  },
  props: {
    data: Object,
  },
  computed: {
    nData() {
      const [dt, rtn] = [this.data.data, []];
      for (let i = 0; i < dt.length; i += 1) {
        const obj = dt[i];
        obj.class = obj.id === this.data.select ? 'select-item select-active' : 'select-item';
        rtn.push(obj);
      }
      return rtn;
    },
  },
  methods: {
    sFun() {
      this.t.st = Date.now();
    },
    changeFun(id) {
      if (Date.now() - this.t.st > this.t.max) return;
      this.$emit('change', id || 0);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.nb-bet-box-select {
  width: 100%;
  height: .44rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #3F4045;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);
  padding: 0 .2rem;
  .select-item {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .select-text {
      font-family: PingFangSC-Regular;
      font-size: .15rem;
      color: #FFF;
      opacity: 0.5;
    }
    .select-flag {
      position: absolute;
      width: 100%;
      height: .02rem;
      left: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      .select-line {
        display: block;
        width: .2rem;
        height: 100%;
        background: transparent;
      }
    }
  }
  .select-active {
    .select-text {
      opacity: 1;
      color: #53FFFD;
      font-family: PingFangSC-Medium;
    }
    .select-flag {
      .select-line {
        background: #53FFFD;
      }
    }
  }
}
</style>

