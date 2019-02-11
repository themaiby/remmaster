<template>
  <VDialog
    max-width="1000px"
    scrollable
    v-model="dialog"
  >
    <VCard>
      <VCardText>
        <VContainer grid-list-md>
          <VLayout wrap>
            <!-- Input -->
            <VFlex
              md12
              sm12
              xs12
            >
              <VTextField
                :hint="$t('menu.approximate')"
                :label="$t('vendors.name')"
                @keypress.enter.native=""
                name="name"
                v-model="filter.name"
              />
            </VFlex>


            <!-- omponents count -->
            <v-flex md6 sm6 xs6>
              <v-text-field :data-vv-as="$t('vendors.componentsCountMin')"
                            :error-messages="errors.collect('componentsMin')"
                            :label="$t('vendors.componentsCountMin')"
                            @keypress.enter.native=""
                            name="componentsMin"
                            v-model="filter.componentsMin"
                            v-validate="'numeric'"
              />
            </v-flex>
            <v-flex md6 sm6 xs6>
              <v-text-field :data-vv-as="$t('vendors.componentsCountMax')"
                            :error-messages="errors.collect('componentsMax')"
                            :label="$t('vendors.componentsCountMax')"
                            @keypress.enter.native=""
                            name="componentsMax"
                            v-model="filter.componentsMax"
                            v-validate="'numeric'"
              />
            </v-flex>

            <!-- Datepickers -->
            <VFlex
              class="mt-3"
              md6
              sm6
              xs12
            >
              <v-label>{{$t('vendors.createDate')}}</v-label>
              <VMenu
                :close-on-content-click="false"
                :nudge-right="40"
                full-width
                lazy
                min-width="290px"
                offset-y
                transition="scale-transition"
                v-model="createdAtInput.min"
              >
                <VTextField
                  prepend-icon="mdi-calendar"
                  readonly
                  slot="activator"
                  v-model="filter.createdAtMin"
                />
                <VDatePicker
                  :first-day-of-week="0"
                  @input="createdAtInput.min = false"
                  locale="ru-ru"
                  v-model="filter.createdAtMin"
                />
              </VMenu>
            </VFlex>

            <VFlex
              class="mt-3"
              md6
              sm6
              xs12
            >
              <v-label>{{ $t('vendors.createDateTo') }}</v-label>
              <VMenu
                :close-on-content-click="false"
                :nudge-right="40"
                full-width
                lazy
                min-width="290px"
                offset-y
                transition="scale-transition"
                v-model="createdAtInput.max"
              >
                <VTextField
                  prepend-icon="mdi-calendar"
                  readonly
                  slot="activator"
                  v-model="filter.createdAtMax"
                />
                <VDatePicker
                  :first-day-of-week="0"
                  @input="createdAtInput.max = false"
                  locale="ru-ru"
                  v-model="filter.createdAtMax"
                />
              </VMenu>
            </VFlex>
          </VLayout>
        </VContainer>
      </VCardText>

      <VCardActions>
        <VSpacer/>
        <VBtn
          @click="dialog = false"
          color="blue darken-1"
          flat
        >
          {{ $t('menu.cancel') }}
        </VBtn>
        <VBtn
          @click="apply"
          color="blue darken-1"
          flat
        >
          {{ $t('menu.apply') }}
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from "vue-property-decorator";
  import {routeNames} from "../../router/routeNames";
  import {vendorsStore} from "../../store/modules/VendorsStore";
  import {IVendorsFilter} from "../../interfaces/ITableParams";
  import {Filter} from "../../models/Filter";

  @Component export default class VendorFilter extends Vue {
    @Watch('dialog') routeBack(value: boolean) {
      if (!value) this.$router.push({name: routeNames.vendors.index});
    }

    beforeMount() {
      const filterStore = vendorsStore.filter;
      if (vendorsStore.filter) this.filter = filterStore;
    }

    dialog: boolean = true;
    filter: Filter.Vendor | null = new Filter.Vendor();
    createdAtInput: object = {min: '', max: ''};

    apply() {
      this.$validator.validate().then(
        valid => {
          if (valid) {
            if (this.filter) vendorsStore.setFilter(this.filter);
            vendorsStore.getVendors();
            this.dialog = false;
          }
        }
      );
    }
  }
</script>

<style scoped>

</style>
