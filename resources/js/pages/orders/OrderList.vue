<template>

</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {Vendor} from "../../models/Vendor";

  @Component
  export default class OrderList extends Vue {
    async created() {
      const vendors = await Vendor.all({perPage: 5});
    }
  }
</script>

<style scoped>

</style>
