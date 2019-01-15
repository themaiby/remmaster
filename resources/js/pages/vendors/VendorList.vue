<template>
  <v-container>
    <v-layout>
      <v-btn flat icon>
        <v-icon color="tertiary">mdi-plus</v-icon>
      </v-btn>
      <spacer></spacer>
      <v-btn icon>
        <v-icon color="tertiary" class="font-weight-light">mdi-filter</v-icon>
      </v-btn>
    </v-layout>

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
        @click="$router.push({name: 'vendors.filter'})"
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
        @click=""
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
            <VIcon
              color="primary"
              class="mr-2"
              @click=""
            >
              mdi-information-outline
            </VIcon>

            <VIcon
              color="secondary lighten-1"
              class="mr-2"
              @click=""
            >
              mdi-pencil
            </VIcon>

            <VIcon
              color="error"
              class="mr-2"
              @click=""
            >
              mdi-delete
            </VIcon>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from "vue-property-decorator";
  import {vendorsStore} from "../../store/modules/VendorsStore";
  import i18n from "../../utils/i18n";

  @Component
  export default class VendorList extends Vue {
    headers = [
      {text: i18n.t('vendors.name') as string, value: 'name'},
      {text: i18n.t('vendors.components_count') as string, value: 'components'},
      {text: i18n.t('vendors.cost') as string, value: 'components'},
      {text: i18n.t('vendors.date') as string, value: 'created_at'},
      {text: '', value: '', sortable: false}
    ];

    @Watch('tableParams') tableWatcher() {
      vendorsStore.getVendors();
    };

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
  }
</script>

<style scoped>
</style>
