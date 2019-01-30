<template>
  <component :is="comp" class="icon-sport" :multicolor="multicolor" />
</template>
<script>
import IconFootball from './IconFootball';
import IconBasketball from './IconBasketball';
import IconTennis from './IconTennis';
import IconLOL from './IconLOL';
import IconDota from './IconDota';
// import IconCS from './IconCS';
// import IconStarCraft from './IconStarCraft';
import IconArenaOfValor from './IconArenaOfValor';
// import IconOverwatch from './IconOverwatch';

// import IconVolleyball from './IconVolleyball';
// import IconIceball from './IconIceball';
// import IconHandball from './IconHandball';
// import IconGolf from './IconGolf';
// import IconBilliard from './IconBilliard';
// import IconBadminton from './IconBadminton';
// import IconBlack8 from './IconBlack8';

/*
体育定义 - SportID
10 = Soccer 足球
11 = Basketball 篮球
12 = Tennis 网球
14 = LOL 英雄联盟
15 = Dota2 刀塔2
16 = CounterStrike 反恐精英
17 = StarCraft 星际争霸

18 = Overwatch 守望先锋
19 = ArenaOfValor 王者荣耀
*/

const SNO_COMPS_MAPPING = {
  10: IconFootball,
  11: IconBasketball,
  12: IconTennis,
  14: IconLOL,
  15: IconDota,
  // 16: IconCS,
  // 17: IconStarCraft,
  // 18: IconOverwatch,
  19: IconArenaOfValor,
};

export default {
  props: ['sno', 'multicolor'],
  computed: {
    comp() {
      return SNO_COMPS_MAPPING[this.sno];
    },
  },
};
</script>
