import sleep from '@/utils/sleep';

export default (vm, { data }) => {
  vm.matchInfo.games.forEach((g, gi) => {
    const modifyGames = data.filter(({ gtp }) => gtp === g.gameType);
    if (!modifyGames || !modifyGames.length) {
      return;
    }

    const modifyOptions = [];
    modifyGames.forEach((mg) => {
      modifyOptions.push(...mg.options);
    });

    g.options.forEach((gos) => {
      if (!Array.isArray(gos)) {
        gos = [gos];
      }

      gos.forEach(async (go) => {
        const mo = modifyOptions.find(v => v.oid === go.optionID);
        if (!mo) {
          return;
        }
        if (go.odds === mo.odds) {
          return;
        }

        if (go.odds < mo.odds) {
          go.oddsUpper = true;

          await sleep(1500);
          go.oddsUpper = false;
          vm.$set(vm.matchInfo.games, gi, g);
        }

        if (go.odds > mo.odds) {
          go.oddsLower = true;
          await sleep(1500);
          go.oddsLower = false;
          vm.$set(vm.matchInfo.games, gi, g);
        }

        go.odds = mo.odds;
        vm.$set(vm.matchInfo.games, gi, g);
      });
    });
  });
};
