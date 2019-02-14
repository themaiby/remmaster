<template>
  <v-container>
    <v-layout row wrap v-if="order.id">
      <!-- author -->
      <v-flex xs12 md12 lg12 pa-1>
        <h4>{{ $t('orders.author' )}}:</h4> <span>{{ order.user.fullname }}</span>
      </v-flex>

      <v-flex xs12 sm12 lg12 pa-1>
        <!-- status -->
        <v-menu>
          <v-btn slot="activator" :color="order.status.color">
            {{ order.status.title }}
          </v-btn>
          <v-list>
            <v-list-tile v-for="status in statuses" :key="status.id" @click="updateStatus(status)">
              <v-list-tile-title>{{ status.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>

        <!-- invoice -->
        <v-menu>
          <v-btn slot="activator" flat icon>
            <v-icon>mdi-file-document-outline</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile @click="">
              <v-list-tile-avatar>
                <v-icon :color="docIcons.word.color">{{ docIcons.word.icon }}</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-title>Шаблон квитанции</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-flex>

      <!-- order data -->
      <v-flex xs12 sm6 lg6 pa-1>
        <v-card>
          <v-card-text>
            <!-- order -->
            <h3 class="headline mb-2">{{ $t('orders.order') }}</h3>
            <v-divider class="headline mb-3"></v-divider>

            <h4 class="oneline">
              {{ $t('orders.device_name') }}:
            </h4>
            <span :class="order.device_name ? '' : 'grey--text'">
                {{ order.device_name || $t('orders.notSpecified') }}
              </span>
            <p></p>

            <h4 class="oneline">
              {{ $t('orders.device_imei') }}:
            </h4>
            <span :class="order.device_imei ? '' : 'grey--text'">
                {{ order.device_imei || $t('orders.notSpecified') }}
              </span>
            <p></p>

            <h4 class="oneline">
              {{ $t('orders.breakage') }}:
            </h4>
            <span :class="order.breakage ? '' : 'grey--text'">
                {{ order.breakage || $t('orders.notSpecified') }}
              </span>
            <p></p>

            <h4 class="oneline">
              {{ $t('orders.device_visual') }}:
            </h4>
            <span :class="order.device_visual ? '' : 'grey--text'">
                {{ order.device_visual || $t('orders.notSpecified') }}
              </span>
            <p></p>


            <h4 class="oneline">{{ $t('orders.device_note') }}:</h4>
            <span :class="order.device_note ? '' : 'grey--text'">
              {{ order.device_note || $t('orders.notSpecified') }}
            </span>
            <p></p>


            <h4 class="oneline">
              {{ $t('orders.comment') }}:
            </h4>
            <span :class="order.comment ? '' : 'grey--text'">
                {{ order.comment || $t('orders.notSpecified') }}
              </span>
            <p></p>

            <h4 class="oneline">
              {{ $t('orders.complete_date') }}:
            </h4>
            <span v-if="!order.status.finisher">
                  <span v-if="completeDateDiff > 0">
                    {{ $tc('pluralized.days_more', completeDateDiff) }}
                    <v-icon :color="completeDateDiff > 1 ? 'success' : 'warning'">mdi-clock-outline</v-icon>
                  </span>

                  <span v-else-if="completeDateDiff < 0" class="error--text">
                    <v-icon color="error">mdi-clock-outline</v-icon>
                    {{ $tc('pluralized.days_end', Math.abs(completeDateDiff)) }}
                  </span>

                  <span v-else="completeDateDiff">({{ $t('orders.last_day')}})</span>
            </span>

            <span v-else class="success--text">
                {{ $t('orders.issued') }}
            </span>
            <!-- order end -->

            <!-- Client -->
            <h3 class="headline mb-2 mt-5">{{ $t('orders.client') }}</h3>
            <v-divider class="headline mb-3"></v-divider>

            <h4 class="oneline">
              {{ $t('orders.client_name') }}:
            </h4>
            <span :class="order.client_name ? '' : 'grey--text'">
                {{ order.client_name || $t('orders.notSpecified') }}
              </span>
            <p></p>

            <h4 class="oneline">
              {{ $t('orders.client_number') }}:
            </h4>
            <span :class="order.client_number ? '' : 'grey--text'">
                {{ order.client_number || $t('orders.notSpecified') }}
              </span>
            <p></p>

            <h4 class="oneline">
              {{ $t('orders.client_email') }}:
            </h4>
            <span :class="order.client_email ? '' : 'grey--text'">
                {{ order.client_email || $t('orders.notSpecified') }}
              </span>
            <p></p>

            <h4 class="oneline">
              {{ $t('orders.client_note') }}:
            </h4>
            <span :class="order.client_note ? '' : 'grey--text'">
                {{ order.client_note || $t('orders.notSpecified') }}
              </span>

            <!-- client end -->
          </v-card-text>
        </v-card>
      </v-flex>

      <!-- components -->
      <v-flex xs12 sm6 lg6 pa-1>
        <v-card height="100%">
          <v-card-text>
            <h3 class="headline mb-2">{{ $t('orders.components') }}</h3>
            <v-divider class="headline mb-3"></v-divider>
            <ul>
              <li>Component 1</li>
              <li>Component 2</li>
              <li>Component 3</li>
              <li>Component 4</li>
            </ul>

            <h3 class="headline mt-5">{{ $t('orders.works') }}</h3>
            <v-divider class="headline mb-3"></v-divider>
          </v-card-text>
        </v-card>
      </v-flex>

      <!-- work list -->
      <v-flex xs12 sm12 lg12 pa-1>
        <v-card height="100%">
          <v-card-text>
            <h3 class="headline mb-2">{{ $t('orders.status_history') }}</h3>
            <v-divider class="headline mb-3"></v-divider>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from "vue-property-decorator";
  import {applicationStore} from "../../store/modules/ApplicationStore";
  import {ordersStore} from "../../store/modules/OrdersStore";
  import {Order} from "../../models/Order";
  import {usersStore} from "../../store/modules/UsersStore";
  import * as moment from "moment";
  import {OrderStatus} from "../../models/OrderStatus";

  @Component
  export default class OrderShow extends Vue {
    docIcons = {
      'word': {'icon': 'mdi-file-word', color: 'primary'},
      'excel': {'icon': 'mdi-file-excel', color: 'success'},
    };

    beforeCreate() {
      ordersStore.getOrder(Number(this.$route.params.id));
      ordersStore.getStatuses();
    }

    @Watch('order') updateTitle(order: Order) {
      applicationStore.setCurrentPageTitle({text: `[#${order.id}]`});
    }

    get statuses() {
      return ordersStore.statuses;
    }

    get order() {
      return ordersStore.order;
    }

    get completeDateDiff() {
      const today = moment().tz(usersStore.currentUser.timezone);
      const completeDate = this.order.complete_date.date;

      return completeDate.diff(today, 'days');
    }

    updateStatus(status: OrderStatus) {
      console.log(status);
    }

    destroyed() {
      ordersStore.setOrder(new Order());
    }
  }
</script>

<style scoped>
  .oneline {
    display: inline-block;
  }
</style>
