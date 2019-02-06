<template>
  <v-container>
    <VToolbar class="vendors-gradient" color="white" flat>
      <v-btn @click="refresh" flat icon>
        <v-icon small>mdi-refresh</v-icon>
      </v-btn>
      <VSpacer/>
      <VBtn
        :to="{name: routeNames.vendors.create}"
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
        :to="{name: routeNames.vendors.filter}"
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
        v-if="filter"
      >
        <VIcon small>
          mdi-filter-remove
        </VIcon>
      </VBtn>
    </VToolbar>

    <v-data-table
      :headers="headers"
      :items="vendors"
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
          :bgcolor="props.item.highlight ? 'yellow' : ''"
          :key="props.item.id"
        >
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.components_count }}</td>
          <td>{{ props.item.components_cost }}</td>
          <td>{{ props.item.created_at.date | moment('DD/MM/YYYY HH:mm:ss') }}</td>
          <td class="text-xs-right">
            <v-tooltip top>
              <router-link :to="{name: routeNames.vendors.show, params: {id: props.item.id}}" slot="activator">
                <VIcon color="primary" small>
                  mdi-information-outline
                </VIcon>
              </router-link>
              <span>{{ $t('vendors.show') }}</span>
            </v-tooltip>

            <v-tooltip top>
              <router-link :to="{name: routeNames.vendors.update, params: {id: props.item.id}}" slot="activator">
                <VIcon color="secondary lighten-1" small>
                  mdi-pencil
                </VIcon>
              </router-link>
              <span>{{ $t('vendors.update') }}</span>
            </v-tooltip>

            <v-tooltip top>
              <a
                :href="`/vendors/${props.item.id}/delete`"
                @click="deleteVendor(props.item.id, $event)"
                slot="activator"
              >
                <VIcon class="mr-2" color="error" small>
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
  import i18n from "../../plugins/i18n";
  import {routeNames as routeNamesObj} from "../../router/routeNames";
  import {applicationStore} from "../../store/modules/ApplicationStore";
  import {usersStore} from "../../store/modules/UsersStore";
  import {Vendor} from "../../models/Vendor";

  @Component
  export default class VendorList extends Vue {
    headers = [
      {text: i18n.t('vendors.name') as string, value: 'name'},
      {text: i18n.t('vendors.components_count') as string, value: 'components'},
      {text: i18n.t('vendors.cost') as string, value: 'components'},
      {text: i18n.t('vendors.date') as string, value: 'created_at'},
      {text: '', value: '', sortable: false}
    ];

    beforeCreate() {
      // restrict access if not allowed
      if (!usersStore.currentUser.can('vendors.show')) {
        this.$router.push({name: routeNamesObj.errors.notFound})
      }
    }

    // set current page name
    created() {
      applicationStore.setCurrentPageTitle({text: `${i18n.t('vendors.index')}`});
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
      const vendor: Vendor | undefined = vendorsStore.getVendorById(id);

      let deleteVendor: boolean = false;
      if (vendor) {
        deleteVendor = confirm(
          `${this.$t('vendors.confirmDelete', {value: vendor.name})}`
        );
        deleteVendor ? vendorsStore.deleteVendor({id, name: vendor.name}) : false;
      }
    }

    refresh() {
      vendorsStore.getVendors();
    }
  }
</script>

<style scoped>
</style>
