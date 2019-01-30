<template>
  <div class="input-field">
    <label>{{label}}</label>
    <span class="field-content" @touchstart.stop="sFun" @touchend.stop="eFun">
      <slot />
    </span>
    <icon-arrow
      v-if="arrow"
      class="icon-arrow"
      width=".14rem"
      height=".14rem"
      direction="right"
    />
  </div>
</template>
<script>
import IconArrow from '../../common/icons/IconArrow';

export default {
  data() {
    return {
      t: { max: 300, st: 0 },
    };
  },
  props: {
    label: {
      type: String,
    },
    arrow: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    IconArrow,
  },
  methods: {
    sFun() {
      this.t.st = Date.now();
    },
    eFun() {
      if (Date.now() - this.t.st > this.t.max) return;
      this.$emit('select', true);
    },
  },
};
</script>
<style lang="less">
.input-field {
  display: flex;
  align-items: center;
  height: .44rem;
  padding: 0 .16rem 0 .1rem;
  background-image: linear-gradient(90deg, #494B50 0%, #38393D 100%);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.10);
  border-bottom: 1px solid rgba(40, 45, 63, .5);
  &:last-child {
    border-bottom: 0;
  }
  label, .field-content {
    flex-grow: 1;
  }
  label {
    color: rgba(255, 255, 255, .7);
  }
  .field-content {
    text-align: right;
    & select, & input {
      background: transparent;
      color: #fff;
      border: 0;
      font-size: .15rem;
      appearance: none;
      text-align: right;
      option {
        color: #666;
      }
    }
  }
  .icon-show-expand {
    margin-left: .1rem;
  }
}
</style>
