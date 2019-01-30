import sleep from '@/utils/sleep';

export default (vm, {
  data,
  mid,
}) => {
  if (!vm.matchs || !vm.matchs.length) {
    return;
  }

  // 检查是否包含列表的 让球 大小玩法更新
  const validGames = data.filter(g => [16, 18].includes(g.gtp));
  if (!validGames.length) {
    return;
  }

  // 判断是否是页面上已列出的比赛
  const matchIndex = vm.matchs.findIndex(m => m.matchID === mid);
  if (matchIndex === -1) {
    return;
  }

  // 循环处理
  const match = vm.matchs[matchIndex];
  match.games.forEach(async (g, gi) => {
    const modifyGame = validGames.find(vg => vg.gtp === g.gameType);
    if (!modifyGame) {
      return;
    }

    g.options.forEach(async (opt, oi) => {
      const modifyOption = modifyGame.options.find(v => v.oid === opt.optionID);
      if (!modifyOption) {
        return;
      }
      if (opt.odds < modifyOption.odds) {
        opt.oddsUpper = true;
        await sleep(1500);
        opt.oddsUpper = false;
        vm.$set(vm.matchs[matchIndex].games[gi].options, oi, opt);
      }

      if (opt.odds > modifyOption.odds) {
        opt.oddsLower = true;
        await sleep(1500);
        opt.oddsLower = false;
        vm.$set(vm.matchs[matchIndex].games[gi].options, oi, opt);
      }

      opt.odds = modifyOption.odds;
      vm.$set(vm.matchs[matchIndex].games[gi].options, oi, opt);
    });
  });
};
