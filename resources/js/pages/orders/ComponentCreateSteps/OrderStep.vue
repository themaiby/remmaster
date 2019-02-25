<template>
  <div>
    <v-stepper-step :color="validation === 'success' ? 'success' : 'primary'"
                    :complete="validation === 'success'"
                    :rules="[() => validation !== 'failed']"
                    :step="step"
    >
      {{ $t('orders.orderStep') }}
      <small>{{ $t('orders.orderStepSubheader') }}</small>
    </v-stepper-step>
    <v-stepper-content step="3">
      <!-- Status -->
      <v-flex lg12 md12 pa-1 sm12>
        <v-autocomplete :items="statuses"
                        :label="$t('orders.status')"
                        item-text="title"
                        item-value="id"
                        persistent-hint
                        v-model="order.status_id"
        />
      </v-flex>

      <!-- type -->
      <v-flex lg12 md12 pa-1 sm12>
        <v-autocomplete :items="types"
                        :label="$t('orders.type')"
                        item-text="title"
                        item-value="id"
                        persistent-hint
                        v-model="order.order_type_id"
        />
      </v-flex>

      <v-layout>

        <!-- breakage -->
        <v-flex lg9 md9 pa-1 sm9>
          <v-text-field :data-vv-as="$t('orders.breakage')"
                        :error-messages="errors.collect('breakage')"
                        :hint="$t('attributes.required')"
                        :label="$t('orders.breakage')"
                        name="breakage"
                        persistent-hint
                        required
                        v-model="order.breakage"
                        v-validate="'required'"
          />
        </v-flex>

        <!-- urgent checkbox -->
        <v-flex lg3 md3 pa-1 sm3>
          <v-spacer></v-spacer>
          <v-checkbox :label="$t('orders.urgent')"
                      required
                      v-model="order.urgent"
          />
        </v-flex>
      </v-layout>

      <!-- datepicker -->
      <v-flex lg12 md12 sm12 xs12>
        <v-checkbox :label="$t('orders.specifyDate')"
                    required
                    v-model="datePickerActive"
        />
      </v-flex>
      <v-flex lg12 md12 pa-4 sm12 v-if="datePickerActive" xs12>
        <v-date-picker :min="minimumDate"
                       color="green lighten-1"
                       header-color="primary"
                       landscape
                       locale="ru-RU"
                       v-model="order.complete_date"
        />
      </v-flex>

      <!-- comment -->
      <v-flex lg12 mb-3 md12 pa-1 sm12 xs12>
        <v-textarea :hint="$t('attributes.optional')"
                    :label="$t('orders.comment')"
                    persistent-hint
                    v-model="order.comment"
        />
      </v-flex>
      <v-btn @click="stepNext" color="primary">{{ $t('attributes.continue') }}</v-btn>
      <v-btn @click="stepBack" flat>{{ $t('attributes.beforeStep') }}</v-btn>
    </v-stepper-content>
  </div>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from "vue-property-decorator";
  import {ordersStore} from "../../../store/modules/OrdersStore";
  import {modelsStore} from "../../../store/modules/ModelsStore";
  import {Order} from "../../../models/Order";
  import {OrderStatus} from "../../../models/OrderStatus";
  import {OrderType} from "../../../models/OrderType";

  @Component
  export default class ClientStep extends Vue {
    datePickerActive: boolean = false;
    validation: "success" | "failed" | "" = "";
    step: number = 3;

    get stepper() {
      return modelsStore.stepper;
    }

    stepNext() {
      this.$validator.validate().then(valid => {
        if (valid) {
          this.validation = "success";
          modelsStore.setStepper(this.step + 1);
        }
        if (!valid) this.validation = "failed";
      });
    }

    stepBack() {
      modelsStore.setStepper(this.step - 1);
    }

    created() {
      ordersStore.getStatuses();
      ordersStore.getTypes();

      /* set minimal complete date todo: must depends on server settings */
      let dt = new Date();
      dt.setDate(dt.getDate() + 2);
      this.order.complete_date = dt.toISOString().substr(0, 10);

    }

    @Watch('statuses') setFirstOpenerStatus(statuses: OrderStatus[]) {
      statuses.forEach(status => {
        if (status.opener) this.order.status_id = status.id;
      });
    }

    @Watch('types') setFirstType(types: OrderType[]) {
      if (types.length) this.order.order_type_id = types[0].id;
    }

    get statuses() {
      return ordersStore.statuses;
    }

    get types() {
      return ordersStore.orderTypes;
    }

    get order() {
      return modelsStore.orderModel;
    }

    get minimumDate() {
      let dt = new Date();
      dt.setDate(dt.getDate() - 1);
      return dt.toISOString();
    }

    set order(order: Order) {
      modelsStore.setOrder(order);
    }
  }
</script>

<style scoped>

</style>
