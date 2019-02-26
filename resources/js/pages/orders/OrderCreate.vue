<template>
  <v-dialog max-width="1200px" persistent v-model="dialog">
    <v-card>

      <v-toolbar>
        <v-btn @click="dialog = false" icon>
          <v-icon>mdi-window-close</v-icon>
        </v-btn>
        <v-toolbar-title>
          <span class="headline">
            {{ $t('orders.create') }}
          </span>
        </v-toolbar-title>
      </v-toolbar>

      <v-stepper v-model="stepper" vertical>
        <client-step/>
        <device-step/>
        <order-step/>
        <components-step/>
        <works-step/>
      </v-stepper>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from "vue-property-decorator";
  import {routeNames} from "../../router/routeNames";
  import {modelsStore} from "../../store/modules/ModelsStore";
  import ClientStep from "./ComponentCreateSteps/ClientStep.vue";
  import {ordersStore} from "../../store/modules/OrdersStore";
  import {Order} from "../../models/Order";

  const DeviceStep = () => import("./ComponentCreateSteps/DeviceStep.vue");
  const OrderStep = () => import("./ComponentCreateSteps/OrderStep.vue");
  const ComponentsStep = () => import("./ComponentCreateSteps/ComponentsStep.vue");
  const WorksStep = () => import("./ComponentCreateSteps/WorksStep.vue");

  @Component({
    components: {WorksStep, ComponentsStep, OrderStep, DeviceStep, ClientStep}
  })
  export default class OrderCreate extends Vue {
    dialog: boolean = true;
    menu: boolean = false;
    allFormValidated: boolean = false;

    /* redirect when dialog closed */
    @Watch('dialog') redirectOnClose(dialog: boolean) {
      if (!dialog) this.$router.push({name: routeNames.orders.index});
    }

    @Watch('order') redirectToOrder(order: Order) {
      if (order.id) this.$router.push({name: routeNames.orders.show, params: {id: String(order.id)}});
    }

    get order() {
      return ordersStore.order;
    }

    get stepper() {
      return modelsStore.stepper;
    }

    set stepper(step: number) {
      modelsStore.setStepper(step);
    }

    destroyed() {
      modelsStore.setStepper(1);
    }
  }
</script>

<style scoped>
</style>
