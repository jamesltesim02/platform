<template>
  <i class="nb-bet-item"></i>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { getUserInfo, getMultQuotePara } from '@/utils/betUtils';
import { getQuoteMultBetList } from '@/api/quote';

export default {
  inheritAttrs: false,
  name: 'BetItem',
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: ['checked', 'oid'],
  computed: {
    ...mapState({
      betFlag: state => state.bet.betFlag,
      betStatus: state => state.bet.betStatus,
      betCount: state => state.bet.betCount,
    }),
  },
  watch: {
    betFlag() {
      this.setChange();
    },
    betCount() {
      this.setChange();
    },
  },
  methods: {
    ...mapMutations([
      'clickBetItem',
      'checkBetItem',
      'quoteBetOption',
      'clearBetAlert',
    ]),
    async bet(obj) {
      this.clearBetAlert();
      const data = obj;
      const user = await getUserInfo();
      const para = getMultQuotePara(user, [data]);
      this.checkBetItem([obj]);
      if (user && para && this.betStatus < 0) {
        try {
          const rst = await getQuoteMultBetList(para);
          if (rst && rst.length && rst[0] && rst[0].state && /^7$/.test(rst[0].state)) {
            this.clickBetItem(data);
            this.quoteBetOption(rst);
          }
        } catch (e) {
          console.log(e);
        }
      } else {
        this.clickBetItem(data);
      }
    },
    setChange() {
      this.checkBetItem(this.oid);
      this.$emit('change', this.betStatus >= 0);
    },
  },
  mounted() {
    setTimeout(() => { this.setChange(); }, 1);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.nb-bet-item {
  width: 0;
  height: 0;
  display: none;
}
