import axios from 'axios';
import appConfig from '@/config/business.config';
import { getCasinoUser } from '@/utils/CasinoUserUtils';
import { getLangValue } from '@/utils/I18nUtil';

export default (conf) => {
  const instance = axios.create(conf);

  instance.defaults.timeout = appConfig.apiTimeout;
  instance.defaults.headers.post['Content-Type'] = 'application/json;charse=UTF-8';
  // instance.defaults.withCredentials = true;

  // 请求拦截器,设置baseurl以及默认的语言参数
  instance.interceptors.request.use(
    (reqConf) => {
      if (!reqConf) {
        return null;
      }

      const config = { ...reqConf };
      const dataKey = {
        post: 'data',
        get: 'params',
      }[config.method];

      if (dataKey) {
        config[dataKey] = {
          lang: getLangValue(),
          frontId: appConfig.frontId,
          token: getCasinoUser().token,
          ...config[dataKey],
        };
      }

      return config;
    },
    (e) => {
      console.log('request error');
      return Promise.reject(e);
    },
  );

  // 添加响应拦截器
  instance.interceptors.response.use(
    ({ data }) => {
      if (data.code === 200 || data.code === 201) {
        return data.data;
      }

      if (data.code === 300) {
        this.$toast.bottom('您的登录信息已过期,请重新登录');
        localStorage.clear()
        sessionStorage.clear()
        location = getCasinoUser().loginUrl;
        return;
      }

      return Promise.reject(data);
    },
    (e) => {
      console.log('网络连接失败.');
      return Promise.reject(e);
    },
  );

  return instance;
};
