<template>
  <v-container>
    <v-layout row v-if="order.id" wrap>

      <v-flex lg12 pa-1 sm12 xs12 style="display: inline;">
        <!-- status -->
        <order-status/>

        <!-- invoice -->
        <v-menu>
          <v-btn flat icon slot="activator">
            <v-icon>mdi-file-download-outline</v-icon>
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
      <v-flex lg6 pa-1 sm6 xs12>
        <v-card height="100%">
          <v-card-text>
            <!-- order -->
            <h3 class="headline mb-2">
              {{ $t('orders.common_information') }}
              <v-icon @click="" class="mb-1">mdi-pencil</v-icon>
            </h3>
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

                  <span class="error--text" v-else-if="completeDateDiff < 0">
                    <v-icon color="error">mdi-clock-outline</v-icon>
                    {{ $tc('pluralized.days_end', Math.abs(completeDateDiff)) }}
                  </span>

                  <span v-else="completeDateDiff">{{ $t('orders.last_day')}}</span>
            </span>

            <span class="success--text" v-else>
                {{ $t('orders.issued') }}
            </span>
            <!-- order end -->

            <!-- Client -->
            <h3 class="headline mb-2 mt-5">
              {{ $t('orders.client') }}
              <v-icon @click="" class="mb-1">mdi-pencil</v-icon>
            </h3>
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

      <v-flex lg6 pa-1 sm6 xs12>
        <v-card height="100%">
          <v-card-text>
            <!-- works -->
            <h3 class="headline mb-2">
              {{ $t('orders.works') }}
              <v-icon @click="" class="mb-1">mdi-pencil</v-icon>
            </h3>
            <v-divider class="headline mb-3"></v-divider>

            <v-list two-line>
              <v-list-tile :key="work.id" v-for="work in order.works">

                <v-list-tile-content>
                  <v-list-tile-title>{{ work.title }}</v-list-tile-title>
                  <v-list-tile-sub-title>{{ work.cost }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-divider></v-divider>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-sub-title>
                    {{ $t('orders.worksSummary') }}:
                    {{ sum(order.works) }}
                  </v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>

            <!-- components -->
            <h3 class="headline mt-5">
              {{ $t('orders.components') }}
              <v-icon @click="" class="mb-1">mdi-pencil</v-icon>
            </h3>
            <v-divider class="headline mb-3"></v-divider>

            <v-list subheader three-line>
              <v-list-tile :key="component.id" v-for="component in order.components">

                <v-list-tile-content>
                  <v-list-tile-title>{{ component.title }}</v-list-tile-title>
                  <v-list-tile-sub-title>{{ $t('components.article') }}: {{ component.article }}</v-list-tile-sub-title>
                  <v-list-tile-sub-title>{{ $t('components.count') }}: {{ component.getInOrderCount() }}
                  </v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <router-link :to="{name: componentShowRoute, params: {id: component.id}}">
                    <v-btn icon ripple>
                      <v-icon color="primary">mdi-information</v-icon>
                    </v-btn>
                  </router-link>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>

          </v-card-text>
        </v-card>
      </v-flex>

      <!-- status history-->
      <v-flex lg12 pa-1 sm12 xs12>
        <v-card height="100%">
          <v-card-text>
            <h3 class="headline mb-2">{{ $t('orders.status_history') }}</h3>
            <v-divider class="headline mb-3"></v-divider>
            <StatusHistory :order_created_at="order.created_at.date"
                           :statusHistory="order.status_history"
                           :user="order.user"
            />
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <router-view/>
  </v-container>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from "vue-property-decorator";
  import {applicationStore} from "../../store/modules/ApplicationStore";
  import {ordersStore} from "../../store/modules/OrdersStore";
  import {Order} from "../../models/Order";
  import {usersStore} from "../../store/modules/UsersStore";
  import * as moment from "moment";
  import {routeNames} from "../../router/routeNames";
  import {OrderWork} from "../../models/OrderWork";
  import StatusHistory from "./OrderShow/OrderStatusHistory.vue";
  import OrderStatus from "./OrderShow/OrderStatus.vue";

  /* todo: implement work completing */
  @Component({
    components: {OrderStatus, StatusHistory}
  })
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
      applicationStore.setCurrentPageTitle({text: `#${order.id}`});
    }

    sum(works: OrderWork[]): number {
      let sum = 0;
      works.forEach(work => {
        sum += Number(work.cost)
      });

      return sum;
    }

    get statuses() {
      return ordersStore.statuses;
    }

    get order() {
      return ordersStore.order;
    }

    get componentShowRoute() {
      return routeNames.components.show;
    }

    get completeDateDiff() {
      const today = moment().tz(usersStore.currentUser.timezone);

      if (typeof this.order.complete_date === "object") {
        return this.order.complete_date.date.diff(today, 'days');
      }

      return moment(this.order.complete_date).diff(today, 'days');
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
