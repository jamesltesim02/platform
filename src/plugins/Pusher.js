import Vue from 'vue';
import AppConfig from '@/config/business.config';
import sleep from '@/utils/sleep';
import router from '@/router';
import { getCasinoUser } from '@/utils/CasinoUserUtils';

// 心跳及重连时间配置
const {
  pushAliveTime,
  pushReconnectTime,
  pushRetryTimes,
} = AppConfig;

// 推送服务地址
const protocol = window.location.protocol.replace('http', 'ws');
const url = `${protocol}//${window.NBConfig.PUSH_URL}`;

/**
 * 推送服务类
 */
class Pusher {
  constructor() {
    // 是否已经连接
    this.connected = false;
    // 主关注对象
    this.mainWatcher = null;
    // 副关注对象(弹窗中的关注对象)
    this.secondaryWatcher = null;
    // 重连定时对象
    this.reconnectionTimer = null;
    // 心跳定时对象
    this.aliveTimer = null;
    // 最后一次心跳发送时间
    this.lastAliveTime = 0;
    // 重连次数
    this.retrytimes = 0;
  }

  /**
   * 建立连接
   */
  connect() {
    try {
      this.ws = new WebSocket(`${url}?token=${getCasinoUser().token || ''}&frontId=${AppConfig.frontId}`);
      this.ws.onopen = () => {
        console.log('ws opend');
        this.connected = true;
        // 发送首次心跳
        this.dontKillMe();
      };
      this.ws.onclose = () => {
        console.log('ws closed');
        this.connected = false;
      };
      // 绑定
      this.ws.onmessage = this.receiveMsg.bind(this);
    } catch (e) {
      // 超过重试次数,则不再重试
      if (this.retrytimes >= pushRetryTimes) {
        return;
      }
      this.retrytimes += 1;
      this.connect();
    }
  }

  /**
   * 断开并重连
   */
  reconnect() {
    clearTimeout(this.aliveTimer);

    this.ws.close();
    this.aliveTimer = null;
    this.lastAliveTime = 0;
    this.connect();
  }

  /**
   * 发送心跳消息
   */
  async dontKillMe() {
    const timestamp = parseInt(Date.now() / 1000, 10);
    this.reportMsg({
      Action: 0,
      Data: {
        Timestamp: timestamp,
      },
      Timestamp: timestamp,
    });
    this.lastAliveTime = timestamp;

    // 设置重连延迟对象,如果超过延迟时间还未收到回复,则断开重连
    this.reconnectionTimer = setTimeout(this.reconnect.bind(this), pushReconnectTime);
  }

  /**
   * 接收到心跳消息反馈
   */
  async aliveBack() {
    clearTimeout(this.reconnectionTimer);

    const timestamp = parseInt(Date.now() / 1000, 10);
    const dkmTime = pushAliveTime - (timestamp - this.lastAliveTime);
    this.reconnectionTimer = null;

    // 创建下一次心跳定时对象
    await sleep(dkmTime);
    this.dontKillMe();
  }

  /**
   * 接收到push的消息并处理
   *
   * @param {object} msg
   *    消息对象
   */
  receiveMsg(msgEvent) {
    const msg = JSON.parse(msgEvent.data || '{}');
    if (msg.nt === 0) {
      this.aliveBack();
      return;
    }

    // const data = msg.data;

    // 主关注回调
    if (this.mainWatcher && this.mainWatcher.callback) {
      this.mainWatcher.callback(msg);
    }

    // 副关注回调
    if (this.secondaryWatcher && this.secondaryWatcher.callback) {
      this.secondaryWatcher.callback(msg);
    }
  }

  /**
   * 上报消息
   */
  reportMsg(msg) {
    if (!this.ws || !this.connected) {
      throw new Error('连接已断开');
    }

    console.log('will send msg:', msg);

    this.ws.send(JSON.stringify(msg));
  }

  /**
   * 注册主关注点数据
   *
   * @param {object} data
   *    关注点数据
   * @param {function} callback
   *    回调函数
   */
  regMain({ data, callback }) {
    this.mainWatcher = {
      data,
      callback,
    };
    this.secondaryWatcher = null;

    this.reportMsg({
      Action: 2,
      Data: data,
    });
  }

  /**
   * 注册副关注点
   *
   * @param {object} data
   *    关注点数据
   * @param {function} callback
   *    回调函数
   */
  regSecondary({ data, callback }) {
    if (!data) {
      this.regMain(this.mainWatcher);
      return;
    }

    this.secondaryWatcher = {
      data,
      callback,
    };

    const { data: mainData } = this.mainWatcher;

    // 合并主关注和副关注点数据
    const pointData = {
      Tours: [].concat(mainData.Tours || []).concat(data.Tours || []),
      Matchs: [].concat(mainData.Matchs || []).concat(data.Matchs || []),
      OptionIDs: [].concat(mainData.OptionIDs || []).concat(data.OptionIDs || []),
      Tickets: [].concat(mainData.Tickets || []).concat(data.Tickets || []),
    };

    // 上报关注数据
    this.reportMsg({
      Action: 2,
      data: pointData,
    });
  }

  /**
   * 注册关注点数据
   *
   * @param {object} data
   *    关注点数据
   * @param {function} callback
   *    推送回调消息
   * @param {object} secondary
   *    是否为副关注点
   */
  regpush(data, callback, secondary = false) {
    if (!this.ws || !this.connected) {
      console.warn('连接还未就绪或已经被断开.');
      return;
    }

    // 注册副关注点(会与最后一次主关注点合并)
    if (secondary) {
      this.regSecondary({ data, callback });
      return;
    }

    // 注册主关注点(每次更新主关注点都会删除之前的副关注点)
    this.regMain({ data, callback });
  }
}

// 创建pusher对象并暴露给vue对象
export default {
  install() {
    const pusher = new Pusher();
    pusher.connect();
    Vue.prototype.$regpush = pusher.regpush.bind(pusher);
    // 路由变化时注册注册一个空监听覆盖之前的数据
    router.beforeEach((to, from, next) => {
      pusher.regpush({}, () => {});
      next();
    });
  },
};
