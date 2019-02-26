<template>
  <div>
    <v-timeline clipped dense>
      <!-- First item always creating -->
      <v-timeline-item class="mb-3" small>
        <v-layout justify-space-between>
          <v-flex xs7>{{ $t('orders.created') }}</v-flex>
          <v-flex text-xs-right xs5> {{ user.fullname }} {{ order_created_at | moment('DD/MM/YYYY HH:mm:ss') }}</v-flex>
        </v-layout>
      </v-timeline-item>

      <v-timeline-item color="grey"
                       :key="status.id"
                       class="mb-3"
                       small
                       v-for="status in statusHistory">
        <v-layout justify-space-between>
          <v-flex xs7>
            <v-btn :color="status.status_old.color">
              {{ status.status_old.title }}
            </v-btn>
            <v-icon>mdi-arrow-right-bold-outline</v-icon>
            <v-btn :color="status.status_new.color">
              {{ status.status_new.title }}
            </v-btn>
          </v-flex>
          <v-flex text-xs-right xs5>
            {{ status.user.fullname }} {{ status.created_at.date | moment('DD/MM/YYYY HH:mm:ss') }}
          </v-flex>
        </v-layout>
      </v-timeline-item>

    </v-timeline>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from "vue-property-decorator";
  import {StatusHistory as StatusHistoryModel} from "../../../models/StatusHistory";
  import {User} from "../../../models/User";
  import {Moment} from "moment";

  @Component
  export default class StatusHistory extends Vue {
    @Prop(StatusHistoryModel) statusHistory!: StatusHistoryModel;
    @Prop(Object) order_created_at!: Moment;
    @Prop(User) user!: User;

  }
</script>

<style scoped>

</style>
