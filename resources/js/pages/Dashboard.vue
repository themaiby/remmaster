<template>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {applicationStore} from "../store/modules/ApplicationStore";
  import i18n from "../utils/i18n";

  @Component
  export default class Dashboard extends Vue {
    // set current page name
    beforeCreate() {
      applicationStore.setCurrentPageTitle(`${i18n.t('common.dashboard')}`);
    }
  }
</script>

<style scoped>

</style>
