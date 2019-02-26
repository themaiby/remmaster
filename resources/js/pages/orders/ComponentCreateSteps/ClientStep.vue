<template>
  <div>
    <v-stepper-step :color="validation === 'success' ? 'success' : 'primary'"
                    :complete="validation === 'success'"
                    :rules="[() => validation !== 'failed']"
                    :step="step"
    >
      {{ $t('orders.clientStep') }}
      <small>{{ $t('orders.clientStepSubheader') }}</small>
    </v-stepper-step>

    <v-stepper-content :step="step">
      <v-layout>

        <!-- client name -->
        <v-flex lg4 md4 pa-1 sm4>
          <v-text-field :data-vv-as="$t('orders.client_name')"
                        :error-messages="errors.collect('client_name')"
                        :hint="$t('attributes.required')"
                        :label="$t('orders.client_name')"
                        name="client_name"

                        persistent-hint
                        required
                        v-model="order.client_name"
                        v-validate="'required'"
          />
        </v-flex>

        <!-- client number -->
        <v-flex lg4 md4 pa-1 sm4>
          <v-text-field :data-vv-as="$t('orders.client_number')"
                        :error-messages="errors.collect('client_number')"
                        :hint="$t('attributes.required')"
                        :label="$t('orders.client_number')" mask="+## (###) ### ## ##"
                        name="client_number"

                        persistent-hint
                        required
                        v-model="order.client_number"
                        v-validate="'required|min:12'"
          />
        </v-flex>

        <!-- Client email -->
        <v-flex lg4 md4 pa-1 sm4>
          <v-text-field :data-vv-as="$t('orders.client_email')"
                        :error-messages="errors.collect('client_email')"
                        :hint="$t('attributes.optional')"
                        :label="$t('orders.client_email')"

                        name="client_email"
                        persistent-hint
                        v-model="order.client_email"
                        v-validate="'email'"
          />
        </v-flex>
      </v-layout>

      <!-- Client notes -->
      <v-flex lg12 mb-3 md12 pa-1 sm12>
        <v-textarea :hint="$t('attributes.optional')"
                    :label="$t('orders.client_note')"
                    persistent-hint
                    v-model="order.client_note"
        />
      </v-flex>

      <v-btn @click="stepNext" color="primary">{{ $t('attributes.continue') }}</v-btn>
    </v-stepper-content>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {modelsStore} from "../../../store/modules/ModelsStore";
  import {Order} from "../../../models/Order";

  @Component
  export default class ClientStep extends Vue {
    validation: "success" | "failed" | "" = "";
    step: number = 1;

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
  }
</script>

<style scoped>

</style>
