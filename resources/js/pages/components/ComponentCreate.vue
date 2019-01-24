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
        :color="success ? 'light-green lighten-3' : 'white'"
        flat
      >
        <VToolbarTitle>{{ $t('components.new') }}</VToolbarTitle>
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
                v-model="component.title"
                :data-vv-as="$t('components.title')"
                @keypress.enter.native="create"
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
                v-model="component.article"
                :data-vv-as="$t('components.article')"
                @keypress.enter.native="create"
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
                v-model="component.vendor_id"
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
                v-model="component.count"
                :data-vv-as="$t('components.count')"
                @keypress.enter.native="create"
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
                v-model="component.cost"
                @keypress.enter.native="create"
                solo
                :disabled="isRequest"
              />
            </VFlex>

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
          @click="create"
          :loading="isRequest"
        >
          {{ $t('menu.submit') }}
        </VBtn>
        <VBtn
          color="blue darken-1"
          flat
          @click="createAndContinue"
          :loading="isRequest"
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

  /* todo: add error message */

  @Component export default class VendorCreate extends Vue {
    private success: boolean = false;
    @Watch('dialog') routeBack(value: boolean) {
      if (!value) this.$router.push({name: routeNames.components.index});
    }

    @Watch('createdComponent') redirectToCreatedComponent(component: IComponent) {
      if (component.id && !this.continueCreating) this.$router.push({
        name: routeNames.components.show,
        params: {id: String(component.id)}
      });
      this.continueCreating = false;
    }

    dialog: boolean = true;
    continueCreating: boolean = false;
    component: IComponent = {article: '', title: '', count: 0.00, cost: 0.00};

    created() {
      componentsStore.getAvailableVendors();
    }

    get availableVendors() {
      return componentsStore.availableVendors;
    }

    get isRequest() {
      return componentsStore.isComponentCreatingRequest;
    }

    get createdComponent() {
      return componentsStore.component;
    }

    create() {
      this.$validator.validate().then(valid => {
        if (valid) componentsStore.createComponent(this.component);
      });
    }

    async createAndContinue() {
      this.$validator.validate().then(async valid => {
        this.continueCreating = true;
        if (valid) {
          await componentsStore.createComponent(this.component);
          this.component = {title: '', article: '', count: 0.00, cost: 0.00};
          this.$validator.reset();
          this.showSuccessMessage();
        }
      });
    }

    private showSuccessMessage() {
      this.success = true;
      setTimeout(() => {
        this.success = false
      }, 3000);
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


