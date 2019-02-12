<template>
  <v-container>
    <VToolbar
      class="orders-gradient"
      color="white"
      flat>
      <v-btn @click="refresh" flat icon>
        <v-icon small>mdi-refresh</v-icon>
      </v-btn>
      <VSpacer/>
      <VBtn
        :to="{name: routeNames.orders.create}"
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
        :to="{name: routeNames.orders.filter}"
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
      :items="orders"
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
          :class="props.item.status.color"
          :style="[props.item.status.finisher ? {color: '#cccccc'} : '', {cursor: 'pointer'}]"
          :key="props.item.id"
          @click="$router.push({name: routeNames.orders.show, params: {id: props.item.id}})"
        >
          <td>
            <v-icon v-if="props.item.urgent" color="error">mdi-fire</v-icon>
            {{ props.item.id }}
          </td>
          <td>{{ props.item.status.title }}</td>
          <td>{{ props.item.type.title }}</td>
          <td>{{ props.item.client_name }}</td>
          <td>{{ props.item.client_number }}</td>
          <td>{{ props.item.device_name }}</td>
          <td>{{ props.item.device_imei }}</td>
          <td>{{ props.item.created_at.date | moment('DD/MM/YYYY HH:mm:ss') }}</td>
        </tr>
      </template>
    </v-data-table>
    <router-view/>
  </v-container>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from "vue-property-decorator";
  import {usersStore} from "../../store/modules/UsersStore";
  import {routeNames as routeNamesObj} from "../../router/routeNames";
  import {applicationStore} from "../../store/modules/ApplicationStore";
  import i18n from "../../plugins/i18n";
  import {ordersStore} from "../../store/modules/OrdersStore";

  @Component
  export default class OrderList extends Vue {
    headers = [
      /*{text: i18n.t('order.urgent') as string, value: 'urgent'},*/
      {text: i18n.t('orders.id') as string, value: 'id'},
      {text: i18n.t('orders.status') as string, value: 'status.title'},
      {text: i18n.t('orders.type') as string, value: 'type.title'},
      {text: i18n.t('orders.client_name') as string, value: 'client_name'},
      {text: i18n.t('orders.client_number') as string, value: 'client_number'},
      {text: i18n.t('orders.device_name') as string, value: 'device_name'},
      {text: i18n.t('orders.device_imei') as string, value: 'device_imei'},
      {text: i18n.t('orders.created_at') as string, value: 'created_at'},
    ];

    beforeCreate() {
      // restrict access if not allowed
      if (!usersStore.currentUser.can('orders.show')) {
        this.$router.push({name: routeNamesObj.errors.notFound})
      }
      applicationStore.setCurrentPageTitle({text: `${i18n.t('orders.index')}`, image: 'mdi-monitor-cellphone'});
    }

    @Watch('tableParams') tableWatcher() {
      ordersStore.getOrders();
    };

    get orders() {
      return ordersStore.orders;
    }

    get tableParams() {
      return ordersStore.tableParams;
    }

    set tableParams(value) {
      ordersStore.setTableParams(value);
    }

    get isRequest() {
      return ordersStore.isRequest;
    }

    get meta() {
      return ordersStore.meta;
    }

    get filter() {
      return ordersStore.filter;
    }

    get routeNames() {
      return routeNamesObj;
    }

    refresh() {
      ordersStore.getOrders();
    }
  }
</script>

<style scoped>

</style>
