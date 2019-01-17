<template>
  <v-container>
    <VToolbar
      flat
      color="white"
    >
      <VSpacer/>
      <VBtn
        v-if="true"
        dark
        color="blue-grey darken-4"
        class="mb-2"
        @click="$router.push({name: 'vendors.create'})"
        flat
        icon
      >
        <VIcon>mdi-plus</VIcon>
      </VBtn>
      <VBtn
        :color="filter ? 'primary' : 'blue-grey darken-4'"
        dark
        class="mb-2"
        :to="{name: routeNames.vendors.filter}"
        flat
        icon
      >
        <VIcon small>
          mdi-filter
        </VIcon>
      </VBtn>
      <VBtn
        small
        color="red accent-2"
        class="mb-2"
        dark
        flat
        v-if="filter"
        @click="resetFilter"
        icon
      >
        <VIcon small>
          mdi-filter-remove
        </VIcon>
      </VBtn>
    </VToolbar>

    <v-data-table
      :headers="headers"
      :items="vendors"
      :pagination.sync="tableParams"
      :total-items="meta.total"
      :loading="isRequest"
      :rows-per-page-items="[5, 10, 25, 50, 100]"
      class="elevation-24"
    >
      <v-progress-linear slot="progress" color="grey" indeterminate height="2"/>

      <!-- todo: transition -->
      <template
        slot="items"
        slot-scope="props"
      >
        <tr
          :key="props.item.id"
          :bgcolor="props.item.highlight ? 'yellow' : ''"
        >
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.components_count }}</td>
          <td>{{ props.item.components_cost }}</td>
          <td>{{ props.item.created_at.date | moment('DD/MM/YYYY HH:mm:ss') }}</td>
          <td class="text-xs-right">
            <v-tooltip top>
              <router-link :to="{name: routeNames.vendors.show, params: {id: props.item.id}}" slot="activator">
                <VIcon color="primary" class="mr-2">
                  mdi-information-outline
                </VIcon>
              </router-link>
              <span>{{ $t('vendors.show') }}</span>
            </v-tooltip>

            <v-tooltip top>
              <router-link :to="{name: routeNames.vendors.update, params: {id: props.item.id}}" slot="activator">
                <VIcon color="secondary lighten-1" class="mr-2" @click="">
                  mdi-pencil
                </VIcon>
              </router-link>
              <span>{{ $t('vendors.update') }}</span>
            </v-tooltip>

            <v-tooltip top>
              <a
                :href="`/vendors/${props.item.id}/delete`"
                slot="activator"
                @click="deleteVendor(props.item.id, $event)"
              >
                <VIcon color="error" class="mr-2" @click="">
                  mdi-delete
                </VIcon>
              </a>
              <span>{{ $t('vendors.delete') }}</span>
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
  import {vendorsStore} from "../../store/modules/VendorsStore";
  import i18n from "../../utils/i18n";
  import {routeNames as routeNamesObj} from "../../router/routeNames";
  import {applicationStore} from "../../store/modules/ApplicationStore";
  import IVendor from "../../models/IVendor";

  @Component
  export default class VendorList extends Vue {
    headers = [
      {text: i18n.t('vendors.name') as string, value: 'name'},
      {text: i18n.t('vendors.components_count') as string, value: 'components'},
      {text: i18n.t('vendors.cost') as string, value: 'components'},
      {text: i18n.t('vendors.date') as string, value: 'created_at'},
      {text: '', value: '', sortable: false}
    ];

    // set current page name
    created() {
      applicationStore.setCurrentPageTitle(`${i18n.t('vendors.index')}`);
    }

    @Watch('tableParams') tableWatcher() {
      vendorsStore.getVendors();
    };

    get routeNames() {
      return routeNamesObj;
    }

    get tableParams() {
      return vendorsStore.tableParams;
    }

    set tableParams(value) {
      vendorsStore.setTableParams(value);
    }

    get filter() {
      return this.tableParams.filter;
    }

    get vendors() {
      return vendorsStore.vendors;
    }

    get meta() {
      return vendorsStore.meta;
    }

    get isRequest() {
      return vendorsStore.isRequest;
    }

    resetFilter() {
      vendorsStore.resetFilter();
    }

    deleteVendor(id: number, $event: Event,) {
      $event.preventDefault();

      const vendor: IVendor | undefined = vendorsStore.getVendorById(id);
      if (vendor) alert(`Delete vendor "${vendor.name}"?`);
      else alert('Vendor not found');
    }
  }
</script>

<style scoped>
</style>
