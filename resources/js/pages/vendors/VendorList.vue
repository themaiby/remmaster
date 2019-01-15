<template>
  <div>
    <template slot="page-title">asd</template>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";

  @Component
  export default class VendorList extends Vue {
    mounted() {
      console.log('vendorslist mounted')
    }
  }
</script>

<style scoped>

</style>
