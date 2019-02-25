<template>
  <div>
    <v-stepper-step :color="validation === 'success' ? 'success' : 'primary'"
                    :complete="validation === 'success'"
                    :rules="[() => validation !== 'failed']"
                    :step="step"
    >
      <span>{{ $t('orders.works') }}
        <span v-if="orderCost">| <i>{{ $t('orders.summaryCost') }}: {{ orderCost }}</i></span>
      </span>
    </v-stepper-step>
    <v-stepper-content :step="step">

      <v-layout :key="idx" v-for="(work, idx) in order.works">
        <v-flex lg9 md9 pa-1 sm9>
          <v-text-field :data-vv-as="$t('orders.work')"
                        :error-messages="errors.collect('work')"
                        :hint="$t('attributes.required')"
                        :label="$t('orders.work')"

                        name="work"
                        persistent-hint
                        v-model="work.title"
                        v-validate="'required'"
          />
        </v-flex>
        <v-flex lg3 md3 pa-1 sm9>
          <v-text-field :append-outer-icon="idx !== 0 ? 'mdi-delete' : ''"
                        :data-vv-as="$t('orders.cost')"
                        :error-messages="errors.collect('cost')"
                        :hint="$t('attributes.required')"

                        :label="$t('orders.cost')"
                        @click:append-outer="removeWorkByIdx(idx)"
                        name="cost"
                        persistent-hint
                        v-model="work.cost"
                        v-validate="{required: true, regex: /^\$?\d+((,\d{3})+)?(\.\d+)?$/}"
          />
        </v-flex>
      </v-layout>

      <v-flex lg12 md12 pa-a sm12>
        <v-btn @click="addWork" block flat>
          {{ $t('orders.addWork') }}
        </v-btn>
      </v-flex>

      <v-btn @click="save" :loading="isCreateRequest" color="primary">{{ $t('attributes.save') }}</v-btn>
      <v-btn @click="stepBack" flat>{{ $t('attributes.beforeStep') }}</v-btn>
    </v-stepper-content>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {modelsStore} from "../../../store/modules/ModelsStore";
  import {Order} from "../../../models/Order";
  import {OrderWork} from "../../../models/OrderWork";
  import {ordersStore} from "../../../store/modules/OrdersStore";

  @Component
  export default class WorksStep extends Vue {
    validation: "success" | "failed" | "" = "";
    step: number = 5;

    created() {
      this.addWork();
    }

    addWork() {
      this.order.works.push(new OrderWork());
    }

    removeWorkByIdx(idx: number) {
      this.order.works = this.order.works.filter((work, index) => index !== idx)
    }

    get order() {
      return modelsStore.orderModel;
    }

    set order(order: Order) {
      modelsStore.setOrder(order);
    }

    get stepper() {
      return modelsStore.stepper;
    }

    get isCreateRequest() {
      return ordersStore.isCreateRequest;
    }

    save() {
      this.$validator.validate().then(valid => {
        if (valid) {
          this.validation = "success";

          const order: Order = modelsStore.orderModel;
          ordersStore.createOrder(order);
        }
        if (!valid) this.validation = "failed";
      });
    }

    stepBack() {
      modelsStore.setStepper(this.step - 1);
    }

    get orderCost(): number {
      let sum = 0;
      this.order.works.forEach(work => sum += Number(work.cost));
      return sum;
    }
  }
</script>

<style scoped>

</style>
