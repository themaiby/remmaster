<template>

</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {Vendor} from "../../models/Vendor";

  @Component
  export default class OrderList extends Vue {
    async created() {
      const v = await Vendor.all();
      console.log(v.data.map(i => i.concat))
    }
  }
</script>

<style scoped>

</style>
