<template>
  <VDialog
    v-model="dialog"
    max-width="1000px"
    scrollable
    persistent
  >
    <VCard>
      <VToolbar
        card
        flat
      >
        <VToolbarTitle>{{ $t('components.update') }}</VToolbarTitle>
      </VToolbar>

      <VCardText>
        <VContainer grid-list-md>
          <VLayout wrap>

            <!-- title -->
            <VFlex xs6 sm6 md6>
              <VTextField
                :label="$t('components.title')"
                name="title"
                v-validate="'required'"
                :error-messages="errors.collect('title')"
                v-model="componentModel.title"
                :data-vv-as="$t('components.title')"
                @keypress.enter.native="update"
                solo
                :disabled="isRequest"
              />
            </VFlex>
            <!-- article -->
            <VFlex xs6 sm6 md6>
              <VTextField
                :label="$t('components.article')"
                name="article"
                v-validate="'required'"
                :error-messages="errors.collect('article')"
                v-model="componentModel.article"
                :data-vv-as="$t('components.article')"
                @keypress.enter.native="update"
                solo
                :disabled="isRequest"
              />
            </VFlex>

            <!-- vendor-->
            <VFlex
              xs12
              sm12
              md12
            >
              <v-autocomplete
                v-model="componentModel.vendor_id"
                :items="availableVendors"
                :label="$t('components.vendor')"
                prepend-icon="mdi-truck-fast"
                item-text="name"
                item-value="id"
                name="vendor"
                @keypress.enter.native="apply"
                v-validate="'required'"
                :error-messages="errors.collect('vendor')"
                :data-vv-as="$t('components.vendor')"
              >
                <v-slide-x-reverse-transition
                  slot="append-outer"
                  mode="out-in"
                >
                </v-slide-x-reverse-transition>
              </v-autocomplete>
            </VFlex>

            <!-- count -->
            <VFlex xs6 sm6 md6>
              <VTextField
                :hint="$t('components.count')"
                persistent-hint
                name="count"
                v-validate="'required|numeric'"
                :error-messages="errors.collect('count')"
                v-model="componentModel.count"
                :data-vv-as="$t('components.count')"
                @keypress.enter.native="update"
                solo
                :disabled="isRequest"
              />
            </VFlex>
            <!-- cost -->
            <VFlex xs6 sm6 md6>
              <VTextField
                :hint="$t('components.cost')"
                persistent-hint
                name="cost"
                v-validate="{required: true, regex: /^\$?[\d,]+(\.\d*)?$/}"
                :error-messages="errors.collect('cost')"
                :data-vv-as="$t('components.cost')"
                v-model="componentModel.cost"
                @keypress.enter.native="update"
                solo
                :disabled="isRequest"
              />
            </VFlex>

            <!-- categories tree view -->
            <v-flex xs12 md12 lg12 mt-3>
              <v-label>{{ $t('components.categoryChoice') }}</v-label>
            </v-flex>
            <v-flex xs12 md12 lg12>
              <div class="pa-3">
                <v-treeview
                  item-key="id"
                  item-text="title"
                  item-children="child"
                  :items="availableCategories"
                  active-class="grey lighten-4 indigo--text"
                  expand-icon="mdi-chevron-down"
                >
                  <template slot="prepend" slot-scope="{ item }">
                    <v-icon
                      @click="componentModel.category.id = item.id"
                      :color="componentModel.category.id === item.id ? 'success' : ''" small
                    >
                      {{ componentModel.category.id === item.id ? 'mdi-radiobox-marked' : 'mdi-radiobox-blank' }}
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
          v-if="!isRequest"
          color="blue darken-1"
          flat
          @click="dialog = false"
        >
          {{ $t('menu.cancel') }}
        </VBtn>
        <VBtn
          color="blue darken-1"
          flat
          @click="update"
          :loading="isRequest"
        >
          {{ $t('menu.submit') }}
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from "vue-property-decorator";
  import {routeNames} from "../../router/routeNames";
  import {componentsStore} from "../../store/modules/ComponentsStore";
  import {Component as ComponentModel, createComponentModel, defaultComponentModel} from "../../models/Component";

  @Component export default class VendorsEdit extends Vue {
    private componentModel: ComponentModel = createComponentModel(defaultComponentModel);
    private isLoaded: boolean = false;
    private dialog: boolean = true;

    @Watch('dialog') routeBack(value: boolean) {
      if (!value) this.$router.push({
        name: routeNames.components.show,
        params: {
          id: String(this.component.id)
        }
      });
    }

    get component(): ComponentModel {
      return componentsStore.component;
    }

    get availableVendors() {
      return componentsStore.availableVendors;
    }

    get availableCategories() {
      return componentsStore.availableCategories;
    }

    get isRequest() {
      return componentsStore.isUpdateRequest;
    }

    async created() {
      componentsStore.getAvailableVendors();
      componentsStore.getAvailableCategories();
      // full reassign because without destruct local component will reactive
      if (!componentsStore.component.id) {
        await componentsStore.getComponent(Number(this.$route.params.id));
      }
      this.componentModel = {
        ...componentsStore.component,
        category_id: this.component.category ? (this.component.category.id || 1) : 1,
        vendor_id: this.component.vendor ? (this.component.vendor.id || 0) : 0,
      };
    }

    update() {
      this.$validator.validate().then(valid => {
        if (valid) {
          componentsStore.updateComponent(this.componentModel);
          this.dialog = false;
        }
      });
    }
  }
</script>

<style scoped>
  .gradient-button {
    background: #3C3B3F; /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #605C3C, #3C3B3F); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #605C3C, #3C3B3F); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
</style>


