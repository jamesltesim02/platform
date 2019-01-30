import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home';
import MatchListByState from './views/MatchListByState';
import Setting from './views/Setting';
import SportPage from './views/SportPage';
import League from './views/League';
import MatchDetail from './views/MatchDetail';
import Bet from './views/Bet';
import History from './views/History';
import HistoryDetail from './views/HistoryDetail';

// import Demo from './views/Demo';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/state/:matchState',
      name: 'rolling',
      props: true,
      component: MatchListByState,
    },
    {
      path: '/setting',
      name: 'setting',
      component: Setting,
    },
    {
      path: '/new/sport/:sno',
      name: 'sport',
      component: SportPage,
    },
    {
      path: '/new/league/:sno/:leagueid',
      name: 'league',
      component: League,
    },
    {
      path: '/new/match/:matchid',
      name: 'match',
      component: MatchDetail,
    },
    {
      path: '/bet',
      name: 'bet',
      component: Bet,
    },
    {
      path: '/history',
      name: 'history',
      component: History,
    },
    {
      path: '/hDetail/:time',
      name: 'hDetail',
      component: HistoryDetail,
    },
    // {
    //   path: '/demo',
    //   name: 'demo',
    //   component: Demo,
    // },
  ],
});
