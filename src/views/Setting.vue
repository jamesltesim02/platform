<template>
<list-page class="page-setting">
  <nav-bar title="偏好设置" slot="header" />
  <fields-list title="用户首选项">
    <input-field label="语言" @select="showLan">
      {{langData.default}}
      <Picker :data.sync="langData" @select="selLan" />
    </input-field>
    <input-field label="赔率" @select="showOdds">
      {{oddsData.default}}
      <Picker :data.sync="oddsData" @select="selOdds" />
    </input-field>
  </fields-list>
  <fields-list title="投注首选项">
    <input-field
      label="投注时自动接受更高赔率变化"
      :arrow="false"
    >
      <toggle-button v-model="acceptHeightOddsChange" />
    </input-field>
    <input-field
      label="投注时自动接受所有赔率变化"
      :arrow="false"
    >
      <toggle-button v-model="acceptAllOddsChange" />
    </input-field>
    <input-field label="投注本金设置" @select="showAmount">
      {{`${betAmount}RMB`}}
      <SetKeyboard :data.sync="amountData" @submit="subAmount"/>
    </input-field>
  </fields-list>
</list-page>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import { setLanguage } from '@/utils/I18nUtil';
import { getLangObj, getOddsObj, getAmountObj } from '@/utils/setUtils';
import ListPage from '@/components/common/ListPage';
import NavBar from '@/components/common/NavBar';
import FieldsList from '@/components/Setting/FieldsList';
import InputField from '@/components/Setting/FieldsList/InputField';
import ToggleButton from '@/components/Setting/FieldsList/ToggleButton';
import SetKeyboard from '@/components/common/SetKeyboard';
import Picker from '@/components/common/Picker';

export default {
  data() {
    return {
      langData: getLangObj(),
      oddsData: getOddsObj(),
      amountData: getAmountObj(),
    };
  },
  computed: {
    ...mapState('setting', [
      'oddsType',
      'oddsAC',
      'betAmount',
    ]),
    acceptHeightOddsChange: {
      get() {
        return this.oddsAC >= 1;
      },
      set(n) {
        this.updateSetting({
          key: 'oddsAC',
          value: n ? 1 : 0,
        });
      },
    },
    acceptAllOddsChange: {
      get() {
        return this.oddsAC === 2;
      },
      set(n) {
        if (this.oddsAC === 0) {
          return;
        }
        this.updateSetting({
          key: 'oddsAC',
          value: n ? 2 : 1,
        });
      },
    },
  },
  components: {
    ListPage,
    NavBar,
    FieldsList,
    InputField,
    ToggleButton,
    SetKeyboard,
    Picker,
  },
  methods: {
    ...mapMutations('setting', [
      'updateSetting',
    ]),
    showLan() {
      this.langData.hide = false;
    },
    selLan(i, v) {
      setLanguage(v[0]);
    },
    showOdds() {
      this.oddsData.hide = false;
    },
    selOdds(i, v) {
      this.updateSetting({
        key: 'oddsType',
        value: v[0],
      });
    },
    showAmount() {
      this.amountData.showInput = true;
    },
    subAmount(v) {
      this.updateSetting({
        key: 'betAmount',
        value: +v,
      });
    },
  },
};
</script>
