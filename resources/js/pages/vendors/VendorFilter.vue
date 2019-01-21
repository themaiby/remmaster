<template>
  <VDialog
    v-model="dialog"
    max-width="1000px"
    scrollable
  >
    <VCard>
      <VToolbar
        card
        color="white"
        flat
      >
        <VToolbarTitle>{{ $t('vendors.filter') }}</VToolbarTitle>
      </VToolbar>

      <VCardText>
        <VContainer grid-list-md>
          <VLayout wrap>
            <!-- Input -->
            <VFlex
              xs12
              sm12
              md12
            >
              <VTextField
                :label="$t('vendors.name')"
                :hint="$t('vendors.nameApprox')"
                name="name"
                v-model="filter.name"
                @keypress.enter.native=""
              />
            </VFlex>


            <!-- omponents count -->
            <v-flex xs6 sm6 md6>
              <v-text-field :label="$t('components.countFrom')"
                            @keypress.enter.native=""
                            name="componentsMin"
                            v-validate="'numeric'"
                            :error-messages="errors.collect('componentsMin')"
                            v-model="filter.componentsMin"
              />
            </v-flex>
            <v-flex xs6 sm6 md6>
              <v-text-field :label="$t('components.countTo')"
                            @keypress.enter.native=""
                            name="componentsMax"
                            v-validate="'numeric'"
                            :error-messages="errors.collect('componentsMax')"
                            v-model="filter.componentsMax"
              />
            </v-flex>

            <!-- Datepickers -->
            <VFlex
              xs12
              sm6
              md6
              class="mt-3"
            >
              <v-label>{{$t('vendors.createDate')}}</v-label>
              <VMenu
                :close-on-content-click="false"
                v-model="createdAtInput.min"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <VTextField
                  slot="activator"
                  v-model="filter.createdAtMin"
                  prepend-icon="mdi-calendar"
                  readonly
                />
                <VDatePicker
                  v-model="filter.createdAtMin"
                  @input="createdAtInput.min = false"
                  :first-day-of-week="0"
                  locale="ru-ru"
                />
              </VMenu>
            </VFlex>

            <VFlex
              xs12
              sm6
              md6
              class="mt-3"
            >
              <v-label>{{ $t('vendors.createDateTo') }}</v-label>
              <VMenu
                :close-on-content-click="false"
                v-model="createdAtInput.max"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <VTextField
                  slot="activator"
                  v-model="filter.createdAtMax"
                  prepend-icon="mdi-calendar"
                  readonly
                />
                <VDatePicker
                  v-model="filter.createdAtMax"
                  @input="createdAtInput.max = false"
                  :first-day-of-week="0"
                  locale="ru-ru"
                />
              </VMenu>
            </VFlex>
          </VLayout>
        </VContainer>
      </VCardText>

      <VCardActions>
        <VSpacer/>
        <VBtn
          color="blue darken-1"
          flat
          @click="dialog = false"
        >
          {{ $t('menu.cancel') }}
        </VBtn>
        <VBtn
          color="blue darken-1"
          flat
          @click="apply"
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
  import {IVendorsFilter} from "../../models/ITableParams";

  @Component export default class VendorFilter extends Vue {
    @Watch('dialog') routeBack(value: boolean) {
      if (!value) this.$router.push({name: routeNames.vendors.index});
    }

    beforeMount() {
      const filterStore = vendorsStore.tableParams.filter;
      if (vendorsStore.tableParams.filter) this.filter = {...filterStore};
    }

    dialog: boolean = true;
    filter: IVendorsFilter = {
      name: '',
      componentsMin: undefined,
      componentsMax: undefined,
      createdAtMin: '',
      createdAtMax: '',
    };
    createdAtInput: object = {min: '', max: ''};

    apply() {
      this.$validator.validate().then(
        valid => {
          if (valid) vendorsStore.setTableParams({...vendorsStore.tableParams, filter: this.filter});
          this.dialog = false;
        }
      );
    }
  }
</script>

<style scoped>

</style>
