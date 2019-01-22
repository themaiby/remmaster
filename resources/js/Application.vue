<template>
  <v-app id="content-body">
    <router-view v-if="applicationLoaded"></router-view>
    <span v-else>Loading...</span>
  </v-app>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {applicationStore} from "./store/modules/ApplicationStore";

  @Component
  export default class Application extends Vue {
    get applicationLoaded() {
      return applicationStore.loaded;
    }
  }
</script>
<style scoped>
  #content-body {
    background: #abbaab; /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #ffffff, #abbaab); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #ffffff, #abbaab); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
</style>
