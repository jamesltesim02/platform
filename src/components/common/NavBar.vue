<template>
  <header class="nav-bar">
    <div class="nav-content">{{title}}</div>
    <div class="nav-operators">
      <v-touch
        v-if="backable"
        tag="a"
        @tap="goback"
        class="opr-back"
      ><icon-arrow /></v-touch>
      <div class="opr-others"><slot /></div>
    </div>
  </header>
</template>
<script>
import IconArrow from './icons/IconArrow';

export default {
  props: {
    title: String,
    backable: {
      type: Boolean,
      default: true,
    },
    backurl: String,
  },
  methods: {
    goback() {
      if (this.backurl) {
        if (/^https?/.test(this.backurl)) {
          window.location = this.backurl;
          return;
        }
        this.$router.push(this.backurl);
        return;
      }
      this.$router.go(-1);
    },
  },
  components: {
    IconArrow,
  },
};
</script>
<style lang="less">
.nav-bar {
  // position: relative;
  // background: @appHeaderBackground;
  // box-shadow: @appHeaderBoxshadow;
  // color: @appHeaderFont;
  .nav-content {
    text-align: center;
    line-height: .44rem;
    font-size: .17rem;
  }
  .nav-operators {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    height: .44rem;
    width: 100%;
    font-size: .15rem;
    z-index: 3;
    a {
      color: @appHeaderFont;
    }
    .opr-others {
      display: flex;
      flex-grow: 1;
      height: .44rem;
      align-items: center;
      justify-content: flex-end;
    }
  }
  .opr-back {
    display: flex;
    align-items: center;
    padding: 0 .15rem;
    line-height: .44rem;
  }
}
</style>
