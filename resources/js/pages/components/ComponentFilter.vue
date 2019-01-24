<template>
  <VDialog
    v-model="dialog"
    max-width="1000px"
    scrollable
  >
    <VCard>
      <VCardText>
        <VContainer grid-list-md>
          <VLayout wrap>
            <!-- Input -->
            <VFlex
              xs6
              sm6
              md6
            >
              <VTextField
                :label="$t('components.title')"
                :hint="$t('menu.approximate')"
                name="name"
                v-model="filter.title"
                @keypress.enter.native="apply"
              />
            </VFlex>
            <VFlex
              xs6
              sm6
              md6
            >
              <VTextField
                :label="$t('components.article')"
                :hint="$t('menu.approximate')"
                name="title"
                v-model="filter.article"
                @keypress.enter.native="apply"
              />
            </VFlex>

            <!-- vendor-->
            <VFlex
              xs12
              sm12
              md12
            >
              <v-autocomplete
                v-model="filter.vendor"
                :hint="$t('menu.startTyping')"
                :items="availableVendors"
                :label="$t('components.vendor')"
                persistent-hint
                prepend-icon="mdi-truck-fast"
                item-text="name"
                item-value="id"
                @keypress.enter.native="apply"
              >
                <v-slide-x-reverse-transition
                  slot="append-outer"
                  mode="out-in"
                >
                </v-slide-x-reverse-transition>
              </v-autocomplete>
            </VFlex>

            <!-- count -->
            <v-flex xs3 sm3 md3>
              <v-text-field :label="$t('components.countMin')"
                            @keypress.enter.native="apply"
                            name="countMin"
                            v-validate="'numeric'"
                            :error-messages="errors.collect('countMin')"
                            :data-vv-as="$t('components.countMin')"
                            v-model="filter.countMin"
              />
            </v-flex>
            <v-flex xs3 sm3 md3>
              <v-text-field :label="$t('components.countMax')"
                            @keypress.enter.native="apply"
                            name="countMax"
                            v-validate="'numeric'"
                            :error-messages="errors.collect('countMax')"
                            :data-vv-as="$t('components.countMax')"
                            v-model="filter.countMax"
              />
            </v-flex>

            <!-- Cost -->
            <v-flex xs3 sm3 md3>
              <v-text-field :label="$t('components.costMin')"
                            @keypress.enter.native="apply"
                            name="costMin"
                            v-validate="'numeric'"
                            :error-messages="errors.collect('costMin')"
                            :data-vv-as="$t('components.costMin')"
                            v-model="filter.costMin"
              />
            </v-flex>
            <v-flex xs3 sm3 md3>
              <v-text-field :label="$t('components.costMax')"
                            @keypress.enter.native="apply"
                            name="costMax"
                            v-validate="'numeric'"
                            :error-messages="errors.collect('costMax')"
                            :data-vv-as="$t('components.costMax')"
                            v-model="filter.costMax"
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
  import {IComponentsFilter} from "../../models/ITableParams";
  import {componentsStore} from "../../store/modules/ComponentsStore";

  @Component export default class VendorFilter extends Vue {
    @Watch('dialog') routeBack(value: boolean) {
      if (!value) this.$router.push({name: routeNames.components.index});
    }

    dialog: boolean = true;
    filter: IComponentsFilter = {};
    createdAtInput: object = {min: '', max: ''};

    get availableVendors() {
      return componentsStore.availableVendors;
    }

    beforeMount() {
      const filterStore = componentsStore.tableParams.filter;
      if (componentsStore.tableParams.filter) this.filter = {...filterStore};
      componentsStore.getAvailableVendors();
    }

    apply() {
      this.$validator.validate().then(
        valid => {
          if (valid) {
            componentsStore.setTableParams({...componentsStore.tableParams, filter: this.filter});
            this.dialog = false;
          }
        }
      );
    }
  }
</script>

<style scoped>

</style>
