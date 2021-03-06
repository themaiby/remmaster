<template>
  <v-container>
    <VToolbar
      class="components-gradient"
      color="white"
      flat
    >
      <v-btn @click="refresh" flat icon>
        <v-icon small>mdi-refresh</v-icon>
      </v-btn>
      <VSpacer/>
      <VBtn
        :to="{name: routeNames.components.create}"
        class="mb-2"
        color="blue-grey darken-4"
        dark
        flat
        icon
        v-if="true"
      >
        <VIcon>mdi-plus</VIcon>
      </VBtn>
      <VBtn
        :color="filter ? 'primary' : 'blue-grey darken-4'"
        :to="{name: routeNames.components.filter}"
        class="mb-2"
        dark
        flat
        icon
      >
        <VIcon small>
          mdi-filter
        </VIcon>
      </VBtn>
      <VBtn
        @click="resetFilter"
        class="mb-2"
        color="red accent-2"
        dark
        flat
        icon
        small
        v-if="Object.keys(filter).length"
      >
        <VIcon small>
          mdi-filter-remove
        </VIcon>
      </VBtn>
    </VToolbar>

    <v-data-table
      :headers="headers"
      :items="components"
      :loading="isRequest"
      :pagination.sync="tableParams"
      :rows-per-page-items="[5, 10, 25, 50, 100]"
      :total-items="meta.total"
      class="elevation-24"
    >
      <v-progress-linear color="grey" height="2" indeterminate slot="progress"/>

      <!-- todo: transition -->
      <template
        slot="items"
        slot-scope="props"
      >
        <tr
          :key="props.item.id"
          :style="!props.item.count ? {color: '#cccccc'} : ''"
        >
          <td>{{ props.item.title }}</td>
          <td>{{ props.item.article }}</td>
          <td>{{ props.item.count }}</td>
          <td>{{ props.item.cost }}</td>
          <td>{{ props.item.summary_cost }}</td>
          <td>{{ props.item.category.title }}</td>
          <td>
            <router-link :to="{name: routeNames.vendors.show, params: {id: props.item.vendor.id}}">
              {{ props.item.vendor.name }}
            </router-link>
          </td>
          <td>{{ props.item.created_at.date | moment('DD/MM/YYYY HH:mm:ss') }}</td>
          <td class="text-xs-right">
            <v-tooltip top>
              <router-link :to="{name: routeNames.components.show, params: {id: props.item.id}}" slot="activator">
                <VIcon color="primary" small>
                  mdi-information-outline
                </VIcon>
              </router-link>
              <span>{{ $t('components.show') }}</span>
            </v-tooltip>

            <v-tooltip top>
              <router-link :to="{name: routeNames.components.update, params: {id: props.item.id}}" slot="activator">
                <VIcon @click="" color="secondary lighten-1" small>
                  mdi-pencil
                </VIcon>
              </router-link>
              <span>{{ $t('components.update') }}</span>
            </v-tooltip>

            <v-tooltip top>
              <a
                :href="`/components/${props.item.id}/delete`"
                @click="deleteComponent(props.item.id, $event)"
                slot="activator"
              >
                <VIcon @click="" color="error" small>
                  mdi-delete
                </VIcon>
              </a>
              <span>{{ $t('components.delete') }}</span>
            </v-tooltip>
          </td>
        </tr>
      </template>
    </v-data-table>
    <router-view/>
  </v-container>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from "vue-property-decorator";
  import i18n from "../../plugins/i18n";
  import {routeNames as routeNamesObj} from "../../router/routeNames";
  import {applicationStore} from "../../store/modules/ApplicationStore";
  import {usersStore} from "../../store/modules/UsersStore";
  import {componentsStore} from "../../store/modules/ComponentsStore";
  import {Component as ComponentModel} from "../../models/Component";

  @Component
  export default class ComponentList extends Vue {
    headers = [
      {text: i18n.t('components.title') as string, value: 'title'},
      {text: i18n.t('components.article') as string, value: 'article'},
      {text: i18n.t('components.count') as string, value: 'count'},
      {text: i18n.t('components.cost') as string, value: 'cost'},
      {text: i18n.t('components.summaryCost') as string, value: 'summary_cost'},
      {text: i18n.t('components.category') as string, value: 'category'},
      {text: i18n.t('components.vendor') as string, value: 'vendor'},
      {text: i18n.t('components.created_at') as string, value: 'created_at'},
      {text: '', value: '', sortable: false}
    ];

    beforeCreate() {
      // restrict access if not allowed
      if (!usersStore.currentUser.can('components.show')) {
        this.$router.push({name: routeNamesObj.errors.notFound})
      }
    }

    // set current page name
    created() {
      applicationStore.setCurrentPageTitle({text: `${i18n.t('components.index')}`, image: 'mdi-cart'});
    }

    @Watch('tableParams') tableWatcher() {
      componentsStore.getComponents();
    };

    get routeNames() {
      return routeNamesObj;
    }

    get tableParams() {
      return componentsStore.tableParams;
    }

    set tableParams(value) {
      componentsStore.setTableParams(value);
    }

    get filter() {
      return componentsStore.filter;
    }

    get components() {
      return componentsStore.components;
    }

    get meta() {
      return componentsStore.meta;
    }

    get isRequest() {
      return componentsStore.isRequest;
    }

    resetFilter() {
      componentsStore.resetFilter();
      componentsStore.getComponents();
    }

    deleteComponent(id: number, $event: Event,) {
      $event.preventDefault();
      const component: ComponentModel | undefined = componentsStore.getComponentById(id);

      let deleteVendor: boolean = false;
      if (component) {
        deleteVendor = confirm(
          `${this.$t('components.confirmDelete', {value: component.title})}`
        );
        if (deleteVendor) componentsStore.deleteComponent({id, title: component.title});
      }
    }

    refresh() {
      componentsStore.getComponents();
    }
  }
</script>
