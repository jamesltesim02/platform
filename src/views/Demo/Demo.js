import { mapState, mapMutations } from 'vuex';
import { Carousel, Slide } from 'vue-carousel';
import { getLang, setLanguage } from '@/utils/I18nUtil';

import IconTabRolling from '@/components/common/icons/IconTabRolling';
import IconTabHome from '@/components/common/icons/IconTabHome';
import IconTabToday from '@/components/common/icons/IconTabToday';
import IconTabEarly from '@/components/common/icons/IconTabEarly';
import IconTabOrder from '@/components/common/icons/IconTabOrder';

import IconSetting from '@/components/common/icons/IconSetting';
import IconSearch from '@/components/common/icons/IconSearch';
import IconDeposit from '@/components/common/icons/IconDeposit';
import IconHistory from '@/components/common/icons/IconHistory';

import IconBetfall from '@/components/common/icons/IconBetfall';
import IconBetrise from '@/components/common/icons/IconBetrise';
import IconCloseCircle from '@/components/common/icons/IconCloseCircle';
import IconBetpause from '@/components/common/icons/IconBetpause';

import IconOrderWaiting from '@/components/common/icons/IconOrderWaiting';
import IconOrderSuccess from '@/components/common/icons/IconOrderSuccess';
import IconOrderNotice from '@/components/common/icons/IconOrderNotice';


import IconSport from '@/components/common/icons/IconSport';
import IconFootball from '@/components/common/icons/IconFootball';
import IconBasketball from '@/components/common/icons/IconBasketball';
import IconVolleyball from '@/components/common/icons/IconVolleyball';
import IconTennis from '@/components/common/icons/IconTennis';
import IconIceball from '@/components/common/icons/IconIceball';
import IconHandball from '@/components/common/icons/IconHandball';
import IconGolf from '@/components/common/icons/IconGolf';
import IconBilliard from '@/components/common/icons/IconBilliard';
import IconBadminton from '@/components/common/icons/IconBadminton';
import IconBlack8 from '@/components/common/icons/IconBlack8';

import IconArrow from '@/components/common/icons/IconArrow';
import IconMore from '@/components/common/icons/IconMore';
import IconRefresh from '@/components/common/icons/IconRefresh';
import IconPlayXs from '@/components/common/icons/IconPlayXs';
import IconKeyBackspace from '@/components/common/icons/IconKeyBackspace';
import IconKeyCollapse from '@/components/common/icons/IconKeyCollapse';
import IconClose from '@/components/common/icons/IconClose';
import IconWaiting from '@/components/common/icons/IconWaiting';
import IconSuccess from '@/components/common/icons/IconSuccess';
import IconAll from '@/components/common/icons/IconAll';

import IconOrderComplete from '@/components/common/icons/IconOrderComplete';

import TabBar from '@/components/common/TabBar';
import NavBar from '@/components/common/NavBar';

import ExpandTransition from '@/components/common/ExpandTransition';

import { indexData } from '@/api/demo';

import InputField from '@/components/Setting/FieldsList/InputField';

import SetKeyboard from '@/components/common/SetKeyboard';
import Picker from '@/components/common/Picker';

import BettingCountBar from '@/components/Bet/BettingCountBar';
import GameOption from '@/components/common/GameOption';
import BetBoxPop from '@/components/Bet/BetBoxPop';


