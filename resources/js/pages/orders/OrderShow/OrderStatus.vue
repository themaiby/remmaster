<template>
  <v-menu>
    <v-btn :color="order.status.color" slot="activator">{{ order.status.title }}</v-btn>
    <v-list>
      <v-list-tile :key="status.id" @click="showModal(status)" v-for="status in statuses">
        <v-list-tile-title>{{ status.title }}</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {OrderStatus as OrderStatusModel} from "../../../models/OrderStatus";
  import {ordersStore} from "../../../store/modules/OrdersStore";

  @Component
  export default class OrderStatus extends Vue {
    dialog: boolean = false;

    newStatus: OrderStatusModel = new OrderStatusModel();

    created() {
      console.log('created');
    }

    get order() {
      return ordersStore.order;
    }

    get statuses() {
      return ordersStore.statuses;
    }

    showModal(status: OrderStatusModel) {
      this.newStatus = status;
      this.dialog = true;
    }

    updateStatus(status: OrderStatus) {
      console.log(status);
    }
  }
</script>

<style scoped>

</style>
