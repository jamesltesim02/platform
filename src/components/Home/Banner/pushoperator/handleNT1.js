export default (vm, {
  mid,
  data,
}) => {
  const matchIndex = vm.banners.findIndex(b => b.matchID === mid);
  if (matchIndex === -1) {
    return;
  }

  // 检查是否包含列表的 让球 大小玩法更新
  const modifyGame = data.find(g => g.bstage === 0 && [1].includes(g.gtp));
  if (!modifyGame) {
    return;
  }

  const {
    slideMatch: {
      options,
    },
  } = vm.banners[matchIndex];

  modifyGame.options.forEach((mo) => {
    const bi = options.findIndex(v => v.matchID === mo.mid);
    if (bi === -1) {
      return;
    }

    options[bi].betStatus = mo.state;
    vm.$set(vm.banners[matchIndex].slideMatch.options, bi, options[bi]);
  });
};