export default {
  data() {
    return {
      msg3: 'loading...',
      locale: getLang(),
      languages: [
        {
          key: 'zh',
          text: '简体中文',
        },
        {
          key: 'zht',
          text: '繁體中文',
        },
        {
          key: 'en',
          text: 'English',
        },
      ],
      banners: [],
      options: [
        {
          oid: '1001',
          text: '投注项: 1001',
          odds: 1.31,
        },
        {
          oid: '1002',
          text: '投注项: 1002',
          odds: 1.32,
        },
        {
          oid: '1003',
          text: '投注项: 1003',
          odds: 1.33,
        },
        {
          oid: '1004',
          text: '投注项: 1004',
          odds: 1.34,
        },
        {
          oid: '1005',
          text: '投注项: 1005',
          odds: 1.35,
        },
        {
          oid: '1006',
          text: '投注项: 1006',
          odds: 1.36,
        },
        {
          oid: '1007',
          text: '投注项: 1007',
          odds: 1.37,
        },
        {
          oid: '1008',
          text: '投注项: 1008',
          odds: 1.38,
        },
        {
          oid: '1009',
          text: '投注项: 1009',
          odds: 1.39,
        },
      ],
      expanded: false,
      betAmount: '100RMB',
      maxOdds: 1.96,
      minOdds: 1.40,
      lanData: {
        hide: true,
        title: '语言',
        default: '简体中文',
        data: [[{ value: 'zh', text: '简体中文' }, { value: 'zht', text: '繁体中文' }, { value: 'en', text: 'English' }]],
      },
      betAmountData: {
        value: '',
        placeholder: '100.00',
        format: '0.00',
        title: '投注本金设置',
        showInput: false,
        click: false,
        hide: true,
      },
      maxOddsData: {
        value: '',
        placeholder: '1.96',
        format: '0.00',
        title: '高水位',
        showInput: false,
        click: false,
        hide: true,
      },
      minOddsData: {
        value: '',
        placeholder: '1.40',
        format: '0.00',
        title: '低水位',
        showInput: false,
        click: false,
        hide: true,
      },
    };
  },
  computed: {
    ...mapState({
      bettings: state => state.demo.bettings,
    }),
    msg2() {
      return this.$t('msg2');
    },
  },
  watch: {
    locale(n) {
      setLanguage(n);
    },
  },
  async created() {
    const result = await indexData();
    this.banners = result.banners;
  },
  mounted() {
    // 后期在js中获取的不会实时更新
    setTimeout(() => {
      this.msg3 = this.$t('msg3');
    }, 1500);
  },
  methods: {
    ...mapMutations('demo', [
      'toggleBetting',
    ]),
    doAction(actionUrl) {
      window.open(actionUrl);
    },
    isChecked(option) {
      return this.bettings.find(o => o.oid === option.oid);
    },
    betting(option) {
      this.toggleBetting(option);
    },
    toastMessage() {
      this.$toast('default message');
    },
    toastLoading() {
      this.$loading('loading...');
      setTimeout(() => {
        this.$loading.close();
      }, 3000);
    },
    toastTopMessage() {
      this.$toast.top('top message');
    },
    toastCenterMessage() {
      this.$toast.center('center message');
    },
    toastBottomMessage() {
      this.$toast.bottom('bottom message');
    },
    showLan() {
      this.lanData.hide = false;
    },
    selLan(i, v, t) {
      console.log(`i:${i}, v:${v}, t:${t}`);
    },
    showBetAmount() {
      this.betAmountData.showInput = true;
    },
    subBetAmount(v) {
      this.betAmount = `${+v}RMB`;
    },
    showMax() {
      this.maxOddsData.showInput = true;
    },
    subMax(v) {
      this.maxOdds = v;
    },
    showMin() {
      this.minOddsData.showInput = true;
    },
    subMin(v) {
      this.minOdds = v;
    },
  },
  components: {
    Carousel,
    Slide,
    IconTabRolling,
    IconTabHome,
    IconTabToday,
    IconTabEarly,
    IconTabOrder,

    IconSetting,
    IconSearch,
    IconDeposit,
    IconHistory,

    IconBetfall,
    IconBetrise,
    IconBetpause,
    IconCloseCircle,

    IconOrderWaiting,
    IconOrderSuccess,
    IconOrderNotice,

    IconSport,
    IconFootball,
    IconBasketball,
    IconVolleyball,
    IconTennis,
    IconIceball,
    IconHandball,
    IconGolf,
    IconBilliard,
    IconBadminton,
    IconBlack8,

    IconArrow,
    IconMore,
    IconRefresh,
    IconPlayXs,
    IconKeyBackspace,
    IconKeyCollapse,
    IconClose,
    IconWaiting,
    IconSuccess,
    IconAll,

    IconOrderComplete,

    TabBar,
    NavBar,

    ExpandTransition,
    InputField,

    SetKeyboard,
    Picker,

    BettingCountBar,
    GameOption,
    BetBoxPop,
  },
};
