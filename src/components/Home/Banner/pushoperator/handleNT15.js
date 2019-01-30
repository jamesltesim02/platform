export default (vm, {
  mid,
}) => {
  const matchIndex = vm.banners.findIndex(b => b.matchID === mid);
  if (matchIndex !== -1) {
    vm.banners.splice(matchIndex, 1);
  }
};
