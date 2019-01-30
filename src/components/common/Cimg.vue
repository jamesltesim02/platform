<template>
  <img :src="url" />
</template>
<script>
const staticUrl = window.NBConfig.STATIC_URL;

export default {
  props: {
    src: {
      type: String,
      required: true,
    },
  },
  computed: {
    url() {
      return staticUrl + this.src;
    },
  },
};
</script>

