<template>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {applicationStore} from "../../store/modules/ApplicationStore";
  import {vendorsStore} from "../../store/modules/VendorsStore";

  @Component
  export default class VendorShow extends Vue {
    beforeCreate() {
      applicationStore.setCurrentPageTitle('vendors.vendor');
      vendorsStore.getVendor(Number(this.$route.params.id));
    }

    mounted() {
      console.log(this.$route.fullPath);
    }
  }
</script>

<style scoped>

</style>
