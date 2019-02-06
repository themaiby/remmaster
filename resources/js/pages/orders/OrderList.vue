<template>

</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {Model, TUser} from "../../models/Model";

  @Component
  export default class OrderList extends Vue {
    async created() {
      const u = await TUser.all();
      console.log(u.meta);
    }
  }
</script>

<style scoped>

</style>
