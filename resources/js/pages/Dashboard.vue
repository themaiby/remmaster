<template>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {setCurrentPageTitle} from "../utils/helpers";
  import i18n from "../utils/i18n";

  @Component
  export default class Dashboard extends Vue {
    // set current page name
    beforeCreate() {
      setCurrentPageTitle(`${i18n.t('common.dashboard')}`);
    }
  }
</script>

<style scoped>

</style>
