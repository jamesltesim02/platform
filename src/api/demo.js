import createAxios from './createAxios';

const axios = createAxios({
  baseURL: window.NBConfig.API_URL,
});

export const listBanner = () => axios.get('common/listBanner');

export const indexData = () => axios.get('common/indexData');

export const register = () => { };

/**
 * 用户登录
 *
 * @param {string} params.username
 *    账号
 * @param {string} params.password
 *    密码
 */
export const login = params => axios.post('user/login', params);


/**
 * 查询用户列表
 */
export const list = () => axios.get('user/list');
