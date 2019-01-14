<template>
  <div>
    <h2> app root </h2>
    <router-link :to="{name: 'vendors.index'}">To Vendors</router-link>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {vendorsStore} from "./store/modules/VendorsStore";

  @Component
  export default class Application extends Vue {
  }
</script>
<style scoped>

</style>
