<template>
  <v-container fillheight="isRequest"
               fluid="isRequest">
    <v-layout align-center
              justify-center
              v-if="isRequest">
      <v-progress-circular indeterminate size="100"></v-progress-circular>
    </v-layout>
    <div v-if="!isRequest">
      <v-layout align-end justify-end v-if="userCanUpdate">
        <v-btn :to="{name: componentUpdateRoute}" primary>{{ $t('components.update') }}</v-btn>
      </v-layout>
      <v-layout>
        <v-flex lg12 md12 mt-3 sm12>
          <v-card>
            <v-card-title><h4>Сводка</h4></v-card-title>
            <v-divider></v-divider>
            <v-list dense>
              <v-list-tile>
                <v-list-tile-content><h4>{{ $t('components.title') }}</h4></v-list-tile-content>
                <v-list-tile-content class="align-end">{{ component.title }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content><h4>{{ $t('components.article') }}</h4></v-list-tile-content>
                <v-list-tile-content class="align-end">{{ component.article }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content><h4>{{ $t('components.count') }}</h4></v-list-tile-content>
                <v-list-tile-content class="align-end">{{ component.count }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content><h4>{{ $t('components.cost') }}</h4></v-list-tile-content>
                <v-list-tile-content class="align-end">{{ component.cost }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content><h4>{{ $t('components.summaryCost') }}</h4></v-list-tile-content>
                <v-list-tile-content class="align-end">{{ component.summary_cost }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content><h4>{{ $t('components.vendor') }}</h4></v-list-tile-content>
                <v-list-tile-content class="align-end">
                  <router-link :to="{name: vendorShowRoute, params: {id: component.vendor.id}}">
                    {{ component.vendor.name }}
                  </router-link>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex lg12 md12 mt-5 sm12>
          <v-card>
            <v-list dense>
              <v-list-tile>
                <v-list-tile-content><h4>In develop</h4></v-list-tile-content>
                <v-list-tile-content class="align-end">usage history, orders list</v-list-tile-content>
                <!-- todo: usage, orders list -->
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
    <router-view/>
  </v-container>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from "vue-property-decorator";
  import {applicationStore} from "../../store/modules/ApplicationStore";
  import i18n from "../../plugins/i18n";
  import {usersStore} from "../../store/modules/UsersStore";
  import {routeNames} from "../../router/routeNames";
  import {componentsStore} from "../../store/modules/ComponentsStore";
  import {Component as ComponentModel, ComponentScheme, defaultComponentModel} from "../../models/Component";

  @Component
  export default class VendorShow extends Vue {
    pageTitle: string = String(i18n.t('components.component'));
    componentUpdateRoute: string = routeNames.components.update;
    vendorShowRoute: string = routeNames.vendors.show;

    @Watch('component') updateTitleAfterComponentReceived(component: ComponentScheme) {
      applicationStore.setCurrentPageTitle({text: `${this.pageTitle} "${component.title}"`});
    }

    get component(): ComponentModel {
      return componentsStore.component;
    }

    get userCanUpdate() {
      return usersStore.currentUser.can('components.update');
    }

    get isRequest() {
      return componentsStore.isRequest;
    }

    created() {
      applicationStore.setCurrentPageTitle({text: `${this.pageTitle} "${this.component.title}"`});
      if (!componentsStore.component.id) componentsStore.getComponent(Number(this.$route.params.id));
    }

    destroyed() {
      componentsStore.setComponent(defaultComponentModel);
    }
  }
</script>

<style scoped>

</style>
