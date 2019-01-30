export default (vm, {
  data,
  mid,
  st,
}) => {
  if (!vm.matchs || !vm.matchs.length) {
    return;
  }

  // 检查是否包含列表的 让球 大小玩法更新
  const validGames = data.filter(g =>
    g.bstage === 0
    && g.isFav
    && [16, 18].includes(g.gtp));
  if (!validGames.length) {
    return;
  }

  // 判断是否是页面上已列出的比赛
  const matchIndex = vm.matchs.findIndex(m => m.matchID === mid);
  if (matchIndex === -1) {
    return;
  }

  // 循环处理
  const matchedGames = vm.matchs[matchIndex].games;
  validGames.forEach((modifyGame) => {
    const gameIndex = matchedGames.findIndex(v => v.gameType === modifyGame.gtp);
    const modifyOptions = modifyGame.options.filter(v => v.state > 5).map(mo => ({
      optionID: mo.oid,
      betOption: mo.name,
      betStatus: mo.state,
      odds: mo.odds,
      optionNo: mo.ono,
      betBar: modifyGame.ovalue,
      oddsLower: false,
      oddsUpper: false,
    }));

    if (!modifyOptions.length) {
      if (gameIndex !== -1) {
        matchedGames.splice(gameIndex, 1);
      }
      return;
    }

    const newGame = {
      gameType: modifyGame.gtp,
      betStage: modifyGame.bstage,
      betBar: modifyGame.ovalue,
      gameNo: modifyGame.gno,
      groupType: modifyGame.bcontent,
      sportID: st,
      options: modifyOptions,
    };

    if (gameIndex !== -1) {
      matchedGames[gameIndex] = newGame;
    } else {
      matchedGames.push(newGame);
    }
  });
  matchedGames.sort((g1, g2) => g1.gameNo - g2.gameNo);
};
