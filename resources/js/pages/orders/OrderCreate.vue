<template>
  <v-dialog v-model="dialog" persistent max-width="1200px">
    <v-card>
      <v-toolbar>
        <v-btn icon @click="dialog = false">
          <v-icon>mdi-window-close</v-icon>
        </v-btn>
        <v-toolbar-title>
          <span class="headline">{{ $t('orders.create') }}</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn @click="log" flat>{{ $t('orders.save') }}</v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <!-- stepper -->
      <v-stepper v-model="stepper" vertical>

        <!-- Client step -->
        <!-- todo: color depends on validation? -->
        <v-stepper-step :complete="stepper > 1" step="1" :color="stepper > 1 ? 'success' : 'primary'">
          {{ $t('orders.clientStep') }}
          <small>{{ $t('orders.clientStepSubheader') }}</small>
        </v-stepper-step>

        <v-stepper-content step="1">
          <v-layout>
            <v-flex sm4 md4 lg4 pa-1>
              <v-text-field v-model="order.client_name"
                            :label="$t('orders.client_name')"
                            :hint="$t('attributes.required')"
                            persistent-hint
                            required
              />
            </v-flex>
            <v-flex sm4 md4 lg4 pa-1>
              <v-text-field v-model="order.client_number"
                            :label="$t('orders.client_number')"
                            :hint="$t('attributes.required')"
                            persistent-hint required
              />
            </v-flex>
            <v-flex sm4 md4 lg4 pa-1>
              <v-text-field v-model="order.client_email"
                            :label="$t('orders.client_email')"
                            :hint="$t('attributes.optional')"
                            persistent-hint
              />
            </v-flex>
          </v-layout>
          <v-flex sm12 md12 lg12 pa-1 mb-3>
            <v-textarea v-model="order.client_note"
                        :label="$t('orders.client_note')"
                        :hint="$t('attributes.optional')"
                        persistent-hint
            />
          </v-flex>
          <v-btn color="primary" @click="stepper++">{{ $t('attributes.continue') }}</v-btn>
        </v-stepper-content>

        <!-- Device step -->
        <v-stepper-step :complete="stepper > 2" step="2" :color="stepper > 2 ? 'success' : 'primary'">
          {{ $t('orders.deviceStep') }}
          <small>{{ $t('orders.deviceStepSubheader') }}</small>
        </v-stepper-step>

        <v-stepper-content step="2">

          <v-layout>
            <v-flex sm4 md4 lg4 pa-1>
              <v-text-field v-model="order.device_name"
                            :label="$t('orders.device_name')"
                            :hint="$t('attributes.required')"
                            persistent-hint
                            required
              />
            </v-flex>
            <v-flex sm4 md4 lg4 pa-1>
              <v-text-field v-model="order.device_imei"
                            :label="$t('orders.device_imei')"
                            :hint="$t('attributes.required')"
                            persistent-hint
                            required
              />
            </v-flex>
            <v-flex sm4 md4 lg4 pa-1>
              <v-text-field v-model="order.device_visual"
                            :label="$t('orders.device_visual')"
                            :hint="$t('attributes.optional')"
                            persistent-hint
              />
            </v-flex>
          </v-layout>
          <v-flex sm12 md12 lg12 pa-1 mb-3>
            <v-textarea v-model="order.device_note"
                        :label="$t('orders.device_note')"
                        :hint="$t('attributes.optional')"
                        persistent-hint
            />
          </v-flex>

          <v-btn color="primary" @click="stepper++">{{ $t('attributes.continue') }}</v-btn>
          <v-btn flat @click="stepper--">{{ $t('attributes.beforeStep') }}</v-btn>
        </v-stepper-content>

        <!-- Order step -->
        <v-stepper-step :complete="stepper > 3" step="3">
          {{ $t('orders.orderStep') }}
          <small>{{ $t('orders.orderStepSubheader') }}</small>
        </v-stepper-step>

        <v-stepper-content step="3">

          <v-layout>
            <v-flex sm9 md9 lg9 pa-1>
              <v-text-field v-model="order.breakage"
                            :label="$t('orders.breakage')"
                            :hint="$t('attributes.required')"
                            persistent-hint
                            required
              />
            </v-flex>

            <v-flex sm3 md3 lg3 pa-1>
              <v-spacer></v-spacer>
              <v-checkbox
                v-model="order.urgent"
                :label="$t('orders.urgent')"
                required
              ></v-checkbox>
            </v-flex>
          </v-layout>

          <!-- datepicker -->
          <v-flex xs12 sm12 lg12 md12>
            <v-checkbox v-model="datePickerActive" :label="$t('orders.specifyDate')" required/>
          </v-flex>
          <v-flex xs12 sm12 lg12 md12 pa-4 v-if="datePickerActive">
            <v-date-picker landscape
                           v-model="order.complete_date"
                           color="green lighten-1"
                           header-color="primary"
                           :min="minimumDate"
                           locale="ru-RU"
            />
          </v-flex>

          <v-flex xs12 sm12 lg12 md12 pa-1 mb-3>
            <v-textarea v-model="order.comment"
                        :label="$t('orders.comment')"
                        :hint="$t('attributes.optional')"
                        persistent-hint
            />
          </v-flex>

          <v-btn color="primary" @click="stepper++">{{ $t('attributes.continue') }}</v-btn>
          <v-btn flat @click="stepper--">{{ $t('attributes.beforeStep') }}</v-btn>
        </v-stepper-content>

        <v-stepper-step step="4">View setup instructions</v-stepper-step>
        <v-stepper-content step="4">


          <v-btn color="primary" @click="log">{{ $t('attributes.save') }}</v-btn>
          <v-btn flat @click="stepper--">{{ $t('attributes.beforeStep') }}</v-btn>
        </v-stepper-content>
      </v-stepper>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from "vue-property-decorator";
  import {routeNames} from "../../router/routeNames";
  import {Order} from "../../models/Order";

  @Component
  export default class OrderCreate extends Vue {
    dialog: boolean = true;
    stepper: number = 1;
    order: Order = new Order();
    menu: boolean = false;
    datePickerActive: boolean = false;

    @Watch('dialog') redirectOnClose(dialog: boolean) {
      if (!dialog) this.$router.push({name: routeNames.orders.index});
    }

    saveToLocalStorage() {
      localStorage.setItem('order', JSON.stringify(this.order));
    }

    log() {
      console.log({...this.order});
    }

    get minimumDate() {
      let dt = new Date();
      dt.setDate(dt.getDate() - 1);
      return dt.toISOString();
    }

    created() {
      /* set datetime to string in model for date picker */
      let dt = new Date();
      dt.setDate(dt.getDate() + 2);
      this.order.complete_date = dt.toISOString().substr(0, 10);
    }
  }
</script>

<style scoped>
</style>
