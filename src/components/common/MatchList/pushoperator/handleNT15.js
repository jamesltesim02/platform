
export default (vm, {
  mid,
}) => {
  if (!vm.matchs || !vm.matchs.length) {
    return;
  }

  // 判断是否是页面上已列出的比赛
  const matchIndex = vm.matchs.findIndex(m => m.matchID === mid);

  if (matchIndex !== -1) {
    vm.matchs.splice(matchIndex, 1);
  }
};
