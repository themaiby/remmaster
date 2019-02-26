<template>
  <div>
    <v-stepper-step :color="validation === 'success' ? 'success' : 'primary'"
                    :complete="validation === 'success'"
                    :rules="[() => validation !== 'failed']"
                    :step="step"
    >
      {{ $t('orders.deviceStep') }}
      <small>{{ $t('orders.deviceStepSubheader') }}</small>
    </v-stepper-step>
    <v-stepper-content :step="step">

      <v-layout>

        <!-- device name -->
        <v-flex lg4 md4 pa-1 sm4>
          <v-text-field :data-vv-as="$t('orders.device_name')"
                        :error-messages="errors.collect('device_name')"
                        :hint="$t('attributes.required')"
                        :label="$t('orders.device_name')"
                        name="device_name"

                        persistent-hint
                        required
                        v-model="order.device_name"
                        v-validate="'required'"
          />
        </v-flex>

        <!-- device imei -->
        <v-flex lg4 md4 pa-1 sm4>
          <v-text-field :data-vv-as="$t('orders.device_imei')"
                        :error-messages="errors.collect('device_imei')"
                        :hint="$t('attributes.required')"
                        :label="$t('orders.device_imei')"
                        name="device_imei"

                        persistent-hint
                        required
                        v-model="order.device_imei"
                        v-validate="'required'"
          />
        </v-flex>

        <!-- device visual -->
        <v-flex lg4 md4 pa-1 sm4>
          <v-text-field :hint="$t('attributes.optional')"
                        :label="$t('orders.device_visual')"
                        persistent-hint
                        v-model="order.device_visual"
          />
        </v-flex>
      </v-layout>

      <!-- device note -->
      <v-flex lg12 mb-3 md12 pa-1 sm12>
        <v-textarea :hint="$t('attributes.optional')"
                    :label="$t('orders.device_note')"
                    persistent-hint
                    v-model="order.device_note"
        />
      </v-flex>
      <v-btn @click="stepNext" color="primary">{{ $t('attributes.continue') }}</v-btn>
      <v-btn @click="stepBack" flat>{{ $t('attributes.beforeStep') }}</v-btn>
    </v-stepper-content>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {modelsStore} from "../../../store/modules/ModelsStore";
  import {Order} from "../../../models/Order";

  @Component
  export default class DeviceStep extends Vue {
    validation: "success" | "failed" | "" = "";
    step: number = 2;

    get order() {
      return modelsStore.orderModel;
    }

    set order(order: Order) {
      modelsStore.setOrder(order);
    }

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
  }
</script>

<style scoped>

</style>
