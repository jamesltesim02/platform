<template>
<div class="hot-league-bar">
  <icon-loading
    v-if="loading"
    class="center-loading"
  />
  <ul v-if="items.length">
    <v-touch
      tag="li"
      v-for="(l, i) in items"
      :key="i"
      @tap="$router.push(`/new/league/${l.sportID}/${l.tournamentID}`)"
    >
      <div v-if="l.logo" class="logo">
        <cimg :src="`logo/${l.logo}`" />
      </div>
      <i v-else class="default-logo"></i>
      <div>{{l.abbr || l.name}}</div>
    </v-touch>
  </ul>
</div>
</template>
<script>
import { StorageKey } from '@/config/constants';
import { loadFromStorage, saveToStorage } from '@/utils/StorageUtil';
import { findportaltou } from '@/api/pull';
import IconLoading from '@/components/common/icons/IconLoading';

export default {
  data() {
    return {
      loading: false,
      items: [],
    };
  },
  async created() {
    this.items = loadFromStorage(StorageKey.HOT_TOUNAMENTS_KEY, []);
    try {
      this.loading = true;
      this.items = await findportaltou();
      this.items.length = 6;
      saveToStorage(StorageKey.HOT_TOUNAMENTS_KEY, this.items);
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  },
  components: {
    IconLoading,
  },
};
</script>
<style lang="less">
.hot-league-bar {
  position: relative;
  z-index: 3;
  color: @page1Font4;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  margin-top: -.63rem;
  margin-bottom: .15rem;
  padding: 0 .1rem;
  ul {
    display: flex;
    background-image: linear-gradient(-180deg, #3A393F 2%, #333238 97%);
    border-radius: 10px;
    padding: .06rem .12rem;
    justify-content: space-between;
    li {
      display: flex;
      width: .4rem;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      div {
        margin-top: .05rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        text-align: center;
        font-size: .12rem;
      }
    }
    .logo, .default-logo {
      width: .4rem;
      height: .4rem;
    }
    .logo img {
      width: .4rem;
      height: .82rem;
      margin-top: @leagueLogoTopPosition;
    }
    .default-logo {
      background: #fcc;
      border-radius: 50%;
    }
  }
}
</style>
