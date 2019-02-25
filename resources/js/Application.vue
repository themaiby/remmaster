<template>
  <v-app id="content-body">
    <transition name="fade" v-if="applicationLoaded">
      <router-view></router-view>
    </transition>
    <VContainer fill-height fluid v-else>
      <VLayout align-center justify-center>
        <v-progress-circular :size="100" color="primary" indeterminate/>
      </VLayout>
    </VContainer>

    <!-- Snackbar -->
    <v-snackbar
      :bottom="snackbar.y === true"
      :color="snackbar.color"
      :left="snackbar.x === 'left'"
      :multi-line="snackbar.mode === 'multi-line'"
      :right="snackbar.x === 'right'"
      :timeout="snackbar.timeout"
      :top="snackbar.y === 'top'"
      :vertical="snackbar.mode === 'vertical'"
      v-model="snackbar.show"
    >
      {{ snackbar.text }}
      <v-btn
        @click="snackbar.hide()"
        flat
        icon
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {applicationStore} from "./store/modules/ApplicationStore";

  @Component
  export default class Application extends Vue {
    get applicationLoaded() {
      return applicationStore.loaded;
    }


    get snackbar() {
      return applicationStore.snackbar;
    }
  }
</script>
<style scoped>
  #content-body {
    background: #abbaab; /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #ffffff, #abbaab); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #ffffff, #abbaab); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }

  .v-image__image--contain {
    top: 9px;
    height: 60%;
  }

  .search-input {
    margin-bottom: 30px !important;
    padding-left: 15px;
    padding-right: 15px;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.3s;
    transition-property: opacity;
    transition-timing-function: ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
</style>
