<template>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {setCurrentPageTitle} from "../utils/helpers";

  @Component
  export default class Dashboard extends Vue {
    // set current page name
    beforeCreate() {
      setCurrentPageTitle('common.dashboard');
    }
  }
</script>

<style scoped>

</style>
