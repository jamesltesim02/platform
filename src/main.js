import Vue from 'vue';
import VueTouch from 'vue-touch';
import Vue2Toast from 'vue2-toast';
import VueCarousel from 'vue-carousel';
import 'vue2-toast/lib/toast.css';

import CommonRegistion from './plugins/CommonRegistion';
// import RestREM from './plugins/ResetREM';
import Pusher from './plugins/Pusher';
import AppInitial from './plugins/AppInitial';

import router from './router';
import store from './store';
import App from './App.vue';
import { initI18n } from './utils/I18nUtil';

import './assets/styles/reset.css';
import './assets/styles/common.less';
import './registerServiceWorker';

Vue.config.productionTip = false;

// App 初始化动作
Vue.use(AppInitial);
// 初始化REM值插件
// Vue.use(RestREM);
// vue-touch 触摸事件
Vue.use(VueTouch, { name: 'v-touch' });
// 项目中的公共组件及过滤器注册
Vue.use(CommonRegistion);
// 推送插件
Vue.use(Pusher);
// vue-toast 弹窗
Vue.use(Vue2Toast, {
  type: 'center',
  duration: 3000,
  wordWrap: true,
});
// 轮播图插件
Vue.use(VueCarousel);

const start = async () => {
  new Vue({ // eslint-disable-line no-new
    el: '#app',
    i18n: await initI18n(),
    router,
    store,
    render: h => h(App),
  });
};

// 开始渲染页面
start();
