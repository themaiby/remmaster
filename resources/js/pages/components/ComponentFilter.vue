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
              md6
              sm6
              xs6
            >
              <VTextField
                :hint="$t('menu.approximate')"
                :label="$t('components.title')"
                @keypress.enter.native="apply"
                name="name"
                v-model="filter.title"
              />
            </VFlex>
            <VFlex
              md6
              sm6
              xs6
            >
              <VTextField
                :hint="$t('menu.approximate')"
                :label="$t('components.article')"
                @keypress.enter.native="apply"
                name="title"
                v-model="filter.article"
              />
            </VFlex>

            <!-- vendor-->
            <VFlex
              md12
              sm12
              xs12
            >
              <v-autocomplete
                :items="availableVendors"
                :label="$t('components.vendor')"
                @keypress.enter.native="apply"
                item-text="name"
                item-value="id"
                prepend-icon="mdi-truck-fast"
                v-model="filter.vendor"
              >
                <v-slide-x-reverse-transition
                  mode="out-in"
                  slot="append-outer"
                >
                </v-slide-x-reverse-transition>
              </v-autocomplete>
            </VFlex>

            <!-- count -->
            <v-flex md3 sm3 xs3>
              <v-text-field :data-vv-as="$t('components.countMin')"
                            :error-messages="errors.collect('countMin')"
                            :label="$t('components.countMin')"
                            @keypress.enter.native="apply"
                            name="countMin"
                            v-model="filter.countMin"
                            v-validate="'numeric'"
              />
            </v-flex>
            <v-flex md3 sm3 xs3>
              <v-text-field :data-vv-as="$t('components.countMax')"
                            :error-messages="errors.collect('countMax')"
                            :label="$t('components.countMax')"
                            @keypress.enter.native="apply"
                            name="countMax"
                            v-model="filter.countMax"
                            v-validate="'numeric'"
              />
            </v-flex>

            <!-- Cost -->
            <v-flex md3 sm3 xs3>
              <v-text-field :data-vv-as="$t('components.costMin')"
                            :error-messages="errors.collect('costMin')"
                            :label="$t('components.costMin')"
                            @keypress.enter.native="apply"
                            name="costMin"
                            v-model="filter.costMin"
                            v-validate="'numeric'"
              />
            </v-flex>
            <v-flex md3 sm3 xs3>
              <v-text-field :data-vv-as="$t('components.costMax')"
                            :error-messages="errors.collect('costMax')"
                            :label="$t('components.costMax')"
                            @keypress.enter.native="apply"
                            name="costMax"
                            v-model="filter.costMax"
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

            <!-- Category choice -->
            <v-flex lg12 md12 mt-3 xs12>
              <v-label>{{ $t('components.categoryChoice') }}</v-label>
            </v-flex>
            <v-flex lg12 md12 xs12>
              <div class="pa-2">
                <v-treeview
                  :items="availableCategories"
                  active-class="grey lighten-4 indigo--text"
                  expand-icon="mdi-chevron-down"
                  item-children="child"
                  item-key="id"
                >
                  <template slot="prepend" slot-scope="{ item }">
                    <v-checkbox :label="item.title" :value="item.id" v-model="filter.categories"/>
                  </template>
                </v-treeview>
              </div>
            </v-flex>
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
  import {componentsStore} from "../../store/modules/ComponentsStore";
  import {Filter} from "../../models/Filter";

  @Component export default class VendorFilter extends Vue {
    @Watch('dialog') routeBack(value: boolean) {
      if (!value) this.$router.push({name: routeNames.components.index});
    }

    dialog: boolean = true;
    filter: Filter.Component | null = new Filter.Component();
    createdAtInput: object = {min: '', max: ''};

    get availableVendors() {
      return componentsStore.availableVendors;
    }

    get availableCategories() {
      return componentsStore.availableCategories;
    }

    beforeMount() {
      const filterStore = componentsStore.filter;
      if (componentsStore.filter) this.filter = filterStore;

      componentsStore.getAvailableVendors();
      componentsStore.getAvailableCategories();
    }

    apply() {
      this.$validator.validate().then(
        valid => {
          if (valid) {
            if (this.filter) componentsStore.setFilter(this.filter);
            componentsStore.getComponents();
            this.dialog = false;
          }
        }
      );
    }
  }
</script>

<style scoped>

</style>
