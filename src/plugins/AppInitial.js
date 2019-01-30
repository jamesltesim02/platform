import { saveCasinoUser } from '@/utils/CasinoUserUtils';
import getParameter from '@/utils/getParameter';

const loc = window.location;
const his = window.history;

export default {
  install() {
    // 用户token
    const token = getParameter('token');
    // 返回
    const backUrl = getParameter('backUrl');
    // 存款地址
    const depositUrl = getParameter('depositUrl') || backUrl;
    // 登录地址
    const loginUrl = getParameter('loginUrl') || backUrl;

    if (!token && !backUrl) {
      return;
    }

    saveCasinoUser({
      token,
      backUrl: decodeURIComponent(backUrl || 'http://m.nbbets.com/'),
      depositUrl: decodeURIComponent(depositUrl),
      loginUrl: decodeURIComponent(loginUrl),
    });

    his.replaceState({}, null, `${loc.protocol}//${loc.host}/${loc.hash}`);
  },
};
