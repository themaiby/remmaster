<template>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {applicationStore} from "../../store/modules/ApplicationStore";
  import i18n from "../../utils/i18n";
  import {vendorsStore} from "../../store/modules/VendorsStore";

  @Component
  export default class VendorShow extends Vue {
    beforeCreate() {
      applicationStore.setCurrentPageTitle(
        `${i18n.t('vendors.vendor')} "${vendorsStore.vendor.name}"`
      );
    }
  }
</script>

<style scoped>

</style>
