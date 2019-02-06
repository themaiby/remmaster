<template>
  <v-app>
    <v-content>
      <v-container fill-height fluid>
        <h1>Not found</h1>
        <v-divider/>
        <a @click="$router.go(-2)"><h3>Back</h3></a>
        <a @click="$router.push({name: dashboardRoute})"><h3>Main page</h3></a>
      </v-container>
    </v-content>
    >
  </v-app>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {routeNames} from "../../router/routeNames";
  /* todo: make 404 page */
  @Component
  export default class Err404 extends Vue {
    dashboardRoute: string = routeNames.dashboard;
  }
</script>

<style scoped>

</style>
