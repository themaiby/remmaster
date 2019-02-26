<template>
  <div>
    <VNavigationDrawer
      app
      dark
      id="app-drawer-common"
      mobile-break-point="991"
      v-model="drawer"
      width="260"
    >
      <v-img
        :src="navbarImg"
        height="100%"
      >
        <VList class="fill-height" dense id="app-drawer">

          <v-list-tile avatar style="padding: 10px">
            <v-list-tile-title class="title">
              RemontHelper
            </v-list-tile-title>
          </v-list-tile>

          <v-divider></v-divider>

          <VFlex class="text-xs-center"
                 fill-height
                 mt-5
                 v-if="!(menu.length)">
            <VProgressCircular
              :size="70"
              :width="4"
              color="primary"
              indeterminate
            />
          </VFlex>
          <template v-for="item in menu">
            <VLayout
              :key="item.heading"
              align-center
              row
              v-if="item.heading"
            >
              <VFlex xs6>
                <VSubheader v-if="item.heading">
                  {{ item.heading }}
                </VSubheader>
              </VFlex>
              <VFlex
                class="text-xs-center"
                xs6
              >
                <a
                  class="body-2 black--text"
                  href="#!"
                >
                  EDIT
                </a>
              </VFlex>
            </VLayout>
            <VListGroup
              :key="item.text"
              :prepend-icon="item.model ? item.icon : item['icon-alt']"
              append-icon=""
              v-else-if="item.children"
            >
              <VListTile slot="activator">
                <VListTileContent>
                  <VListTileTitle>
                    {{ $t(item.text) }}
                  </VListTileTitle>
                </VListTileContent>
              </VListTile>
              <VListTile
                :key="i"
                :to="{name: child.routeName}"
                active-class="blue-grey lighten-1"
                ripple
                v-for="(child, i) in item.children"
              >
                <VListTileAction v-if="child.icon">
                  <VIcon>{{ child.icon }}</VIcon>
                </VListTileAction>
                <VListTileContent>
                  <VListTileTitle>
                    {{ $t(child.text) }}
                  </VListTileTitle>
                </VListTileContent>
              </VListTile>
            </VListGroup>
            <VListTile
              :key="item.text"
              :to="{name: item.routeName}"
              active-class="blue-grey darken-2"
              ripple
              v-else
            >
              <VListTileAction>
                <VIcon>{{ item.icon }}</VIcon>
              </VListTileAction>
              <VListTileContent>
                <VListTileTitle>
                  {{ $t(item.text) }}
                </VListTileTitle>
              </VListTileContent>
            </VListTile>
          </template>
        </VList>
      </v-img>
    </VNavigationDrawer>
    <VContent>
      <Toolbar class="transparent"/>
      <transition mode="out-in" name="fade">
        <router-view/>
      </transition>
    </VContent>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {applicationStore} from "../store/modules/ApplicationStore";
  import Toolbar from "../components/Toolbar.vue";

  @Component({
    components: {Toolbar}
  })
  export default class Layout extends Vue {
    navbarImg: string = require('../assets/navbar.png');

    get drawer(): boolean {
      return applicationStore.drawer;
    }

    set drawer(value: boolean) {
      applicationStore.setDrawer(value);
    }

    get menu(): object {
      return applicationStore.menu;
    }

    created() {
      applicationStore.getMenu();
    }

    hideSnack() {
      applicationStore.hideSnackbar();
    }
  }
</script>

<style lang="scss" scoped>
  #app-drawer {
    background: rgba(27, 27, 27, .84);
    padding: 0;
  }

  #app-drawer-common {
    .v-list__tile {
      border-radius: 4px;

      &--buy {
        margin-top: auto;
        margin-bottom: 17px;
      }
    }
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
    transition-duration: 0.1s;
    transition-property: opacity;
    transition-timing-function: linear;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
</style>
