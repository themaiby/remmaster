<template>
  <div>
    <VNavigationDrawer
      v-model="drawer"
      app
      dark
      mobile-break-point="991"
      width="260"
      id="app-drawer-common"
    >
      <v-img
        :src="navbarImg"
        height="100%"
      >
        <VList dense class="fill-height" id="app-drawer">

          <v-list-tile avatar style="padding: 10px">
            <v-list-tile-title class="title">
              RemontHelper
            </v-list-tile-title>
          </v-list-tile>

          <v-divider></v-divider>

          <VFlex class="text-xs-center"
                 mt-5
                 v-if="!(menu.length)"
                 fill-height>
            <VProgressCircular
              :size="70"
              :width="4"
              color="primary"
              indeterminate
            />
          </VFlex>
          <template v-for="item in menu">
            <VLayout
              v-if="item.heading"
              :key="item.heading"
              row
              align-center
            >
              <VFlex xs6>
                <VSubheader v-if="item.heading">
                  {{ item.heading }}
                </VSubheader>
              </VFlex>
              <VFlex
                xs6
                class="text-xs-center"
              >
                <a
                  href="#!"
                  class="body-2 black--text"
                >
                  EDIT
                </a>
              </VFlex>
            </VLayout>
            <VListGroup
              v-else-if="item.children"
              :key="item.text"
              :prepend-icon="item.model ? item.icon : item['icon-alt']"
              append-icon=""
            >
              <VListTile slot="activator">
                <VListTileContent>
                  <VListTileTitle>
                    {{ $t(item.text) }}
                  </VListTileTitle>
                </VListTileContent>
              </VListTile>
              <VListTile
                v-for="(child, i) in item.children"
                :key="i"
                :to="{name: child.routeName}"
                active-class="blue-grey lighten-1"
                ripple
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
              v-else
              :key="item.text"
              :to="{name: item.routeName}"
              active-class="blue-grey darken-2"
              ripple
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
      <Transition
        name="fade"
        mode="out-in"
      >
        <RouterView/>
      </Transition>
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
  }
</script>

<style scoped lang="scss">
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

    .v-image__image--contain {
      top: 9px;
      height: 60%;
    }

    .search-input {
      margin-bottom: 30px !important;
      padding-left: 15px;
      padding-right: 15px;
    }
  }
</style>
