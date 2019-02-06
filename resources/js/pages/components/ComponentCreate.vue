<template>
  <VDialog
    max-width="1000px"
    persistent
    scrollable
    v-model="dialog"
  >
    <VCard>
      <VToolbar
        card
        flat
      >
        <VToolbarTitle>{{ $t('components.new') }}</VToolbarTitle>
      </VToolbar>

      <VCardText>
        <VContainer grid-list-md>
          <VLayout wrap>

            <!-- title -->
            <VFlex md6 sm6 xs6>
              <VTextField
                :data-vv-as="$t('components.title')"
                :disabled="isRequest"
                :error-messages="errors.collect('title')"
                :label="$t('components.title')"
                @keypress.enter.native="create"
                name="title"
                solo
                v-model="component.title"
                v-validate="'required'"
              />
            </VFlex>
            <!-- article -->
            <VFlex md6 sm6 xs6>
              <VTextField
                :data-vv-as="$t('components.article')"
                :disabled="isRequest"
                :error-messages="errors.collect('article')"
                :label="$t('components.article')"
                @keypress.enter.native="create"
                name="article"
                solo
                v-model="component.article"
                v-validate="'required'"
              />
            </VFlex>

            <!-- vendor-->
            <VFlex
              md12
              sm12
              xs12
            >
              <v-autocomplete
                :data-vv-as="$t('components.vendor')"
                :error-messages="errors.collect('vendor')"
                :items="availableVendors"
                :label="$t('components.vendor')"
                @keypress.enter.native="apply"
                item-text="name"
                item-value="id"
                name="vendor"
                prepend-icon="mdi-truck-fast"
                v-model="component.vendor_id"
                v-validate="'required'"
              >
                <v-slide-x-reverse-transition
                  mode="out-in"
                  slot="append-outer"
                >
                </v-slide-x-reverse-transition>
              </v-autocomplete>
            </VFlex>

            <!-- count -->
            <VFlex md6 sm6 xs6>
              <VTextField
                :data-vv-as="$t('components.count')"
                :disabled="isRequest"
                :error-messages="errors.collect('count')"
                :hint="$t('components.count')"
                @keypress.enter.native="create"
                name="count"
                persistent-hint
                solo
                v-model="component.count"
                v-validate="'required|numeric'"
              />
            </VFlex>
            <!-- cost -->
            <VFlex md6 sm6 xs6>
              <VTextField
                :data-vv-as="$t('components.cost')"
                :disabled="isRequest"
                :error-messages="errors.collect('cost')"
                :hint="$t('components.cost')"
                @keypress.enter.native="create"
                name="cost"
                persistent-hint
                solo
                v-model="component.cost"
                v-validate="{required: true, regex: /^\$?[\d,]+(\.\d*)?$/}"
              />
            </VFlex>

            <!-- categories tree view -->
            <v-flex lg12 md12 mt-3 xs12>
              <v-label>{{ $t('components.categoryChoice') }}</v-label>
            </v-flex>
            <v-flex lg12 md12 xs12>
              <div class="pa-3">
                <v-treeview
                  :items="availableCategories"
                  active-class="grey lighten-4 indigo--text"
                  expand-icon="mdi-chevron-down"
                  item-children="child"
                  item-key="id"
                  item-text="title"
                >
                  <template slot="prepend" slot-scope="{ item }">
                    <v-icon
                      :color="component.category_id === item.id ? 'success' : ''"
                      @click="component.category_id = item.id" small
                    >
                      {{ component.category_id === item.id ? 'mdi-radiobox-marked' : 'mdi-radiobox-blank' }}
                    </v-icon>
                  </template>
                  <template slot="label" slot-scope="{item}">
                    <small>{{ item.title }}</small>
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
          v-if="!isRequest"
        >
          {{ $t('menu.cancel') }}
        </VBtn>
        <VBtn
          :loading="isRequest"
          @click="create"
          color="blue darken-1"
          flat
        >
          {{ $t('menu.submit') }}
        </VBtn>
        <VBtn
          :loading="isRequest"
          @click="createAndContinue"
          color="blue darken-1"
          flat
        >
          {{ $t('menu.submitAndContinue') }}
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from "vue-property-decorator";
  import {routeNames} from "../../router/routeNames";
  import IComponent from "../../models/IComponent";
  import {componentsStore} from "../../store/modules/ComponentsStore";

  @Component export default class VendorCreate extends Vue {
    dialog: boolean = true;
    continueCreating: boolean = false;
    component: IComponent = {article: '', title: '', count: 0.00, cost: 0.00, category_id: 1};

    @Watch('dialog') routeBack(value: boolean) {
      if (!value) this.$router.push({name: routeNames.components.index});
    }

    // redirect when component will created
    @Watch('createdComponent') redirectToCreatedComponent(component: IComponent) {
      if (component.id && !this.continueCreating) {
        this.$router.push({
          name: routeNames.components.show,
          params: {id: String(component.id)}
        });
      } else {
        componentsStore.getComponents();
        this.continueCreating = false;
      }
    }

    created() {
      componentsStore.getAvailableVendors();
      componentsStore.getAvailableCategories();
    }

    get availableVendors() {
      return componentsStore.availableVendors;
    }

    get availableCategories() {
      return componentsStore.availableCategories;
    }

    get isRequest() {
      return componentsStore.isComponentCreatingRequest;
    }

    get createdComponent() {
      return componentsStore.component;
    }

    // create then destroy component and redirect to component
    create() {
      this.$validator.validate().then(valid => {
        if (valid) componentsStore.createComponent(this.component);
      });
    }

    // Send post data then clear model fields
    async createAndContinue() {
      this.$validator.validate().then(async valid => {
        this.continueCreating = true;
        if (valid) {
          await componentsStore.createComponent(this.component);

          // reset component's model
          this.component = {title: '', article: '', count: 0.00, cost: 0.00, category_id: 1};

          // disable validator after reset
          this.$validator.reset();
        }
      });
    }
  }
</script>


