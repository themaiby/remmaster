<template>
  <v-container>
    <v-layout row wrap>
      <!-- order data -->
      <v-flex xs12 sm6 lg6 pr-1>
        <v-card>
          <v-card-title primary-title>
            <h3 class="headline mb-0">{{ $t('orders.orderData') }}</h3>
          </v-card-title>
        </v-card>
      </v-flex>

      <!-- client -->
      <v-flex xs12 sm6 lg6 pl-1>
        <v-card>
          <v-card-title primary-title>
            <h3 class="headline mb-0">{{ $t('orders.client') }}</h3>
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-tile>
                <v-list-tile-content>{{$t('orders.client_name')}}</v-list-tile-content>
                <v-list-tile-action>{{ order.client_name || $t('order.not_set') }}</v-list-tile-action>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>{{$t('orders.client_number')}}</v-list-tile-content>
                <v-list-tile-action>{{ order.client_number || $t('order.not_set') }}</v-list-tile-action>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>{{$t('orders.client_email')}}</v-list-tile-content>
                <v-list-tile-action>{{ order.client_email || $t('order.not_set') }}</v-list-tile-action>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>{{$t('orders.client_note')}}</v-list-tile-content>
                <v-list-tile-action>{{ order.client_note || $t('order.not_set') }}</v-list-tile-action>
              </v-list-tile>
            </v-list>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from "vue-property-decorator";
  import i18n from "../../plugins/i18n";
  import {applicationStore} from "../../store/modules/ApplicationStore";
  import {ordersStore} from "../../store/modules/OrdersStore";
  import {Order} from "../../models/Order";

  @Component
  export default class OrderShow extends Vue {
    beforeCreate() {
      ordersStore.getOrder(Number(this.$route.params.id));
    }

    @Watch('order') updateTitle(order: Order) {
      applicationStore.setCurrentPageTitle({text: `${i18n.t('orders.show')} [#${order.id}]`});
    }

    get order() {
      return ordersStore.order;
    }
  }
</script>

<style scoped>

</style>
