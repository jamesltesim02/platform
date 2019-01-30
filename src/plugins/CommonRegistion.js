import Vue from 'vue';

import simpleDateFormat from '@/utils/simpleDateFormat';
import oddsFormat from '@/filters/oddsFormat';

import Cimg from '@/components/common/Cimg.vue';

const installFilters = () => {
  // 时间日期格式化
  Vue.filter('dateFormat', (source, pattern) => simpleDateFormat(source, pattern));
  // 赔率显示转换
  Vue.filter('oddsFormat', oddsFormat);
};

const installComponents = () => {
  // cdn图片组件
  Vue.component('cimg', Cimg);
};

const install = () => {
  installFilters();
  installComponents();
};

export default { install };
