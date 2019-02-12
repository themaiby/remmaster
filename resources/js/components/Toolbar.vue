<template>
  <v-toolbar
    flat
    id="core-toolbar"
    prominent
  >
    <div>
      <v-toolbar-title
        class="font-weight-medium"
      >
        <v-btn
          @click.stop="onMenuClick"
          dark
          icon
          v-if="responsive"
        >
          <v-icon color="black">mdi-view-list</v-icon>
        </v-btn>
        {{ title.text }}
        <v-icon v-if="title.image">{{ title.image }}</v-icon>
      </v-toolbar-title>
    </div>

    <v-spacer/>
    <v-toolbar-items>
      <v-flex
        align-center
        layout
        py-2
      >
        <v-icon color="tertiary">mdi-notification</v-icon>
        <v-icon color="tertiary">mdi-account</v-icon>
      </v-flex>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {applicationStore} from "../store/modules/ApplicationStore";

  @Component
  export default class Toolbar extends Vue {
    notifications: string[] = [
      'Mike, John responded to your email',
      'You have 5 new tasks',
      'You\'re now a friend with Andrew',
      'Another Notification',
      'Another One'
    ];
    responsive: boolean = false;

    get title(): { text: string, image?: string } {
      return applicationStore.currentPageTitle;
    }

    mounted() {
      this.onResponsiveInverted();
      window.addEventListener('resize', this.onResponsiveInverted);
    }

    beforeDestroy() {
      window.removeEventListener('resize', this.onResponsiveInverted)
    }

    onResponsiveInverted() {
      this.responsive = window.innerWidth < 991;
    }

    onMenuClick() {
      applicationStore.setDrawer(true);
    }
  }
</script>

<style scoped lang="scss">
  #core-toolbar a {
    text-decoration: none;
  }

  .v-toolbar {
    min-height: 70px;
    border-radius: 3px;
    margin-bottom: 15px;

    &:not(.v-toolbar--fixed) .v-toolbar__content {
      margin-left: 260px;
    }

    &[class*="bg-"] {
      .v-toolbar__title,
      .v-btn__content,
      .v-ripple__container {
        color: #ffffff !important;
      }
    }

    .v-toolbar__content {
      min-height: 70px;
      padding-bottom: 10px;
      padding-top: 10px;

      .v-toolbar__title {
        font-size: 18px;
        letter-spacing: unset;
        color: #000;
      }

      .v-toolbar__items {
        & > div {
          padding: 0 !important;
        }

        .toolbar-items {
          align-items: center;
          border-radius: 3px;
          display: flex;
          min-height: 48px;
          padding: 10px 15px;

          .v-badge__badge {
            border: 1px solid #ffffff !important;
            font-size: 9px;
            height: 20px;
            line-height: normal;
            right: -7px;
            top: -12px;
            width: 9px;
            font-weight: 400;
          }

          .v-icon {
            font-size: 20px;
          }
        }

        .v-input {
          margin: 0 !important;
          padding: 0;
        }
      }
    }
  }

  @media all and (max-width: 990px) {
    .v-toolbar:not(.v-toolbar--fixed) .v-toolbar__content {
      margin-left: 0;
    }
  }

</style>

