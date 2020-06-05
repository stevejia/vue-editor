<template>
  <vue-live :layout="OnlineVueLayout" :code="code" />
</template>

<script>
import { VueLive } from "vue-live";
import { OnlineVueLayout } from "online-vue-editor";

export default {
  components: {
    VueLive,
  },
  data() {
    return {
      OnlineVueLayout,
      code: `<template>
  <div></div>
</template>`,
    };
  },
};
</script>
