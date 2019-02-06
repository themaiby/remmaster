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
        <VToolbarTitle>{{ $t('components.update') }}</VToolbarTitle>
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
                @keypress.enter.native="update"
                name="title"
                solo
                v-model="componentModel.title"
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
                @keypress.enter.native="update"
                name="article"
                solo
                v-model="componentModel.article"
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
                v-model="componentModel.vendor_id"
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
                @keypress.enter.native="update"
                name="count"
                persistent-hint
                solo
                v-model="componentModel.count"
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
                @keypress.enter.native="update"
                name="cost"
                persistent-hint
                solo
                v-model="componentModel.cost"
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
                      :color="componentModel.category.id === item.id ? 'success' : ''"
                      @click="componentModel.category.id = item.id" small
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
          @click="dialog = false"
          color="blue darken-1"
          flat
          v-if="!isRequest"
        >
          {{ $t('menu.cancel') }}
        </VBtn>
        <VBtn
          :loading="isRequest"
          @click="update"
          color="blue darken-1"
          flat
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


